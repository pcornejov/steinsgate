#!/usr/bin/env node
/**
 * Pipeline de datos de la enciclopedia.
 *
 * Consulta las APIs publicas, normaliza el resultado y lo deja versionado en
 * src/data/*.json junto con las imagenes en public/media/. El sitio se compila
 * contra esos archivos, de modo que un build nunca depende de que las APIs esten
 * arriba: si una fuente falla, se conserva el snapshot anterior.
 *
 *   npm run data
 */

import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { downloadImage, slugify } from './lib/assets.mjs';
import { CHARACTERS_QUERY, MEDIA_QUERY, STAFF_QUERY, anilist, kitsuAll } from './lib/sources.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const PUBLIC_DIR = path.join(ROOT, 'public');

/** Entradas de anime de las que sacamos personajes y episodios. */
const ANIME_WITH_CAST = [9253, 21127, 11577, 10863, 21624, 104174, 20907];

/** Mapeo AniList → Kitsu para el catalogo de episodios. */
const KITSU_IDS = {
  9253: '5646', // Steins;Gate
  21127: '10788', // Steins;Gate 0
  11577: '6539', // Fuka Ryouiki no Deja vu (pelicula)
};

const stats = { downloaded: 0, cached: 0, failed: 0 };
const ctx = { publicDir: PUBLIC_DIR, stats };

/* ───────────────────────────  helpers  ─────────────────────────── */

/** Limpia el markup ligero que AniList mete en las descripciones. */
function cleanDescription(raw) {
  if (!raw) return null;
  return raw
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/~!|!~/g, '') // marcadores de spoiler de AniList
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // enlaces markdown → texto
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim() || null;
}

function toISODate(date) {
  if (!date?.year) return null;
  const month = String(date.month ?? 1).padStart(2, '0');
  const day = String(date.day ?? 1).padStart(2, '0');
  return `${date.year}-${month}-${day}`;
}

