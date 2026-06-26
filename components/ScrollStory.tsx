'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Data ──────────────────────────────────────────────────── */
const steps = [
  {
    id: 'ring',
    icon: '📞',
    shortLabel: 'Patient Calls',
    title: 'Patient Calls',
    desc: 'A patient dials your clinic number at any hour of the day or night — no hold music, no voicemail.',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.22)',
  },
  {
    id: 'ai',
    icon: '🤖',
    shortLabel: 'AI Answers',
    title: 'AI Answers Naturally',
    desc: "CareSync AI picks up within 2 rings with a warm, clinic-trained voice. Patients cannot tell the difference.",
    color: '#059669',
    glow: 'rgba(5,150,105,0.22)',
  },
  {
    id: 'verify',
    icon: '✅',
    shortLabel: 'Verified',
    title: 'Patient Verified',
    desc: "The AI collects name, date of birth, and phone number to instantly confirm the patient's identity.",
    color: '#0D9488',
    glow: 'rgba(13,148,136,0.22)',
  },
  {
    id: 'book',
    icon: '📅',
    shortLabel: 'Booked',
    title: 'Appointment Booked',
    desc: 'CareSync checks real-time calendar availability and books the appointment directly — no staff needed.',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.22)',
  },
  {
    id: 'sms',
    icon: '💬',
    shortLabel: 'SMS Sent',
    title: 'Confirmation SMS Sent',
    desc: 'Patient gets an instant confirmation text with appointment details, clinic address, and prep instructions.',
    color: '#059669',
    glow: 'rgba(5,150,105,0.22)',
  },
  {
    id: 'log',
    icon: '📋',
    shortLabel: 'Logged',
    title: 'Everything Logged',
    desc: 'Every call is transcribed, summarized, and logged in your clinic dashboard — searchable and audit-ready.',
    color: '#0D9488',
    glow: 'rgba(13,148,136,0.22)',
  },
]

