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
| `/technicians/` | `src/pages/technicians.astro` |
| `/contact/` | `src/pages/contact.astro` |
| `/privacy/`, `/terms/` | `src/pages/privacy.astro`, `src/pages/terms.astro` |

## Editing content

- **Site settings, phone, email, app links, nav, step text:** `src/data/site.ts`
- **Services (cards, per-service pages, FAQs):** `src/data/services.ts`. Add an entry and a new page is generated automatically.
- **Colors / fonts:** `src/styles/global.css` (`:root` tokens mirror `apps/ui/src/lib/utils/theme/colors.ts` in the app repo: `#0099FF` primary, `#5442F5` secondary, Euclid Circular B).
- **Images:** `public/img/`. Social preview image: `public/og-image.png` (1200×630).

### Proof points, testimonials and contact details

In `src/data/site.ts`:
- `PROOF.stats`, `PROOF.brands`, `PROOF.highlight`: hero stats, customer logos and the About figure. Each block stays hidden while empty (the hero shows three feature bullets and the blue strip shows service shortcuts instead).
- `TESTIMONIALS`: real, attributable quotes only. The section appears on Home (all) and `/technicians/` (technician quotes) once it has entries.
- `SITE.phone` / `SITE.phoneHref`: leave empty to hide all phone links.

### Contact form and analytics

The contact form posts JSON to the DeployFleet API at `https://app.deployfleet.com/api/public/contact` (Express server in `videsh-dp/deployfleet`, `apps/server`), which validates it, rate limits it, and emails the team through Resend with reply-to set to the visitor. If the request fails, the form shows an error with the support email address.

Optional GitHub repo **variables** (Settings → Secrets and variables → Actions → Variables); the deploy workflow passes them to the build:
- `CONTACT_ENDPOINT`: a different form endpoint, e.g. a staging API. The API's CORS list must include the site's origin.
- `POSTHOG_KEY`: overrides the PostHog project key set in `src/data/site.ts` (`INTEGRATIONS.posthogKey`, the same project as the app). Page views, page leaves and clicks are captured automatically; contact form sends `contact_form_submitted`. All events carry `site: marketing`.
- `POSTHOG_HOST`: only if the project is not on PostHog US cloud, e.g. `https://eu.i.posthog.com`.

Re-run the "Deploy to GitHub Pages" workflow after changing a variable.

### Legal pages

`/privacy/` and `/terms/` are general-purpose drafts for the marketing site. Have them reviewed before relying on them.

Also confirm `SITE.email` (`support@deployfleet.com`) is a real inbox.

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

Set `SITE_URL` (domain, default `https://www.deployfleet.com`) and `BASE_PATH` (sub-folder, default `/`) at build time. Canonical URLs, the sitemap and `robots.txt` follow them. Always link internal pages with the `u()` helper from `src/lib/url.ts` so the base path is applied.

## Deploy

**GitHub Pages (current):** `.github/workflows/deploy-pages.yml` builds and deploys on every push to `main`, at `https://www.deployfleet.com` (custom domain set in repo Settings → Pages; the apex redirects to www). One-time setup: repo Settings → Pages → Source: **GitHub Actions**. (Pages on a private repo needs a paid GitHub plan; otherwise make the repo public.)

**Elsewhere:** 
`dist/` is a plain static folder: deploy to Firebase Hosting, Netlify, Vercel, Cloudflare Pages, or S3. Note: if this site takes over `deployfleet.com`, the web app needs its own host (e.g. `app.deployfleet.com`) and `appUrl` in `src/data/site.ts` should point there.
