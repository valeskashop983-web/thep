export default function Footer() {
  return (
    <footer className="bg-black/40 border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">DMCA</a>
          </div>
          {/* Selo RTA (imagem SVG inline) */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="<http://www.w3.org/2000/svg>">
            <rect width="36" height="36" rx="6" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
            <text x="18" y="22" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">RTA</text>
          </svg>
        </div>
        <div className="text-center text-xs text-gray-500 mt-6 pt-6 border-t border-white/5">
          © 2025 Erogram. All rights reserved. 18+ Only.
        </div>
      </div>
    </footer>
  )
}
