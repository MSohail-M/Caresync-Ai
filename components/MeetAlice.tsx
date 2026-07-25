'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const capabilities = [
  { text: 'Answers every inbound call in under 2 seconds' },
  { text: 'Books & reschedules appointments directly in eCW' },
  { text: 'Verifies insurance eligibility in real time' },
  { text: 'Routes prescription refill requests to provider' },
  { text: 'Sends appointment reminders & recall messages' },
]

const conversation = [
  { role: 'patient', name: 'Patient', text: "Hi, I need to reschedule my appointment with Dr. Patel for next week." },
  { role: 'casey',   name: 'Casey',   text: "Of course! I can see your appointment is on Tuesday the 22nd at 2 PM. Would Thursday the 24th at 10 AM work for you?" },
  { role: 'patient', name: 'Patient', text: "Yes, Thursday morning is perfect." },
  { role: 'casey',   name: 'Casey',   text: "Done! I've updated your appointment to Thursday July 24th at 10:00 AM with Dr. Patel. You'll receive a confirmation text shortly." },
]

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3.5 py-2.5 rounded-2xl w-fit bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.18)]">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#10B981]"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

export default function MeetAlice() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [showTyping, setShowTyping] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (!inView) return
    let current = 0
    const show = () => {
      if (current >= conversation.length) return
      if (conversation[current].role === 'casey') {
        setShowTyping(true)
        setTimeout(() => {
          setShowTyping(false)
          setVisibleLines(current + 1)
          current++
          setTimeout(show, 650)
        }, 1100)
      } else {
        setVisibleLines(current + 1)
        current++
        setTimeout(show, 750)
      }
    }
    const t = setTimeout(show, 500)
    return () => clearTimeout(t)
  }, [inView])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F0FDF4 50%, #ECFDF5 100%)' }}
    >
      {/* Subtle bg glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.14) 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-none">
            Meet <span className="font-serif italic text-gradient-blue">Casey</span>
          </h2>
          <p className="mt-3 text-base text-[#64748B] max-w-lg mx-auto leading-relaxed">
            A HIPAA-compliant AI agent that handles your front desk 24/7 — so your staff can focus on patients, not phone calls.
          </p>
        </motion.div>

        {/* 2-col: capabilities card | chat */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* ── LEFT: identity + capabilities card ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.32, 0.72, 0, 1] }}
            className="rounded-3xl border border-[rgba(16,185,129,0.15)] bg-white p-7 pb-6 self-center"
            style={{ boxShadow: '0 4px 40px rgba(16,185,129,0.07), 0 1px 4px rgba(0,0,0,0.04)' }}
          >
            {/* HIPAA pill — top right */}
            <div className="flex items-center justify-between mb-7">
              <div className="flex items-center gap-2.5">
                {/* Status dot */}
                <div className="relative w-3 h-3">
                  <motion.div className="absolute inset-0 rounded-full bg-[#10B981] opacity-40" animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
                  <div className="relative w-3 h-3 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-sm font-semibold text-[#059669]">Casey is online</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[rgba(16,185,129,0.25)] bg-[rgba(16,185,129,0.06)]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                </svg>
                <span className="text-[10px] font-semibold text-[#059669]">HIPAA</span>
              </div>
            </div>

            {/* Name + role */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#0F172A]">Casey</h3>
              <p className="text-sm text-[#059669] font-medium mt-0.5">AI Healthcare Receptionist · eCW Native</p>
            </div>

            {/* Capabilities */}
            <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.2em] mb-4">What Casey handles</p>
            <div className="space-y-3 mb-7">
              {capabilities.map(({ text }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.28 + i * 0.07 }}
                  className="flex items-start gap-2.5"
                >
                  <div className="shrink-0 mt-0.5 w-4.5 h-4.5 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="7" fill="rgba(16,185,129,0.12)"/>
                      <path d="M4 7l2 2 4-4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[13px] text-[#334155] leading-snug">{text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/calendar"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 60%, #0D9488 100%)', boxShadow: '0 4px 16px rgba(16,185,129,0.25)' }}
            >
              Meet Casey — Book a Demo
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M3 11L11 3M11 3H5.5M11 3V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>

          {/* ── RIGHT: live chat panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.32, 0.72, 0, 1] }}
            className="rounded-3xl border border-[rgba(16,185,129,0.15)] bg-white overflow-hidden self-center"
            style={{ boxShadow: '0 4px 40px rgba(16,185,129,0.07), 0 1px 4px rgba(0,0,0,0.04)' }}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(16,185,129,0.1)]" style={{ background: 'rgba(16,185,129,0.04)' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(5,150,105,0.15), rgba(13,148,136,0.15))' }}>
                  <svg width="13" height="13" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="14" r="7" fill="#059669" opacity="0.9"/>
                    <path d="M6 36c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="#059669" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-[#0F172A]">Casey</p>
                  <div className="flex items-center gap-1">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
                    <p className="text-[10px] text-[#059669]">Active · Vocryn AI Primary Care</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                </svg>
                <span className="text-[9px] font-bold text-[#059669] tracking-wide">HIPAA</span>
              </div>
            </div>

            {/* Messages */}
            <div className="p-5 space-y-3 min-h-[230px]">
              <AnimatePresence>
                {conversation.slice(0, visibleLines).map(({ role, name, text }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-2.5 ${role === 'casey' ? '' : 'flex-row-reverse'}`}
                  >
                    <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold mt-0.5 ${
                      role === 'casey' ? 'bg-[rgba(16,185,129,0.12)] text-[#065F46]' : 'bg-[rgba(15,23,42,0.06)] text-[#475569]'
                    }`}>
                      {role === 'casey' ? 'AI' : 'P'}
                    </div>
                    <div className={`max-w-[80%] ${role === 'patient' ? 'flex flex-col items-end' : ''}`}>
                      <p className={`text-[9px] font-semibold mb-1 ${role === 'casey' ? 'text-[#059669]' : 'text-[#94A3B8]'}`}>{name}</p>
                      <div
                        className="px-3.5 py-2.5 text-[12px] leading-relaxed"
                        style={role === 'casey'
                          ? { background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.18)', color: '#065F46', borderRadius: '4px 14px 14px 14px' }
                          : { background: 'rgba(15,23,42,0.04)', border: '1px solid rgba(15,23,42,0.07)', color: '#334155', borderRadius: '14px 4px 14px 14px' }
                        }
                      >
                        {text}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {showTyping && (
                  <motion.div key="typing" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-2.5">
                    <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold bg-[rgba(16,185,129,0.12)] text-[#065F46]">AI</div>
                    <TypingDots />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Booking confirmation */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="mx-5 mb-4 rounded-xl p-3.5 border"
              style={{ background: '#DCFCE7', borderColor: 'rgba(16,185,129,0.3)' }}
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(16,185,129,0.2)' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="9 16 11 18 15 14"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#065F46]">Appointment Rescheduled</p>
                  <p className="text-[10px] text-[#059669] mt-0.5">Thu Jul 24 · 10:00 AM · Dr. Patel</p>
                  <p className="text-[10px] text-[#34D399] mt-0.5">✓ Updated in eClinicalWorks · SMS sent</p>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="px-5 pb-5 grid grid-cols-3 gap-2">
              {[{ val: '< 2s', label: 'Answer time' }, { val: '99.3%', label: 'Accuracy' }, { val: '24/7', label: 'Availability' }].map(({ val, label }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.1 }}
                  className="rounded-xl px-2 py-2.5 text-center border border-[rgba(16,185,129,0.15)]"
                  style={{ background: 'rgba(16,185,129,0.05)' }}
                >
                  <p className="text-[14px] font-bold text-[#059669]">{val}</p>
                  <p className="text-[9px] text-[#94A3B8] mt-0.5">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
