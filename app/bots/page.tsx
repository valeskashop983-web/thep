import type { Metadata } from "next";
import { ListingSection } from "@/components/ListingSection";
import { getItemsByKind } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Telegram Bots",
  description: "Discover Telegram bots for AI companions, automation, productivity and entertainment."
};

export default function BotsPage() {
  return (
    <main className="page">
      <section className="hero">
        <h1>Telegram Bots</h1>
        <p>Find AI, automation and utility bots with clear categories and quality signals.</p>
      </section>
      <ListingSection title="Top Bots" items={getItemsByKind("bot")} />
    </main>
  );
}
