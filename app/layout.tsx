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
                <span className="brand-orb">TG</span>
                <span>Index18</span>
              </Link>
              <nav className="nav" aria-label="Primary navigation">
                <Link href="/channels">Channels</Link>
                <Link href="/groups">Groups</Link>
                <Link href="/bots">Bots</Link>
                <Link href="/ai-girlfriend">AI Girlfriend</Link>
                <Link href="/advertise">Advertise</Link>
              </nav>
              <Link href="/submit" className="login-button">
                Entrar
              </Link>
            </div>
          </header>
          {children}
          <footer className="site-footer">
            <div>
              <a>Politica de Privacidade</a>
              <span>|</span>
              <a>Termos de Uso</a>
              <span>|</span>
              <a>DMCA</a>
              <span>|</span>
              <a>Remocao de Links</a>
              <span>|</span>
              <a>Contato</a>
            </div>
            <p>© 2026 TGIndex18. Todos os direitos reservados.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
