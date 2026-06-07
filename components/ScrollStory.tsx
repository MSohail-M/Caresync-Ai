'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, AnimatePresence, useMotionValueEvent } from 'framer-motion'

const steps = [
  { id: 'ring',   icon: '📞', title: 'Patient Calls',          desc: 'A patient dials your clinic number at any hour of the day or night.',                                                          color: '#3B8EF0' },
  { id: 'ai',     icon: '🤖', title: 'AI Answers Naturally',   desc: 'CareSync AI picks up within 2 rings with a warm, clinic-trained voice. No hold music, no voicemail.',                          color: '#10B981' },
  { id: 'verify', icon: '✅', title: 'Patient Verified',       desc: "AI collects name, date of birth, and phone to confirm the patient's identity — instantly and accurately.",                       color: '#3B8EF0' },
  { id: 'book',   icon: '📅', title: 'Appointment Booked',     desc: 'AI checks real-time calendar availability and books the slot directly into your system. No staff needed.',                      color: '#10B981' },
  { id: 'sms',    icon: '💬', title: 'Confirmation SMS Sent',  desc: 'Patient receives an instant text with appointment details, address, and prep instructions. Done.',                              color: '#8B5CF6' },
  { id: 'log',    icon: '📋', title: 'Everything Logged',      desc: 'Every call is transcribed, summarized, and logged in your dashboard. Staff review at a glance — one click.',                    color: '#10B981' },
]

