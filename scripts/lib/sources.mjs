/**
 * Clientes de las APIs publicas que alimentan la enciclopedia.
 *
 *  - AniList (GraphQL, sin API key) → catalogo, personajes, staff, portadas y banners.
 *  - Kitsu   (JSON:API, sin API key) → episodios con sinopsis, fecha de emision y miniatura.
 */

import { createLimiter, fetchWithRetry } from './http.mjs';

const ANILIST_ENDPOINT = 'https://graphql.anilist.co';
const KITSU_ENDPOINT = 'https://kitsu.io/api/edge';

// AniList permite 90 req/min (30 en modo degradado). Vamos holgados.
const anilistLimiter = createLimiter(900);
const kitsuLimiter = createLimiter(400);

/** Ejecuta una consulta GraphQL contra AniList. */
export async function anilist(query, variables = {}, label = 'anilist') {
  return anilistLimiter(async () => {
    const response = await fetchWithRetry(ANILIST_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query, variables }),
      label,
    });

    const payload = await response.json();
    if (payload.errors?.length) {
      throw new Error(`AniList (${label}): ${payload.errors.map((e) => e.message).join('; ')}`);
    }
    return payload.data;
  });
}

/** GET contra Kitsu con paginacion manual. */
export async function kitsu(path, params = {}, label = 'kitsu') {
  const url = new URL(`${KITSU_ENDPOINT}/${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  return kitsuLimiter(async () => {
    const response = await fetchWithRetry(url.toString(), {
      headers: { Accept: 'application/vnd.api+json' },
      label,
    });
    return response.json();
  });
}

/** Recorre todas las paginas de una coleccion de Kitsu. */
export async function kitsuAll(path, params = {}, label = 'kitsu') {
  const collected = [];
  const limit = 20;

  for (let offset = 0; offset < 500; offset += limit) {
    const page = await kitsu(
      path,
      { ...params, 'page[limit]': limit, 'page[offset]': offset },
      `${label} +${offset}`,
    );
    const rows = page.data ?? [];
    collected.push(...rows);
    if (rows.length < limit || collected.length >= (page.meta?.count ?? Infinity)) break;
  }

  return collected;
}

/* ─────────────────────────  Consultas GraphQL  ───────────────────────── */

export const MEDIA_QUERY = `
query ($search: String, $page: Int) {
  Page(page: $page, perPage: 50) {
    pageInfo { hasNextPage }
    media(search: $search, sort: START_DATE) {
      id idMal type format status episodes chapters volumes duration
      title { romaji english native }
      synonyms
      description(asHtml: false)
      startDate { year month day }
      endDate { year month day }
      season seasonYear
      averageScore meanScore popularity favourites
      genres source countryOfOrigin isAdult
      studios(isMain: true) { nodes { id name } }
      trailer { id site thumbnail }
      coverImage { extraLarge large color }
      bannerImage
      siteUrl
      streamingEpisodes { title thumbnail site url }
      relations {
        edges {
          relationType(version: 2)
          node { id type format title { romaji english } }
        }
      }
    }
  }
}`;

export const CHARACTERS_QUERY = `
query ($id: Int, $page: Int) {
  Media(id: $id) {
    characters(sort: [ROLE, RELEVANCE], page: $page, perPage: 25) {
      pageInfo { hasNextPage }
      edges {
        role
        voiceActors(language: JAPANESE, sort: RELEVANCE) {
          id
          name { full native }
          image { large }
          siteUrl
        }
        node {
          id gender age bloodType favourites siteUrl
          name { full native alternative }
          image { large }
          dateOfBirth { month day }
          description(asHtml: false)
        }
      }
    }
  }
}`;

export const STAFF_QUERY = `
query ($id: Int) {
  Media(id: $id) {
    staff(sort: RELEVANCE, perPage: 20) {
      edges {
        role
        node {
          id siteUrl
          name { full native }
          image { large }
          primaryOccupations
        }
      }
    }
  }
}`;
