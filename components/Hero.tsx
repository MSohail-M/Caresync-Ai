'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import ParticleField from './ParticleField'
import MagneticButton from './MagneticButton'

type PhoneState = 'ringing' | 'answering' | 'transcript' | 'booked' | 'sms'

const transcriptLines = [
  { speaker: 'patient', text: "Hi, I'd like to book an appointment" },
  { speaker: 'ai',      text: 'Of course! Are you a new or existing patient?' },
  { speaker: 'patient', text: "I'm an existing patient." },
  { speaker: 'ai',      text: 'Perfect — I have a slot. Let me book that for you!' },
]

const bottomFeatures = [
  { label: 'Answers Every Call', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.003 1.19 2 2 0 012 .003h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg> },
  { label: 'Books Appointments', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="9 16 11 18 15 14"/></svg> },
  { label: 'SMS Confirmations', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> },
  { label: 'Reschedules & Cancels', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg> },
  { label: 'EMR/EHR Integrated', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 15 13"/></svg> },
  { label: '24/7 Coverage', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
]

export default function Hero() {
  const [phoneState, setPhoneState]     = useState<PhoneState>('ringing')
  const [transcriptStep, setTranscriptStep] = useState(0)
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  // Parallax
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const rawRayY  = useTransform(scrollYProgress, [0, 1], [0, -60])
  const rawTextY = useTransform(scrollYProgress, [0, 1], [0, -45])
  const rayY  = useSpring(rawRayY,  { stiffness: 55, damping: 18 })
  const textY = useSpring(rawTextY, { stiffness: 55, damping: 18 })

  // Subtle mouse tilt on right column
  const tiltX = useSpring(0, { stiffness: 90, damping: 22 })
  const tiltY = useSpring(0, { stiffness: 90, damping: 22 })
  useEffect(() => {
    if (prefersReducedMotion) return
    const onMove = (e: MouseEvent) => {
      tiltX.set(((e.clientY / window.innerHeight) - 0.5) * -7)
      tiltY.set(((e.clientX / window.innerWidth)  - 0.5) *  9)
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
      style={{ background: 'linear-gradient(175deg, #050A18 0%, #060E22 60%, #050A18 100%)' }}
    >
      {/* ── Fixed grain overlay ── */}
      <div className="pointer-events-none" style={{
        position: 'fixed', inset: 0, zIndex: 1, opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
      }} />

      {/* ── Animated vertical ray layers (Pelmatech 3D depth) ── */}
      <motion.div style={{ y: rayY, zIndex: 0 }} className="absolute inset-0 pointer-events-none">
        <div className="ray-layer-a" />
        <div className="ray-layer-b" />
        {/* Pelmatech bottom spotlight */}
        <div className="spotlight-glow" />
        {/* Extra depth glow — upper right */}
        <div className="absolute top-0 right-0 w-[500px] h-[600px] pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 80% at 100% 20%, rgba(14,165,233,0.08) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }} />
      </motion.div>

      {/* ── Canvas particles ── */}
      <ParticleField count={55} />

      {/* ═══ MAIN LAYOUT ═══ */}
      <div className="relative flex-1 flex flex-col" style={{ zIndex: 10 }}>
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[calc(100dvh-160px)]">

            {/* ═══ LEFT: PELMATECH MEGA TYPOGRAPHY ═══ */}
            <motion.div style={{ y: textY }} className="flex flex-col justify-center order-2 lg:order-1">

              {/* Social proof — above fold, reduces skepticism */}
              <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, ease:[0.32,0.72,0,1] }} className="flex items-center gap-3 mb-5">
                <div className="flex -space-x-2">
                  {['#0891B2','#0369A1','#0284C7','#0EA5E9'].map((bg, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-[#050A18] flex items-center justify-center text-[8px] font-bold text-white" style={{ background: bg }}>{['PM','RK','JT','SL'][i]}</div>
                  ))}
                </div>
                <span className="text-[12px] text-white/45">Trusted by <span className="text-white/75 font-semibold">500+ clinic teams</span> across the US</span>
              </motion.div>

              {/* Eyebrow */}
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.05, ease:[0.32,0.72,0,1] }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(14,165,233,0.2)] bg-[rgba(14,165,233,0.06)] mb-5">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inset-0 rounded-full bg-[#0EA5E9] animate-ping opacity-60" />
                    <span className="relative rounded-full bg-[#0EA5E9] w-1.5 h-1.5" />
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[rgba(56,189,248,0.8)]">AI Voice Agent for Clinics</span>
                </div>
              </motion.div>

              {/* MEGA headline — Pelmatech style: huge, left-aligned, 3 lines */}
              <motion.h1
                initial={{ opacity:0, y:44 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.95, delay:0.08, ease:[0.32,0.72,0,1] }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-bold leading-[1.0] tracking-tight mb-5 text-[#F8FAFC]"
              >
                Front Desk AI<br />
                System for<br />
                <span className="font-serif italic text-gradient-blue">Healthcare 24/7</span>
              </motion.h1>

              <motion.p
                initial={{ opacity:0, y:24 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.7, delay:0.18, ease:[0.32,0.72,0,1] }}
                className="text-base text-[rgba(248,250,252,0.5)] leading-relaxed mb-8 max-w-[440px]"
              >
                CareSync AI answers every clinic call, verifies patients, books appointments, and sends SMS confirmations — automatically, day and night.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.7, delay:0.26, ease:[0.32,0.72,0,1] }}
                className="flex flex-wrap gap-3 mb-8"
              >
                <MagneticButton>
                  <a href="/calendar" className="group flex items-center gap-2 pl-5 pr-2 py-3 rounded-full bg-[#0EA5E9] hover:bg-[#0284C7] text-[#050A18] font-bold text-sm transition-colors duration-300 active:scale-[0.98] shadow-[0_0_32px_rgba(14,165,233,0.4)]">
                    Book a Demo
                    <span className="w-8 h-8 rounded-full bg-[#050A18]/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-[1px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="#050A18" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a href="#demo" className="flex items-center gap-2 px-5 py-3 rounded-full border border-[rgba(14,165,233,0.2)] bg-[rgba(14,165,233,0.06)] text-[rgba(248,250,252,0.75)] hover:bg-[rgba(14,165,233,0.1)] font-semibold text-sm transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M5.5 4.5L9.5 7L5.5 9.5V4.5Z" fill="currentColor"/></svg>
                    Listen to Demo
                  </a>
                </MagneticButton>
              </motion.div>

              {/* Stats */}
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6, delay:0.36 }} className="flex flex-wrap gap-x-6 gap-y-2">
                {[{ v:'94%', l:'calls answered' },{ v:'3×', l:'more bookings' },{ v:'< 2s', l:'response' }].map((s,i)=>(
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="text-lg font-bold text-[#0EA5E9]">{s.v}</span>
                    <span className="text-xs text-[rgba(248,250,252,0.4)]">{s.l}</span>
                    {i<2 && <span className="w-px h-3 bg-[rgba(14,165,233,0.2)] ml-2"/>}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ═══ RIGHT: AI IMAGE + FLOATING CARDS (Ezcard orbit style) ═══ */}
            <motion.div
              style={{ rotateX: tiltX, rotateY: tiltY, transformStyle:'preserve-3d', perspective:1000 }}
              initial={{ opacity:0, x:60 }}
              animate={{ opacity:1, x:0 }}
              transition={{ duration:1.0, delay:0.15, ease:[0.32,0.72,0,1] }}
              className="relative flex items-center justify-center order-1 lg:order-2"
            >
              {/* Voice wave rings — emanate from Casey */}
              {[0, 1, 2, 3].map(i => (
                <div
                  key={i}
                  className="absolute rounded-full pointer-events-none voice-ring"
                  style={{
                    inset: -20 - i * 24,
                    borderColor: `rgba(14,165,233,${0.35 - i * 0.07})`,
                    animationDelay: `${i * 0.75}s`,
                    animationDuration: '3s',
                  }}
                />
              ))}

              {/* SVG connector lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex:1}} viewBox="0 0 440 480" preserveAspectRatio="xMidYMid meet">
                <path d="M 70 70 Q 110 130 175 195"  stroke="rgba(14,165,233,0.18)"  strokeWidth="1" fill="none" strokeDasharray="4 5"/>
                <path d="M 370 380 Q 330 340 290 300" stroke="rgba(56,189,248,0.15)" strokeWidth="1" fill="none" strokeDasharray="4 5"/>
                <path d="M 380 90 Q 345 155 305 210"  stroke="rgba(2,132,199,0.12)"  strokeWidth="1" fill="none" strokeDasharray="4 5"/>
              </svg>

              {/* Main AI receptionist image — double bezel with cursor glow */}
              <div className="relative" style={{zIndex:2}}>
                <div className="p-2 rounded-[2.5rem]" style={{
                  background: 'rgba(14,165,233,0.05)',
                  boxShadow: '0 0 0 1px rgba(14,165,233,0.18), 0 40px 80px rgba(14,165,233,0.12), 0 80px 160px rgba(0,0,0,0.5)',
                }}>
                  <div
                    className="relative rounded-[calc(2.5rem-8px)] overflow-hidden shadow-[inset_0_1px_1px_rgba(56,189,248,0.12)]"
                    style={{width:300,height:380}}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      setCursorPos({
                        x: ((e.clientX - rect.left) / rect.width) * 100,
                        y: ((e.clientY - rect.top) / rect.height) * 100,
                      })
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <img
                      src="/Gemini_Generated_Image_a1e9r2a1e9r2a1e9.png"
                      alt="CareSync AI Voice Agent"
                      className="w-full h-full object-cover object-top"
                      onError={e => {
                        const el = e.currentTarget.parentElement
                        if (el) {
                          el.style.background='linear-gradient(135deg, #0A1628 0%, #06122A 50%, #0A1628 100%)'
                          e.currentTarget.style.display='none'
                        }
                      }}
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{
                      background:'linear-gradient(to bottom, transparent 55%, rgba(5,10,24,0.7) 100%)',
                    }}/>
                    {isHovered && (
                      <div className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 transition-opacity duration-300"
                        style={{ background: `radial-gradient(circle at ${cursorPos.x}% ${cursorPos.y}%, rgba(14,165,233,0.2) 0%, transparent 60%)` }}
                      />
                    )}
                  </div>
                </div>
                {/* Electric blue glow beneath */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[200px] h-[50px] rounded-full pointer-events-none" style={{
                  background:'rgba(14,165,233,0.22)', filter:'blur(28px)',
                }}/>
              </div>

              {/* Decorative ring dial (top-left, dashboard-style) */}
              <div className="absolute -top-12 left-20 lg:-top-8 lg:left-16 z-30" style={{animation:'float 4.5s ease-in-out infinite 0.4s'}}>
                <div className="float-ring-dial w-12 h-12 flex items-center justify-center relative">
                  <svg width="44" height="44" viewBox="0 0 44 44" className="absolute inset-0">
                    <circle cx="22" cy="22" r="18" fill="none" stroke="#E2E8F0" strokeWidth="3"/>
                    <circle cx="22" cy="22" r="18" fill="none" stroke="#0EA5E9" strokeWidth="3" strokeDasharray="106 113" strokeLinecap="round" transform="rotate(-90 22 22)"/>
                  </svg>
                  <span className="text-[9px] font-extrabold text-[#0A1628]">94%</span>
                </div>
              </div>

              {/* Floating card 1: Calls Handled (top-left, dashboard-style white card) */}
              <div className="absolute -top-2 -left-2 lg:-left-14 z-20" style={{animation:'float 4s ease-in-out infinite'}}>
                <div className="float-card-light p-4" style={{minWidth:188}}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wide">Calls Handled</span>
                    <span className="text-[#94A3B8] text-xs">↗</span>
                  </div>
                  <div className="text-[34px] font-extrabold leading-none mb-3 tracking-tight text-[#0A1628]">1,204</div>
                  <div className="flex items-center gap-2 pt-2.5 border-t border-[#E2E8F0]">
                    <div className="w-7 h-7 rounded-full bg-[#0EA5E9] flex items-center justify-center text-sm shrink-0">🤖</div>
                    <div>
                      <div className="text-[11px] font-bold text-[#0A1628]">This Month</div>
                      <div className="text-[10px] text-[#64748B]">94% answer rate</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card 2: AI Performance (top-right, dashboard-style accent card) */}
              <div className="absolute -top-8 -right-2 lg:-right-14 z-20" style={{animation:'float 4.5s ease-in-out infinite 1.2s'}}>
                <div className="float-card-accent p-4" style={{minWidth:172}}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wide">AI Performance</span>
                    <span className="text-xs">↗</span>
                  </div>
                  <div className="flex items-end gap-1 h-10 mb-3">
                    {[0.4,0.7,0.5,0.9,0.6,1,0.75].map((h,i)=>(
                      <div key={i} className="flex-1 rounded-full bg-white" style={{height:`${h*100}%`, opacity:0.5+h*0.5}}/>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-2.5 border-t border-white/25">
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm shrink-0">🎙️</div>
                    <div>
                      <div className="text-[11px] font-bold">Voice AI</div>
                      <div className="text-[10px] text-white/75">Real-time response</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pill: response time */}
              <div className="absolute -bottom-2 -right-2 lg:-right-8 z-20" style={{animation:'float 3.8s ease-in-out infinite 0.6s'}}>
                <div className="float-pill-light px-4 py-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0EA5E9] flex items-center justify-center shrink-0">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="text-[12px] font-bold">&lt; 2s response</span>
                </div>
              </div>

              {/* Pill: 24/7 */}
              <div className="absolute -bottom-6 -left-2 lg:-left-8 z-20" style={{animation:'float 5s ease-in-out infinite 2s'}}>
                <div className="float-pill-light px-4 py-2 flex items-center gap-2">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inset-0 rounded-full bg-[#0EA5E9] animate-ping opacity-60"/>
                    <span className="relative rounded-full bg-[#0EA5E9] w-1.5 h-1.5"/>
                  </span>
                  <span className="text-[12px] font-bold">24/7 Active</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Active Call indicator */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[rgba(14,165,233,0.08)] border border-[rgba(14,165,233,0.2)]"
              style={{ animation: 'neon-pulse 2s ease-in-out infinite' }}>
              <div className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
              <span className="text-xs font-semibold text-[#38BDF8]">Casey is online</span>
              <div className="flex items-center gap-0.5 h-4 ml-1">
                {[0.5,0.8,1,0.7,0.6,1,0.4].map((h,i)=>(
                  <div key={i} className="w-0.5 rounded-full bg-[#0EA5E9]" style={{
                    height:`${h*14}px`,
                    animation:`waveform ${0.5+i*0.08}s ease-in-out infinite ${i*0.1}s`
                  }}/>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ BOTTOM FEATURE STRIP (Pelmatech style) ═══ */}
        <motion.div
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.5 }}
          className="w-full border-t border-[rgba(14,165,233,0.1)] mt-auto"
          style={{zIndex:10}}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {bottomFeatures.map((f,i)=>(
                <div key={i} className="flex items-center gap-2">
                  {i>0 && <div className="hidden sm:block w-px h-3.5 bg-[rgba(14,165,233,0.15)]"/>}
                  <span className="text-[rgba(248,250,252,0.4)]">{f.icon}</span>
                  <span className="text-[12px] font-medium text-[rgba(248,250,252,0.5)]">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
