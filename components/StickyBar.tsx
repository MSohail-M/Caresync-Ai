'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const clinicInitials = [
  { i: 'PM', bg: '#0891B2' },
  { i: 'RK', bg: '#0369A1' },
  { i: 'JT', bg: '#0284C7' },
]

export default function StickyBar() {
  const [visible, setVisible]     = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-3 py-2.5 rounded-2xl border border-white/[0.07] backdrop-blur-xl"
          style={{
            background: 'rgba(5,10,24,0.94)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(8,145,178,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Avatars */}
          <div className="flex -space-x-2 shrink-0">
            {clinicInitials.map(({ i, bg }) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-[#050A18] flex items-center justify-center text-[9px] font-bold text-white"
                style={{ background: bg }}
              >
                {i}
              </div>
            ))}
          </div>

          {/* Copy */}
          <div className="hidden sm:block pr-1">
            <p className="text-[12px] font-semibold text-white/90 leading-none whitespace-nowrap">
              500+ clinics answering every call
            </p>
            <p className="text-[11px] text-white/38 mt-0.5">Setup in under 48 hours. No hardware.</p>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-white/[0.07] shrink-0" />

          {/* CTA */}
          <a
            href="/calendar"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 active:scale-[0.97] shrink-0"
            style={{
              background: 'linear-gradient(135deg, #0891B2 0%, #0284C7 100%)',
              boxShadow: '0 0 16px rgba(8,145,178,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            Book a Demo
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="w-6 h-6 rounded-full flex items-center justify-center text-white/25 hover:text-white/55 transition-colors shrink-0"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