const phonePanels: Record<string, React.ReactNode> = {
  ring: (
    <div className="flex flex-col items-center pt-6">
      <div className="text-[10px] text-[rgba(248,250,252,0.4)] uppercase tracking-widest mb-2 font-semibold">Incoming Call</div>
      <div className="relative flex items-center justify-center w-16 h-16 my-4">
        <span className="absolute inset-0 rounded-full border border-[#3B8EF0]/30 animate-pulse-ring" />
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: 'rgba(59,142,240,0.12)', border: '1px solid rgba(59,142,240,0.2)' }}>👩‍⚕️</div>
      </div>
      <div className="text-sm font-bold text-[#F8FAFC] mb-0.5">Maria Chen</div>
      <div className="text-xs text-[rgba(248,250,252,0.4)]">Calling your clinic...</div>
    </div>
  ),
  ai: (
    <div className="flex flex-col items-center pt-6">
      <div className="text-[10px] text-[#10B981] uppercase tracking-widest font-semibold mb-2">AI Active</div>
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-3" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)' }}>🤖</div>
      <div className="flex items-center gap-1 h-10">
        {[0.4, 0.8, 1, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
          <div key={i} className="w-1 rounded-full" style={{ height: `${h * 32}px`, background: `rgba(59,142,240,${0.4 + h * 0.6})`, animation: `waveform ${0.6 + i * 0.08}s ease-in-out infinite ${i * 0.1}s` }} />
        ))}
      </div>
      <div className="text-xs text-[rgba(248,250,252,0.4)] mt-2 text-center px-2">&ldquo;Thank you for calling. How can I help?&rdquo;</div>
    </div>
  ),
  verify: (
    <div className="flex flex-col pt-4 gap-2">
      <div className="text-[10px] text-[#10B981] uppercase tracking-widest font-semibold mb-1">Verification</div>
      {['Name: Maria Chen', 'DOB: Apr 12, 1988', 'Phone: ✓ Confirmed'].map((item, i) => (
        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="text-xs text-[rgba(248,250,252,0.75)]">{item}</span>
        </div>
      ))}
    </div>
  ),
  book: (
    <div className="flex flex-col pt-4">
      <div className="text-[10px] text-[#3B8EF0] uppercase tracking-widest font-semibold mb-3">Booking Now...</div>
      <div className="p-3 rounded-2xl" style={{ background: 'rgba(59,142,240,0.08)', border: '1px solid rgba(59,142,240,0.15)' }}>
        <div className="text-[10px] text-[rgba(248,250,252,0.4)] mb-2 uppercase tracking-widest">New Appointment</div>
        <div className="text-xs font-semibold text-[#F8FAFC]">Dr. Johnson</div>
        <div className="text-xs text-[rgba(248,250,252,0.5)] mt-0.5">March 15 · 10:30 AM</div>
        <div className="mt-2 flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span className="text-[10px] text-[#10B981] font-semibold">Confirmed</span>
        </div>
      </div>
    </div>
  ),
  sms: (
    <div className="flex flex-col pt-4">
      <div className="text-[10px] text-[#8B5CF6] uppercase tracking-widest font-semibold mb-3">SMS Sent</div>
      <div className="p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="text-[10px] text-[rgba(248,250,252,0.35)] mb-2">To: Maria · (555) 012-3456</div>
        <div className="text-xs text-[rgba(248,250,252,0.7)] leading-relaxed">
          ✓ Appt confirmed: Dr. Johnson, March 15, 10:30 AM. Reply CANCEL to cancel.
        </div>
      </div>
    </div>
  ),
  log: (
    <div className="flex flex-col pt-3 gap-2">
      <div className="text-[10px] text-[rgba(248,250,252,0.4)] uppercase tracking-widest font-semibold mb-1">Call Log</div>
      {[
        { time: '10:14 AM', action: 'Call answered' },
        { time: '10:15 AM', action: 'Patient verified' },
        { time: '10:16 AM', action: 'Appt booked' },
        { time: '10:16 AM', action: 'SMS sent' },
      ].map((row, i) => (
        <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          <span className="text-[10px] text-[rgba(248,250,252,0.35)] w-12 shrink-0">{row.time}</span>
          <span className="text-xs text-[rgba(248,250,252,0.65)]">{row.action}</span>
        </div>
      ))}
    </div>
  ),
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const next = Math.min(Math.floor(latest * steps.length), steps.length - 1)
    if (next !== activeIndex) setActiveIndex(next)
  })

  const active = steps[activeIndex]

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${steps.length * 100}vh`, background: '#050B18' }}
      id="how-it-works"
    >
      {/* Ambient glow orbs — static behind sticky container */}
      <div className="sticky top-0 min-h-[100dvh] flex flex-col justify-center overflow-hidden">

        {/* Glow orbs */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,142,240,0.09) 0%, transparent 65%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)', filter: 'blur(100px)' }} />

        {/* Perspective grid at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[25%] overflow-hidden pointer-events-none">
          <div className="perspective-grid-dark" style={{ opacity: 0.35 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #050B18 0%, transparent 60%)' }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          {/* Section header */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3B8EF0]/20 bg-[#3B8EF0]/[0.06] mb-5">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3B8EF0]">How It Works</span>
              </div>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#F8FAFC]">
              From First Ring to Booked Appointment —{' '}
              <span className="font-serif italic text-gradient-blue">Fully Automated</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── LEFT: Phone mockup ── */}
            <div className="flex justify-center">
              <div className="relative w-[230px]">
                <div className="p-2 rounded-[2.5rem] ring-1 ring-white/[0.08]" style={{ background: 'rgba(255,255,255,0.04)', boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 8px 32px rgba(59,142,240,0.12)' }}>
                  <div className="rounded-[calc(2.5rem-8px)] overflow-hidden" style={{ background: '#0A1628', minHeight: 370, boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06)' }}>
                    <div className="flex justify-center pt-4 pb-2">
                      <div className="w-12 h-1 rounded-full bg-white/10" />
                    </div>
                    {/* Animated screen */}
                    <div className="relative px-4 pb-6" style={{ minHeight: 310 }}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={active.id}
                          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                        >
                          {phonePanels[active.id]}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Step progress dots below phone */}
                <div className="flex justify-center gap-1.5 mt-5">
                  {steps.map((s, i) => (
                    <div
                      key={s.id}
                      className="rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                      style={{
                        width: i === activeIndex ? 20 : 6,
                        height: 6,
                        background: i === activeIndex ? active.color : 'rgba(255,255,255,0.2)',
                        boxShadow: i === activeIndex ? `0 0 8px ${active.color}80` : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Active step card ── */}
            <div className="relative">
              {/* Step counter */}
              <div className="flex items-center gap-3 mb-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`num-${activeIndex}`}
                    initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                    className="text-[72px] font-bold font-serif leading-none tabular-nums"
                    style={{
                      background: `linear-gradient(135deg, ${active.color} 0%, transparent 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      opacity: 0.25,
                    }}
                  >
                    {String(activeIndex + 1).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-xs text-[rgba(248,250,252,0.3)] font-medium">{activeIndex + 1} / {steps.length}</span>
              </div>

              {/* Big step card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`card-${activeIndex}`}
                  initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                >
                  {/* Double-bezel */}
                  <div className="p-2 rounded-[2rem]" style={{ background: 'rgba(255,255,255,0.04)', boxShadow: `0 0 0 1px rgba(255,255,255,0.07), 0 0 60px ${active.color}10` }}>
                    <div className="rounded-[calc(2rem-8px)] p-8" style={{ background: 'linear-gradient(135deg, #0A1628 0%, #050B18 100%)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06)', borderTop: `2px solid ${active.color}30` }}>

                      {/* Icon */}
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shrink-0" style={{ background: `${active.color}12`, border: `1px solid ${active.color}20` }}>
                        {active.icon}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] mb-4 leading-tight">
                        {active.title}
                      </h3>
                      <p className="text-base text-[rgba(248,250,252,0.55)] leading-relaxed">
                        {active.desc}
                      </p>

                      {/* Colored accent bar at bottom */}
                      <div className="mt-8 h-[2px] rounded-full" style={{ background: `linear-gradient(to right, ${active.color}60, transparent)` }} />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Scroll hint (only on first step) */}
              <AnimatePresence>
                {activeIndex === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="flex items-center gap-2 mt-6"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2v10M3 8l4 4 4-4" stroke="rgba(248,250,252,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xs text-[rgba(248,250,252,0.3)]">Scroll to continue</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
