'use client'

import { motion } from 'framer-motion'
import Script from 'next/script'
import Nav from '@/components/Nav'

export default function ChatbotPage() {
  return (
    <>
      {/* ── Retell Chat Widget — exact embed from docs ── */}
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

      {/*
        Force the widget to be static full-page on this route.
        Retell renders a <retell-chat> custom element — we expand it to fill the
        area below the nav and hide the floating launcher pill.
      */}
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
        {/* Background atmosphere */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,142,240,0.15) 0%, transparent 65%)', filter: 'blur(80px)', animation: 'orb-drift 12s ease-in-out infinite' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 65%)', filter: 'blur(100px)', animation: 'orb-drift 14s ease-in-out infinite 3s' }} />
        <div className="absolute bottom-0 left-0 right-0 h-[25%] overflow-hidden pointer-events-none">
          <div className="perspective-grid-dark" style={{ opacity: 0.25 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #050B18 0%, transparent 60%)' }} />
        </div>

        <Nav />

        {/* Header — visible above the chat widget */}
        <div className="relative z-10 pt-28 pb-4 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.06] mb-4">
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
