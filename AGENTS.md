# Codex Operating Notes

Codex is the central execution agent for this repository.

## Commands

```bash
npm install --cache .npm-cache
npm run dev -- --hostname 127.0.0.1 --port 3000
npm run build
npm run lint
npm run typecheck
```

## Operating Order

1. Validate permitted data sources and field maps.
2. Apply Supabase schema and RLS policies.
3. Build mobile-first Next.js routes.
4. Seed reviewed listings.
5. Audit performance, sitemap output and structured data.
6. Expand ingestion only with rate limits and source permission checks.

## Required Context

Read these files before broad changes:

- `docs/architecture.md`
- `docs/backlog.md`
- `docs/seo_onpage.md`
- `docs/seo_technical.md`
- `docs/scrapers.md`

## Guardrails

- Use TypeScript strict mode.
- Use server components by default.
- Keep public pages indexable from raw HTML.
- Enable RLS for all public Supabase tables.
- Never expose service-role keys to the browser.
- The ingestion policy is compliance-first: no WAF bypass, CAPTCHA bypass, stealth scraping, or proxy evasion.
