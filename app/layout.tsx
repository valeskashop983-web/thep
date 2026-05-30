import type { Metadata } from "next";
import Link from "next/link";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Telegram Directory",
    template: "%s | Telegram Directory"
  },
  description: "Discover active Telegram channels, groups, AI bots and creator communities."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="topbar">
            <div className="topbar-inner">
              <Link href="/" className="brand">
                Telegram Directory
              </Link>
              <nav className="nav" aria-label="Primary navigation">
                <Link href="/channels">Channels</Link>
                <Link href="/groups">Groups</Link>
                <Link href="/bots">Bots</Link>
                <Link href="/ai-girlfriend">AI Girlfriend</Link>
                <Link href="/advertise">Advertise</Link>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
