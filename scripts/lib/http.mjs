/**
 * Utilidades HTTP compartidas: reintentos con backoff exponencial y rate limiting.
 * Las APIs publicas (AniList, Kitsu) caen o limitan a menudo, asi que todo
 * pasa por aqui para que el pipeline degrade con gracia en vez de romperse.
 */

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Serializa peticiones a un mismo host con un intervalo minimo entre ellas. */
export function createLimiter(minIntervalMs) {
  let chain = Promise.resolve();
  let last = 0;
  return (fn) => {
    const run = async () => {
      const wait = last + minIntervalMs - Date.now();
      if (wait > 0) await sleep(wait);
      last = Date.now();
      return fn();
    };
    // Encadena para preservar el orden y no solapar peticiones.
    const result = chain.then(run, run);
    chain = result.then(
      () => undefined,
      () => undefined,
    );
    return result;
  };
}

export class HttpError extends Error {
  constructor(status, url, body) {
    super(`HTTP ${status} en ${url}`);
    this.name = 'HttpError';
    this.status = status;
    this.body = body;
  }
}

const RETRYABLE = new Set([408, 425, 429, 500, 502, 503, 504, 522, 524]);

/**
 * fetch con reintentos. Respeta Retry-After cuando la API lo envia.
 * @param {string} url
 * @param {RequestInit & { retries?: number, baseDelay?: number, label?: string }} options
 */
export async function fetchWithRetry(url, options = {}) {
  const { retries = 4, baseDelay = 1200, label = url, ...init } = options;
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) {
      const delay = baseDelay * 2 ** (attempt - 1);
      console.log(`   ↻ reintento ${attempt}/${retries} en ${delay}ms — ${label}`);
      await sleep(delay);
    }

    try {
      const response = await fetch(url, {
        ...init,
        signal: AbortSignal.timeout(45_000),
      });

      if (response.ok) return response;

      const retryAfter = Number(response.headers.get('retry-after'));
      if (Number.isFinite(retryAfter) && retryAfter > 0) {
        console.log(`   ⏳ Retry-After ${retryAfter}s — ${label}`);
        await sleep(Math.min(retryAfter, 60) * 1000);
      }

      const body = await response.text().catch(() => '');
      lastError = new HttpError(response.status, url, body.slice(0, 300));
      if (!RETRYABLE.has(response.status)) throw lastError;
    } catch (error) {
      if (error instanceof HttpError && !RETRYABLE.has(error.status)) throw error;
      lastError = error;
    }
  }

  throw lastError;
}

export { sleep };
