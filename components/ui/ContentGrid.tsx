import { Eye } from 'lucide-react'

// Lista de 8 itens com imagens SVG inline (placeholders temáticos)
const items = [
  { title: "Premium Leaks", category: "Amateur", views: "12.4K", new: true, color: "#b31b1b" },
  { title: "OnlyFans Hub", category: "OF", views: "45.2K", new: true, color: "#0088cc" },
  { title: "Daily Exclusives", category: "Anal", views: "8.7K", new: false, color: "#6b21a5" },
  { title: "VIP Lounge", category: "Lesbian", views: "23.1K", new: false, color: "#d946ef" },
  { title: "Real Amateurs", category: "Amateur", views: "5.3K", new: false, color: "#b31b1b" },
  { title: "Telegram Gems", category: "Bots", views: "67.8K", new: false, color: "#0088cc" },
  { title: "NSFW Central", category: "Mixed", views: "92.0K", new: false, color: "#6b21a5" },
  { title: "AI Generated", category: "AI", views: "14.5K", new: false, color: "#d946ef" },
]

function ImagePlaceholder({ color }: { color: string }) {
  // SVG inline de 400x400 com gradiente e ícone de câmera
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="<http://www.w3.org/2000/svg>">
      <rect width="400" height="400" fill={color} />
      <circle cx="200" cy="200" r="60" fill="white" fillOpacity="0.2" />
      <path d="M200 160 L220 180 L180 180 Z" fill="white" />
    </svg>
  )
}

export default function ContentGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Fresh <span className="gradient-text">New Additions</span>
        </h2>
        <p className="text-gray-400 mt-2">Updated every hour with the best content</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-10">
        {items.map((item, i) => (
          <div
            key={i}
            className="relative group glass-card rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-[#b31b1b]/50 hover:shadow-[0_0_15px_rgba(179,27,27,0.2)]"
          >
            {/* Imagem SVG */}
            <div className="aspect-square w-full">
              <ImagePlaceholder color={item.color} />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            {/* Badge New */}
            {item.new && (
              <span className="absolute top-2 left-2 bg-[#b31b1b] text-white text-xs px-2 py-0.5 rounded-full z-10">
                New
              </span>
            )}
            {/* Título */}
            <div className="absolute bottom-12 left-3 right-3 text-white font-semibold text-sm truncate">
              {item.title}
            </div>
            {/* Footer */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs text-gray-300">
              <span className="bg-black/50 px-2 py-0.5 rounded-full">{item.category}</span>
              <div className="flex items-center gap-1">
                <Eye size={12} /> {item.views}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
