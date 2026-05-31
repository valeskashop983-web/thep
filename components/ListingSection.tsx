import { ChannelCard } from "@/components/ChannelCard";
import type { DirectoryItem } from "@/lib/types";

type Props = {
  title: string;
  items: DirectoryItem[];
  kicker?: string;
  variant?: "grid" | "rail";
  icon?: React.ReactNode;
};

export function ListingSection({ title, items, kicker, variant = "grid", icon }: Props) {
  return (
    <section className="section-block">
      <div className="section-head">
        <div>
          <h2>
            {icon}
            {title}
          </h2>
          {kicker ? <p>{kicker}</p> : null}
        </div>
        {variant === "rail" ? (
          <div className="rail-controls">
            <button aria-label="Anterior">‹</button>
            <button aria-label="Proximo">›</button>
          </div>
        ) : null}
      </div>
      <div className={variant === "rail" ? "premium-rail" : "groups-grid"}>
        {items.map((item) => (
          <ChannelCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
