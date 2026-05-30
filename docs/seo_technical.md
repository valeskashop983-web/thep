# Technical SEO

## Indexing Strategy

Google discovers most web pages through links and XML sitemaps. Use sitemaps as the primary scalable indexing mechanism. Use Google-supported APIs only for eligible URL types and never as a substitute for technically sound pages.

## Sitemap Architecture

```text
/sitemap.xml
/sitemaps/categories.xml
/sitemaps/channels-0001.xml
/sitemaps/channels-0002.xml
/sitemaps/blog.xml
```

Rules:

- Keep each sitemap under 50,000 URLs and 50 MB uncompressed.
- Shard channel detail pages deterministically.
- Include only canonical, indexable, `active` pages.
- Set `lastmod` from `updated_at`.
- Exclude search result pages, filtered combinations, drafts, removed records, and low-quality pages.

## Next.js Sitemap Example

```ts
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${baseUrl}/channels`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9
    }
  ];
}
```

## Robots.txt

```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /search
Disallow: /*?*

Sitemap: https://example.com/sitemap.xml
```

## Canonicals

- Category pages canonicalize to `/c/[category-slug]`.
- Username detail pages canonicalize to `/@[telegram-username]`.
- Fallback detail pages canonicalize to `/item/[slug]`.
- Paginated pages should use stable URLs and avoid canonicalizing every page to page 1 if page 2+ has unique listings.

## Performance Targets

- LCP under 1 second on key mobile templates where feasible.
- CLS under 0.1.
- INP under 200 ms.
- Server-render initial listing content.
- Use fixed image dimensions or aspect ratios.
- Avoid loading third-party scripts on listing pages unless essential.
- Use edge caching and ISR for high-traffic paths.

## Image Proxy Requirements

- Cache permitted images at the edge.
- Normalize dimensions for cards and detail headers.
- Return `Cache-Control: public, max-age=31536000, immutable` only for stable immutable URLs.
- Add content-type validation and size limits.
- Do not proxy images from sources that prohibit caching or reuse.

## Indexing Automation

Use sitemap pinging, Search Console sitemap submission, and URL Inspection API for diagnostics. The Google Indexing API is intended for supported use cases such as job postings and livestreams; do not assume general directory URLs are eligible.

Diagnostic URL inspection flow:

```ts
/**
 * Pseudocode:
 * 1. Read recently published active URLs.
 * 2. Sample a small batch.
 * 3. Query URL Inspection API for coverage state.
 * 4. Store result summaries.
 * 5. Escalate pages with crawl or indexability problems.
 */
```

## Pre-Publish Technical Checklist

- Page returns 200.
- Canonical points to itself or intended canonical.
- Metadata is unique enough for the route.
- H1 exists and matches intent.
- JSON-LD validates.
- Main content appears in raw HTML.
- Page is linked internally.
- Page exists in sitemap.
- No accidental `noindex`.
- Mobile layout has no overlapping text or controls.

## Logging

Track:

- Route render errors.
- Supabase query latency.
- Cache hit rate.
- Sitemap generation failures.
- 404s for detail/category pages.
- Search Console coverage changes.
- Core Web Vitals by template.
