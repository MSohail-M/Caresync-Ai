'use client'

import Script from 'next/script'
import Nav from '@/components/Nav'

export default function CalendarPage() {
  return (
    <main className="relative min-h-[100dvh]" style={{ background: 'linear-gradient(175deg, #050A18 0%, #060E22 60%, #050A18 100%)' }}>
      <Nav />

      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="ray-layer-a opacity-50" />
          <div className="spotlight-glow opacity-40" />
        </div>

        <div className="relative max-w-4xl mx-auto" style={{ zIndex: 1 }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(14,165,233,0.2)] bg-[rgba(14,165,233,0.06)] mb-5">
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[rgba(56,189,248,0.8)]">Book a Demo</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight mb-3 text-[#F8FAFC]">
              Schedule Your <span className="font-serif italic text-gradient-blue">CareSync AI</span> Demo
            </h1>
            <p className="text-base text-[rgba(248,250,252,0.5)] max-w-xl mx-auto">
              Pick a time that works for you and we&apos;ll walk you through how CareSync AI can answer every call, book appointments, and free up your front desk.
            </p>
          </div>

          <div className="p-2 rounded-[1.75rem]" style={{
            background: 'rgba(14,165,233,0.05)',
            boxShadow: '0 0 0 1px rgba(14,165,233,0.18), 0 40px 80px rgba(14,165,233,0.1), 0 60px 120px rgba(0,0,0,0.5)',
          }}>
            <div className="rounded-[calc(1.75rem-8px)] overflow-hidden bg-white" style={{ minHeight: 720 }}>
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/aB0wNVhXWv90C9EIUH57"
                style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: 720 }}
                scrolling="no"
                id="aB0wNVhXWv90C9EIUH57_1781296339339"
              />
            </div>
          </div>
        </div>
      </section>

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </main>
  )
}
