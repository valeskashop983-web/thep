# Ingestion And Scraper Specification

## Policy

Ingestion must be compliant, observable, and replaceable. The system may parse public pages and public structured data only when permitted by the source's terms, robots directives, and rate limits. Do not bypass WAFs, login walls, CAPTCHAs, bot protections, or explicit blocking. Do not use residential proxies or stealth tooling to evade source controls.

When a source blocks access or returns persistent 403/429 responses, mark the source as `blocked`, stop automated collection, and switch to manual review, first-party submissions, licensed data, partner feeds, or public APIs.

## Preferred Sources

- First-party channel submissions.
- Owner verification flows.
- Public Telegram metadata that is allowed for indexing.
- Partner feeds and paid data providers.
- Public sitemaps where automated access is permitted.
- Search Console and internal logs for prioritization.
- Manual research for seed lists.

## Field Discovery Workflow

1. Create a `crawl_jobs` row for a permitted URL.
2. Fetch the page with a normal HTTP client and clear user agent.
3. Respect robots, rate limits, and source terms.
4. Parse structured data from JSON-LD, Open Graph, meta tags, and permitted embedded JSON.
5. Normalize fields into a `ChannelCandidate`.
6. Validate with `zod`.
7. Upsert into `channels`, `categories`, `tags`, and `source_observations`.
8. Store only observed fields and hashes needed for auditing, not full copied pages.

## Candidate Type

```ts
import { z } from "zod";

export const ChannelCandidateSchema = z.object({
  kind: z.enum(["channel", "group", "bot", "creator"]).default("channel"),
  telegramUsername: z.string().min(2).max(64).optional(),
  telegramUrl: z.string().url().optional(),
  slug: z.string().min(2).max(120),
  title: z.string().min(1).max(180),
  description: z.string().max(5000).optional(),
  shortDescription: z.string().max(240).optional(),
  categorySlug: z.string().min(2).max(80).optional(),
  tags: z.array(z.string().min(2).max(60)).default([]),
  languageCode: z.string().length(2).optional(),
  countryCode: z.string().length(2).optional(),
  isNsfw: z.boolean().default(false),
  isAiRelated: z.boolean().default(false),
  memberCount: z.number().int().nonnegative().optional(),
  avatarSourceUrl: z.string().url().optional(),
  sourceUrl: z.string().url(),
  observedAt: z.string().datetime()
});

export type ChannelCandidate = z.infer<typeof ChannelCandidateSchema>;
```

## Safe Embedded JSON Extraction

Some Next.js sites expose structured state in a script tag. Only use this technique on sources where automated access is permitted.

```ts
import * as cheerio from "cheerio";

export function extractNextData(html: string): unknown | null {
  const $ = cheerio.load(html);
  const raw = $("script#__NEXT_DATA__").first().text();

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
```

## Fetch Guardrails

```ts
type FetchResult =
  | { ok: true; html: string; status: number }
  | { ok: false; status: number; reason: "blocked" | "rate_limited" | "not_found" | "network" };

export async function fetchPermittedPage(url: string): Promise<FetchResult> {
  const response = await fetch(url, {
    headers: {
      "accept": "text/html,application/xhtml+xml",
      "user-agent": "TelegramDirectoryBot/0.1 (+https://example.com/bot)"
    },
    redirect: "follow",
    signal: AbortSignal.timeout(15_000)
  });

  if (response.status === 403) return { ok: false, status: 403, reason: "blocked" };
  if (response.status === 429) return { ok: false, status: 429, reason: "rate_limited" };
  if (response.status === 404) return { ok: false, status: 404, reason: "not_found" };
  if (!response.ok) return { ok: false, status: response.status, reason: "network" };

  return { ok: true, status: response.status, html: await response.text() };
}
```

## Import Rules

- Never import a record without a canonical URL or stable slug.
- Mark NSFW content explicitly.
- Exclude illegal, abusive, underage, non-consensual, or exploitative content.
- Send borderline records to moderation before publishing.
- Deduplicate by Telegram username, URL, slug, and source hash.
- Keep `source_observations` for traceability.
- Put unknown categories into a review queue instead of inventing indexable pages.

## Rate Limits

- Start with one request per source every 10-30 seconds.
- Use exponential backoff on 429 and 5xx.
- Stop the source after repeated 403, 401, CAPTCHA, or bot-challenge responses.
- Keep per-source concurrency at 1 until there is explicit permission for more.

## Initial Seed Plan

1. Build `docs/keyword_map.md` from public search demand and manual review.
2. Create 100-500 seed entities from permitted sources and submissions.
3. Normalize categories before publishing pages.
4. Run duplicate checks.
5. Publish only `active` and moderation-approved records.
