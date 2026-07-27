'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const SLIDE_DURATION = 5000

const slides = [
  {
    id: 'booking',
    slug: 'appointment-booking',
    label: 'Book Appointment',
    heading: 'Appointment Booking',
    blurb: 'Casey books appointments directly into your EHR in real time — offering open slots, confirming details, and texting a confirmation without any staff involvement.',
    color: '#059669',
    bg: 'rgba(5,150,105,0.07)',
    border: 'rgba(5,150,105,0.22)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="9 16 11 18 15 14"/>
      </svg>
    ),
    messages: [
      { from: 'patient', text: "Hi, I need to see Dr. Patel this week." },
      { from: 'casey',   text: "Of course! I have Thursday at 2 PM available. Shall I book it?" },
      { from: 'patient', text: "Yes, please." },
      { from: 'casey',   text: "Done! You're booked for Thursday July 24th at 2:00 PM with Dr. Patel." },
    ],
    outcome: {
      label: 'Appointment Confirmed',
      color: '#059669',
      bg: '#DCFCE7',
      border: 'rgba(5,150,105,0.3)',
      icon: (c: string) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ),
      rows: ['Thu Jul 24 · 2:00 PM', 'Dr. Patel · Primary Care', 'SMS confirmation sent ✓'],
    },
  },
  {
    id: 'insurance',
    slug: 'insurance-verification',
    label: 'Insurance Verification',
    heading: 'Insurance Verification',
    blurb: 'Casey checks eligibility live during the call — confirming active coverage, copays, and deductibles before the visit so your front desk never chases benefits again.',
    color: '#0D9488',
    bg: 'rgba(13,148,136,0.07)',
    border: 'rgba(13,148,136,0.22)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    messages: [
      { from: 'patient', text: "Do you accept Blue Cross Blue Shield?" },
      { from: 'casey',   text: "Let me verify your coverage right now — one moment." },
      { from: 'patient', text: "Sure, my member ID is BCB4829301." },
      { from: 'casey',   text: "You're covered! Active BCBS plan, $30 copay, deductible met." },
    ],
    outcome: {
      label: 'Eligibility Verified',
      color: '#0D9488',
      bg: '#CCFBF1',
      border: 'rgba(13,148,136,0.3)',
      icon: (c: string) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
        </svg>
      ),
      rows: ['BCBS · Member Active', 'Copay: $30 · Deductible met', 'In-network provider ✓'],
    },
  },
  {
    id: 'refill',
    slug: 'prescription-refills',
    label: 'Rx Refill Request',
    heading: 'Prescription Refills',
    blurb: 'Patients request refills by voice or text. Casey captures the medication and pharmacy, then routes the request straight to the provider queue.',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.07)',
    border: 'rgba(124,58,237,0.22)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
      </svg>
    ),
    messages: [
      { from: 'patient', text: "I need a refill on my metformin 500mg." },
      { from: 'casey',   text: "Got it. Which pharmacy do you prefer?" },
      { from: 'patient', text: "CVS on Main Street." },
      { from: 'casey',   text: "Refill request sent to Dr. Patel. Expect confirmation within 24 hours." },
    ],
    outcome: {
      label: 'Refill Request Routed',
      color: '#7C3AED',
      bg: '#EDE9FE',
      border: 'rgba(124,58,237,0.3)',
      icon: (c: string) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      ),
      rows: ['Metformin 500mg · Dr. Patel', 'CVS · Main Street', 'ETA: within 24 hours'],
    },
  },
  {
    id: 'reschedule',
    slug: 'reschedule-cancel',
    label: 'Reschedule & Cancel',
    heading: 'Reschedule & Cancel',
    blurb: 'Casey lets patients move or cancel appointments on their own — releasing the old slot, booking the new one, and texting an updated confirmation.',
    color: '#EA580C',
    bg: 'rgba(234,88,12,0.07)',
    border: 'rgba(234,88,12,0.22)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
      </svg>
    ),
    messages: [
      { from: 'patient', text: "I need to cancel my appointment tomorrow." },
      { from: 'casey',   text: "No problem. Would you like to reschedule or just cancel?" },
      { from: 'patient', text: "Reschedule — Friday morning if possible." },
      { from: 'casey',   text: "Done! Moved to Friday July 26th at 9:00 AM. Slot released." },
    ],
    outcome: {
      label: 'Appointment Rescheduled',
      color: '#EA580C',
      bg: '#FFF7ED',
      border: 'rgba(234,88,12,0.3)',
      icon: (c: string) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
        </svg>
      ),
      rows: ['Fri Jul 26 · 9:00 AM', 'Previous slot released', 'SMS update sent ✓'],
    },
  },
  {
    id: 'reminder',
    slug: 'reminders-recalls',
    label: 'Reminders & Recalls',
    heading: 'Reminders & Recalls',
    blurb: 'Casey proactively reaches out for annual visits and care gaps, then books the appointment on the spot — closing recalls without a single staff call.',
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.07)',
    border: 'rgba(37,99,235,0.22)',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
    ),
    messages: [
      { from: 'casey',   text: "Hi Sarah! Casey from Vocryn Care — you're due for your annual checkup." },
      { from: 'patient', text: "Oh yes, I've been meaning to book that." },
      { from: 'casey',   text: "I can schedule it right now. Morning or afternoon?" },
      { from: 'patient', text: "Morning works great." },
    ],
    outcome: {
      label: 'Recall Successful',
      color: '#2563EB',
      bg: '#EFF6FF',
      border: 'rgba(37,99,235,0.3)',
      icon: (c: string) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ),
      rows: ['Annual checkup booked', 'Tue Aug 5 · 9:00 AM', 'Care gap closed ✓'],
    },
  },
]