/* ── Phone panels ──────────────────────────────────────────── */
const phonePanels: Record<string, React.ReactNode> = {
  ring: (
    <div className="flex flex-col items-center pt-6 px-3">
      <div className="text-[9px] text-[#64748B] uppercase tracking-widest mb-3 font-semibold">Incoming Call</div>
      <div className="relative flex items-center justify-center w-16 h-16 my-1">
        <span className="absolute inset-0 rounded-full border-2 border-[#10B981]/30 animate-pulse" />
        <span className="absolute -inset-3 rounded-full border border-[#10B981]/15" style={{ animation: 'pulse 2s ease-in-out infinite 0.4s' }} />
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: 'rgba(16,185,129,0.1)', border: '1.5px solid rgba(16,185,129,0.2)' }}>👩‍⚕️</div>
      </div>
      <div className="text-sm font-bold text-[#0F172A] mb-0.5 mt-3">Alpha Brao</div>
      <div className="text-xs text-[#64748B]">Calling your clinic…</div>
      <div className="mt-4 flex gap-3">
        <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-sm">📵</div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm" style={{ background: '#10B981' }}>📞</div>
      </div>
    </div>
  ),
  ai: (
    <div className="flex flex-col items-center pt-5 px-3">
      <div className="text-[9px] text-[#10B981] uppercase tracking-widest font-bold mb-3">AI Answering</div>
      <div className="w-12 h-12 rounded-full overflow-hidden mb-3 shrink-0" style={{ border: '1.5px solid rgba(16,185,129,0.25)', boxShadow: '0 4px 12px rgba(16,185,129,0.15)' }}>
        <img src="/Gemini_Generated_Image_a1e9r2a1e9r2a1e9.png" alt="CareSync AI" className="w-full h-full object-cover object-top" />
      </div>
      <div className="flex items-center gap-0.5 h-8 mb-2">
        {[0.4, 0.8, 1, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4].map((h, i) => (
          <div key={i} className="w-1 rounded-full" style={{ height: `${h * 28}px`, background: `rgba(16,185,129,${0.4 + h * 0.5})`, animation: `waveform ${0.6 + i * 0.07}s ease-in-out infinite ${i * 0.09}s` }} />
        ))}
      </div>
      <div className="text-[10px] text-[#64748B] text-center italic">"Thank you for calling — how can I help?"</div>
    </div>
  ),
  verify: (
    <div className="flex flex-col pt-4 gap-2 px-3">
      <div className="text-[9px] text-[#0D9488] uppercase tracking-widest font-bold mb-1">Verifying Patient</div>
      {[
        { label: 'Name', value: 'Alpha Brao' },
        { label: 'DOB', value: 'Apr 12, 1988' },
        { label: 'Phone', value: '(555) 012-3456' },
      ].map((row, i) => (
        <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl" style={{ background: 'rgba(13,148,136,0.07)', border: '1px solid rgba(13,148,136,0.15)' }}>
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="text-[9px] text-[#94A3B8] w-9 shrink-0">{row.label}</span>
          <span className="text-[10px] text-[#1E293B] font-medium">{row.value}</span>
        </div>
      ))}
      <div className="mt-1 text-[10px] text-[#0D9488] font-semibold flex items-center gap-1">✓ Identity confirmed</div>
    </div>
  ),
  book: (
    <div className="flex flex-col pt-4 px-3">
      <div className="text-[9px] text-[#10B981] uppercase tracking-widest font-bold mb-2">Booking Appointment</div>
      <div className="p-2.5 rounded-xl mb-2" style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.15)' }}>
        <div className="text-[9px] text-[#94A3B8] mb-1.5 uppercase tracking-wide">New Appointment</div>
        <div className="text-xs font-bold text-[#0F172A]">Dr. Johnson</div>
        <div className="text-[10px] text-[#64748B]">Thursday, Mar 20 · 10:30 AM</div>
        <div className="text-[10px] text-[#64748B]">Follow-up · 30 min</div>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
        <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
        <span className="text-[10px] text-[#10B981] font-bold">Confirmed in calendar</span>
      </div>
    </div>
  ),
  sms: (
    <div className="flex flex-col pt-4 px-3">
      <div className="text-[9px] text-[#059669] uppercase tracking-widest font-bold mb-2">SMS Sent ✓</div>
      <div className="p-2.5 rounded-xl rounded-tl-none" style={{ background: 'rgba(15,23,42,0.04)', border: '1px solid rgba(15,23,42,0.07)' }}>
        <div className="text-[9px] text-[#94A3B8] mb-1">To: Alpha · (555) 012-3456</div>
        <div className="text-[10px] text-[#334155] leading-relaxed">✅ Appt: Dr. Johnson, Thu Mar 20, 10:30 AM. Lakeview Clinic. Reply CANCEL to cancel.</div>
      </div>
      <div className="mt-2 text-[10px] text-[#94A3B8]">Delivered · 10:17 AM</div>
    </div>
  ),
  log: (
    <div className="flex flex-col pt-3 gap-1.5 px-3">
      <div className="text-[9px] text-[#64748B] uppercase tracking-widest font-bold mb-1">Call Log</div>
      {[
        { t: '10:14', a: 'Call answered', c: '#10B981' },
        { t: '10:15', a: 'Patient verified', c: '#0D9488' },
        { t: '10:16', a: 'Appointment booked', c: '#10B981' },
        { t: '10:17', a: 'SMS sent', c: '#059669' },
      ].map((r, i) => (
        <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-xl" style={{ background: 'rgba(15,23,42,0.03)', border: '1px solid rgba(15,23,42,0.06)' }}>
          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: r.c }} />
          <span className="text-[9px] text-[#94A3B8] w-10 shrink-0 font-mono">{r.t}</span>
          <span className="text-[10px] text-[#334155]">{r.a}</span>
        </div>
      ))}
    </div>
  ),
}

const AUTOPLAY_MS = 4200
const N = steps.length

/* ── Step icon renderer — swaps 🤖 for model photo ──────────── */
const MODEL_IMG = '/Gemini_Generated_Image_a1e9r2a1e9r2a1e9.png'

