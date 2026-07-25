'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const capabilities = [
  { icon: '📞', text: 'Answers every inbound call in under 2 seconds' },
  { icon: '📅', text: 'Books & reschedules directly in eClinicalWorks' },
  { icon: '🔍', text: 'Verifies insurance eligibility in real time' },
  { icon: '💊', text: 'Routes prescription refill requests to provider' },
  { icon: '📲', text: 'Sends appointment reminders & recall messages' },
]

const conversation = [
  { role: 'patient', name: 'Patient', text: "Hi, I need to reschedule my appointment with Dr. Patel for next week." },
  { role: 'casey',   name: 'Casey',   text: "Of course! I see your appointment is Tuesday the 22nd at 2 PM. Would Thursday the 24th at 10 AM work for you?" },
  { role: 'patient', name: 'Patient', text: "Yes, Thursday morning is perfect." },
  { role: 'casey',   name: 'Casey',   text: "Done! Rescheduled to Thursday July 24th at 10:00 AM with Dr. Patel. You'll get a confirmation text shortly." },
]

/* Typing indicator dots */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3.5 py-2.5 rounded-2xl w-fit" style={{ background: 'rgba(79,190,120,0.12)', border: '1px solid rgba(79,190,120,0.2)' }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: '#4FBE78' }}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, delay: i * 0.2, repeat: Infinity }}
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
      if (current < conversation.length) {
        // show typing for casey lines
        if (conversation[current].role === 'casey') {
          setShowTyping(true)
          setTimeout(() => {
            setShowTyping(false)
            setVisibleLines(current + 1)
            current++
            setTimeout(show, 700)
          }, 1200)
        } else {
          setVisibleLines(current + 1)
          current++
          setTimeout(show, 800)
        }
      }
    }
    const t = setTimeout(show, 600)
    return () => clearTimeout(t)
  }, [inView])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-0"
      style={{ background: 'linear-gradient(160deg, #0A1628 0%, #0D2137 45%, #0A2A1E 100%)' }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[-10%] left-[5%] w-[500px] h-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #0A5783 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-5%] right-[10%] w-[400px] h-[400px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #339D65 0%, transparent 70%)' }} />
        <div className="absolute top-[30%] left-[40%] w-[600px] h-[300px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #14757C 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center pt-16 pb-10"
        >
          {/* Online status */}
          <div className="inline-flex items-center gap-2 mb-4">
            <motion.div
              className="w-2 h-2 rounded-full bg-[#4FBE78]"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="text-[13px] font-semibold text-[#4FBE78]">Casey is online</span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.0]">
            Meet{' '}
            <span
              className="font-serif italic"
              style={{ background: 'linear-gradient(120deg, #4FBE78 0%, #14757C 50%, #0A5783 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              Casey
            </span>
          </h2>
          <p className="mt-3 text-base text-white/45 max-w-lg mx-auto">
            Your HIPAA-compliant AI receptionist — answering every call, booking every appointment, 24/7.
          </p>
        </motion.div>

        {/* ── 3-col layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px_1fr] gap-6 lg:gap-0 items-end pb-0">

          {/* ── LEFT: Capabilities card ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
            className="lg:pb-16 lg:pr-8"
          >
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Agent identity */}
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/8">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #0A5783, #339D65)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="14" r="7" fill="white" opacity="0.9"/>
                    <path d="M6 36c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Casey</p>
                  <p className="text-[11px] text-[#4FBE78]">AI Healthcare Receptionist</p>
                </div>
                {/* HIPAA badge */}
                <div className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: 'rgba(79,190,120,0.1)', border: '1px solid rgba(79,190,120,0.25)' }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#4FBE78" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                  <span className="text-[9px] font-bold text-[#4FBE78] tracking-wider">HIPAA</span>
                </div>
              </div>

              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">What Casey handles</p>
              <div className="space-y-3 mb-6">
                {capabilities.map(({ icon, text }, i) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-base shrink-0">{icon}</span>
                    <span className="text-[13px] text-white/70 leading-snug">{text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[{ v: '< 2s', l: 'Answer' }, { v: '24/7', l: 'Online' }, { v: '20+', l: 'Languages' }].map(s => (
                  <div key={s.l} className="text-center rounded-xl py-2.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="text-[14px] font-bold text-[#4FBE78]">{s.v}</p>
                    <p className="text-[9px] text-white/35 mt-0.5 uppercase tracking-wider">{s.l}</p>
                  </div>
                ))}
              </div>

              <a
                href="/calendar"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
                style={{ background: 'linear-gradient(120deg, #0A5783 0%, #14757C 50%, #339D65 100%)', boxShadow: '0 4px 20px rgba(20,117,124,0.4)' }}
              >
                Book a Demo with Casey
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </motion.div>

          {/* ── CENTER: Casey portrait ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center items-end"
            style={{ zIndex: 10 }}
          >
            {/* Glow rings behind Casey */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none">
              {[280, 340, 400].map((size, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: size, height: size,
                    bottom: -size * 0.25,
                    background: `radial-gradient(circle, ${i === 0 ? 'rgba(20,117,124,0.22)' : i === 1 ? 'rgba(10,87,131,0.14)' : 'rgba(51,157,101,0.10)'} 0%, transparent 70%)`,
                    filter: 'blur(2px)',
                  }}
                  animate={{ scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3.5 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}
                />
              ))}
            </div>

            {/* Ground glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-16 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(20,117,124,0.5) 0%, transparent 70%)', filter: 'blur(16px)' }} />

            {/* Casey image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/casey-agent.png"
              alt="Casey — Vocryn AI Receptionist"
              className="relative w-full max-w-[320px] lg:max-w-[340px] object-contain object-bottom select-none"
              style={{
                filter: 'drop-shadow(0 20px 60px rgba(20,117,124,0.5)) drop-shadow(0 4px 16px rgba(0,0,0,0.4))',
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              }}
              draggable={false}
            />

            {/* Floating "Casey · Online" status chip */}
            <motion.div
              initial={{ opacity: 0, y: 10, x: 20 }}
              animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute top-8 right-0 lg:-right-4 flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: 'rgba(10,22,40,0.88)', border: '1px solid rgba(79,190,120,0.3)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
            >
              <motion.div className="w-2 h-2 rounded-full bg-[#4FBE78]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
              <div>
                <p className="text-[11px] font-bold text-white leading-none">Casey</p>
                <p className="text-[9px] text-[#4FBE78] mt-0.5">Online · Vocryn AI</p>
              </div>
            </motion.div>

            {/* Floating HIPAA chip */}
            <motion.div
              initial={{ opacity: 0, y: 10, x: -20 }}
              animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="absolute top-24 left-0 lg:-left-6 flex items-center gap-1.5 px-3 py-2 rounded-xl"
              style={{ background: 'rgba(10,22,40,0.88)', border: '1px solid rgba(10,87,131,0.4)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#7FC9F0" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              <span className="text-[10px] font-bold text-[#7FC9F0]">HIPAA Compliant</span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Live chat panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="lg:pb-16 lg:pl-8"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Chat header */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #0A5783, #339D65)' }}>
                  <svg width="14" height="14" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="14" r="7" fill="white" opacity="0.9"/>
                    <path d="M6 36c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white">Casey</p>
                  <div className="flex items-center gap-1.5">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-[#4FBE78]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
                    <p className="text-[10px] text-[#4FBE78]">Active · Vocryn AI Primary Care</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-3 min-h-[260px]">
                <AnimatePresence>
                  {conversation.slice(0, visibleLines).map(({ role, name, text }, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className={`flex gap-2.5 ${role === 'casey' ? '' : 'flex-row-reverse'}`}
                    >
                      <div
                        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
                        style={role === 'casey'
                          ? { background: 'linear-gradient(135deg, #0A5783, #339D65)', color: 'white' }
                          : { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }
                        }
                      >
                        {role === 'casey' ? 'AI' : 'P'}
                      </div>
                      <div className={`max-w-[82%] ${role === 'patient' ? 'items-end flex flex-col' : ''}`}>
                        <p className="text-[9px] font-semibold mb-1" style={{ color: role === 'casey' ? '#4FBE78' : 'rgba(255,255,255,0.35)' }}>{name}</p>
                        <div
                          className="px-3 py-2 rounded-2xl text-[12px] leading-relaxed"
                          style={role === 'casey'
                            ? { background: 'rgba(79,190,120,0.12)', border: '1px solid rgba(79,190,120,0.2)', color: 'rgba(255,255,255,0.85)', borderRadius: '4px 14px 14px 14px' }
                            : { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', borderRadius: '14px 4px 14px 14px' }
                          }
                        >
                          {text}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {showTyping && (
                    <motion.div key="typing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-2.5">
                      <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: 'linear-gradient(135deg, #0A5783, #339D65)', color: 'white' }}>AI</div>
                      <TypingIndicator />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Booking confirmation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="mx-4 mb-4 p-3 rounded-xl"
                style={{ background: 'rgba(79,190,120,0.1)', border: '1px solid rgba(79,190,120,0.25)' }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(79,190,120,0.2)' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4FBE78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="9 16 11 18 15 14"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#4FBE78]">Appointment Rescheduled</p>
                    <p className="text-[10px] text-[#4FBE78]/70 mt-0.5">Thu Jul 24 · 10:00 AM · Dr. Patel</p>
                    <p className="text-[9px] text-white/30 mt-0.5">✓ Updated in eClinicalWorks · SMS sent</p>
                  </div>
                </div>
              </motion.div>

              {/* Footer bar */}
              <div className="px-4 pb-4 grid grid-cols-3 gap-2">
                {[{ v: '< 2s', l: 'Response' }, { v: '99.3%', l: 'Accuracy' }, { v: '24/7', l: 'Available' }].map(s => (
                  <div key={s.l} className="text-center rounded-xl py-2.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="text-[13px] font-bold text-[#4FBE78]">{s.v}</p>
                    <p className="text-[9px] text-white/30 mt-0.5 uppercase tracking-wider">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
