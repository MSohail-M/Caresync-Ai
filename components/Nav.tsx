'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Live Demo',    href: '#demo' },
  { label: 'Results',      href: '#results' },
]

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
            <svg width="30" height="20" viewBox="0 0 70 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="navLogoG" x1="0" y1="0" x2="70" y2="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#27AE60"/>
                  <stop offset="50%" stopColor="#16A085"/>
                  <stop offset="100%" stopColor="#1B6FA4"/>
                </linearGradient>
              </defs>
              <ellipse cx="22" cy="22" rx="18" ry="13" stroke="#1B6FA4" strokeWidth="4" fill="none" opacity="0.7"/>
              <ellipse cx="48" cy="22" rx="18" ry="13" stroke="#1B6FA4" strokeWidth="4" fill="none" opacity="0.7"/>
              <path d="M35 22 C31 14 23 8 17 8 C9 8 4 14 4 22 C4 30 9 36 17 36 C23 36 31 30 35 22 Z" stroke="url(#navLogoG)" strokeWidth="4.5" fill="none"/>
              <path d="M35 22 C39 14 47 8 53 8 C61 8 66 14 66 22 C66 30 61 36 53 36 C47 36 39 30 35 22 Z" stroke="url(#navLogoG)" strokeWidth="4.5" fill="none"/>
            </svg>
            <span className="text-sm font-bold text-[#F8FAFC] tracking-tight">CareSync AI</span>
          </Link>

          {/* Desktop Links — only on main page */}
          {!isChatbot && (
            <div className="hidden md:flex items-center gap-1">
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="px-4 py-2 rounded-full text-sm font-medium text-[rgba(248,250,252,0.6)] hover:text-[#F8FAFC] hover:bg-white/[0.07] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  {label}
                </a>
              ))}
            </div>
          )}

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2 ml-2">
            {/* Phone number */}
            <a
              href="tel:+15717034510"
              className="flex items-center gap-2 pl-4 pr-4 py-2 rounded-full border border-white/10 bg-white/[0.06] text-[rgba(248,250,252,0.85)] text-sm font-semibold hover:bg-white/[0.12] hover:border-white/20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 1.5h2l1.2 3.2-1.4 1.4a8 8 0 004.6 4.6l1.4-1.4 3.2 1.2v2c0 .8-.7 1.5-1.5 1.5C7.5 14 2 8.5 2 3c0-.8.7-1.5 1.5-1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              1-571-703-4510
            </a>

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
            {!isChatbot && links.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.32, 0.72, 0, 1] }}
                className="text-3xl font-bold text-[#F8FAFC] hover:text-[#0EA5E9] transition-colors duration-300 py-3"
              >
                {label}
              </motion.a>
            ))}

            {!isChatbot && (
              <motion.a
                href="tel:+15717034510"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: links.length * 0.07, ease: [0.32, 0.72, 0, 1] }}
                className="mt-2 flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.06] text-white text-lg font-semibold"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 1.5h2l1.2 3.2-1.4 1.4a8 8 0 004.6 4.6l1.4-1.4 3.2 1.2v2c0 .8-.7 1.5-1.5 1.5C7.5 14 2 8.5 2 3c0-.8.7-1.5 1.5-1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                1-571-703-4510
              </motion.a>
            )}

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
