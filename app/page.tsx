import Link from "next/link";
import { ListingSection } from "@/components/ListingSection";
import { categories, directoryItems } from "@/lib/seed";
import { websiteJsonLd } from "@/lib/seo";

export default function HomePage() {
  const featured = directoryItems.filter((item) => item.vip);
  const trending = directoryItems
    .filter((item) => item.isAiRelated)
    .sort((a, b) => b.qualityScore - a.qualityScore);

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />
      <section className="hero">
        <h1>Telegram Channels, Groups and AI Bots</h1>
        <p>
          Discover active Telegram communities, AI companion bots, creator channels and high-signal
          listings built for fast mobile browsing.
        </p>
        <div className="search-panel">
          <input aria-label="Search Telegram listings" placeholder="Search channels, bots, groups..." />
          <div className="quick-links">
            {categories.slice(0, 4).map((category) => (
              <Link key={category.slug} href={`/c/${category.slug}`}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Popular Categories</h2>
          <span>{categories.length} hubs</span>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link className="category-card" key={category.slug} href={`/c/${category.slug}`}>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <span className="pill">{category.intent}</span>
            </Link>
          ))}
        </div>
      </section>

      <ListingSection title="Featured Communities" items={featured} />
      <ListingSection title="Trending AI Bots" items={trending} />
      <ListingSection title="Recently Added" items={directoryItems} />
    </main>
  );
}
