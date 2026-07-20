'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const capabilities = [
  { text: 'Answers every inbound call in under 2 seconds' },
  { text: 'Books & reschedules appointments directly in eCW' },
  { text: 'Verifies insurance eligibility in real time' },
  { text: 'Routes prescription refill requests to provider' },
  { text: 'Sends appointment reminders & recall messages' },
]

const conversation = [
  { role: 'patient', name: 'Patient', text: "Hi, I need to reschedule my appointment with Dr. Patel for next week." },
  { role: 'alice',   name: 'Alice',   text: "Of course! I can see your appointment is on Tuesday the 22nd at 2 PM. Would Thursday the 24th at 10 AM work for you?" },
  { role: 'patient', name: 'Patient', text: "Yes, Thursday morning is perfect." },
  { role: 'alice',   name: 'Alice',   text: "Done! I've updated your appointment to Thursday July 24th at 10:00 AM with Dr. Patel. You'll receive a confirmation text shortly." },
]

export default function MeetAlice() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F0FDF4 40%, #ECFDF5 100%)' }}>
      {/* Subtle bg glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-30" style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.07)] mb-4">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#10B981]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="text-[11px] font-semibold text-[#059669] uppercase tracking-[0.2em]">Your AI Receptionist</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-none">
            Meet <span className="font-serif italic text-gradient-blue">Alice</span>
          </h2>
          <p className="mt-3 text-base text-[#64748B] max-w-lg mx-auto leading-relaxed">
            A HIPAA-compliant AI agent that handles your front desk 24/7 — so your staff can focus on patients, not phone calls.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── Left: Agent identity card ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="relative rounded-3xl border border-[rgba(16,185,129,0.15)] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(16,185,129,0.08), 0 8px 40px rgba(16,185,129,0.08), 0 2px 8px rgba(0,0,0,0.04)' }}
          >
            {/* HIPAA badge — top right */}
            <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(16,185,129,0.25)] bg-[rgba(16,185,129,0.07)]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
              <span className="text-[11px] font-semibold text-[#059669]">HIPAA Compliant</span>
            </div>

            {/* Avatar + name */}
            <div className="flex items-center gap-5 mb-8">
              {/* Avatar with pulse rings */}
              <div className="relative shrink-0">
                {[1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-[rgba(16,185,129,0.3)]"
                    animate={{ scale: [1, 1.3 + i * 0.2], opacity: [0.5, 0] }}
                    transition={{ duration: 2.2, delay: i * 0.7, repeat: Infinity, ease: 'easeOut' }}
                  />
                ))}
                <div className="relative w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #DCFCE7 0%, #A7F3D0 100%)', border: '2px solid rgba(16,185,129,0.25)' }}>
                  {/* Stylized agent avatar */}
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="14" r="7" fill="#059669" opacity="0.9"/>
                    <path d="M6 36c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="#059669" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
                  </svg>
                </div>
                {/* Live dot */}
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white border-2 border-white flex items-center justify-center">
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-[#10B981]"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#0F172A]">Alice</h3>
                <p className="text-sm text-[#059669] font-semibold mt-0.5">AI Healthcare Receptionist</p>
                <p className="text-xs text-[#94A3B8] mt-1">24/7 · 20+ Languages · eCW Native</p>
              </div>
            </div>

            {/* Capabilities */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.18em] mb-4">What Alice handles</p>
              {capabilities.map(({ text }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.07, ease: [0.32, 0.72, 0, 1] }}
                  className="flex items-start gap-3"
                >
                  <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background: 'rgba(16,185,129,0.12)' }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sm text-[#334155] leading-snug">{text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="/calendar"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 60%, #0D9488 100%)', boxShadow: '0 4px 16px rgba(16,185,129,0.25)' }}
            >
              Meet Alice — Book a Demo
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 11L11 3M11 3H5.5M11 3V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>

          {/* ── Right: Live conversation mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="relative rounded-3xl border border-[rgba(16,185,129,0.15)] bg-white overflow-hidden"
            style={{ boxShadow: '0 0 0 1px rgba(16,185,129,0.08), 0 8px 40px rgba(16,185,129,0.08), 0 2px 8px rgba(0,0,0,0.04)' }}
          >
            {/* Mockup header bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(16,185,129,0.1)]" style={{ background: 'rgba(16,185,129,0.04)' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.12)' }}>
                  <svg width="13" height="13" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="14" r="7" fill="#059669" opacity="0.9"/>
                    <path d="M6 36c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="#059669" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-[#0F172A]">Alice</p>
                  <div className="flex items-center gap-1">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
                    <p className="text-[10px] text-[#059669]">Active · TelVyn Primary Care</p>
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
                <span className="text-[9px] font-bold text-[#059669] tracking-wide">HIPAA</span>
              </div>
            </div>

            {/* Conversation */}
            <div className="p-5 space-y-4">
              {conversation.map(({ role, name, text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.35 + i * 0.12, ease: [0.32, 0.72, 0, 1] }}
                  className={`flex gap-3 ${role === 'alice' ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Avatar badge */}
                  <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    role === 'alice'
                      ? 'bg-[rgba(16,185,129,0.12)] text-[#065F46]'
                      : 'bg-[rgba(15,23,42,0.06)] text-[#475569]'
                  }`}>
                    {role === 'alice' ? 'AI' : 'P'}
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[78%] ${role === 'patient' ? 'text-right' : ''}`}>
                    <p className={`text-[10px] font-semibold mb-1 ${role === 'alice' ? 'text-[#059669]' : 'text-[#64748B]'}`}>{name}</p>
                    <div
                      className="px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed"
                      style={role === 'alice'
                        ? { background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#065F46' }
                        : { background: 'rgba(15,23,42,0.04)', border: '1px solid rgba(15,23,42,0.07)', color: '#334155' }
                      }
                    >
                      {text}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Booking confirmation card */}
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.85, ease: [0.32, 0.72, 0, 1] }}
                className="mx-0 mt-2 rounded-xl p-4 border"
                style={{ background: '#DCFCE7', borderColor: 'rgba(16,185,129,0.35)' }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(16,185,129,0.2)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                      <polyline points="9 16 11 18 15 14"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#065F46]">Appointment Rescheduled</p>
                    <p className="text-[11px] text-[#059669] mt-0.5">Thu Jul 24 · 10:00 AM · Dr. Patel</p>
                    <p className="text-[10px] text-[#34D399] mt-1">✓ Updated in eClinicalWorks · SMS confirmation sent</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats footer */}
            <div className="px-5 pb-5">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: '< 2s', label: 'Answer time' },
                  { val: '99.3%', label: 'Accuracy' },
                  { val: '24/7', label: 'Availability' },
                ].map(({ val, label }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    className="rounded-xl px-3 py-2.5 text-center border border-[rgba(16,185,129,0.15)]"
                    style={{ background: 'rgba(16,185,129,0.05)' }}
                  >
                    <p className="text-[15px] font-bold text-[#059669]">{val}</p>
                    <p className="text-[10px] text-[#94A3B8] mt-0.5">{label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
