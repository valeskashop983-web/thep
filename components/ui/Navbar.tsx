'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = ['Groups', 'Bots', 'AI NSFW', 'OFsearch', 'Articles']

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#111111]/80 backdrop-blur-md border-b border-white/10 h-16 sm:h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <span className="text-white">ERO</span>
          <span className="text-[#b31b1b]">gram</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className={`text-sm text-gray-300 hover:text-white transition ${
                link === 'OFsearch'
                  ? 'bg-[#0088cc] px-4 py-1.5 rounded-full text-white hover:bg-[#0077b3]'
                  : ''
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-b border-white/10">
          <div className="px-4 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className={`text-gray-300 py-2 ${
                  link === 'OFsearch' ? 'text-[#0088cc] font-semibold' : ''
                }`}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
