
import { Eye, Users, TrendingUp, Crown } from 'lucide-react'

export default function HeroStats() {
  const stats = [
    { number: '+5K', label: 'Groups', icon: <Users size={16} /> },
    { number: '283', label: 'Visiting Now', icon: <Eye size={16} />, live: true },
    { number: '8,373,270', label: 'Views', icon: <TrendingUp size={16} />, live: true },
    { number: '+1.8M', label: 'OnlyFans Creators', icon: <Crown size={16} /> },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12">
      {/* Hero text */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
          Explore the best{' '}
          <span className="gradient-text">Telegram content</span>
          <br />
          on Erogram
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-base sm:text-lg">
          Find the hottest Telegram groups, bots, and exclusive NSFW content — updated daily.
        </p>
        <button className="mt-8 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 flex items-center gap-2 mx-auto">
          Browse Groups
          <span className="text-sm">→</span>
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mt-16">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="glass-card rounded-xl p-4 text-center"
          >
            <div className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-1">
              {stat.number}
            </div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1 flex items-center justify-center gap-1">
              {stat.icon}
              {stat.label}
              {stat.live && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
