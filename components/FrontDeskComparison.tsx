'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Animated counter ─────────────────────────────────────── */
function Counter({
  to, duration = 1.8, decimals = 0, shouldStart,
}: { to: number; duration?: number; decimals?: number; shouldStart: boolean }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!shouldStart) return
    if (to === 0) { setVal(0); return }
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(parseFloat((eased * to).toFixed(decimals)))
      if (t < 1) requestAnimationFrame(tick)
      else setVal(to)
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [shouldStart, to, duration, decimals])
  return <>{decimals ? val.toFixed(decimals) : Math.floor(val)}</>
}

/* ── Data ─────────────────────────────────────────────────── */
const comparisons = [
  {
    tag: 'Response Speed',
    accentColor: '#10B981',
    accentGlow: 'rgba(16,185,129,0.18)',
    problem: {
      stat: '67%',
      label: 'of callers hang up after 2 min on hold',
      text: 'Patients who wait on hold hang up and call your competitor. Every missed call is a lost appointment.',
    },
    fix: {
      prefix: '<', stat: 2, suffix: 's', label: 'average response time',
      text: 'CareSync picks up in under 2 seconds — warm, natural, and clinic-trained. Every single call, 24/7.',
      countTo: 2, decimals: 0, isText: false,
    },
  },
  {
    tag: 'Data Accuracy',
    accentColor: '#059669',
    accentGlow: 'rgba(5,150,105,0.18)',
    problem: {
      stat: '1-in-5',
      label: 'manual entries contain costly errors',
      text: 'Staff under pressure make data entry mistakes that cause billing issues, missed follow-ups, and frustrated patients.',
    },
    fix: {
      prefix: '', stat: 99.3, suffix: '%', label: 'data accuracy — automatically',
      text: 'Patient data flows directly into your EHR in real time. No copy-paste. No mistakes. No liability.',
      countTo: 99.3, decimals: 1, isText: false,
    },
  },
  {
    tag: 'Staff Load',
    accentColor: '#0D9488',
    accentGlow: 'rgba(13,148,136,0.18)',
    problem: {
      stat: '73%',
      label: 'of calls are routine and repetitive',
      text: 'Your skilled front desk team spends most of their day answering the same questions about hours, directions, and scheduling.',
    },
    fix: {
      prefix: '', stat: 0, suffix: '', label: 'routine calls reach your staff',
      text: 'CareSync handles FAQs, booking, and verification. Your team focuses entirely on patients in the building.',
      countTo: 0, decimals: 0, isText: false,
    },
  },
  {
    tag: 'Operating Cost',
    accentColor: '#10B981',
    accentGlow: 'rgba(16,185,129,0.18)',
    problem: {
      stat: '$4,800',
      label: 'average cost every time you hire and train',
      text: 'High turnover means constant recruiting, onboarding, and retraining. The cycle is expensive and exhausting.',
    },
    fix: {
      prefix: '', stat: 0, suffix: '', label: 'zero turnover. zero retraining.',
      text: 'CareSync never quits, never calls in sick, never needs retraining. One fixed monthly cost.',
      countTo: 0, decimals: 0, isText: true, textStat: 'Fixed',
    },
  },
]

const topStats = [
  { val: 87, suffix: '%', label: 'Fewer missed calls', prefix: '' },
  { val: 3.2, suffix: '×', label: 'More bookings per month', prefix: '', decimals: 1 },
  { val: 24, suffix: '/7', label: 'Always-on coverage', prefix: '' },
  { val: 48, suffix: 'h', label: 'Average setup time', prefix: '' },
]

