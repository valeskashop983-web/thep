import Link from "next/link";
import type { DirectoryItem } from "@/lib/types";
import { formatMembers } from "@/lib/seo";

type Props = {
  item: DirectoryItem;
};

export function ChannelCard({ item }: Props) {
  return (
    <article className="listing-card compact-card">
      <Link href={`/item/${item.slug}`} className={`thumb thumb-${item.visual}`} aria-label={item.title}>
        <span className="thumb-mark">{item.title.slice(0, 1)}</span>
        {item.vip ? <span className="premium-ribbon">PREMIUM</span> : null}
      </Link>
      <div className="listing-copy">
        <div className="listing-title-row">
          <h3>
            <Link href={`/item/${item.slug}`}>{item.title}</Link>
          </h3>
        </div>
        <p>{item.tags[0] ?? item.kind}</p>
        <div className="card-foot">
          <span>{formatMembers(item.memberCount)}</span>
          <a href={item.telegramUrl} rel="nofollow noopener noreferrer" className="join-mini">
            Entrar
          </a>
        </div>
      </div>
    </article>
  );
}
