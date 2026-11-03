import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

// Generated so the sitemap URL follows SITE_URL / BASE_PATH.
export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap-index.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
