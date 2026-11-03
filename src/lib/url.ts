// Prefix root-relative paths with the configured base path (e.g. "/deployfleet-website" on GitHub Pages).
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (path: string) => (path.startsWith('/') ? `${BASE}${path}` : path);
