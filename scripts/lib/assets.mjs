/**
 * Descarga las imagenes remotas a public/media para que el sitio publicado
 * no dependa de CDNs de terceros (ni de sus politicas de hotlinking / CORS).
 * Las imagenes ya descargadas se reutilizan, asi que re-ejecutar es barato.
 */

import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { fetchWithRetry } from './http.mjs';

const EXTENSION_BY_TYPE = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/avif': '.avif',
};

export function slugify(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
}

/**
 * @param {string | null | undefined} url  URL remota de la imagen
 * @param {string} category    subcarpeta bajo public/media
 * @param {string} name        nombre base legible
 * @param {{ publicDir: string, stats: { downloaded: number, cached: number, failed: number } }} ctx
 * @returns {Promise<string | null>} ruta relativa a la raiz del sitio, o null si falla
 */
export async function downloadImage(url, category, name, ctx) {
  if (!url) return null;

  const digest = createHash('sha1').update(url).digest('hex').slice(0, 8);
  const base = `${slugify(name) || 'asset'}-${digest}`;
  const dir = path.join(ctx.publicDir, 'media', category);

  // Reutiliza el archivo si ya existe con cualquier extension conocida.
  for (const ext of Object.values(EXTENSION_BY_TYPE)) {
    if (existsSync(path.join(dir, base + ext))) {
      ctx.stats.cached++;
      return `/media/${category}/${base}${ext}`;
    }
  }

  try {
    const response = await fetchWithRetry(url, { retries: 2, label: `img ${name}` });
    const contentType = (response.headers.get('content-type') ?? '').split(';')[0].trim();
    const ext =
      EXTENSION_BY_TYPE[contentType] ?? (path.extname(new URL(url).pathname) || '.jpg');
    const buffer = Buffer.from(await response.arrayBuffer());

    if (buffer.byteLength < 512) throw new Error('respuesta demasiado pequena para ser una imagen');

    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, base + ext), buffer);
    ctx.stats.downloaded++;
    return `/media/${category}/${base}${ext}`;
  } catch (error) {
    ctx.stats.failed++;
    console.warn(`   ⚠ imagen no descargada (${name}): ${error.message}`);
    return null;
  }
}