function StepIcon({ icon, size }: { icon: string; size: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'lg' ? 40 : size === 'md' ? 28 : 18
  if (icon === '🤖') {
    return (
      <div
        style={{
          width: dim, height: dim, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
          border: '1.5px solid rgba(16,185,129,0.28)',
          boxShadow: '0 2px 8px rgba(16,185,129,0.18)',
        }}
      >
        <img src={MODEL_IMG} alt="CareSync AI" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
      </div>
    )
  }
  const textSize = size === 'lg' ? '1.75rem' : size === 'md' ? '1.1rem' : '0.85rem'
  return <span style={{ fontSize: textSize, lineHeight: 1 }}>{icon}</span>
}

/* ── Spring configs ────────────────────────────────────────── */
const HAND_SPRING = { type: 'spring' as const, stiffness: 52, damping: 16 }

/* ── Component ─────────────────────────────────────────────── */
export default function ScrollStory() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [orbitR, setOrbitR] = useState(200)
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  /* Responsive orbit radius — 40% of container width */
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const w = containerRef.current.offsetWidth
      setOrbitR(Math.floor(w * 0.40))
    }
    update()
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const advance = useCallback(() => setActiveIdx(i => (i + 1) % N), [])
  useEffect(() => {
    timerRef.current = setInterval(advance, AUTOPLAY_MS)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [advance])

  const goTo = useCallback((i: number) => {
    setActiveIdx(i)
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(advance, AUTOPLAY_MS)
  }, [advance])

  const active = steps[activeIdx]

  /*
   * CLOCK HAND MATH
   * ─────────────────
   * Nodes are at FIXED positions on the orbit ring (no ring rotation).
   * Node i is placed using CSS:  rotate(i*60deg) translateY(-R)
   * So node 0 = 12 o'clock, node 1 = 2 o'clock, node 2 = 4 o'clock, etc.
   *
   * The hand div extends UPWARD from center (bottom at 50%, transformOrigin: 'bottom center').
   * At rotate(0°) the hand points to 12 o'clock (node 0).
   * At rotate(60°) the hand points to 2 o'clock (node 1).
   * → hand rotation = activeIdx * 60   ✓
   */
  const handAngle = activeIdx * (360 / N)

  return (
    <section
      id="how-it-works"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F0FDF8 0%, #FFFFFF 100%)' }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.09) 0%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.12) 1px, transparent 1px)', backgroundSize: '36px 36px', opacity: 0.35 }} />
      </div>

      <div className="relative z-10 max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(16,185,129,0.25)] bg-[rgba(16,185,129,0.08)] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#059669]">How It Works</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-tight leading-tight">
            From First Ring to{' '}
            <span className="font-serif italic text-gradient-blue">Booked Appointment</span>
          </h2>
          <p className="mt-4 text-lg text-[#64748B] max-w-lg mx-auto">
            Six steps. Fully automated. Zero staff required.
          </p>
        </motion.div>

        {/* ── Main layout ── */}
        <div
          className="flex flex-col xl:flex-row items-center justify-center gap-6 xl:gap-10"
          onMouseEnter={() => timerRef.current && clearInterval(timerRef.current)}
          onMouseLeave={() => {
            if (timerRef.current) clearInterval(timerRef.current)
            timerRef.current = setInterval(advance, AUTOPLAY_MS)
          }}
        >

          {/* ══ ORBIT ══ */}
          <div className="w-full xl:flex-shrink-0 flex justify-center">
            <div
              ref={containerRef}
              className="relative w-full max-w-[580px] xl:w-[580px]"
              style={{ aspectRatio: '1' }}
            >
              {/* ── Decorative SVG rings ── */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 580 580" fill="none" preserveAspectRatio="xMidYMid meet">
                {/* Slow-spinning dotted outer ring */}
                <circle cx="290" cy="290" r="232" stroke="rgba(16,185,129,0.14)" strokeWidth="1.5" strokeDasharray="5 9" />
                {/* Static middle ring */}
                <circle cx="290" cy="290" r="130" stroke="rgba(16,185,129,0.07)" strokeWidth="1" />
                {/* Inner ring */}
                <circle cx="290" cy="290" r="82" stroke="rgba(16,185,129,0.1)" strokeWidth="1" strokeDasharray="3 5" />
              </svg>

              {/* ── Slow decorative spin on orbit ring overlay ── */}
              <motion.svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 580 580" fill="none"
                animate={{ rotate: 360 }}
                transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '290px 290px' }}
              >
                {/* Tick marks that travel around the orbit */}
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 15 - 90) * Math.PI / 180
                  const r = 232
                  const x1 = 290 + (r - 5) * Math.cos(angle)
                  const y1 = 290 + (r - 5) * Math.sin(angle)
                  const x2 = 290 + (r + 3) * Math.cos(angle)
                  const y2 = 290 + (r + 3) * Math.sin(angle)
                  return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={i % 4 === 0 ? 'rgba(16,185,129,0.35)' : 'rgba(16,185,129,0.1)'}
                      strokeWidth={i % 4 === 0 ? 2 : 1}
                    />
                  )
                })}
              </motion.svg>

              {/* ── Progress arc — fills as steps advance ── */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 580 580">
                <circle
                  cx="290" cy="290" r="232"
                  fill="none"
                  stroke={active.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${((activeIdx + 1) / N) * 2 * Math.PI * 232} 9999`}
                  transform="rotate(-90 290 290)"
                  opacity="0.4"
                  style={{ transition: `stroke-dasharray 0.55s cubic-bezier(0.32,0.72,0,1), stroke 0.4s` }}
                />
              </svg>

              {/* ══ CLOCK HAND ══
                  - bottom edge sits at center of container
                  - transformOrigin: 'bottom center' → pivots at container center
                  - rotate(0°) = pointing UP = 12 o'clock (node 0)
                  - rotate(60°) = 2 o'clock (node 1)
                  - rotate(activeIdx * 60°) = always matches active node   ✓
              */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  bottom: '50%',
                  left: '50%',
                  marginLeft: '-1.5px',
                  width: 3,
                  height: orbitR - 52,
                  transformOrigin: 'bottom center',
                }}
                animate={{ rotate: handAngle }}
                transition={HAND_SPRING}
              >
                {/* Gradient shaft */}
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `linear-gradient(to top, transparent 0%, ${active.color}70 35%, ${active.color} 100%)`,
                  }}
                />
                {/* Glowing tip */}
                <motion.div
                  key={activeIdx}
                  initial={{ scale: 0.5, opacity: 0.4 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="absolute -top-2 left-1/2 -translate-x-1/2"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: active.color,
                    boxShadow: `0 0 0 4px ${active.glow}, 0 0 14px ${active.glow}`,
                  }}
                />
              </motion.div>

              {/* ── Fixed step node buttons (no ring rotation) ── */}
              {steps.map((step, i) => {
                /* Node i is at (i × 60°) clockwise from 12 o'clock.
                 * CSS: rotate(angle) then translateY(-R) moves the container
                 *      to that orbit position but rotated.
                 * We counter-rotate the button so the label stays upright. */
                const angle = i * (360 / N)        // 0, 60, 120, 180, 240, 300
                const isActive = i === activeIdx

                return (
                  <div
                    key={step.id}
                    className="absolute"
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: '0 0',
                      transform: `rotate(${angle}deg) translateY(-${orbitR}px)`,
                    }}
                  >
                    <button
                      onClick={() => goTo(i)}
                      aria-label={`Step ${i + 1}: ${step.title}`}
                      style={{
                        transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                        display: 'block',
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1.12 : 1,
                        }}
                        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                        className="flex items-center gap-2 rounded-2xl cursor-pointer select-none"
                        style={{
                          padding: orbitR < 150 ? '5px 8px 5px 7px' : '7px 13px 7px 9px',
                          background: isActive
                            ? `linear-gradient(135deg, ${step.color} 0%, #047857 100%)`
                            : 'rgba(255,255,255,0.95)',
                          border: isActive ? 'none' : '1px solid rgba(16,185,129,0.14)',
                          boxShadow: isActive
                            ? `0 10px 28px ${step.glow}, 0 0 0 2px ${step.color}35, inset 0 1px 0 rgba(255,255,255,0.22)`
                            : '0 2px 10px rgba(0,0,0,0.07)',
                          minWidth: orbitR < 150 ? 64 : 108,
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        {/* Number badge */}
                        <div
                          className="w-6 h-6 rounded-xl flex items-center justify-center text-[10px] font-bold shrink-0"
                          style={{
                            background: isActive ? 'rgba(255,255,255,0.22)' : `${step.color}18`,
                            color: isActive ? '#fff' : step.color,
                          }}
                        >
                          {i + 1}
                        </div>
                        {/* Icon */}
                        <StepIcon icon={step.icon} size="sm" />
                        {/* Label */}
                        {orbitR >= 150 && (
                          <span
                            className="text-[11px] font-semibold leading-tight"
                            style={{ color: isActive ? '#fff' : '#334155', whiteSpace: 'nowrap' }}
                          >
                            {step.shortLabel}
                          </span>
                        )}
                      </motion.div>
                    </button>
                  </div>
                )
              })}

              {/* ── Center hub ── */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Glow rings behind hub */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 180, height: 180,
                    background: `${active.color}06`,
                    animation: 'glow-pulse 3s ease-in-out infinite',
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 128, height: 128,
                    background: `${active.color}08`,
                    animation: 'glow-pulse 3s ease-in-out infinite 1.2s',
                  }}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ scale: 0.75, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.75, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    className="relative flex flex-col items-center justify-center rounded-full text-center"
                    style={{
                      width: 118, height: 118,
                      background: `radial-gradient(circle at 40% 35%, ${active.color}20 0%, ${active.color}08 100%)`,
                      border: `2px solid ${active.color}28`,
                      boxShadow: `0 0 0 8px ${active.color}06, 0 12px 40px ${active.glow}`,
                    }}
                  >
                    <div className="mb-1 flex items-center justify-center"><StepIcon icon={active.icon} size="md" /></div>
                    <div
                      className="text-[10px] font-bold uppercase tracking-widest mt-1"
                      style={{ color: active.color }}
                    >
                      Step {activeIdx + 1}
                    </div>
                    <div className="text-[9px] text-[#94A3B8]">of {N}</div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* ══ DETAIL PANEL ══ */}
          <div className="w-full max-w-xl xl:w-[460px] xl:flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
              >
                {/* Step tag */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] mb-5"
                  style={{
                    background: `${active.color}12`,
                    color: active.color,
                    border: `1px solid ${active.color}28`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: active.color }} />
                  Step {activeIdx + 1} of {N}
                </div>

                {/* Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${active.color}16 0%, ${active.color}08 100%)`,
                      border: `1.5px solid ${active.color}22`,
                      boxShadow: `0 6px 20px ${active.glow}`,
                    }}
                  >
                    <StepIcon icon={active.icon} size="lg" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">
                    {active.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base lg:text-lg text-[#475569] leading-relaxed mb-6 max-w-lg">
                  {active.desc}
                </p>

                {/* Phone + stats */}
                <div className="flex items-stretch gap-4 mb-6">
                  {/* Phone mockup */}
                  <div
                    className="rounded-3xl overflow-hidden shrink-0"
                    style={{
                      width: 132,
                      background: 'rgba(255,255,255,0.97)',
                      border: `1px solid ${active.color}18`,
                      boxShadow: `0 16px 40px rgba(0,0,0,0.08), 0 4px 12px ${active.glow}`,
                    }}
                  >
                    <div className="flex justify-center pt-2.5 pb-1">
                      <div className="w-8 h-0.5 rounded-full bg-[rgba(15,23,42,0.08)]" />
                    </div>
                    <div style={{ minHeight: 210 }}>{phonePanels[active.id]}</div>
                    <div className="flex justify-center py-2">
                      <div className="w-10 h-0.5 rounded-full bg-[rgba(15,23,42,0.06)]" />
                    </div>
                  </div>

                  {/* Stat chips */}
                  <div className="flex flex-col justify-center gap-3 flex-1">
                    {[
                      { v: '< 2s', l: 'Response time' },
                      { v: '24 / 7', l: 'Always available' },
                      { v: '100%', l: 'Calls logged' },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                        style={{
                          background: i === 0
                            ? `linear-gradient(135deg, ${active.color}12 0%, ${active.color}05 100%)`
                            : 'rgba(255,255,255,0.85)',
                          border: i === 0
                            ? `1px solid ${active.color}22`
                            : '1px solid rgba(15,23,42,0.06)',
                        }}
                      >
                        <span className="text-xl font-bold" style={{ color: active.color }}>{stat.v}</span>
                        <span className="text-[12px] text-[#64748B] font-medium">{stat.l}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step navigation pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[rgba(16,185,129,0.1)]">
                  {steps.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => goTo(i)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-300 active:scale-[0.97]"
                      style={i === activeIdx ? {
                        background: `linear-gradient(135deg, ${s.color} 0%, #047857 100%)`,
                        color: '#fff',
                        boxShadow: `0 3px 10px ${s.glow}`,
                      } : {
                        background: 'rgba(255,255,255,0.85)',
                        border: '1px solid rgba(16,185,129,0.14)',
                        color: '#475569',
                      }}
                    >
                      <StepIcon icon={s.icon} size="sm" />
                      <span>{i + 1}. {s.shortLabel}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Auto-advance progress dots ── */}
        <div className="mt-10 flex justify-center gap-3">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Step ${i + 1}`}
              className="relative rounded-full overflow-hidden transition-all duration-500"
              style={{
                width: i === activeIdx ? 36 : 8,
                height: 8,
                background: i === activeIdx ? 'transparent' : `${s.color}28`,
              }}
            >
              {i === activeIdx && (
                <>
                  <div className="absolute inset-0 rounded-full" style={{ background: `${active.color}22` }} />
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: active.color }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                    key={activeIdx}
                  />
                </>
              )}
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
