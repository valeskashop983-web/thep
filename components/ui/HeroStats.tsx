'use client'

export default function HeroStats() {
  const stats = [
    { number: '+5K', label: 'GROUPS' },
    { number: '338', label: 'VISITING NOW' },
    { number: '8,374,998', label: 'VIEWS' },
    { number: '+1.8M', label: 'ONLYFANS CREATORS' },
  ]

  return (
    <div className="stats-grid">
      {stats.map((stat, idx) => (
        <div key={idx} className="stat-card">
          <div className="stat-number">{stat.number}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