/** Escribe JSON estable (claves ordenadas donde importa) para diffs limpios. */
async function writeJSON(name, value) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(path.join(DATA_DIR, name), `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  const count = Array.isArray(value) ? value.length : Object.keys(value).length;
  console.log(`   ✓ src/data/${name} (${count} entradas)`);
}

/** Devuelve el snapshot previo si existe, para degradar con gracia. */
async function readPrevious(name) {
  const file = path.join(DATA_DIR, name);
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch {
    return null;
  }
}

/**
 * Ejecuta un paso del pipeline. Si falla y hay snapshot previo, lo reutiliza
 * en vez de dejar el sitio sin datos.
 */
async function step(label, file, run) {
  console.log(`\n▶ ${label}`);
  try {
    const result = await run();
    await writeJSON(file, result);
    return { ok: true, result };
  } catch (error) {
    console.error(`   ✗ ${label} fallo: ${error.message}`);
    const previous = await readPrevious(file);
    if (previous) {
      console.log(`   ↩ se conserva el snapshot previo de ${file}`);
      return { ok: false, result: previous };
    }
    throw new Error(`${label} fallo y no hay snapshot previo de ${file}`);
  }
}

/* ───────────────────────────  pasos  ─────────────────────────── */

async function fetchMedia() {
  const collected = new Map();

  for (const term of ['Steins;Gate', 'Steins Gate']) {
    for (let page = 1; page <= 3; page++) {
      const data = await anilist(MEDIA_QUERY, { search: term, page }, `media "${term}" p${page}`);
      for (const item of data.Page.media) {
        if (!collected.has(item.id)) collected.set(item.id, item);
      }
      if (!data.Page.pageInfo.hasNextPage) break;
    }
  }

  console.log(`   · ${collected.size} entradas encontradas en AniList`);

  const media = [];
  for (const item of collected.values()) {
    const title = item.title.english || item.title.romaji || item.title.native;
    const slug = slugify(`${title}-${item.id}`);

    media.push({
      id: item.id,
      malId: item.idMal ?? null,
      slug,
      type: item.type,
      format: item.format,
      status: item.status,
      title: {
        romaji: item.title.romaji,
        english: item.title.english,
        native: item.title.native,
        display: title,
      },
      synonyms: item.synonyms ?? [],
      description: cleanDescription(item.description),
      episodes: item.episodes ?? null,
      chapters: item.chapters ?? null,
      volumes: item.volumes ?? null,
      duration: item.duration ?? null,
      startDate: toISODate(item.startDate),
      endDate: toISODate(item.endDate),
      season: item.season ?? null,
      seasonYear: item.seasonYear ?? null,
      averageScore: item.averageScore ?? null,
      popularity: item.popularity ?? null,
      favourites: item.favourites ?? null,
      genres: item.genres ?? [],
      source: item.source ?? null,
      studios: item.studios?.nodes?.map((s) => s.name) ?? [],
      trailer:
        item.trailer?.site === 'youtube' && item.trailer.id
          ? { youtubeId: item.trailer.id }
          : null,
      accentColor: item.coverImage?.color ?? null,
      cover: await downloadImage(item.coverImage?.extraLarge, 'covers', slug, ctx),
      banner: await downloadImage(item.bannerImage, 'banners', slug, ctx),
      siteUrl: item.siteUrl,
      relations: (item.relations?.edges ?? [])
        .filter((edge) => edge.node && collected.has(edge.node.id))
        .map((edge) => ({ id: edge.node.id, relationType: edge.relationType })),
    });
  }

  media.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'ANIME' ? -1 : 1;
    return (a.startDate ?? '9999').localeCompare(b.startDate ?? '9999');
  });

  return media;
}

async function fetchCharacters() {
  const byId = new Map();

  for (const mediaId of ANIME_WITH_CAST) {
    for (let page = 1; page <= 5; page++) {
      let data;
      try {
        data = await anilist(CHARACTERS_QUERY, { id: mediaId, page }, `cast ${mediaId} p${page}`);
      } catch (error) {
        console.warn(`   ⚠ cast de ${mediaId} p${page}: ${error.message}`);
        break;
      }

      const block = data.Media?.characters;
      if (!block) break;

      for (const edge of block.edges) {
        const node = edge.node;
        const existing = byId.get(node.id);
        if (existing) {
          existing.appearsIn.push(mediaId);
          // MAIN gana sobre SUPPORTING si aparece como principal en cualquier entrega.
          if (edge.role === 'MAIN') existing.role = 'MAIN';
          continue;
        }

        byId.set(node.id, {
          id: node.id,
          slug: slugify(`${node.name.full}-${node.id}`),
          name: {
            full: node.name.full,
            native: node.name.native,
            alternative: (node.name.alternative ?? []).filter(Boolean),
          },
          role: edge.role,
          gender: node.gender ?? null,
          age: node.age ?? null,
          bloodType: node.bloodType ?? null,
          birthday:
            node.dateOfBirth?.month && node.dateOfBirth?.day
              ? { month: node.dateOfBirth.month, day: node.dateOfBirth.day }
              : null,
          favourites: node.favourites ?? 0,
          description: cleanDescription(node.description),
          image: null, // se rellena mas abajo
          rawImage: node.image?.large ?? null,
          // AniList expone los seiyuu en el edge (relacion personaje↔obra), no en el nodo.
          voiceActors: (edge.voiceActors ?? []).slice(0, 2).map((va) => ({
            id: va.id,
            name: va.name.full,
            native: va.name.native,
            rawImage: va.image?.large ?? null,
            siteUrl: va.siteUrl,
          })),
          siteUrl: node.siteUrl,
          appearsIn: [mediaId],
        });
      }

      if (!block.pageInfo.hasNextPage) break;
    }
  }

  console.log(`   · ${byId.size} personajes unicos`);

  // Descarga de retratos (personajes y seiyuu) una vez consolidada la lista.
  const characters = [...byId.values()];
  for (const character of characters) {
    character.image = await downloadImage(character.rawImage, 'characters', character.slug, ctx);
    delete character.rawImage;

    for (const va of character.voiceActors) {
      va.image = await downloadImage(va.rawImage, 'staff', slugify(`${va.name}-${va.id}`), ctx);
      delete va.rawImage;
    }
  }

  characters.sort((a, b) => {
    if (a.role !== b.role) return a.role === 'MAIN' ? -1 : 1;
    return b.favourites - a.favourites;
  });

  return characters;
}

async function fetchStaff() {
  const byId = new Map();

  for (const mediaId of [9253, 21127]) {
    let data;
    try {
      data = await anilist(STAFF_QUERY, { id: mediaId }, `staff ${mediaId}`);
    } catch (error) {
      console.warn(`   ⚠ staff de ${mediaId}: ${error.message}`);
      continue;
    }

    for (const edge of data.Media?.staff?.edges ?? []) {
      const node = edge.node;
      const existing = byId.get(node.id);
      if (existing) {
        if (!existing.roles.includes(edge.role)) existing.roles.push(edge.role);
        if (!existing.worksOn.includes(mediaId)) existing.worksOn.push(mediaId);
        continue;
      }
      byId.set(node.id, {
        id: node.id,
        name: node.name.full,
        native: node.name.native,
        roles: [edge.role],
        occupations: node.primaryOccupations ?? [],
        rawImage: node.image?.large ?? null,
        image: null,
        siteUrl: node.siteUrl,
        worksOn: [mediaId],
      });
    }
  }

  const staff = [...byId.values()];
  for (const person of staff) {
    person.image = await downloadImage(person.rawImage, 'staff', slugify(`${person.name}-${person.id}`), ctx);
    delete person.rawImage;
  }

  console.log(`   · ${staff.length} miembros del staff`);
  return staff;
}

async function fetchEpisodes() {
  const episodes = {};

  for (const [anilistId, kitsuId] of Object.entries(KITSU_IDS)) {
    let rows = [];
    try {
      rows = await kitsuAll(`anime/${kitsuId}/episodes`, {}, `episodios kitsu ${kitsuId}`);
    } catch (error) {
      console.warn(`   ⚠ episodios de ${anilistId}: ${error.message}`);
      continue;
    }

    const list = [];
    for (const row of rows) {
      const attributes = row.attributes ?? {};
      const number = attributes.number ?? attributes.relativeNumber;
      if (!number) continue;

      const title =
        attributes.canonicalTitle ||
        attributes.titles?.en ||
        attributes.titles?.en_jp ||
        `Episodio ${number}`;

      list.push({
        number,
        title,
        titleJa: attributes.titles?.ja_jp ?? null,
        synopsis: cleanDescription(attributes.synopsis),
        airdate: attributes.airdate ?? null,
        runtime: attributes.length ?? null,
        thumbnail: await downloadImage(
          attributes.thumbnail?.original,
          'episodes',
          `${anilistId}-ep${String(number).padStart(2, '0')}`,
          ctx,
        ),
      });
    }

    list.sort((a, b) => a.number - b.number);
    if (list.length) {
      episodes[anilistId] = list;
      console.log(`   · ${list.length} episodios para AniList #${anilistId}`);
    }
  }

  if (!Object.keys(episodes).length) throw new Error('ninguna serie devolvio episodios');
  return episodes;
}

