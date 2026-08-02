/** Acceso tipado al snapshot de datos + helpers de presentacion en espanol. */

import charactersJson from '../data/characters.json';
import episodesJson from '../data/episodes.json';
import mediaJson from '../data/media.json';
import metaJson from '../data/meta.json';
import staffJson from '../data/staff.json';

import type { Character, DataMeta, Episode, Media, StaffMember } from './types';

export const media = mediaJson as Media[];
export const characters = charactersJson as Character[];
export const staff = staffJson as StaffMember[];
export const episodesByMedia = episodesJson as Record<string, Episode[]>;
export const meta = metaJson as DataMeta;

export const anime = media.filter((m) => m.type === 'ANIME');
export const manga = media.filter((m) => m.type === 'MANGA');

/** Entrada principal: la serie de 2011. */
export const FLAGSHIP_ID = 9253;

export function getMedia(id: number): Media | undefined {
  return media.find((m) => m.id === id);
}

export function getMediaBySlug(slug: string): Media | undefined {
  return media.find((m) => m.slug === slug);
}

export function getCharacter(slug: string): Character | undefined {
  return characters.find((c) => c.slug === slug);
}

export function getEpisodes(mediaId: number): Episode[] {
  return episodesByMedia[String(mediaId)] ?? [];
}

/** Obras que tienen guia de episodios publicada. */
export const mediaWithEpisodes = anime
  .filter((m) => getEpisodes(m.id).length > 0)
  .sort((a, b) => (a.startDate ?? '').localeCompare(b.startDate ?? ''));

export function charactersOf(mediaId: number): Character[] {
  return characters.filter((c) => c.appearsIn.includes(mediaId));
}

export function staffOf(mediaId: number): StaffMember[] {
  return staff.filter((s) => s.worksOn.includes(mediaId));
}

/* ─────────────────────  Etiquetas en espanol  ───────────────────── */

const FORMAT_LABELS: Record<string, string> = {
  TV: 'Serie de TV',
  TV_SHORT: 'Serie corta',
  MOVIE: 'Película',
  SPECIAL: 'Especial',
  OVA: 'OVA',
  ONA: 'ONA',
  MUSIC: 'Vídeo musical',
  MANGA: 'Manga',
  NOVEL: 'Novela ligera',
  ONE_SHOT: 'One-shot',
};

const STATUS_LABELS: Record<string, string> = {
  FINISHED: 'Finalizado',
  RELEASING: 'En emisión',
  NOT_YET_RELEASED: 'Sin estrenar',
  CANCELLED: 'Cancelado',
  HIATUS: 'En pausa',
};

const SOURCE_LABELS: Record<string, string> = {
  ORIGINAL: 'Obra original',
  MANGA: 'Manga',
  LIGHT_NOVEL: 'Novela ligera',
  VISUAL_NOVEL: 'Novela visual',
  VIDEO_GAME: 'Videojuego',
  NOVEL: 'Novela',
  OTHER: 'Otra',
};

const SEASON_LABELS: Record<string, string> = {
  WINTER: 'Invierno',
  SPRING: 'Primavera',
  SUMMER: 'Verano',
  FALL: 'Otoño',
};

const RELATION_LABELS: Record<string, string> = {
  ADAPTATION: 'Adaptación',
  PREQUEL: 'Precuela',
  SEQUEL: 'Secuela',
  PARENT: 'Obra principal',
  SIDE_STORY: 'Historia paralela',
  CHARACTER: 'Comparte personajes',
  SUMMARY: 'Resumen',
  ALTERNATIVE: 'Versión alternativa',
  SPIN_OFF: 'Spin-off',
  OTHER: 'Relacionada',
  SOURCE: 'Obra de origen',
  COMPILATION: 'Recopilación',
  CONTAINS: 'Contiene',
};

const GENRE_LABELS: Record<string, string> = {
  Action: 'Acción',
  Adventure: 'Aventura',
  Comedy: 'Comedia',
  Drama: 'Drama',
  'Sci-Fi': 'Ciencia ficción',
  Mystery: 'Misterio',
  Psychological: 'Psicológico',
  Romance: 'Romance',
  Thriller: 'Thriller',
  Supernatural: 'Sobrenatural',
  Slice_of_Life: 'Recuentos de la vida',
  'Slice of Life': 'Recuentos de la vida',
  Ecchi: 'Ecchi',
  Fantasy: 'Fantasía',
  Horror: 'Terror',
};

const ROLE_LABELS: Record<string, string> = {
  Director: 'Dirección',
  'Series Composition': 'Composición de la serie',
  'Character Design': 'Diseño de personajes',
  Music: 'Música',
  'Original Creator': 'Obra original',
  'Sound Director': 'Dirección de sonido',
  'Art Director': 'Dirección artística',
  'Chief Animation Director': 'Dirección jefe de animación',
  'Animation Director': 'Dirección de animación',
  Producer: 'Producción',
  Storyboard: 'Storyboard',
  'Episode Director': 'Dirección de episodio',
  'Director of Photography': 'Dirección de fotografía',
  Script: 'Guion',
  'Theme Song Performance': 'Interpretación del tema',
  'Theme Song Composition': 'Composición del tema',
  'Theme Song Lyrics': 'Letra del tema',
  'Theme Song Arrangement': 'Arreglos del tema',
  'Color Design': 'Diseño de color',
  Editing: 'Montaje',
  '2nd Key Animation': 'Segunda animación clave',
  'Key Animation': 'Animación clave',
  'Assistant Producer': 'Producción asistente',
  'Background Art': 'Fondos',
  'In-Between Animation': 'Intercalación',
  'Mechanical Design': 'Diseño mecánico',
  Setting: 'Ambientación',
};

export const label = {
  format: (value: string | null) => (value ? (FORMAT_LABELS[value] ?? value) : 'Obra'),
  status: (value: string | null) => (value ? (STATUS_LABELS[value] ?? value) : '—'),
  source: (value: string | null) => (value ? (SOURCE_LABELS[value] ?? value) : '—'),
  season: (value: string | null) => (value ? (SEASON_LABELS[value] ?? value) : ''),
  relation: (value: string) => RELATION_LABELS[value] ?? value,
  genre: (value: string) => GENRE_LABELS[value] ?? value,
  staffRole: (value: string) => ROLE_LABELS[value] ?? value,
};

/* ─────────────────────  Formateadores  ───────────────────── */

const MONTHS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

/** '2011-04-06' → '6 de abril de 2011'. Evita `new Date` para no sufrir husos horarios. */
export function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const [year, month, day] = iso.split('-').map(Number);
  if (!year) return '—';
  if (!month || !day) return String(year);
  return `${day} de ${MONTHS[month - 1]} de ${year}`;
}

export function formatYearRange(item: Media): string {
  const start = item.startDate?.slice(0, 4);
  const end = item.endDate?.slice(0, 4);
  if (!start) return '—';
  if (!end || end === start) return start;
  return `${start}–${end}`;
}

export function formatBirthday(birthday: { month: number; day: number } | null): string | null {
  if (!birthday) return null;
  return `${birthday.day} de ${MONTHS[birthday.month - 1]}`;
}

export function formatNumber(value: number | null | undefined): string {
  if (value == null) return '—';
  return value.toLocaleString('es-ES');
}

/** Corta un texto en el limite de palabra mas cercano. */
export function truncate(text: string | null, max: number): string {
  if (!text) return '';
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, flat.lastIndexOf(' ', max))}…`;
}
