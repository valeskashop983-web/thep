import { ChannelCard } from "@/components/ChannelCard";
import type { DirectoryItem } from "@/lib/types";

type Props = {
  title: string;
  items: DirectoryItem[];
  kicker?: string;
  variant?: "grid" | "rail";
};

export function ListingSection({ title, items, kicker, variant = "grid" }: Props) {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <h2>{title}</h2>
          {kicker ? <p>{kicker}</p> : null}
        </div>
        <span>{items.length}</span>
      </div>
      <div className={variant === "rail" ? "featured-rail" : "listing-grid"}>
        {items.map((item) => (
          <ChannelCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
