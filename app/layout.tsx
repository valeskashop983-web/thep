import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Erogram - Best Telegram Groups & Bots',
  description: 'Discover the best Telegram groups, bots, and NSFW content',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
