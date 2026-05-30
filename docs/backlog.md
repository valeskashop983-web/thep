# Execution Backlog

## Phase 1: Ingestion Proof Of Concept

- [ ] Define permitted source list and source policy.
- [ ] Create `ChannelCandidate` validation schema.
- [ ] Implement safe HTML metadata extraction.
- [ ] Implement optional permitted `__NEXT_DATA__` parser.
- [ ] Record observed fields in `source_observations`.
- [ ] Import 20 manually reviewed candidates.
- [ ] Document field gaps in `docs/scrapers.md`.

## Phase 2: Supabase Modeling

- [ ] Create database migrations for core tables.
- [ ] Enable RLS on all public tables.
- [ ] Add public read policies for active entities.
- [ ] Add indexes for category listings, search, and VIP placements.
- [ ] Build seed script for categories and tags.
- [ ] Test anon read access and server-only write access.

## Phase 3: Next.js Mobile UI

- [ ] Scaffold Next.js App Router project.
- [ ] Create design tokens and mobile-first layout primitives.
- [ ] Build home route.
- [ ] Build category listing route.
- [ ] Build channel detail route.
- [ ] Build search and filtering UI.
- [ ] Build VIP placement display with disclosure.
- [ ] Add loading, empty, and error states.

## Phase 4: Initial Seed

- [ ] Build `docs/keyword_map.md`.
- [ ] Select 100-500 seed entities from permitted sources.
- [ ] Normalize categories and tags.
- [ ] Run duplicate detection.
- [ ] Moderate NSFW and policy-risk entries.
- [ ] Publish only approved `active` records.

## Phase 5: Performance And Technical SEO

- [ ] Implement metadata templates.
- [ ] Implement JSON-LD helpers.
- [ ] Implement sitemap index and sitemap shards.
- [ ] Implement robots.txt.
- [ ] Implement Cloudflare-compatible image proxy.
- [ ] Run Lighthouse/PageSpeed on mobile templates.
- [ ] Fix LCP, CLS, and INP issues.
- [ ] Validate raw HTML rendering.

## Phase 6: Semantic Templates And Editorial

- [ ] Create category intro template rules.
- [ ] Generate unique descriptions from verified fields.
- [ ] Draft priority editorial pages.
- [ ] Add internal links from articles to live categories and listings.
- [ ] Add affiliate disclosures where needed.
- [ ] Noindex thin tag/category pages until inventory is adequate.

## Phase 7: Indexing And Diagnostics

- [ ] Submit sitemap in Search Console.
- [ ] Build URL inspection diagnostic script for samples.
- [ ] Monitor coverage, crawl errors, and canonical choices.
- [ ] Fix pages with indexing blockers.
- [ ] Track impressions and CTR by route template.

## Phase 8: Scaled Ingestion

- [ ] Add crawl queue worker.
- [ ] Add per-source rate limits.
- [ ] Add backoff and block handling.
- [ ] Add moderation queue.
- [ ] Add source health dashboard.
- [ ] Expand inventory by category priority.

## Phase 9: Optimization Loop

- [ ] Review Search Console weekly.
- [ ] Update `docs/keyword_map.md` from real query data.
- [ ] Improve low-CTR titles and descriptions.
- [ ] Merge or noindex underperforming thin pages.
- [ ] Tune VIP placement conversion funnels.
- [ ] Add partner and owner submission channels.
