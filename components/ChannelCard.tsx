import Link from "next/link";
import { Send, Star, Users } from "lucide-react";
import type { DirectoryItem } from "@/lib/types";
import { formatMembers } from "@/lib/seo";

type Props = {
  item: DirectoryItem;
};

export function ChannelCard({ item }: Props) {
  return (
    <Link href={`/item/${item.slug}`} className="group-card">
      <div className={`group-thumb thumb-${item.visual}`}>
        <span className="thumb-letter">{item.title.charAt(0)}</span>
        {item.vip ? (
          <span className="premium-badge">
            <Star aria-hidden="true" />
            Premium
          </span>
        ) : null}
      </div>
      <div className="group-content">
        <h3>{item.title}</h3>
        <span className="category-pill">{item.tags[0] ?? item.kind}</span>
        <div className="group-meta">
          <span>
            <Users aria-hidden="true" />
            {formatMembers(item.memberCount)}
          </span>
          <span className="enter-chip">
            Entrar
            <Send aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
