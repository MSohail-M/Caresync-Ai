'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Script from 'next/script'
import Nav from '@/components/Nav'

export default function ChatbotPage() {
  const lastActivityRef = useRef(0)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let alive = true

    // ── Track any user interaction inside / near the chat widget ──────────
    const markActivity = () => { lastActivityRef.current = Date.now() }

    // keydown anywhere → user was typing in chat
    document.addEventListener('keydown', markActivity, true)

    // pointerdown on the widget area → user clicked in chat
    const onPointer = (e: PointerEvent) => {
      const host = document.querySelector('retell-chat')
      if (!host) return
      const r = host.getBoundingClientRect()
      if (e.clientX >= r.left && e.clientX <= r.right &&
          e.clientY >= r.top  && e.clientY <= r.bottom) {
        markActivity()
      }
    }
    document.addEventListener('pointerdown', onPointer, true)

    // ── Refocus loop: if body has focus shortly after chat activity ────────
    // Click at the bottom of the chat element where the input lives.
    // Works with iframe-based widgets — no shadow DOM access needed.
    const focusLoop = setInterval(() => {
      if (!alive) return
      const active = document.activeElement
      if (active && active !== document.body && active !== document.documentElement) return
      if (Date.now() - lastActivityRef.current > 900) return   // stale — don't steal focus

      const host = document.querySelector('retell-chat')
      if (!host) return
      const r = host.getBoundingClientRect()
      if (r.width === 0) return

      // Click bottom-center of the widget panel — that's where the text input is
      const target = document.elementFromPoint(r.left + r.width / 2, r.bottom - 36) as HTMLElement | null
      if (target && target !== document.body && target !== document.documentElement) {
        target.click()
        lastActivityRef.current = 0   // reset so we don't loop infinitely
      }
    }, 180)

    // ── Overlay positioning: cover Retell logo with our own branding ───────
    // The widget panel header is ~56px tall. We read its position from
    // getBoundingClientRect and reposition the overlay every 300ms.
    const overlay = overlayRef.current
    const positionOverlay = () => {
      if (!overlay || !alive) return
      const host = document.querySelector('retell-chat')
      if (!host) return
      const r = host.getBoundingClientRect()
      if (r.width === 0) { overlay.style.display = 'none'; return }

      overlay.style.display     = 'flex'
      overlay.style.top         = r.top + 'px'
      overlay.style.left        = r.left + 'px'
      overlay.style.width       = r.width + 'px'
      // Cover just the logo zone — left 70% of the header, 56px tall
      overlay.style.height      = '56px'
      overlay.style.maxWidth    = '70%'
    }
    const posLoop = setInterval(positionOverlay, 300)
    positionOverlay()

    return () => {
      alive = false
      document.removeEventListener('keydown', markActivity, true)
      document.removeEventListener('pointerdown', onPointer, true)
      clearInterval(focusLoop)
      clearInterval(posLoop)
    }
  }, [])

  return (
    <>
      <Script
        id="retell-widget"
        src="https://dashboard.retellai.com/retell-widget-v2.js"
        strategy="afterInteractive"
        data-public-key="public_key_9a7798ad73f1686e462f5"
        data-agent-id="agent_9f15f68497ac5143bbb8f9c14c"
        data-title="CareSync AI"
        data-bot-name="CareSync AI"
        data-color="#3B8EF0"
        data-theme-color="#050B18"
        data-component-color="#0A1628"
        data-fab-text="Chat with AI"
        data-popup-message="Hi! How can I help you today?"
        data-show-ai-popup="true"
        data-show-ai-popup-time="1"
        data-auto-open="true"
      />

      <style>{`
        retell-chat {
          position: fixed !important;
          top: 76px !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100vw !important;
          height: calc(100dvh - 76px) !important;
          max-width: 100% !important;
          max-height: 100% !important;
          border-radius: 0 !important;
          z-index: 30 !important;
          display: block !important;
        }
      `}</style>

      {/*
        Overlay that covers the Retell logo in the widget header.
        Pointer-events: none so the close button (right side) still works.
        Positioned dynamically via the effect above.
      */}
      {/* Branding overlay — covers Retell logo, shows CareSync logo instead */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          zIndex: 40,
          display: 'none',
          alignItems: 'center',
          gap: 10,
          paddingLeft: 14,
          background: '#0A1628',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {/* CareSync infinity logo SVG */}
        <svg width="30" height="20" viewBox="0 0 70 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="csG" x1="0" y1="0" x2="70" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#27AE60"/>
              <stop offset="50%" stopColor="#16A085"/>
              <stop offset="100%" stopColor="#1B6FA4"/>
            </linearGradient>
          </defs>
          {/* Back ring – blue */}
          <ellipse cx="22" cy="22" rx="18" ry="13" stroke="#1B6FA4" strokeWidth="4" fill="none" opacity="0.7"/>
          <ellipse cx="48" cy="22" rx="18" ry="13" stroke="#1B6FA4" strokeWidth="4" fill="none" opacity="0.7"/>
          {/* Front infinity – gradient */}
          <path d="M35 22 C31 14 23 8 17 8 C9 8 4 14 4 22 C4 30 9 36 17 36 C23 36 31 30 35 22 Z" stroke="url(#csG)" strokeWidth="4.5" fill="none"/>
          <path d="M35 22 C39 14 47 8 53 8 C61 8 66 14 66 22 C66 30 61 36 53 36 C47 36 39 30 35 22 Z" stroke="url(#csG)" strokeWidth="4.5" fill="none"/>
        </svg>
        <span style={{ color: '#F8FAFC', fontWeight: 700, fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.01em' }}>
          CareSync AI
        </span>
      </div>

      <div
        className="min-h-[100dvh] relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #050B18 0%, #030810 100%)' }}
      >
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,142,240,0.15) 0%, transparent 65%)', filter: 'blur(80px)', animation: 'orb-drift 12s ease-in-out infinite' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 65%)', filter: 'blur(100px)', animation: 'orb-drift 14s ease-in-out infinite 3s' }} />
        <div className="absolute bottom-0 left-0 right-0 h-[25%] overflow-hidden pointer-events-none">
          <div className="perspective-grid-dark" style={{ opacity: 0.25 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #050B18 0%, transparent 60%)' }} />
        </div>

        <Nav />

        <div className="relative z-10 pt-28 pb-3 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.06] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[rgba(248,250,252,0.65)]">
                AI Chat Assistant · Online 24/7
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] leading-tight tracking-tight">
              Chat with{' '}
              <span className="font-serif italic text-gradient-blue">CareSync AI</span>
            </h1>
          </motion.div>
        </div>
      </div>
    </>
  )
}
