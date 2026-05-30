import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a Telegram Listing",
  description: "Submit a Telegram channel, group, bot or creator page for review."
};

export default function SubmitPage() {
  return (
    <main className="page">
      <section className="hero">
        <h1>Submit a Telegram Listing</h1>
        <p>
          Owner submissions are the preferred way to keep the directory accurate, compliant and
          current.
        </p>
      </section>
      <section className="detail-panel">
        <h2>Submission Requirements</h2>
        <p>
          Provide the Telegram URL, category, language, description, owner contact and any adult or
          AI-related disclosure. Listings are reviewed before publication.
        </p>
      </section>
    </main>
  );
}
