# Future Gadget Archive

Enciclopedia web de **Steins;Gate** en español: obras, personajes, guía de episodios,
líneas de mundo y glosario. Sitio estático construido con Astro y desplegado en
GitHub Pages.

🔗 **https://pcornejov.github.io/steinsgate**

---

## Cómo funciona

Los datos se obtienen de APIs públicas **en tiempo de build**, no en el navegador.
El resultado queda versionado en el repositorio, de modo que:

- el sitio publicado no hace ninguna petición a APIs de terceros,
- no hay problemas de CORS, rate limiting ni claves que gestionar,
- un build es reproducible aunque las APIs estén caídas.

### Fuentes

| Fuente                                     | Qué aporta                                                            |
| ------------------------------------------ | --------------------------------------------------------------------- |
| [AniList](https://graphql.anilist.co) (GraphQL) | Catálogo de obras, personajes, seiyuu, equipo, portadas y banners |
| [Kitsu](https://kitsu.io/api/edge) (JSON:API)   | Episodios: número, título, fecha de emisión, duración y sinopsis  |

Ninguna de las dos requiere clave de API.

### Contenido original

Las APIs aportan hechos, no prosa en español. Todo el texto enciclopédico —glosario,
líneas de mundo, perfiles de personaje— está escrito para este proyecto y vive en
`src/content/`. El material reproducido de la fuente aparece etiquetado como tal y
oculto tras un aviso de spoiler.

---

## Puesta en marcha

```bash
npm install
npm run data     # sincroniza desde las APIs (opcional: el snapshot ya está en el repo)
npm run dev      # servidor de desarrollo
```

### Comandos

| Comando            | Qué hace                                                            |
| ------------------ | ------------------------------------------------------------------- |
| `npm run dev`      | Servidor de desarrollo                                              |
| `npm run data`     | Sincroniza datos e imágenes desde AniList y Kitsu                   |
| `npm run build`    | Compila el sitio estático en `dist/`                                |
| `npm run validate` | Valida el sitio compilado                                           |
| `npm run verify`   | **Tipos + build + validación**: el ciclo completo antes de publicar |

### El validador

`npm run validate` se ejecuta sobre el HTML real que se va a publicar y falla si
encuentra:

- páginas esperadas que no se generaron, o páginas prácticamente vacías,
- enlaces internos rotos o que no respetan el base path de GitHub Pages,
- imágenes, hojas de estilo o fuentes referenciadas que no existen en disco,
- páginas sin `title`, `description`, `canonical`, `lang` o con más de un `<h1>`,
- `<img>` sin atributo `alt`,
- huecos en el snapshot de datos (obras sin portada, personajes sin seiyuu…),
- ausencia de `.nojekyll`, que haría que GitHub Pages ignorase `_astro/`.

El mismo comando corre en CI, así que un despliegue con un enlace roto no sale.

---

## Estructura

```
scripts/
  fetch-data.mjs      Pipeline de datos (reintentos, rate limiting, degradación)
  validate.mjs        Validador del sitio compilado
  lib/                Clientes HTTP, consultas GraphQL y descarga de imágenes
src/
  content/            Contenido editorial propio en español
  data/               Snapshot generado por `npm run data` (versionado)
  lib/                Acceso tipado a los datos y etiquetas en español
  components/         MediaCard, CharacterCard, Spoiler, DivergenceMeter…
  pages/              Rutas del sitio
public/media/         Imágenes descargadas de las APIs (versionadas)
```

## Despliegue

Cada push a `main` dispara `.github/workflows/deploy.yml`, que comprueba tipos,
compila, **valida** y publica en GitHub Pages. Un workflow semanal
(`sync-data.yml`) vuelve a consultar las APIs y confirma los cambios sólo si el
resultado sigue compilando y validando.

Para activarlo en un fork: **Settings → Pages → Source: GitHub Actions**, y ajustar
`site` y `base` en `astro.config.mjs`.

---

## Aviso legal

Proyecto de fans sin ánimo de lucro y sin relación con los titulares de los derechos.
*Steins;Gate* es propiedad de 5pb. y Nitroplus. Las imágenes se reproducen con fines
informativos y pertenecen a sus respectivos autores.

*El Psy Kongroo.*
