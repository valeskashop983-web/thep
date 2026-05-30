import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChannelCard } from "@/components/ChannelCard";
import { directoryItems, getCategory, getItem } from "@/lib/seed";
import { formatMembers, profileJsonLd } from "@/lib/seo";

type Props = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return directoryItems.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const item = getItem(params.slug);
  if (!item) return {};

  return {
    title: `${item.title} on Telegram`,
    description: item.description,
    alternates: {
      canonical: `/item/${item.slug}`
    }
  };
}

export default function DetailPage({ params }: Props) {
  const item = getItem(params.slug);
  if (!item) notFound();

  const category = getCategory(item.categorySlug);
  const related = directoryItems
    .filter((candidate) => candidate.categorySlug === item.categorySlug && candidate.slug !== item.slug)
    .slice(0, 3);

  return (
    <main className="page detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd(item)) }}
      />
      <section className="hero">
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <div className="quick-links">
          {category ? <Link href={`/c/${category.slug}`}>{category.name}</Link> : null}
          <span className="pill">{formatMembers(item.memberCount)}</span>
          {item.vip ? <span className="pill">Featured</span> : null}
        </div>
      </section>

      {item.isNsfw ? (
        <div className="notice">
          This listing is marked adult-oriented. Access should be limited to adults and moderated
          according to platform policy and applicable law.
        </div>
      ) : null}

      <section className="detail-panel">
        <h2>About {item.title}</h2>
        <p>{item.description}</p>
        <div className="meta-row">
          <span>{item.kind}</span>
          <span>Quality score {item.qualityScore}</span>
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="cta-row">
          <a className="button" href={item.telegramUrl} rel="nofollow sponsored noopener noreferrer">
            Open Telegram
          </a>
          <Link className="button secondary" href="/advertise">
            Feature a listing
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Similar Telegram Listings</h2>
          <span>{related.length} related</span>
        </div>
        <div className="listing-grid">
          {related.map((candidate) => (
            <ChannelCard key={candidate.slug} item={candidate} />
          ))}
        </div>
      </section>
    </main>
  );
}
