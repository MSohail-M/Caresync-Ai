'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Script from 'next/script'
import Nav from '@/components/Nav'

// ── Shadow DOM helpers ────────────────────────────────────────────────────────

function getShadow(): ShadowRoot | null {
  const host = document.querySelector('retell-chat') as (HTMLElement & { shadowRoot: ShadowRoot | null }) | null
  return host?.shadowRoot ?? null
}

/** Inject a <style> sheet into the shadow root (only works if shadow is open) */
function injectShadowCSS(css: string) {
  const shadow = getShadow()
  if (!shadow) return false
  // Avoid duplicate injections
  if (shadow.querySelector('#pcc-overrides')) return true
  const s = document.createElement('style')
  s.id = 'pcc-overrides'
  s.textContent = css
  shadow.appendChild(s)
  return true
}

/** Click a button inside the shadow DOM that contains the given text */
function clickShadowButton(text: string): boolean {
  const shadow = getShadow()
  if (!shadow) return false
  const btns = Array.from(shadow.querySelectorAll('button, [role="button"], a'))
  const match = btns.find(b => b.textContent?.toLowerCase().includes(text.toLowerCase())) as HTMLElement | undefined
  if (match) { match.click(); return true }
  return false
}

const HIDE_BRANDING_CSS = `
  /* ── Hide Retell logo in header ── */
  img[src*="retell" i],
  img[alt*="retell" i],
  svg[class*="logo" i],
  [class*="retell-logo"],
  [class*="logo"][class*="retell"],
  header img, header svg { display: none !important; }

  /* ── Hide "Powered by Retell" footer ── */
  a[href*="retell.ai"],
  [class*="powered"],
  [class*="PoweredBy"],
  footer, [class*="footer"] { display: none !important; }
`

export default function ChatbotPage() {

  useEffect(() => {
    let alive = true
    let lastInput: HTMLElement | null = null
    let brandingHidden = false
    let inboxCleared = false

    // ── 1. composedPath focus fix (Enter refocus) ─────────────────────────
    const captureAndRefocus = (e: KeyboardEvent) => {
      const path = e.composedPath() as EventTarget[]
      const found = path.find(
        t => t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement
      ) as HTMLElement | undefined
      if (found?.isConnected) lastInput = found

      if (e.key === 'Enter' && lastInput) {
        const captured = lastInput
        ;[80, 200, 380, 600, 900, 1300].forEach(ms =>
          setTimeout(() => {
            if (!alive) return
            if (captured.isConnected) { captured.focus(); return }
            if (lastInput?.isConnected) lastInput.focus()
          }, ms)
        )
      }
    }
    document.addEventListener('keydown', captureAndRefocus, true)

    // ── 2. Main setup loop — runs until both goals achieved ───────────────
    const setup = setInterval(() => {
      if (!alive) return
      const host = document.querySelector('retell-chat')
      if (!host) return

      // Hide Retell branding (shadow CSS injection)
      if (!brandingHidden) {
        brandingHidden = injectShadowCSS(HIDE_BRANDING_CSS)
      }

      // Auto-click "Send New Message" to skip the inbox conversation list
      if (!inboxCleared) {
        const clicked = clickShadowButton('new message') || clickShadowButton('new chat') || clickShadowButton('start')
        if (clicked) inboxCleared = true
      }

      // Initial focus
      if (!lastInput) {
        const shadow = getShadow()
        const input = shadow?.querySelector<HTMLElement>('input, textarea')
        if (input) { input.focus(); lastInput = input }
      }

      if (brandingHidden && inboxCleared) clearInterval(setup)
    }, 300)

    // Stop trying after 15s
    const killSetup = setTimeout(() => clearInterval(setup), 15000)

    return () => {
      alive = false
      document.removeEventListener('keydown', captureAndRefocus, true)
      clearInterval(setup)
      clearTimeout(killSetup)
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
