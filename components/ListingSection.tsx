import { ChannelCard } from "@/components/ChannelCard";
import type { DirectoryItem } from "@/lib/types";

type Props = {
  title: string;
  items: DirectoryItem[];
};

export function ListingSection({ title, items }: Props) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        <span>{items.length} listings</span>
      </div>
      <div className="listing-grid">
        {items.map((item) => (
          <ChannelCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