function TypingDots({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-1 px-3.5 py-2.5 rounded-2xl w-fit" style={{ background: `${color}12`, border: `1px solid ${color}22` }}>
      {[0, 1, 2].map(i => (
        <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: color }}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

function SlideDemo({ slide, active }: { slide: typeof slides[0]; active: boolean }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const [showOutcome, setShowOutcome] = useState(false)

  useEffect(() => {
    if (!active) { setVisibleLines(0); setShowTyping(false); setShowOutcome(false); return }
    let current = 0
    let cancelled = false

    const next = () => {
      if (cancelled || current >= slide.messages.length) {
        if (!cancelled) setTimeout(() => !cancelled && setShowOutcome(true), 400)
        return
      }
      const msg = slide.messages[current]
      if (msg.from === 'casey') {
        setShowTyping(true)
        setTimeout(() => {
          if (cancelled) return
          setShowTyping(false)
          setVisibleLines(current + 1)
          current++
          setTimeout(next, 600)
        }, 900)
      } else {
        setVisibleLines(current + 1)
        current++
        setTimeout(next, 700)
      }
    }
    const t = setTimeout(next, 300)
    return () => { cancelled = true; clearTimeout(t) }
  }, [active, slide])

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 h-full">
      {/* Chat transcript */}
      <div className="rounded-2xl bg-white border border-[rgba(15,23,42,0.08)] overflow-hidden flex flex-col" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
        {/* Chat header */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[rgba(15,23,42,0.07)]" style={{ background: `${slide.color}08` }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${slide.color}15` }}>
            <svg width="12" height="12" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="14" r="7" fill={slide.color} opacity="0.9"/>
              <path d="M6 36c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke={slide.color} strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
            </svg>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#0F172A]">Casey</p>
            <div className="flex items-center gap-1">
              <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: slide.color }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
              <p className="text-[10px] font-medium" style={{ color: slide.color }}>Active now</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: `${slide.color}10`, border: `1px solid ${slide.color}25` }}>
            <div className="text-[9px] font-bold" style={{ color: slide.color }}>{slide.label}</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-3 min-h-[200px]">
          <AnimatePresence>
            {slide.messages.slice(0, visibleLines).map(({ from, text }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}
                className={`flex gap-2 ${from === 'patient' ? 'flex-row-reverse' : ''}`}>
                <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold mt-0.5 ${
                  from === 'casey' ? '' : 'bg-[rgba(15,23,42,0.06)] text-[#475569]'
                }`} style={from === 'casey' ? { background: `${slide.color}15`, color: slide.color } : {}}>
                  {from === 'casey' ? 'AI' : 'P'}
                </div>
                <div className={`max-w-[78%] ${from === 'patient' ? 'flex flex-col items-end' : ''}`}>
                  <p className="text-[9px] font-semibold mb-1" style={{ color: from === 'casey' ? slide.color : '#94A3B8' }}>
                    {from === 'casey' ? 'Casey' : 'Patient'}
                  </p>
                  <div className="px-3 py-2 text-[12px] leading-relaxed"
                    style={from === 'casey'
                      ? { background: `${slide.color}0D`, border: `1px solid ${slide.color}20`, color: '#1E293B', borderRadius: '4px 14px 14px 14px' }
                      : { background: 'rgba(15,23,42,0.04)', border: '1px solid rgba(15,23,42,0.07)', color: '#334155', borderRadius: '14px 4px 14px 14px' }
                    }>{text}</div>
                </div>
              </motion.div>
            ))}
            {showTyping && (
              <motion.div key="typing" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-2">
                <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: `${slide.color}15`, color: slide.color }}>AI</div>
                <TypingDots color={slide.color} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Outcome card */}
      <AnimatePresence>
        {showOutcome && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="md:w-[190px] rounded-2xl p-4 flex flex-col gap-3 border self-start"
            style={{ background: slide.outcome.bg, borderColor: slide.outcome.border, boxShadow: `0 8px 32px ${slide.color}18` }}
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${slide.color}18` }}>
              {slide.outcome.icon(slide.color)}
            </div>

            <div>
              <p className="text-[13px] font-bold mb-2.5" style={{ color: slide.outcome.color }}>{slide.outcome.label}</p>
              <div className="space-y-2">
                {slide.outcome.rows.map((row, i) => (
                  <motion.div key={row} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-start gap-1.5">
                    <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: slide.color }} />
                    <p className="text-[11px] leading-snug" style={{ color: slide.color, opacity: 0.85 }}>{row}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Casey badge */}
            <div className="mt-auto pt-2 border-t" style={{ borderColor: `${slide.color}20` }}>
              <p className="text-[10px] font-semibold" style={{ color: slide.color, opacity: 0.7 }}>Handled by Casey · AI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function MeetAlice() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((idx: number) => {
    setActive(idx)
    setProgress(0)
    if (timerRef.current) clearInterval(timerRef.current)
    if (progressRef.current) clearInterval(progressRef.current)
    timerRef.current = setInterval(() => {
      setActive(i => (i + 1) % slides.length)
      setProgress(0)
    }, SLIDE_DURATION)
    progressRef.current = setInterval(() => {
      setProgress(p => Math.min(100, p + (100 / (SLIDE_DURATION / 50))))
    }, 50)
  }, [])

  useEffect(() => {
    if (!inView) return
    goTo(0)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [inView, goTo])

  const current = slides[active]

  return (
    <section
      ref={ref}
      id="meet-casey"
      className="relative overflow-hidden py-20 scroll-mt-24"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F0FDF4 50%, #ECFDF5 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-none mb-4">
            Meet <span className="font-serif italic text-gradient-blue">Casey</span>
          </h2>
          <p className="text-base text-[#64748B] max-w-xl mx-auto leading-relaxed">
            Your AI receptionist handles every patient interaction — from booking to billing — so your staff focuses on care, not calls.
          </p>
        </motion.div>

        {/* Two-column: vertical use-case nav (left) + live demo panel (right) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-[290px_1fr] gap-5 lg:gap-7 items-start"
        >
          {/* ── Left: vertical capability list ─────────────── */}
          <div
            className="rounded-3xl bg-white/70 backdrop-blur-sm border border-[rgba(15,23,42,0.08)] p-2"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
          >
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className="group relative w-full flex items-center gap-3 text-left px-3.5 py-3.5 rounded-2xl transition-all duration-300"
                style={active === i ? { background: s.bg } : {}}
                onMouseEnter={e => { if (active !== i) e.currentTarget.style.background = 'rgba(15,23,42,0.03)' }}
                onMouseLeave={e => { if (active !== i) e.currentTarget.style.background = 'transparent' }}
              >
                {/* active left accent bar */}
                {active === i && (
                  <motion.span
                    layoutId="usecase-accent"
                    className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-full"
                    style={{ background: s.color }}
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                <span
                  className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={active === i
                    ? { background: `${s.color}18`, color: s.color }
                    : { background: 'rgba(15,23,42,0.04)', color: '#94A3B8' }}
                >
                  {s.icon}
                </span>
                <span
                  className="flex-1 min-w-0 text-[13.5px] font-semibold truncate transition-colors duration-300"
                  style={{ color: active === i ? s.color : '#334155' }}
                >
                  {s.label}
                </span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke={active === i ? s.color : '#CBD5E1'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                  className="shrink-0 transition-all duration-300"
                  style={{ transform: active === i ? 'translateX(0)' : 'translateX(-2px)' }}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                {/* auto-advance progress bar */}
                {active === i && (
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] rounded-full overflow-hidden" style={{ background: `${s.color}18` }}>
                    <span className="block h-full rounded-full" style={{ width: `${progress}%`, background: s.color, transition: 'width 50ms linear' }} />
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── Right: live demo panel ─────────────────────── */}
          <div
            className="rounded-3xl border p-5 md:p-7 transition-all duration-500"
            style={{
              background: current.bg,
              borderColor: current.border,
              boxShadow: `0 12px 48px ${current.color}12, 0 2px 8px rgba(0,0,0,0.04)`,
            }}
          >
            {/* header row: label + supported badges */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${current.color}15`, color: current.color }}>
                {current.icon}
              </div>
              <p className="text-[14px] font-bold" style={{ color: current.color }}>{current.label}</p>
              <div className="ml-auto hidden sm:flex items-center gap-1.5">
                {['Voice', 'Texting'].map(cap => (
                  <span key={cap} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                    style={{ background: `${current.color}0F`, color: current.color, border: `1px solid ${current.color}22` }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: current.color }} />
                    {cap} supported
                  </span>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              >
                <SlideDemo slide={current} active={true} />

                {/* description + read more */}
                <div className="mt-6 pt-5 border-t flex flex-col sm:flex-row sm:items-end gap-4" style={{ borderColor: `${current.color}20` }}>
                  <div className="flex-1">
                    <h3 className="text-[19px] font-bold text-[#0F172A] mb-1.5">{current.heading}</h3>
                    <p className="text-[13.5px] leading-relaxed text-[#64748B] max-w-xl">{current.blurb}</p>
                  </div>
                  <Link
                    href={`/use-cases/${current.slug}`}
                    className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all duration-300 hover:opacity-90 active:scale-[0.98] self-start sm:self-auto"
                    style={{ background: current.color, boxShadow: `0 4px 16px ${current.color}35` }}
                  >
                    Read more
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M3 11L11 3M11 3H5.5M11 3V8.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            { val: '< 2s',  label: 'Answer time',   color: '#059669' },
            { val: '24/7',  label: 'Availability',  color: '#0D9488' },
            { val: '99.3%', label: 'Accuracy',       color: '#7C3AED' },
            { val: '0',     label: 'Calls missed',   color: '#2563EB' },
          ].map(({ val, label, color }) => (
            <div key={label} className="rounded-2xl bg-white border border-[rgba(15,23,42,0.07)] px-5 py-4 text-center" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
              <p className="text-2xl font-bold leading-none" style={{ color }}>{val}</p>
              <p className="text-[11px] text-[#94A3B8] mt-1.5 font-medium">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-center"
        >
          <a href="/calendar"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-[14px] font-bold text-white transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 60%, #0D9488 100%)', boxShadow: '0 4px 20px rgba(16,185,129,0.3)' }}
          >
            See Casey in Action — Book a Free Demo
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5.5M11 3V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
