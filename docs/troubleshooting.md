# Troubleshooting

## General Protocol

1. Identify the failing subsystem.
2. Reproduce with the smallest input.
3. Check logs and recent changes.
4. Confirm whether the failure is data, code, infrastructure, or policy.
5. Apply the narrowest fix.
6. Add a regression test or monitoring signal when practical.
7. Document the incident in the relevant `docs/` file.

## Ingestion 403

Meaning: the source rejected automated access.

Action:

- Stop automated requests to that source.
- Mark related `crawl_jobs` as `blocked`.
- Do not add stealth, WAF bypass, CAPTCHA solving, or proxy evasion.
- Check whether a public API, partner feed, sitemap permission, or manual workflow exists.
- Preserve the failure reason in `crawl_jobs.last_error`.

SQL:

```sql
update public.crawl_jobs
set status = 'blocked',
    finished_at = now(),
    last_error = 'Source returned 403; automated access stopped.'
where id = :job_id;
```

## Ingestion 429

Meaning: the source is rate limiting.

Action:

- Reduce per-source concurrency to 1.
- Add exponential backoff.
- Reschedule the job.
- Stop if repeated 429s continue.

## Vercel Serverless Timeout

Likely causes:

- Heavy Supabase query.
- Unbounded pagination.
- Image processing in request path.
- Large sitemap generated synchronously.

Fixes:

- Move ingestion and heavy processing to background jobs.
- Add query limits and indexes.
- Use ISR and route segment caching.
- Pre-shard sitemaps.
- Use Cloudflare Workers for image proxying.

## Supabase RLS Errors

Symptoms:

- Queries work locally with service role but fail in browser.
- Empty result sets for public pages.
- `permission denied` errors.

Fixes:

- Confirm RLS is enabled intentionally.
- Check policies for `select` on active public rows.
- Verify browser code uses anon key only.
- Keep writes on server-only code.
- Test policies with representative roles.

## Core Web Vitals Failures

### High LCP

- Compress and resize hero/card images.
- Prioritize the first visible image only when needed.
- Remove render-blocking third-party scripts.
- Use server-rendered content and avoid client-only page shells.
- Check Supabase query latency and cache misses.

### CLS

- Add fixed dimensions or aspect ratios for images and ad slots.
- Avoid inserting VIP cards above existing content after hydration.
- Reserve space for banners and filters.

### Poor INP

- Reduce client JavaScript.
- Debounce search inputs.
- Use server pagination or lightweight infinite loading.
- Avoid expensive client-side sorting on large arrays.

## Sitemap Failures

- Confirm only active indexable URLs are included.
- Shard large URL sets.
- Stream generation or precompute files.
- Validate XML escaping for titles and URLs.
- Check canonical consistency.

## Duplicate Or Thin Pages

- Noindex low-value tag pages until they have enough inventory.
- Merge near-duplicate categories.
- Add unique descriptions based on verified entity counts and examples.
- Remove empty filtered pages from internal links and sitemaps.

## Paid Placement Bugs

- Confirm VIP status, date window, and placement scope.
- Keep sponsored labels visible.
- Do not let expired placements remain pinned.
- Log billing references server-side only.

## Emergency Rollback

- Disable new ingestion jobs.
- Revert feature flags before code rollbacks when possible.
- Remove bad URLs from sitemaps.
- Mark low-quality or policy-risk records as `flagged` or `removed`.
- Revalidate affected ISR paths.
