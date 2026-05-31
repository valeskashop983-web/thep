import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, Send } from "lucide-react";
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
              <button className="menu-button" aria-label="Menu">
                <Menu aria-hidden="true" />
              </button>
              <Link href="/" className="brand">
                <Image src="/reference/logo.png" alt="TGIndex" width={1920} height={1079} priority />
              </Link>
              <form className="search-form">
                <Search aria-hidden="true" />
                <input placeholder="Buscar grupos..." aria-label="Buscar grupos" />
              </form>
              <nav className="nav" aria-label="Primary navigation">
                <Link href="/channels">Channels</Link>
                <Link href="/groups">Groups</Link>
                <Link href="/bots">Bots</Link>
                <Link href="/ai-girlfriend">AI Girlfriend</Link>
                <Link href="/advertise">Advertise</Link>
              </nav>
              <Link href="/submit" className="submit-link">
                <Send aria-hidden="true" />
                Enviar Grupo
              </Link>
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
