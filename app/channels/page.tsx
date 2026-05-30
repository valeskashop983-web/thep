import type { Metadata } from "next";
import { ListingSection } from "@/components/ListingSection";
import { directoryItems } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Telegram Channels",
  description: "Browse active Telegram channels across AI, creator, adult and business categories."
};

export default function ChannelsPage() {
  const items = directoryItems.filter((item) => item.kind === "channel" || item.kind === "creator");

  return (
    <main className="page">
      <section className="hero">
        <h1>Telegram Channels</h1>
        <p>High-signal Telegram channels and creator communities organized for mobile discovery.</p>
      </section>
      <ListingSection title="Top Channels" items={items} />
    </main>
  );
}
