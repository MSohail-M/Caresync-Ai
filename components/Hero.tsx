'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import ParticleField from './ParticleField'
import MagneticButton from './MagneticButton'

type PhoneState = 'ringing' | 'answering' | 'transcript' | 'booked' | 'sms'

const transcriptLines = [
  { speaker: 'patient', text: "Hi, I'd like to book an appointment" },
  { speaker: 'ai', text: 'Of course! Are you a new or existing patient?' },
  { speaker: 'patient', text: "I'm an existing patient." },
  { speaker: 'ai', text: 'Perfect — I have a slot available. Let me book that for you!' },
]

const features = [
  { icon: '📞', label: 'Answers Every Call' },
  { icon: '📅', label: 'Books Appointments' },
  { icon: '💬', label: 'Sends SMS Confirmations' },
  { icon: '🔄', label: 'Reschedules & Cancels' },
  { icon: '🌙', label: '24/7 Coverage' },
]

export default function Hero() {
  const [phoneState, setPhoneState] = useState<PhoneState>('ringing')
  const [transcriptStep, setTranscriptStep] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const rawY   = useTransform(scrollYProgress, [0, 1], [0, -80])
  const rawTY  = useTransform(scrollYProgress, [0, 1], [0, -50])
  const bgY    = useSpring(rawY,  { stiffness: 60, damping: 18 })
  const textY  = useSpring(rawTY, { stiffness: 60, damping: 18 })

  // Subtle global mouse tilt on the image column
  const tiltX = useSpring(0, { stiffness: 100, damping: 20 })
  const tiltY = useSpring(0, { stiffness: 100, damping: 20 })
  useEffect(() => {
    if (prefersReducedMotion) return
    const onMove = (e: MouseEvent) => {
      tiltX.set(((e.clientY / window.innerHeight) - 0.5) * -8)
      tiltY.set(((e.clientX / window.innerWidth)  - 0.5) *  10)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [prefersReducedMotion, tiltX, tiltY])

  // Phone state cycle
  useEffect(() => {
    const seq: [PhoneState, number][] = [
      ['ringing', 3000], ['answering', 2500], ['transcript', 6000], ['booked', 3000], ['sms', 3000],
    ]
    let idx = 0, t: ReturnType<typeof setTimeout>
    const tick = () => {
      const [s, d] = seq[idx]
      setPhoneState(s)
      if (s === 'transcript') setTranscriptStep(0)
      idx = (idx + 1) % seq.length
      t = setTimeout(tick, d)
    }
    t = setTimeout(tick, seq[0][1])
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (phoneState !== 'transcript') return
    setTranscriptStep(0)
    const ts = transcriptLines.map((_, i) => setTimeout(() => setTranscriptStep(i + 1), i * 1400))
    return () => ts.forEach(clearTimeout)
  }, [phoneState])

  return (
    <section
      ref={heroRef}
      id="features"
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #050B18 0%, #030810 55%, #060C1A 100%)' }}
    >
      {/* ── Fixed grain ── */}
      <div className="pointer-events-none" style={{
        position: 'fixed', inset: 0, zIndex: 1, opacity: 0.022,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
      }} />

      {/* ── Vertical light rays (Pelmatech style) ── */}
      <motion.div style={{ y: bgY, zIndex: 0 }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 58px,
            rgba(59,142,240,0.03) 59px,
            rgba(59,142,240,0.03) 60px
          )`,
        }} />
        {/* Central warm glow — like Pelmatech spotlight */}
        <div className="absolute" style={{
          bottom: '-10%', left: '30%', width: '600px', height: '700px',
          background: 'radial-gradient(ellipse 60% 80% at 50% 80%, rgba(59,142,240,0.18) 0%, rgba(16,185,129,0.06) 40%, transparent 70%)',
          filter: 'blur(40px)', transform: 'translateX(-50%)',
        }} />
      </motion.div>

      {/* ── Cinematic orbs ── */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,142,240,0.14) 0%, transparent 65%)', filter: 'blur(80px)', animation: 'orb-drift 10s ease-in-out infinite', zIndex: 0 }} />
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 65%)', filter: 'blur(100px)', animation: 'orb-drift 12s ease-in-out infinite 2s', zIndex: 0 }} />

      {/* ── Particles ── */}
      <ParticleField count={60} />

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative flex-1 flex flex-col" style={{ zIndex: 10 }}>
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center min-h-[calc(100dvh-180px)]">

            {/* ═══ LEFT: BIG TYPOGRAPHY (Pelmatech style) ═══ */}
            <motion.div style={{ y: textY }} className="flex flex-col justify-center">

              {/* Eyebrow */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.05] mb-6">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inset-0 rounded-full bg-[#10B981] animate-ping opacity-60" />
                    <span className="relative rounded-full bg-[#10B981] w-1.5 h-1.5" />
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[rgba(248,250,252,0.65)]">AI Voice Agent for Clinics</span>
                </div>
              </motion.div>

              {/* MEGA HEADLINE — Pelmatech-sized */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-bold leading-[1.0] tracking-tight mb-6 text-[#F8FAFC]"
              >
                Your AI<br />
                Front Desk,<br />
                <span className="font-serif italic text-gradient-blue">Available 24/7</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: [0.32, 0.72, 0, 1] }}
                className="text-base text-[rgba(248,250,252,0.5)] leading-relaxed mb-8 max-w-md"
              >
                CareSync AI answers every clinic call, verifies patients, books appointments, and sends SMS confirmations — automatically, day and night.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.26, ease: [0.32, 0.72, 0, 1] }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <MagneticButton>
                  <a href="#demo" className="group flex items-center gap-2 pl-5 pr-2 py-3 rounded-full bg-[#3B8EF0] hover:bg-[#2d7de0] text-white font-semibold text-sm transition-colors duration-300 active:scale-[0.98] shadow-[0_0_32px_rgba(59,142,240,0.35)]">
                    Book a Demo
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-[1px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a href="#demo" className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/[0.12] bg-white/[0.05] text-[rgba(248,250,252,0.75)] hover:bg-white/[0.09] hover:text-[#F8FAFC] font-semibold text-sm transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M5.5 4.5L9.5 7L5.5 9.5V4.5Z" fill="currentColor"/></svg>
                    Listen to Demo
                  </a>
                </MagneticButton>
              </motion.div>

              {/* Stat row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34, ease: [0.32, 0.72, 0, 1] }}
                className="flex flex-wrap gap-x-6 gap-y-2"
              >
                {[
                  { v: '94%', l: 'calls answered' },
                  { v: '3×', l: 'more bookings' },
                  { v: '< 2s', l: 'response time' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="text-lg font-bold text-[#3B8EF0]">{s.v}</span>
                    <span className="text-xs text-[rgba(248,250,252,0.45)]">{s.l}</span>
                    {i < 2 && <span className="w-px h-3 bg-white/10 ml-2" />}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ═══ RIGHT: AI RECEPTIONIST + FLOATING UI CARDS (Ezcard style) ═══ */}
            <motion.div
              style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d', perspective: 1000 }}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
              className="relative flex items-center justify-center"
            >
              {/* ── SVG Connector Lines (Ezcard style) ── */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} viewBox="0 0 480 520" preserveAspectRatio="xMidYMid meet">
                {/* Line from top-left chip to image */}
                <path d="M 80 80 Q 120 140 180 200" stroke="rgba(59,142,240,0.2)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                {/* Line from bottom-right chip to image */}
                <path d="M 380 420 Q 340 380 300 320" stroke="rgba(16,185,129,0.2)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                {/* Line from top-right card to image */}
                <path d="M 400 100 Q 360 160 310 210" stroke="rgba(139,92,246,0.15)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
              </svg>

              {/* ── MAIN: AI Receptionist Image ── */}
              <div className="relative" style={{ zIndex: 2 }}>
                {/* Outer double-bezel */}
                <div className="p-2 rounded-[2.5rem]" style={{
                  background: 'rgba(255,255,255,0.04)',
                  boxShadow: '0 0 0 1px rgba(59,142,240,0.2), 0 40px 80px rgba(59,142,240,0.15), 0 80px 160px rgba(0,0,0,0.4)',
                }}>
                  <div className="rounded-[calc(2.5rem-8px)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" style={{ width: 300, height: 380 }}>
                    <img
                      src="/Gemini_Generated_Image_a1e9r2a1e9r2a1e9.png"
                      alt="CareSync AI Voice Agent"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        // Fallback gradient if image not found
                        const el = e.currentTarget.parentElement
                        if (el) el.style.background = 'linear-gradient(135deg, #0A1628 0%, #0d2040 50%, #0A1628 100%)'
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                    {/* Circuit overlay on image */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                      background: 'linear-gradient(to bottom, transparent 60%, rgba(5,11,24,0.6) 100%)',
                    }} />
                  </div>
                </div>

                {/* Glow beneath image */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[200px] h-[60px] rounded-full pointer-events-none" style={{
                  background: 'rgba(59,142,240,0.25)',
                  filter: 'blur(30px)',
                }} />
              </div>

              {/* ── FLOATING CARD 1: Incoming Call (top-left, Pelmatech style) ── */}
              <div className="absolute -top-4 -left-4 lg:-left-12 z-20" style={{ animation: 'float 4s ease-in-out infinite' }}>
                <div className="p-1.5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.3)' }}>
                  <div className="rounded-[calc(1rem)] bg-[#0A1628] px-3 py-2.5 flex items-center gap-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]" style={{ minWidth: 180 }}>
                    <div className="w-8 h-8 rounded-full bg-[#3B8EF0]/15 border border-[#3B8EF0]/25 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3.5A1 1 0 013 2.5h1.5a1 1 0 01.97.757l.4 1.6a1 1 0 01-.285.99L4.85 6.25a6.3 6.3 0 002.9 2.9l.4-.735a1 1 0 01.99-.285l1.6.4A1 1 0 0111.5 9.5V11a1 1 0 01-1 1C5.37 12 2 8.63 2 4.5V3.5z" stroke="#3B8EF0" strokeWidth="1" strokeLinecap="round"/></svg>
                    </div>
                    <div>
                      <div className="text-[9px] text-[rgba(248,250,252,0.4)] uppercase tracking-widest">Incoming Call</div>
                      <div className="text-xs font-semibold text-[#F8FAFC]">Maria Chen</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                        <span className="text-[9px] text-[#10B981]">AI Answering</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── FLOATING CARD 2: Appointment Booked (top-right, Pelmatech UI card style) ── */}
              <div className="absolute -top-8 -right-4 lg:-right-10 z-20" style={{ animation: 'float 4.5s ease-in-out infinite 1.2s' }}>
                <div className="p-1.5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.3)' }}>
                  <div className="rounded-[calc(1rem)] bg-[#0A1628] px-3 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]" style={{ minWidth: 170 }}>
                    <div className="text-[9px] text-[#10B981] uppercase tracking-widest mb-2 font-semibold flex items-center gap-1">
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Appointment Booked
                    </div>
                    <div className="text-xs font-semibold text-[#F8FAFC] mb-0.5">Dr. Johnson</div>
                    <div className="text-[10px] text-[rgba(248,250,252,0.45)]">March 15 · 10:30 AM</div>
                    <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-[9px] text-[rgba(248,250,252,0.35)]">New Patient Visit</span>
                      <span className="text-[9px] font-semibold text-[#3B8EF0]">SMS Sent ✓</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── FLOATING CHIP 3: Response time (bottom-right) ── */}
              <div className="absolute -bottom-2 -right-2 lg:-right-8 z-20" style={{ animation: 'float 3.8s ease-in-out infinite 0.6s' }}>
                <div className="px-3 py-1.5 rounded-full flex items-center gap-2" style={{
                  background: 'rgba(16,185,129,0.1)',
                  boxShadow: '0 0 0 1px rgba(16,185,129,0.2), 0 4px_16px_rgba(0,0,0,0.2)',
                }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-[11px] font-semibold text-[#10B981]">⚡ &lt; 2s response</span>
                </div>
              </div>

              {/* ── FLOATING CHIP 4: 24/7 (bottom-left) ── */}
              <div className="absolute -bottom-6 -left-2 lg:-left-8 z-20" style={{ animation: 'float 5s ease-in-out infinite 2s' }}>
                <div className="px-3 py-1.5 rounded-full flex items-center gap-2" style={{
                  background: 'rgba(139,92,246,0.1)',
                  boxShadow: '0 0 0 1px rgba(139,92,246,0.2), 0 4px 16px rgba(0,0,0,0.2)',
                }}>
                  <span className="text-[11px] font-semibold text-[#8B5CF6]">🌙 24/7 active</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ═══ BOTTOM FEATURE STRIP (Pelmatech style) ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="w-full border-t border-white/[0.06] mt-auto"
          style={{ zIndex: 10 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 py-1">
                  {i > 0 && <div className="hidden sm:block w-px h-4 bg-white/[0.08] -ml-1.5" />}
                  <span className="text-base">{f.icon}</span>
                  <span className="text-[12px] font-medium text-[rgba(248,250,252,0.55)]">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
