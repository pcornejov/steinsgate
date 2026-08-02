// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Sitio de proyecto en GitHub Pages: https://pcornejov.github.io/steinsgate
export default defineConfig({
  site: 'https://pcornejov.github.io',
  base: '/steinsgate',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],

  // Las fuentes se descargan y auto-hospedan en build: el sitio publicado no
  // hace ninguna peticion a Google Fonts.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Rajdhani',
      cssVariable: '--font-display-src',
      weights: [500, 600, 700],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono-src',
      weights: [400, 500, 700],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-sans-src',
      weights: [400, 500, 600, 700],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
