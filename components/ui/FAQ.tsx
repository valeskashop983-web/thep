'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: "What is Erogram?",
    a: "Erogram is the largest curated platform for discovering Telegram groups, bots, and NSFW content. We index thousands of communities and verify them daily to ensure quality and safety."
  },
  {
    q: "What are the best porn Telegram groups?",
    a: "The best groups depend on your preferences. Our top-rated categories include Amateur, Anal, Lesbian, OnlyFans leaks, and AI-generated content. Check the 'Fresh New Additions' section for trending groups."
  },
  {
    q: "What's the difference between groups and bots?",
    a: "Groups are communities where members share content and chat. Bots are automated accounts that can send you media, search for content, or interact with you directly. Both are popular on Erogram."
  },
  {
    q: "Are all communities and bots safe?",
    a: "We manually review each submission and use automated scanners to detect malware or spam. However, always exercise caution and never share personal information."
  },
  {
    q: "How do I join a Telegram group or use a bot?",
    a: "Just click on any card. For groups, you'll be redirected to Telegram's invite link. For bots, you'll get a direct link to start the bot conversation."
  },
  {
    q: "Is Erogram free to use?",
    a: "Yes, Erogram is completely free. We do not charge for browsing or joining any listed groups/bots."
  },
  {
    q: "How often are new groups and bots added?",
    a: "We add new content every hour. Our 'Fresh New Additions' section is updated in real-time as we discover and verify new communities."
  },
  {
    q: "Can I submit my own group or bot?",
    a: "Absolutely! Use the 'Add' button in the navigation bar (or contact us via Telegram) to submit your community for review."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-white/10">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full py-4 text-left flex justify-between items-center text-white font-medium"
            >
              {faq.q}
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  openIndex === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
