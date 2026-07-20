'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Live Demo',    href: '#demo' },
  { label: 'Results',      href: '#results' },
  { label: 'Contact Us',   href: '/calendar' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isChatbot = pathname === '/chatbot'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* ── Full-width sticky header ── */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={scrolled
          ? { background: 'rgba(255,255,255,0.97)', borderBottom: '1px solid rgba(16,185,129,0.12)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', boxShadow: '0 1px 20px rgba(0,0,0,0.06)' }
          : { background: 'rgba(255,255,255,0.92)', borderBottom: '1px solid rgba(16,185,129,0.08)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/telvyn-logo.svg"
                alt="TelVyn"
                className="h-10 w-auto"
                style={{ maxWidth: 180 }}
              />
            </Link>

            {/* ── Desktop nav links (center) ── */}
            {!isChatbot && (
              <nav className="hidden md:flex items-center gap-1">
                {links.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="px-4 py-2 rounded-lg text-[14px] font-medium text-[#475569] hover:text-[#0F172A] hover:bg-[rgba(15,23,42,0.05)] transition-all duration-300"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            )}

            {/* ── Right: phone + CTA ── */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+15717034510"
                className="flex items-center gap-1.5 text-[14px] font-medium text-[#64748B] hover:text-[#0F172A] transition-colors duration-300"
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 1.5h2l1.2 3.2-1.4 1.4a8 8 0 004.6 4.6l1.4-1.4 3.2 1.2v2c0 .8-.7 1.5-1.5 1.5C7.5 14 2 8.5 2 3c0-.8.7-1.5 1.5-1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                1-571-703-4510
              </a>

              {!isChatbot && (
                <a
                  href="/calendar"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[14px] font-bold text-white transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)', boxShadow: '0 2px 12px rgba(16,185,129,0.3)' }}
                >
                  Book a Demo
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              )}
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[rgba(15,23,42,0.05)] transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`absolute w-5 h-[1.5px] bg-[#0F172A] transition-all duration-400 ${menuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
              <span className={`absolute w-5 h-[1.5px] bg-[#0F172A] transition-all duration-400 ${menuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile fullscreen overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2"
            style={{ background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
          >
            {!isChatbot && links.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="text-3xl font-bold text-[#0F172A] hover:text-[#10B981] transition-colors duration-300 py-3"
              >
                {label}
              </motion.a>
            ))}

            {!isChatbot && (
              <motion.a
                href="tel:+15717034510"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4, delay: links.length * 0.06 }}
                className="mt-4 flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(15,23,42,0.12)] bg-[rgba(15,23,42,0.04)] text-[#334155] text-lg font-semibold"
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
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4, delay: (links.length + 1) * 0.06 }}
                className="mt-2 flex items-center gap-2 px-8 py-3.5 rounded-xl text-white text-lg font-bold"
                style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' }}
              >
                Book a Demo
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
