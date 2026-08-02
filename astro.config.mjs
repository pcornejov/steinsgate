// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Sitio de proyecto en GitHub Pages: https://pcornejov.github.io/steinsgate
export default defineConfig({
  site: 'https://pcornejov.github.io',
  base: '/steinsgate',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
