/** Formas de los datos normalizados que produce `npm run data`. */

export type MediaType = 'ANIME' | 'MANGA';

export interface MediaTitle {
  romaji: string | null;
  english: string | null;
  native: string | null;
  display: string;
}

export interface MediaRelation {
  id: number;
  relationType: string;
}

export interface Media {
  id: number;
  malId: number | null;
  slug: string;
  type: MediaType;
  format: string | null;
  status: string | null;
  title: MediaTitle;
  synonyms: string[];
  description: string | null;
  episodes: number | null;
  chapters: number | null;
  volumes: number | null;
  duration: number | null;
  startDate: string | null;
  endDate: string | null;
  season: string | null;
  seasonYear: number | null;
  averageScore: number | null;
  popularity: number | null;
  favourites: number | null;
  genres: string[];
  source: string | null;
  studios: string[];
  trailer: { youtubeId: string } | null;
  accentColor: string | null;
  cover: string | null;
  banner: string | null;
  siteUrl: string;
  relations: MediaRelation[];
}

export interface VoiceActor {
  id: number;
  name: string;
  native: string | null;
  image: string | null;
  siteUrl: string;
}

export interface Character {
  id: number;
  slug: string;
  name: { full: string; native: string | null; alternative: string[] };
  role: 'MAIN' | 'SUPPORTING' | 'BACKGROUND';
  gender: string | null;
  age: string | null;
  bloodType: string | null;
  birthday: { month: number; day: number } | null;
  favourites: number;
  description: string | null;
  image: string | null;
  voiceActors: VoiceActor[];
  siteUrl: string;
  appearsIn: number[];
}

export interface StaffMember {
  id: number;
  name: string;
  native: string | null;
  roles: string[];
  occupations: string[];
  image: string | null;
  siteUrl: string;
  worksOn: number[];
}

export interface Episode {
  number: number;
  title: string;
  titleJa: string | null;
  synopsis: string | null;
  airdate: string | null;
  runtime: number | null;
  thumbnail: string | null;
}

export interface DataMeta {
  generatedAt: string;
  sources: { name: string; url: string; api: string; license: string }[];
  counts: {
    media: number;
    anime: number;
    manga: number;
    characters: number;
    staff: number;
    episodes: number;
  };
  degraded: boolean;
}

/* ── Contenido editorial propio (escrito para esta enciclopedia) ── */

export interface GlossaryEntry {
  slug: string;
  term: string;
  reading?: string;
  category: 'ciencia' | 'organizacion' | 'artefacto' | 'concepto' | 'lugar';
  short: string;
  body: string;
  related?: string[];
  spoiler?: boolean;
}

export interface Worldline {
  slug: string;
  name: string;
  divergence: string;
  band: string;
  summary: string;
  detail: string;
  spoiler?: boolean;
}

/** Ficha en espanol escrita a mano, complementaria a los datos de la API. */
export interface CharacterProfile {
  characterId: number;
  alias: string;
  tagline: string;
  bio: string;
  traits: string[];
  spoilerNote?: string;
}
