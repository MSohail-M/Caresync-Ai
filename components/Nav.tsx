'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['Features', 'How It Works', 'Use Cases', 'Pricing']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className={`flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled
              ? 'bg-white/95 border border-[#0F172A]/[0.08] backdrop-blur-2xl shadow-[0_4px_32px_rgba(15,23,42,0.1)]'
              : 'bg-white/[0.7] border border-[#0F172A]/[0.06] backdrop-blur-2xl shadow-[0_2px_16px_rgba(15,23,42,0.06)]'
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 px-3 py-1.5 mr-2">
            <div className="relative w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[#10B981]" />
              <span className="absolute inset-0 rounded-full bg-[#10B981] animate-pulse-ring" />
            </div>
            <span className="text-sm font-bold text-[#0F172A] tracking-tight">CareSync AI</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 rounded-full text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#0F172A]/[0.05] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#demo"
            className="hidden md:flex items-center gap-2 ml-2 pl-4 pr-2 py-2 rounded-full bg-[#3B8EF0] hover:bg-[#2d7de0] text-white text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group active:scale-[0.98] shadow-[0_2px_12px_rgba(59,142,240,0.35)]"
          >
            Book a Demo
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-[1px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 rounded-full flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <span className={`absolute w-4 h-[1.5px] bg-[#0F172A] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${menuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute w-4 h-[1.5px] bg-[#0F172A] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${menuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </motion.nav>
      </div>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-white/97 backdrop-blur-3xl flex flex-col items-center justify-center gap-2"
          >
            {links.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.32, 0.72, 0, 1] }}
                className="text-3xl font-bold text-[#0F172A] hover:text-[#3B8EF0] transition-colors duration-300 py-3"
              >
                {link}
              </motion.a>
            ))}
            <motion.a
              href="#demo"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: links.length * 0.07, ease: [0.32, 0.72, 0, 1] }}
              className="mt-6 flex items-center gap-2 px-6 py-3 rounded-full bg-[#3B8EF0] text-white text-lg font-semibold shadow-[0_4px_20px_rgba(59,142,240,0.3)]"
            >
              Book a Demo
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                  <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
