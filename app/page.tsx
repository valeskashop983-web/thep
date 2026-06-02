import HeroStats from '@/components/ui/HeroStats'

export default function HomePage() {
  return (
    <main className="bg-[#111111] min-h-screen">
      {/* Hero Section */}
      <section className="hero relative">
        {/* Background glows */}
        <div className="glow-red" />
        <div className="glow-pink" />

        <div className="hero-content">
          {/* Left side - Text */}
          <div className="hero-text z-10">
            <p className="text-[#b31b1b] font-semibold mb-6 uppercase tracking-wide text-sm">
              • The #1 NSFW & Porn Telegram and AI Directory
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              Discover NSFW & Porn<br />
              <span className="text-white">Telegram groups, </span>
              <span className="gradient-text">bots & AI</span>
            </h1>
            <p className="text-lg text-gray-300 mb-12 leading-relaxed max-w-2xl">
              Your #1 hub for NSFW Telegram groups & bots, AI companions & tools, and 1.8M+ OnlyFans creators. Explore and save your favorites all in one place.
            </p>
            
            <div className="hero-buttons">
              <button className="btn-primary">
                📱 Explore Groups
              </button>
              <button className="btn-primary">
                🤖 Explore Bots
              </button>
              <button className="btn-primary">
                🔞 Explore AI NSFW
              </button>
              <button className="btn-primary">
                🔍 ONLYFANS SEARCH +1.8M creators
              </button>
            </div>

            <HeroStats />
          </div>

          {/* Right side - Empty on desktop, hidden on mobile */}
          <div className="hidden lg:block" />
        </div>
      </section>
    </main>
  )
}
