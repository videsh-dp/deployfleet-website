import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set SITE_URL at build time if the marketing site lives on a different domain.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://www.deployfleet.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