/* ── Top stat card ────────────────────────────────────────── */
function StatCard({
  stat, shouldStart, index,
}: { stat: typeof topStats[0]; shouldStart: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.32, 0.72, 0, 1] }}
    >
      <div
        className="p-5 lg:p-6 rounded-2xl bg-white h-full"
        style={{
          border: '1px solid rgba(16,185,129,0.12)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(16,185,129,0.06)',
        }}
      >
        <div className="text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-none">
          {stat.prefix}
          <Counter to={stat.val} shouldStart={shouldStart} decimals={stat.decimals ?? 0} duration={1.6} />
          <span className="text-[#10B981]">{stat.suffix}</span>
        </div>
        <div className="text-[12px] text-[#64748B] font-medium mt-2 leading-snug">{stat.label}</div>
        <div
          className="mt-3 h-0.5 rounded-full"
          style={{ background: 'linear-gradient(to right, #10B981, rgba(16,185,129,0.1))', width: '50%' }}
        />
      </div>
    </motion.div>
  )
}

/* ── Comparison card ──────────────────────────────────────── */
function ComparisonCard({
  data, index,
}: { data: typeof comparisons[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.32, 0.72, 0, 1] }}
      className="group"
    >
      <div
        className="relative rounded-2xl overflow-hidden transition-shadow duration-500"
        style={{
          boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_48px_1fr]">

          {/* ── THE PROBLEM ── */}
          <div
            className="relative p-6 lg:p-8 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FEF7F7 0%, #F8FAFC 100%)',
              borderRight: '1px solid rgba(15,23,42,0.05)',
            }}
          >
            {/* Watermark stat in background */}
            <div
              className="absolute -right-4 -bottom-4 text-[90px] font-black leading-none pointer-events-none select-none"
              style={{ color: 'rgba(239,68,68,0.05)', letterSpacing: '-0.04em' }}
            >
              {data.problem.stat}
            </div>

            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100/80 mb-5">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4.5" stroke="#EF4444" strokeWidth="0.8" />
                <path d="M3 3l4 4M7 3l-4 4" stroke="#EF4444" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-[0.12em]">The Old Way</span>
            </div>

            {/* Problem stat */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl lg:text-5xl font-black tracking-tight" style={{ color: 'rgba(239,68,68,0.75)' }}>
                {data.problem.stat}
              </span>
            </div>
            <div className="text-[12px] text-red-400/70 font-semibold mb-4 uppercase tracking-wide">
              {data.problem.label}
            </div>
            <p className="text-[14px] text-[#64748B] leading-relaxed relative z-10">
              {data.problem.text}
            </p>
          </div>

          {/* ── CENTER CONNECTOR ── */}
          <div className="hidden lg:flex flex-col items-center justify-center relative bg-white z-10">
            {/* Vertical line top */}
            <div className="flex-1 w-px bg-gradient-to-b from-transparent to-[rgba(16,185,129,0.25)]" />
            {/* Arrow circle */}
            <div
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 my-0"
              style={{
                boxShadow: `0 0 0 1px ${data.accentColor}30, 0 4px 16px ${data.accentGlow}`,
              }}
            >
              <motion.svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                animate={inView ? { x: [0, 3, 0] } : {}}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke={data.accentColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </div>
            {/* Vertical line bottom */}
            <div className="flex-1 w-px bg-gradient-to-b from-[rgba(16,185,129,0.25)] to-transparent" />
          </div>

          {/* ── THE FIX ── */}
          <div
            className="relative p-6 lg:p-8 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(240,253,248,0.9) 0%, #FFFFFF 100%)',
            }}
          >
            {/* Glow blob in corner */}
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle at 100% 0%, ${data.accentGlow} 0%, transparent 70%)`,
              }}
            />

            {/* Watermark stat */}
            <div
              className="absolute -right-2 -bottom-4 text-[90px] font-black leading-none pointer-events-none select-none"
              style={{ color: `${data.accentColor}08`, letterSpacing: '-0.04em' }}
            >
              {data.fix.isText ? data.fix.textStat : `${data.fix.prefix}${data.fix.stat}${data.fix.suffix}`}
            </div>

            {/* Tag */}
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-5"
              style={{ background: `${data.accentColor}12`, border: `1px solid ${data.accentColor}28` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: data.accentColor }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: data.accentColor }}>
                With CareSync AI
              </span>
            </div>

            {/* Animated solution stat */}
            <div className="flex items-baseline gap-1.5 mb-1">
              {data.fix.isText ? (
                <span
                  className="text-4xl lg:text-5xl font-black tracking-tight"
                  style={{ color: data.accentColor }}
                >
                  {data.fix.textStat}
                </span>
              ) : (
                <span
                  className="text-4xl lg:text-5xl font-black tracking-tight tabular-nums"
                  style={{ color: data.accentColor }}
                >
                  {data.fix.prefix}
                  <Counter
                    to={data.fix.countTo ?? 0}
                    shouldStart={inView}
                    decimals={data.fix.decimals ?? 0}
                    duration={1.8}
                  />
                  {data.fix.suffix}
                </span>
              )}
            </div>
            <div
              className="text-[12px] font-semibold mb-4 uppercase tracking-wide"
              style={{ color: `${data.accentColor}80` }}
            >
              {data.fix.label}
            </div>
            <p className="text-[14px] text-[#334155] leading-relaxed font-medium relative z-10">
              {data.fix.text}
            </p>
          </div>
        </div>

        {/* Hover border glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: `0 0 0 1.5px ${data.accentColor}25, 0 12px 40px ${data.accentGlow}` }}
        />

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(to right, transparent, ${data.accentColor}60, transparent)` }}
        />
      </div>
    </motion.div>
  )
}

