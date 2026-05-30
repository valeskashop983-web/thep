# On-Page And Semantic SEO

## Principles

- Render meaningful HTML on the server.
- Keep page intent singular and obvious.
- Use concise title tags with high-intent keywords, but avoid doorway-page duplication.
- Make mobile scanning effortless.
- Use structured data when it accurately represents the page.
- Add affiliate and sponsored disclosures where relevant.

## Metadata Templates

### Home

```ts
export const metadata = {
  title: "Telegram Channels, Groups and AI Bots Directory",
  description: "Discover active Telegram channels, groups, AI bots and creator communities by category, topic and popularity."
};
```

### Category

```ts
export function categoryMetadata(category: Category) {
  return {
    title: `${category.name} Telegram Channels and Groups`,
    description: `Browse active ${category.name} Telegram channels, groups and bots. Compare communities, topics and member signals before joining.`,
    alternates: {
      canonical: `/c/${category.slug}`
    }
  };
}
```

### Channel Detail

```ts
export function channelMetadata(channel: Channel) {
  return {
    title: `${channel.title} on Telegram`,
    description: channel.shortDescription ?? `View details, category, tags and join link for ${channel.title}.`,
    alternates: {
      canonical: channel.telegramUsername ? `/@${channel.telegramUsername}` : `/item/${channel.slug}`
    },
    openGraph: {
      title: `${channel.title} on Telegram`,
      description: channel.shortDescription ?? channel.description ?? "",
      images: channel.avatarCacheUrl ? [{ url: channel.avatarCacheUrl }] : []
    }
  };
}
```

## Heading Model

### Home

```text
H1: Telegram Channels, Groups and AI Bots
H2: Featured Communities
H2: Popular Categories
H2: Trending AI Bots
H2: Recently Added
```

### Category

```text
H1: [Category Name] Telegram Channels and Groups
H2: Featured [Category Name] Channels
H2: Top [Category Name] Communities
H2: New [Category Name] Listings
H2: Related Categories
```

### Detail

```text
H1: [Channel Title]
H2: About [Channel Title]
H2: Category and Tags
H2: Similar Telegram Channels
```

## JSON-LD

### WebSite

```ts
export function websiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Telegram Directory",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}
```

### CollectionPage

```ts
export function collectionJsonLd(input: {
  url: string;
  name: string;
  description: string;
  items: Array<{ url: string; name: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "url": input.url,
    "name": input.name,
    "description": input.description,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": input.items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": item.url,
        "name": item.name
      }))
    }
  };
}
```

### ProfilePage

```ts
export function channelProfileJsonLd(channel: {
  url: string;
  title: string;
  description?: string | null;
  avatarUrl?: string | null;
  telegramUrl?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "url": channel.url,
    "name": channel.title,
    "description": channel.description ?? undefined,
    "image": channel.avatarUrl ?? undefined,
    "sameAs": channel.telegramUrl ? [channel.telegramUrl] : undefined
  };
}
```

## Internal Linking

- Every detail page links to its primary category.
- Every category page links to related categories and top detail pages.
- Editorial articles must link to live categories and listings, not placeholder URLs.
- Avoid orphan pages by including every indexable detail page in a sitemap shard.

## Content Quality Rules

- Do not publish near-duplicate category intros at scale.
- Generate descriptions from verified attributes, not unsupported claims.
- Keep NSFW intent explicit where relevant.
- Never imply endorsement of illegal or harmful content.
- Add clear age-gating and moderation language for adult categories.

## SERP CTR Rules

- Titles should lead with concrete entity or category names.
- Meta descriptions should mention browsing, comparison, activity, or join intent.
- Avoid excessive punctuation and keyword stuffing.
- Keep snippets readable on mobile.
