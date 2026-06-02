import HeroStats from '@/components/ui/HeroStats'

export default function HomePage() {
  return (
    <main className="bg-[#111111] min-h-screen">
      {/* Hero Section */}
      <section className="hero relative">
        {/* Background glows */}
        <div className="glow-red" />
        <div className="glow-pink" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen pt-20 pb-20 z-10">
          {/* Center content */}
          <div className="w-full text-center">
            <p className="text-[#b31b1b] font-semibold mb-8 uppercase tracking-wide text-xs sm:text-sm">
              • The #1 NSFW & Porn Telegram and AI Directory
            </p>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Discover NSFW & Porn<br />
              <span className="text-white">Telegram groups, </span>
              <span className="gradient-text">bots & AI</span>
            </h1>
            
            <p className="text-base sm:text-lg text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Your #1 hub for NSFW Telegram groups & bots, AI companions & tools, and 1.8M+ OnlyFans creators. Explore and save your favorites all in one place.
            </p>
            
            <div className="hero-buttons-inline mb-12">
              <button className="btn-primary-inline">
                📱 Explore Groups
              </button>
              <button className="btn-primary-inline">
                🤖 Explore Bots
              </button>
              <button className="btn-primary-inline">
                🔞 Explore AI NSFW
              </button>
              <button className="btn-primary-inline">
                🔍 ONLYFANS SEARCH +1.8M creators
              </button>
            </div>

            <HeroStats />
          </div>
        </div>
      </section>
    </main>
  )
}
