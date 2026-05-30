import type { DirectoryItem } from "@/lib/types";

export const siteName = "Telegram Directory";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function formatMembers(value?: number) {
  if (!value) return "New listing";
  return new Intl.NumberFormat("en", { notation: "compact" }).format(value);
}

export function itemUrl(item: DirectoryItem) {
  return `${siteUrl}/item/${item.slug}`;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function collectionJsonLd(name: string, description: string, items: DirectoryItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: itemUrl(item),
        name: item.title
      }))
    }
  };
}

export function profileJsonLd(item: DirectoryItem) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: item.title,
    url: itemUrl(item),
    description: item.description,
    sameAs: [item.telegramUrl]
  };
}
