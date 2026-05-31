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
        <div className="hero-banner">
          <div>
            <span className="eyebrow">Diretorio Telegram</span>
            <h1>Canais Telegram Brasil</h1>
            <p>Comunidades, bots e grupos verificados em uma vitrine rapida para mobile.</p>
          </div>
          <Link href="/channels" className="hero-cta">
            Entrar agora
          </Link>
        </div>
      </section>

      <ListingSection title="Grupos em destaque" kicker="Mais bem avaliados" items={featured} variant="rail" />

      <section className="section category-strip">
        <div className="section-head">
          <div>
            <h2>Canais e Grupos</h2>
          </div>
        </div>
        <div className="tab-row" aria-label="Ordenar listagens">
          <Link href="/" className="tab active">
            Em alta
          </Link>
          <Link href="/channels" className="tab">
            Recentes
          </Link>
          <Link href="/groups" className="tab">
            Mais vistos
          </Link>
          <Link href="/bots" className="tab">
            Bots IA
          </Link>
        </div>
      </section>

      <ListingSection title="Em alta" items={directoryItems} />

      <section className="section">
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
