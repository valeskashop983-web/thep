import Navbar from '@/components/ui/Navbar'
import HeroStats from '@/components/ui/HeroStats'
import ContentGrid from '@/components/ui/ContentGrid'
import FAQ from '@/components/ui/FAQ'
import Footer from '@/components/ui/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#111111]">
      {/* Elementos de glow */}
      <div className="glow-red" />
      <div className="glow-pink" />

      <Navbar />
      <HeroStats />
      <ContentGrid />
      <FAQ />
      <Footer />
    </main>
  )
}
