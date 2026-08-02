#!/usr/bin/env node
/**
 * Valida el sitio ya compilado en dist/.
 *
 * Comprueba, sobre el HTML real que se va a publicar:
 *   1. que existan las paginas esperadas y ninguna este vacia
 *   2. que todos los enlaces internos apunten a una pagina que existe
 *   3. que todas las imagenes y assets referenciados existan en disco
 *   4. que cada pagina tenga title, description, canonical y un unico <h1>
 *   5. que las rutas respeten el base path de GitHub Pages
 *   6. que el snapshot de datos este completo y sin huecos
 *
 *   npm run validate
 */

import { existsSync, readFileSync, statSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const BASE = '/steinsgate';

const errors = [];
const warnings = [];
const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);

/* ─────────────────────────  utilidades  ───────────────────────── */

async function walk(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(full)));
    else found.push(full);
  }
  return found;
}

/** dist/obras/x/index.html → /steinsgate/obras/x */
function routeOf(file) {
  const rel = path.relative(DIST, file).replace(/\\/g, '/');
  const withoutIndex = rel.replace(/(^|\/)index\.html$/, '');
  return `${BASE}/${withoutIndex}`.replace(/\/+$/, '') || BASE;
}

const attr = (html, regex) => [...html.matchAll(regex)].map((m) => m[1]);

/* ─────────────────────────  comprobaciones  ───────────────────────── */

function checkData() {
  const required = ['media.json', 'characters.json', 'episodes.json', 'staff.json', 'meta.json'];
  for (const file of required) {
    if (!existsSync(path.join(DATA_DIR, file))) {
      fail(`datos: falta src/data/${file} — ejecuta \`npm run data\``);
    }
  }
  if (errors.length) return null;

  const read = (file) => JSON.parse(readFileSync(path.join(DATA_DIR, file), 'utf8'));
  const media = read('media.json');
  const characters = read('characters.json');
  const episodes = read('episodes.json');
  const meta = read('meta.json');

  if (media.length < 20) fail(`datos: solo ${media.length} obras (se esperaban 20 o mas)`);
  if (characters.length < 15) fail(`datos: solo ${characters.length} personajes`);

  const episodeCount = Object.values(episodes).reduce((sum, list) => sum + list.length, 0);
  if (episodeCount < 40) fail(`datos: solo ${episodeCount} episodios (se esperaban 40 o mas)`);

  // Integridad campo a campo.
  for (const item of media) {
    if (!item.slug) fail(`datos: obra ${item.id} sin slug`);
    if (!item.title?.display) fail(`datos: obra ${item.id} sin titulo`);
    if (!item.cover) warn(`datos: obra "${item.title?.display}" sin portada`);
  }
  for (const character of characters) {
    if (!character.image) warn(`datos: personaje "${character.name?.full}" sin retrato`);
    if (!character.voiceActors?.length) warn(`datos: personaje "${character.name?.full}" sin seiyuu`);
  }

  const slugs = media.map((m) => m.slug);
  const duplicated = slugs.filter((slug, i) => slugs.indexOf(slug) !== i);
  if (duplicated.length) fail(`datos: slugs de obra duplicados: ${[...new Set(duplicated)].join(', ')}`);

  if (meta.degraded) warn('datos: el ultimo `npm run data` degrado a un snapshot previo');

  return { media, characters, episodes, meta, episodeCount };
}

