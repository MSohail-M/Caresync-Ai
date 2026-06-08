'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Nav from '@/components/Nav'

const RETELL_PUBLIC_KEY = 'public_key_9a7798ad73f1686e462f5'
const RETELL_AGENT_ID   = 'agent_9f15f68497ac5143bbb8f9c14c'

export default function ChatbotPage() {
  useEffect(() => {
    // Remove any existing instance to avoid duplicates
    document.getElementById('retell-widget-js')?.remove()

    const script = document.createElement('script')
    script.id   = 'retell-widget-js'
    script.src  = 'https://dashboard.retellai.com/retell-widget-v2.js'
    script.type = 'module'
    script.setAttribute('data-public-key',       RETELL_PUBLIC_KEY)
    script.setAttribute('data-agent-id',         RETELL_AGENT_ID)
    script.setAttribute('data-title',            'CareSync AI Assistant')
    script.setAttribute('data-button-text',      'Chat with AI')
    document.head.appendChild(script)

    // Once loaded, force the widget open and expand it to fill the container
    const attemptOpen = () => {
      // Try the retell-chat web component API
      const el = document.querySelector('retell-chat') as HTMLElement & { open?: () => void }
      if (el) {
        // If the element exposes an open() method use it, otherwise click the FAB
        if (typeof el.open === 'function') {
          el.open()
        } else {
          const fab = el.shadowRoot?.querySelector('button') as HTMLElement
          fab?.click()
        }
        clearInterval(poller)
      }
    }
    const poller = setInterval(attemptOpen, 200)
    const timeout = setTimeout(() => clearInterval(poller), 8000)

    return () => {
      clearInterval(poller)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      {/*
        Force the Retell widget to behave as a static full-page embed on this route.
        The selectors below target the widget's shadow host and common inner containers.
        If Retell updates their DOM structure these may need tweaking.
      */}
      <style>{`
        /* Expand widget host to fill page below nav */
        retell-chat {
          position: fixed !important;
          top: 80px !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100vw !important;
          height: calc(100dvh - 80px) !important;
          max-width: 100% !important;
          max-height: 100% !important;
          z-index: 30 !important;
          border-radius: 0 !important;
        }
        /* Hide the default floating pill / FAB launcher */
        retell-chat::part(launcher),
        retell-chat::part(fab),
        retell-chat::part(button) {
          display: none !important;
        }
      `}</style>

      <div
        className="min-h-[100dvh] relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #050B18 0%, #030810 100%)' }}
      >
        {/* Glow orbs — background atmosphere */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,142,240,0.15) 0%, transparent 65%)', filter: 'blur(80px)', animation: 'orb-drift 12s ease-in-out infinite' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 65%)', filter: 'blur(100px)', animation: 'orb-drift 14s ease-in-out infinite 3s' }} />

        {/* Perspective grid */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] overflow-hidden pointer-events-none">
          <div className="perspective-grid-dark" style={{ opacity: 0.3 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #050B18 0%, transparent 60%)' }} />
        </div>

        <Nav />

        {/* Page content — visible while widget loads */}
        <div className="relative z-10 flex flex-col items-center justify-start pt-32 pb-8 px-4 min-h-[100dvh]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.06] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[rgba(248,250,252,0.65)]">
                AI Chat Assistant
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] leading-tight tracking-tight mb-3">
              Chat with{' '}
              <span className="font-serif italic text-gradient-blue">CareSync AI</span>
            </h1>
            <p className="text-[rgba(248,250,252,0.45)] text-base max-w-md mx-auto">
              Ask about appointments, clinic hours, insurance, or anything else. Our AI is here 24/7.
            </p>
          </motion.div>

          {/* Loading state — replaced visually once Retell widget opens */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="w-full max-w-2xl"
          >
            <div
              className="p-2 rounded-[2rem]"
              style={{ background: 'rgba(255,255,255,0.04)', boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 32px 80px rgba(0,0,0,0.4)' }}
            >
              <div
                className="rounded-[calc(2rem-8px)] p-8 flex flex-col items-center gap-4"
                style={{ background: '#0A1628', minHeight: 320, boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06)' }}
              >
                {/* Animated loading dots */}
                <div className="flex items-center gap-1.5 mt-8">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#3B8EF0]"
                      style={{ animation: `waveform 0.8s ease-in-out infinite ${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <p className="text-[rgba(248,250,252,0.4)] text-sm">Connecting to CareSync AI...</p>

                {/* Feature chips */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {['Book appointments', 'Check availability', 'Insurance questions', 'Clinic hours'].map(chip => (
                    <span
                      key={chip}
                      className="px-3 py-1.5 rounded-full text-[11px] font-medium text-[rgba(248,250,252,0.5)]"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