/* ── Main section ─────────────────────────────────────────── */
export default function FrontDeskComparison() {
  const topRef = useRef<HTMLDivElement>(null)
  const topInView = useInView(topRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#F8FAFC' }}>

      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[600px]" style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(16,185,129,0.07) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px]" style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(16,185,129,0.05) 0%, transparent 60%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.4 }} />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADER ── */}
        <div className="max-w-2xl mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.07)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#059669]">The Real Cost</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.32, 0.72, 0, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-tight leading-[1.05] mb-5"
          >
            Your front desk is<br />
            <span className="font-serif italic text-gradient-blue">costing you patients.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.32, 0.72, 0, 1] }}
            className="text-[16px] text-[#64748B] leading-relaxed"
          >
            Every clinic loses patients to hold times, data errors, and missed calls — every single day. CareSync eliminates all of it at once.
          </motion.p>
        </div>

        {/* ── IMPACT STATS ── */}
        <div ref={topRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-14">
          {topStats.map((s, i) => (
            <StatCard key={i} stat={s} shouldStart={topInView} index={i} />
          ))}
        </div>

        {/* ── COMPARISON CARDS ── */}
        <div className="space-y-3">
          {comparisons.map((c, i) => (
            <ComparisonCard key={i} data={c} index={i} />
          ))}
        </div>

        {/* ── CTA BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="mt-8"
        >
          <div
            className="relative rounded-3xl overflow-hidden p-8 lg:p-10"
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #10B981 50%, #0D9488 100%)',
              boxShadow: '0 20px 60px rgba(16,185,129,0.35), 0 4px 16px rgba(16,185,129,0.2)',
            }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/[0.06] pointer-events-none" />
            <div className="absolute -bottom-12 -left-8 w-48 h-48 rounded-full bg-white/[0.04] pointer-events-none" />
            {/* Dot grid overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="text-white/60 text-[11px] font-semibold uppercase tracking-[0.18em] mb-2">
                  Ready to make the switch?
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-1">
                  Setup in 48 hours. No hardware.
                </h3>
                <p className="text-white/65 text-[14px]">
                  No long-term contracts. Cancel anytime. 14-day free trial.
                </p>
              </div>

              <a
                href="/calendar"
                className="group shrink-0 flex items-center gap-3 px-6 py-3.5 rounded-2xl font-bold text-[15px] transition-all duration-300 active:scale-[0.97]"
                style={{
                  background: '#FFFFFF',
                  color: '#059669',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.18)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><polyline points="9 16 11 18 15 14" />
                </svg>
                Book a Free Demo
                <span className="w-7 h-7 rounded-xl bg-[rgba(5,150,105,0.12)] flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 9L9 2M9 2H3.5M9 2V7.5" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
