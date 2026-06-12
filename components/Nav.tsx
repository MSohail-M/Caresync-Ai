'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = ['Features', 'How It Works', 'Use Cases', 'Pricing']

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const pathname = usePathname()
  const isChatbot = pathname === '/chatbot'

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
          className="flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={scrolled
            ? { background: 'rgba(5,11,24,0.92)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }
            : { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }
          }
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 px-3 py-1.5 mr-2">
            <div className="relative w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[#0284C7]" />
              <span className="absolute inset-0 rounded-full bg-[#0284C7] animate-pulse-ring" />
            </div>
            <span className="text-sm font-bold text-[#F8FAFC] tracking-tight">CareSync AI</span>
          </Link>

          {/* Desktop Links — only on main page */}
          {!isChatbot && (
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 rounded-full text-sm font-medium text-[rgba(248,250,252,0.6)] hover:text-[#F8FAFC] hover:bg-white/[0.07] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  {link}
                </a>
              ))}
            </div>
          )}

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2 ml-2">
            {/* Chatbot button */}
            <Link
              href="/chatbot"
              className={`flex items-center gap-2 pl-4 pr-2 py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group active:scale-[0.98] ${
                isChatbot
                  ? 'bg-[#0284C7] text-white shadow-[0_2px_16px_rgba(56,189,248,0.45)]'
                  : 'border border-white/10 bg-white/[0.06] text-[rgba(248,250,252,0.85)] hover:bg-white/[0.12] hover:border-white/20'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2h10a1 1 0 011 1v6a1 1 0 01-1 1H5l-3 3V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Chatbot
              <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-[1px] transition-transform duration-500">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1.5 7.5L7.5 1.5M7.5 1.5H3M7.5 1.5V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>

            {/* Book a Demo */}
            {!isChatbot && (
              <a
                href="/calendar"
                className="flex items-center gap-2 pl-4 pr-2 py-2 rounded-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group active:scale-[0.98] shadow-[0_2px_16px_rgba(14,165,233,0.45)]"
              >
                Book a Demo
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-[1px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 rounded-full flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <span className={`absolute w-4 h-[1.5px] bg-[#F8FAFC] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${menuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute w-4 h-[1.5px] bg-[#F8FAFC] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${menuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </motion.nav>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2"
            style={{ background: 'rgba(5,11,24,0.96)', backdropFilter: 'blur(48px)', WebkitBackdropFilter: 'blur(48px)' }}
          >
            {!isChatbot && links.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.32, 0.72, 0, 1] }}
                className="text-3xl font-bold text-[#F8FAFC] hover:text-[#0EA5E9] transition-colors duration-300 py-3"
              >
                {link}
              </motion.a>
            ))}

            {/* Chatbot link in mobile */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: (isChatbot ? 0 : links.length) * 0.07, ease: [0.32, 0.72, 0, 1] }}
              className="mt-2"
            >
              <Link
                href="/chatbot"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.06] text-white text-lg font-semibold"
              >
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2h10a1 1 0 011 1v6a1 1 0 01-1 1H5l-3 3V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Chatbot
              </Link>
            </motion.div>

            {!isChatbot && (
              <motion.a
                href="/calendar"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: (links.length + 1) * 0.07, ease: [0.32, 0.72, 0, 1] }}
                className="mt-2 flex items-center gap-2 px-6 py-3 rounded-full bg-[#0EA5E9] text-white text-lg font-semibold shadow-[0_4px_24px_rgba(14,165,233,0.4)]"
              >
                Book a Demo
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </motion.a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
