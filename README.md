# DeployFleet marketing site

Static, SEO-focused marketing website for [DeployFleet](https://www.deployfleet.com), built with [Astro](https://astro.build). Outputs plain HTML/CSS with almost no JavaScript, so pages load fast and are easy for search engines to crawl.

## Pages

| URL | Source |
| --- | --- |
| `/` | `src/pages/index.astro` |
| `/about/` | `src/pages/about.astro` |
| `/how-it-works/` (`#providers`, `#technicians`) | `src/pages/how-it-works.astro` |
| `/services/` | `src/pages/services/index.astro` |
| `/services/<slug>/` (10 pages) | `src/pages/services/[slug].astro` + `src/data/services.ts` |
| `/contact/` | `src/pages/contact.astro` |

## Editing content

- **Site settings, phone, email, app links, nav, step text:** `src/data/site.ts`
- **Services (cards, per-service pages, FAQs):** `src/data/services.ts`. Add an entry and a new page is generated automatically.
- **Colors / fonts:** `src/styles/global.css` (`:root` tokens mirror `apps/ui/src/lib/utils/theme/colors.ts` in the app repo: `#0099FF` primary, `#5442F5` secondary, Euclid Circular B).
- **Images:** `public/img/`. Social preview image: `public/og-image.png` (1200×630).

### Placeholders to replace before launch

Search for `PLACEHOLDER` in `src/`:
- Hero stats (25+, 95%, 750+) and the "5k+ happy clients" figure come from the mockup.
- Phone number `+1 (123) 456 7890` and `support@deployfleet.com`.
- "Your brand" slots in the blue strip (`brandSlots` in `src/pages/index.astro`): swap for customer logos.

### Adding videos

Use the `VideoEmbed` component. It shows a thumbnail and only loads YouTube when clicked (keeps pages fast), and outputs `VideoObject` structured data so videos can appear in Google video results:

```astro
<VideoEmbed
  youtubeId="dQw4w9WgXcQ"
  title="DeployFleet in 90 seconds"
  description="How providers post, match, track and close out jobs."
  uploadDate="2026-11-15"
  duration="PT1M30S"
/>
```

Placeholders are already on the Home and How It Works pages.

## SEO built in

- Unique `<title>`, meta description and canonical URL per page
- Open Graph + Twitter card tags
- JSON-LD: Organization, WebSite, BreadcrumbList, Service, OfferCatalog, ItemList, HowTo, FAQPage, VideoObject
- `sitemap-index.xml` (auto-generated) and `robots.txt`
- Semantic HTML, one `h1` per page, descriptive alt text, accessible nav and tabs
- Self-hosted fonts with `font-display: swap`, lazy-loaded images, click-to-load video

## Develop

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview
```

Set `SITE_URL` at build time if the site is served from a different domain (default `https://www.deployfleet.com`), and update the `Sitemap:` line in `public/robots.txt` to match.

## Deploy

`dist/` is a plain static folder: deploy to Firebase Hosting, Netlify, Vercel, Cloudflare Pages, or S3. Note: if this site takes over `deployfleet.com`, the web app needs its own host (e.g. `app.deployfleet.com`) and `appUrl` in `src/data/site.ts` should point there.
