import Link from "next/link";
import type { DirectoryItem } from "@/lib/types";
import { formatMembers } from "@/lib/seo";

type Props = {
  item: DirectoryItem;
};

export function ChannelCard({ item }: Props) {
  return (
    <article className="listing-card">
      <div className="listing-main">
        <div className="avatar" aria-hidden="true">
          {item.title.slice(0, 1)}
        </div>
        <div className="listing-copy">
          <div className="listing-title-row">
            <h3>
              <Link href={`/item/${item.slug}`}>{item.title}</Link>
            </h3>
            {item.vip ? <span className="badge sponsored">Featured</span> : null}
          </div>
          <p>{item.description}</p>
          <div className="meta-row">
            <span>{formatMembers(item.memberCount)}</span>
            <span>{item.kind}</span>
            {item.isAiRelated ? <span>AI</span> : null}
            {item.isNsfw ? <span>18+</span> : null}
          </div>
        </div>
      </div>
      <div className="tag-row">
        {item.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}
