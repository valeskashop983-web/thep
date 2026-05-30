import type { Metadata } from "next";
import { ListingSection } from "@/components/ListingSection";
import { getItemsByCategory } from "@/lib/seed";

export const metadata: Metadata = {
  title: "AI Girlfriend Telegram Bots",
  description: "Discover AI companion and AI girlfriend Telegram bots with safety-focused listings."
};

export default function AiGirlfriendPage() {
  return (
    <main className="page">
      <section className="hero">
        <h1>AI Girlfriend Telegram Bots</h1>
        <p>AI companion listings for Telegram, curated with disclosure, moderation and quality signals.</p>
      </section>
      <ListingSection title="AI Companion Listings" items={getItemsByCategory("ai-girlfriend")} />
    </main>
  );
}
