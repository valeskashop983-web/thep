# Architecture

## System Goal

Create a high-performance directory and indexer for Telegram channels, groups, bots, AI companions, and creator profiles. The system must support programmatic SEO, mobile-first browsing, VIP placements, moderation, and scalable ingestion without relying on fragile or noncompliant scraping behavior.

## High-Level Flow

```text
Permitted Sources / Submissions / Partner Feeds
  -> Ingestion Workers
  -> Validation and Normalization
  -> Supabase PostgreSQL
  -> Cloudflare Image Proxy and Edge Cache
  -> Next.js App Router with ISR
  -> XML Sitemaps, RSS/Atom Feeds, Internal Links
  -> Search Console Monitoring and Optimization
```

## Core Entities

- `channels`: Telegram channels, groups, bots, and creator pages.
- `categories`: Primary taxonomy for SEO routes.
- `tags`: Flexible topical labels.
- `channel_tags`: Many-to-many relationship between channels and tags.
- `vip_placements`: Paid or editorial featured placements.
- `affiliate_offers`: AI/SaaS offers attached to pages or categories.
- `source_observations`: Raw-source metadata, not raw copyrighted page copies.
- `moderation_events`: Audit trail for status changes.
- `crawl_jobs`: Ingestion queue and health state.

## PostgreSQL Schema

```sql
create extension if not exists pgcrypto;
create extension if not exists pg_trgm;
create extension if not exists unaccent;

create type channel_kind as enum ('channel', 'group', 'bot', 'creator');
create type channel_status as enum ('draft', 'active', 'flagged', 'removed');
create type vip_status as enum ('pending', 'active', 'expired', 'rejected');
create type crawl_status as enum ('queued', 'running', 'succeeded', 'failed', 'blocked');

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  parent_id uuid references public.categories(id) on delete set null,
  search_intent text,
  sort_order integer not null default 0,
  is_indexable boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  is_indexable boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.channels (
  id uuid primary key default gen_random_uuid(),
  kind channel_kind not null default 'channel',
  status channel_status not null default 'draft',
  telegram_username text,
  telegram_url text,
  slug text not null unique,
  title text not null,
  description text,
  short_description text,
  category_id uuid references public.categories(id) on delete set null,
  language_code text,
  country_code text,
  is_nsfw boolean not null default false,
  is_ai_related boolean not null default false,
  member_count integer,
  member_count_observed_at timestamptz,
  avatar_source_url text,
  avatar_cache_url text,
  outbound_url text,
  source_url text,
  source_hash text,
  quality_score numeric(5,2) not null default 0,
  ctr_score numeric(5,2) not null default 0,
  spam_score numeric(5,2) not null default 0,
  last_seen_at timestamptz,
  first_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint channels_member_count_nonnegative check (member_count is null or member_count >= 0)
);

create table public.channel_tags (
  channel_id uuid not null references public.channels(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (channel_id, tag_id)
);

create table public.vip_placements (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid not null references public.channels(id) on delete cascade,
  status vip_status not null default 'pending',
  placement_scope text not null,
  starts_at timestamptz,
  ends_at timestamptz,
  priority integer not null default 0,
  label text not null default 'Featured',
  billing_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.affiliate_offers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  destination_url text not null,
  disclosure text not null,
  category_id uuid references public.categories(id) on delete set null,
  is_active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.source_observations (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid references public.channels(id) on delete set null,
  source_name text not null,
  source_url text not null,
  observed_fields jsonb not null default '{}'::jsonb,
  content_hash text,
  http_status integer,
  observed_at timestamptz not null default now()
);

create table public.crawl_jobs (
  id uuid primary key default gen_random_uuid(),
  source_name text not null,
  target_url text not null,
  status crawl_status not null default 'queued',
  priority integer not null default 0,
  attempts integer not null default 0,
  last_error text,
  scheduled_at timestamptz not null default now(),
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.moderation_events (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid not null references public.channels(id) on delete cascade,
  actor_id uuid,
  event_type text not null,
  note text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index channels_category_status_idx on public.channels(category_id, status);
create index channels_kind_status_idx on public.channels(kind, status);
create index channels_quality_idx on public.channels(status, quality_score desc, member_count desc nulls last);
create index channels_slug_trgm_idx on public.channels using gin(slug gin_trgm_ops);
create index channels_title_trgm_idx on public.channels using gin(title gin_trgm_ops);
create index channels_search_idx on public.channels using gin (
  to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(description, ''))
);
create index vip_active_idx on public.vip_placements(channel_id, placement_scope, starts_at, ends_at)
  where status = 'active';
create index crawl_jobs_queue_idx on public.crawl_jobs(status, priority desc, scheduled_at asc);
```

## RLS Baseline

```sql
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.channels enable row level security;
alter table public.channel_tags enable row level security;
alter table public.vip_placements enable row level security;
alter table public.affiliate_offers enable row level security;
alter table public.source_observations enable row level security;
alter table public.crawl_jobs enable row level security;
alter table public.moderation_events enable row level security;

create policy "public read active categories"
on public.categories for select
using (is_indexable = true);

create policy "public read active tags"
on public.tags for select
using (is_indexable = true);

create policy "public read active channels"
on public.channels for select
using (status = 'active');

create policy "public read channel tags"
on public.channel_tags for select
using (
  exists (
    select 1 from public.channels c
    where c.id = channel_id and c.status = 'active'
  )
);

create policy "public read active vip"
on public.vip_placements for select
using (
  status = 'active'
  and (starts_at is null or starts_at <= now())
  and (ends_at is null or ends_at >= now())
);

create policy "public read active affiliate offers"
on public.affiliate_offers for select
using (
  is_active = true
  and (starts_at is null or starts_at <= now())
  and (ends_at is null or ends_at >= now())
);
```

All writes should use server-only code with the service-role key or authenticated admin roles.

## Route Model

```text
/                         home, search, top categories
/channels                  all channels
/groups                    group directory
/bots                      bot directory
/ai-girlfriend             AI companion category hub
/c/[category-slug]         category listing
/t/[tag-slug]              tag listing if indexable
/@[telegram-username]      detail page when username exists
/item/[slug]               fallback detail route
/submit                    owner submission
/advertise                 VIP placement funnel
/blog/[slug]               editorial support content
```

## Caching Strategy

- Use ISR for category and detail pages.
- Revalidate high-traffic category pages more often than long-tail pages.
- Cache images through Cloudflare Workers with immutable edge headers when license and source terms allow it.
- Store normalized image references, not large binary assets, in Supabase.
- Use stale-while-revalidate for API responses that power infinite scroll.

## Data Quality Scoring

Suggested `quality_score` inputs:

- Has title, description, avatar, category, and valid Telegram URL.
- Recently observed and still reachable.
- Member count exists and is plausible.
- Low spam signals.
- Human-reviewed or owner-verified.
- Historical CTR and engagement.

## Monetization Model

- VIP placements are stored separately from channels.
- Featured status must be disclosed in UI.
- Affiliate offers need visible disclosures.
- Paid ranking must not overwrite organic quality scoring; combine them at query time with clear labels.
