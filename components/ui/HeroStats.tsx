'use client'

export default function HeroStats() {
  const stats = [
    { number: '+5K', label: 'Groups' },
    { number: '338', label: 'Visiting Now' },
    { number: '8,374,988', label: 'Views' },
    { number: '+1.8M', label: 'OnlyFans Creators' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
      {stats.map((stat, idx) => (
        <div key={idx} className="stat-card">
          <div className="stat-number">{stat.number}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
