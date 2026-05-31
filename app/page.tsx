import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, Flame, Star, ThumbsUp } from "lucide-react";
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
        <div className="hero-copy">
          <h1>Canais Telegram Brasil</h1>
          <p>
            Diretorio de canais, grupos e bots verificados para descobrir comunidades no Telegram.
          </p>
        </div>
        <div className="hero-banner" aria-label="Destaque principal">
          <Link href="/channels" className="hero-cta">
            <Image src="/reference/btn-entrar-agora.png" alt="Entrar agora" width={1432} height={1920} priority />
          </Link>
        </div>
      </section>

      <ListingSection
        title="Grupos em destaque"
        kicker="Mais bem avaliados"
        items={featured}
        variant="rail"
        icon={<Star aria-hidden="true" />}
      />

      <section className="section-block category-strip">
        <div className="section-head">
          <div>
            <h2>Canais e Grupos</h2>
          </div>
        </div>
        <div className="tab-row" aria-label="Ordenar listagens">
          <Link href="/" className="tab active">
            <Flame aria-hidden="true" />
            Em alta
          </Link>
          <Link href="/channels" className="tab">
            <Clock aria-hidden="true" />
            Recentes
          </Link>
          <Link href="/groups" className="tab">
            <Eye aria-hidden="true" />
            Mais vistos
          </Link>
          <Link href="/bots" className="tab">
            <ThumbsUp aria-hidden="true" />
            Mais votados
          </Link>
        </div>
      </section>

      <ListingSection title="Em alta" items={directoryItems} />

      <section className="section-block">
        <div className="section-head">
          <div>
            <h2>Categorias</h2>
            <p>Hubs principais para indexacao e navegacao.</p>
          </div>
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
      <ListingSection title="Bots e IA" kicker="Afiliados e alto valor comercial" items={trending} />
    </main>
  );
}
