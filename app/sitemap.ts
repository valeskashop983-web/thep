import type { MetadataRoute } from "next";
import { categories, directoryItems } from "@/lib/seed";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1
    },
    ...["channels", "groups", "bots", "ai-girlfriend", "submit", "advertise"].map((path) => ({
      url: `${siteUrl}/${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8
    })),
    ...categories.map((category) => ({
      url: `${siteUrl}/c/${category.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9
    })),
    ...directoryItems.map((item) => ({
      url: `${siteUrl}/item/${item.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }))
  ];
}
