import type { Metadata } from "next";
import { ListingSection } from "@/components/ListingSection";
import { getItemsByKind } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Telegram Groups",
  description: "Browse Telegram group communities by topic, quality and activity signals."
};

export default function GroupsPage() {
  return (
    <main className="page">
      <section className="hero">
        <h1>Telegram Groups</h1>
        <p>Active Telegram communities for discussions, launches, learning and niche discovery.</p>
      </section>
      <ListingSection title="Top Groups" items={getItemsByKind("group")} />
    </main>
  );
}
