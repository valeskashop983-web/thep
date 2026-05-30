import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise and Featured Listings",
  description: "Feature a Telegram channel, group or AI bot with clear sponsored placement."
};

export default function AdvertisePage() {
  return (
    <main className="page">
      <section className="hero">
        <h1>Advertise Your Telegram Listing</h1>
        <p>
          Featured placements help owners reach high-intent mobile visitors while keeping sponsored
          labels visible and transparent.
        </p>
      </section>
      <section className="detail-panel">
        <h2>VIP Placement Model</h2>
        <p>
          Placements can target the homepage, categories or detail-page recommendations. Sponsored
          visibility never removes moderation, age-safety or quality requirements.
        </p>
      </section>
    </main>
  );
}
