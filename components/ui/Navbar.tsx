'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#111111]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center gap-1">
          <span className="text-white">ERO</span>
          <span className="text-[#b31b1b]">gram</span>
        </Link>

        {/* Language & Mobile toggle */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-sm text-gray-300">US</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-1"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-white/10 py-4">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <Link href="/groups" className="block py-3 px-4 rounded-lg transition text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>
              Groups
            </Link>
            <Link href="/bots" className="block py-3 px-4 rounded-lg transition text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>
              Bots
            </Link>
            <Link href="/ai-nsfw" className="block py-3 px-4 rounded-lg transition text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>
              AI NSFW
            </Link>
            <Link href="/articles" className="block py-3 px-4 rounded-lg transition text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>
              Articles
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