/* ───────────────────────────  main  ─────────────────────────── */

async function main() {
  console.log('Enciclopedia Steins;Gate — sincronizacion de datos');
  console.log('Fuentes: AniList GraphQL · Kitsu JSON:API\n');
  const startedAt = Date.now();

  const media = await step('Catalogo de obras (AniList)', 'media.json', fetchMedia);
  const characters = await step('Personajes y seiyuu (AniList)', 'characters.json', fetchCharacters);
  const staff = await step('Staff de produccion (AniList)', 'staff.json', fetchStaff);
  const episodes = await step('Episodios (Kitsu)', 'episodes.json', fetchEpisodes);

  const episodeCount = Object.values(episodes.result).reduce((sum, list) => sum + list.length, 0);

  await writeJSON('meta.json', {
    generatedAt: new Date().toISOString(),
    sources: [
      { name: 'AniList', url: 'https://anilist.co', api: 'https://graphql.anilist.co', license: 'API publica sin clave' },
      { name: 'Kitsu', url: 'https://kitsu.app', api: 'https://kitsu.io/api/edge', license: 'API publica sin clave' },
    ],
    counts: {
      media: media.result.length,
      anime: media.result.filter((m) => m.type === 'ANIME').length,
      manga: media.result.filter((m) => m.type === 'MANGA').length,
      characters: characters.result.length,
      staff: staff.result.length,
      episodes: episodeCount,
    },
    degraded: [media, characters, staff, episodes].some((s) => !s.ok),
  });

  console.log(
    `\n✔ Listo en ${((Date.now() - startedAt) / 1000).toFixed(1)}s — ` +
      `imagenes: ${stats.downloaded} nuevas, ${stats.cached} en cache, ${stats.failed} fallidas`,
  );
}

main().catch((error) => {
  console.error(`\n✗ El pipeline fallo: ${error.message}`);
  process.exitCode = 1;
});
