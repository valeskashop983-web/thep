import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingSection } from "@/components/ListingSection";
import { categories, getCategory, getItemsByCategory } from "@/lib/seed";
import { collectionJsonLd, siteUrl } from "@/lib/seo";

type Props = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategory(params.slug);
  if (!category) return {};

  return {
    title: `${category.name} Telegram Channels and Groups`,
    description: `Browse active ${category.name} Telegram channels, groups and bots. Compare listings before joining.`,
    alternates: {
      canonical: `/c/${category.slug}`
    }
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const items = getItemsByCategory(category.slug);

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionJsonLd(
              `${category.name} Telegram Channels and Groups`,
              category.description,
              items
            )
          )
        }}
      />
      <section className="hero">
        <h1>{category.name} Telegram Channels and Groups</h1>
        <p>{category.description}</p>
        <div className="quick-links">
          <a href={`${siteUrl}/submit`}>Submit a listing</a>
          <a href={`${siteUrl}/advertise`}>Feature your channel</a>
        </div>
      </section>
      {category.slug === "nsfw-telegram" ? (
        <div className="notice">
          Adult listings require age-appropriate access, active moderation and strict exclusion of
          illegal or exploitative content.
        </div>
      ) : null}
      <ListingSection title={`Top ${category.name} Listings`} items={items} />
    </main>
  );
}