async function checkSite(data) {
  if (!existsSync(DIST)) {
    fail('sitio: no existe dist/ — ejecuta `npm run build`');
    return;
  }

  const files = await walk(DIST);
  const pages = files.filter((file) => file.endsWith('.html'));

  if (!pages.length) {
    fail('sitio: dist/ no contiene ninguna pagina HTML');
    return;
  }

  const routes = new Set(pages.map(routeOf));

  // Rutas que deben existir si.o.si.
  const expected = [
    BASE,
    `${BASE}/obras`,
    `${BASE}/personajes`,
    `${BASE}/episodios`,
    `${BASE}/lineas-de-mundo`,
    `${BASE}/glosario`,
    `${BASE}/buscar`,
    `${BASE}/creditos`,
    ...data.media.map((item) => `${BASE}/obras/${item.slug}`),
    ...data.characters.map((character) => `${BASE}/personajes/${character.slug}`),
  ];

  for (const route of expected) {
    if (!routes.has(route)) fail(`ruta ausente: ${route}`);
  }

  let checkedLinks = 0;
  let checkedAssets = 0;

  for (const file of pages) {
    const route = routeOf(file);
    const html = readFileSync(file, 'utf8');

    // El contenido de <script> y <style> lleva plantillas y URLs generadas en
    // tiempo de ejecucion; escanearlo produce falsos positivos.
    const markup = html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');

    if (html.length < 800) fail(`${route}: la pagina esta practicamente vacia (${html.length} bytes)`);

    /* — metadatos — */
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
    if (!title) fail(`${route}: sin <title>`);

    const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1]?.trim();
    if (!description) fail(`${route}: sin meta description`);
    else if (description.length < 50) warn(`${route}: meta description muy corta (${description.length})`);

    if (!/<link rel="canonical"/.test(html)) fail(`${route}: sin canonical`);
    if (!/<html lang="es"/.test(html)) fail(`${route}: falta lang="es"`);

    const h1 = [...html.matchAll(/<h1[\s>]/g)].length;
    if (h1 === 0) fail(`${route}: sin <h1>`);
    if (h1 > 1) fail(`${route}: ${h1} elementos <h1> (debe haber exactamente uno)`);

    /* — imagenes sin alt — */
    for (const tag of markup.match(/<img\b[^>]*>/g) ?? []) {
      if (!/\balt=/.test(tag)) fail(`${route}: <img> sin atributo alt`);
    }

    /* — enlaces internos — */
    for (const href of attr(markup, /href="([^"]+)"/g)) {
      if (/^(https?:|mailto:|tel:|data:|#)/.test(href)) continue;

      if (!href.startsWith(`${BASE}/`) && href !== BASE) {
        fail(`${route}: enlace sin base path → ${href}`);
        continue;
      }

      const clean = href.split('#')[0].split('?')[0].replace(/\/+$/, '') || BASE;

      // Puede ser una pagina o un fichero suelto (sitemap, favicon…).
      const asFile = path.join(DIST, clean.slice(BASE.length));
      if (routes.has(clean) || existsSync(asFile)) {
        checkedLinks++;
        continue;
      }
      fail(`${route}: enlace roto → ${href}`);
    }

    /* — assets (imagenes, css, js, fuentes) — */
    const assets = [
      ...attr(markup, /<img[^>]+src="([^"]+)"/g),
      ...attr(markup, /<link[^>]+href="([^"]+\.(?:css|woff2?|svg))"/g),
      // Los <script src> son referencias reales aunque el cuerpo se haya eliminado.
      ...attr(html, /<script[^>]+src="([^"]+)"/g),
    ];

    for (const src of assets) {
      if (/^(https?:|data:)/.test(src)) continue;
      if (!src.startsWith(`${BASE}/`)) {
        fail(`${route}: asset sin base path → ${src}`);
        continue;
      }
      const onDisk = path.join(DIST, src.slice(BASE.length).split('?')[0]);
      if (!existsSync(onDisk)) {
        fail(`${route}: asset inexistente → ${src}`);
        continue;
      }
      if (statSync(onDisk).size === 0) fail(`${route}: asset vacio → ${src}`);
      checkedAssets++;
    }
  }

  /* — GitHub Pages: .nojekyll evita que se ignoren los directorios con guion bajo — */
  if (!existsSync(path.join(DIST, '.nojekyll'))) {
    fail('sitio: falta dist/.nojekyll (GitHub Pages ignoraria _astro/)');
  }

  if (!existsSync(path.join(DIST, 'sitemap-index.xml'))) warn('sitio: no se genero sitemap');

  console.log(
    `   paginas: ${pages.length} · enlaces internos: ${checkedLinks} · assets: ${checkedAssets}`,
  );
}

/* ─────────────────────────  main  ───────────────────────── */

console.log('Validacion de la enciclopedia\n');

console.log('▶ Snapshot de datos');
const data = checkData();
if (data) {
  console.log(
    `   obras: ${data.media.length} · personajes: ${data.characters.length} · episodios: ${data.episodeCount}`,
  );
}

if (data) {
  console.log('\n▶ Sitio compilado');
  await checkSite(data);
}

console.log('');
for (const message of warnings) console.log(`  ⚠ ${message}`);
for (const message of errors) console.log(`  ✗ ${message}`);

if (errors.length) {
  console.log(`\n✗ ${errors.length} error(es), ${warnings.length} aviso(s)`);
  process.exit(1);
}

console.log(`\n✔ Todo correcto — ${warnings.length} aviso(s)`);
