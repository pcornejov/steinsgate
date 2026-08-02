/** Configuracion del sitio y resolucion de rutas respetando el base path. */

export const site = {
  title: 'Future Gadget Archive',
  tagline: 'Enciclopedia de Steins;Gate',
  description:
    'Enciclopedia en español de Steins;Gate: obras, personajes, guía de episodios, líneas de mundo y glosario científico. Datos de AniList y Kitsu.',
  lang: 'es',
  author: 'Future Gadget Archive',
} as const;

const BASE = import.meta.env.BASE_URL;

/**
 * Construye una URL interna respetando el base path de GitHub Pages.
 * `url('/personajes')` → `/steinsgate/personajes/`
 *
 * Las paginas llevan barra final porque es la forma canonica que sirve GitHub
 * Pages: sin ella cada enlace interno costaria un 301. Los ficheros con
 * extension (imagenes, sitemap, favicon) se dejan intactos.
 */
export function url(pathname = '/'): string {
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const suffix = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (suffix === '/') return `${base}/`;

  const isFile = /\.[a-z0-9]{2,5}$/i.test(suffix.split('#')[0].split('?')[0]);
  return isFile || suffix.endsWith('/') ? `${base}${suffix}` : `${base}${suffix}/`;
}

/** Igual que `url`, pero para assets ya prefijados con `/media/...`. */
export const asset = url;

export const nav = [
  { href: '/', label: 'Inicio' },
  { href: '/obras', label: 'Obras' },
  { href: '/personajes', label: 'Personajes' },
  { href: '/episodios', label: 'Episodios' },
  { href: '/lineas-de-mundo', label: 'Líneas de mundo' },
  { href: '/glosario', label: 'Glosario' },
  { href: '/buscar', label: 'Buscar' },
] as const;

/** Marca la pestaña activa comparando rutas ya normalizadas. */
export function isActive(currentPath: string, href: string): boolean {
  const target = url(href);
  const current = currentPath.replace(/\/+$/, '') || '/';
  const normalized = target.replace(/\/+$/, '') || '/';
  if (normalized === url('/').replace(/\/+$/, '')) return current === normalized;
  return current === normalized || current.startsWith(`${normalized}/`);
}
