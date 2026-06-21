'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Icons ──────────────────────────────────────────────── */
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.003 1.19 2 2 0 012 .003h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
    <line x1="23" y1="1" x2="17" y2="7"/>
    <polyline points="17 1 23 1 23 7"/>
  </svg>
)
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    <polyline points="9 16 11 18 15 14"/>
  </svg>
)
const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
)
const UserUpdateIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
    <path d="M17 11l2 2 4-4"/>
  </svg>
)
const PillIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.5 20H4a2 2 0 01-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 011.66.9l.82 1.2a2 2 0 001.66.9H20a2 2 0 012 2v2"/>
    <circle cx="17" cy="17" r="5"/>
    <path d="M14 17h6"/>
  </svg>
)
const ClipboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
)

/* ── Data ───────────────────────────────────────────────── */
const leftFeatures = [
  {
    Icon: PhoneIcon,
    title: 'Missed & Inbound Calls',
    desc: 'Every call answered in under 2 seconds. No hold music, no voicemails.',
    color: '#38BDF8',
    glow: 'rgba(56,189,248,0.12)',
  },
  {
    Icon: CalendarIcon,
    title: 'Scheduling & Rescheduling',
    desc: 'Native calendar writes directly into eCW. No double entry, no callbacks.',
    color: '#34D399',
    glow: 'rgba(52,211,153,0.12)',
  },
  {
    Icon: ShieldIcon,
    title: 'Insurance ID Collection',
    desc: 'Captures member ID, group number, and payer details securely during the call.',
    color: '#818CF8',
    glow: 'rgba(129,140,248,0.12)',
  },
]

const rightFeatures = [
  {
    Icon: UserUpdateIcon,
    title: 'Patient Profile Updates',
    desc: 'Address, phone, or email changes written instantly to the chart.',
    color: '#38BDF8',
    glow: 'rgba(56,189,248,0.12)',
  },
  {
    Icon: PillIcon,
    title: 'Medication & Refills',
    desc: 'Retrieves medication lists and logs requests as telephone encounters assigned to the provider.',
    color: '#F472B6',
    glow: 'rgba(244,114,182,0.12)',
  },
  {
    Icon: ClipboardIcon,
    title: 'Clinical Documentation',
    desc: 'Structured telephone encounters logged accurately for lab and clinical inquiries.',
    color: '#34D399',
    glow: 'rgba(52,211,153,0.12)',
  },
]

/* ── Feature Card ───────────────────────────────────────── */
function FeatureCard({
  Icon, title, desc, color, glow, delay, side,
}: {
  Icon: () => JSX.Element
  title: string
  desc: string
  color: string
  glow: string
  delay: number
  side: 'left' | 'right'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -32 : 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.32, 0.72, 0, 1] }}
      className="relative group flex gap-3 p-4 rounded-xl border border-white/[0.06] bg-[#0A1628]/70 backdrop-blur-sm hover:border-white/10 transition-colors duration-300"
      style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 0 ${glow}` }}
    >
      {/* left accent bar */}
      {side === 'left' && (
        <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(to bottom, transparent, ${color}, transparent)` }} />
      )}
      {side === 'right' && (
        <div className="absolute right-0 top-4 bottom-4 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(to bottom, transparent, ${color}, transparent)` }} />
      )}

      {/* icon */}
      <div
        className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
        style={{ background: glow, color }}
      >
        <Icon />
      </div>

      {/* text */}
      <div>
        <p className="text-[13px] font-600 text-white/90 leading-snug mb-1" style={{ fontWeight: 600 }}>{title}</p>
        <p className="text-[12px] text-white/40 leading-relaxed">{desc}</p>
      </div>

      {/* connector arrow */}
      <div className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'right-[-20px]' : 'left-[-20px]'} flex items-center gap-0.5 opacity-30 group-hover:opacity-70 transition-opacity`}>
        {side === 'left' ? (
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M1 5h12M10 1l4 4-4 4" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M15 5H3M6 1L2 5l4 4" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </motion.div>
  )
}

/* ── Hub Card ───────────────────────────────────────────── */
function EHRHub() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
      className="relative flex flex-col items-center justify-center h-full min-h-[280px] rounded-2xl border border-sky-500/20 bg-[#060F22]"
      style={{
        boxShadow: `0 0 0 1px rgba(14,165,233,0.08), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 60px rgba(14,165,233,0.12), 0 0 120px rgba(14,165,233,0.06)`,
      }}
    >
      {/* Pulse rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-2xl border border-sky-500/20"
          animate={{ scale: [1, 1.08 + i * 0.04], opacity: [0.4, 0] }}
          transition={{ duration: 2.4, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      {/* Dot grid background */}
      <div
        className="absolute inset-0 rounded-2xl opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(14,165,233,0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* ECW Logo area */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center">
        {/* ECW icon */}
        <div className="w-14 h-14 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-1">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16M4 12h10M4 17h7"/>
            <circle cx="18" cy="15" r="3"/>
            <path d="M21 18l2 2"/>
          </svg>
        </div>

        <div>
          <p className="text-[10px] font-semibold tracking-[0.18em] text-sky-400/60 uppercase mb-1">Connected to</p>
          <p className="text-[15px] font-bold text-white leading-tight">eClinicalWorks</p>
          <p className="text-[11px] text-white/40 mt-0.5">EHR Integration</p>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <span className="text-[10px] font-semibold text-emerald-400 tracking-wide">Live Sync</span>
        </div>

        {/* Stat pills */}
        <div className="flex flex-col gap-1.5 mt-2 w-full">
          {[
            { label: 'Avg response', val: '< 2s' },
            { label: 'Accuracy', val: '99.3%' },
            { label: 'Uptime', val: '24/7' },
          ].map(({ label, val }) => (
            <div key={label} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
              <span className="text-[11px] text-white/40">{label}</span>
              <span className="text-[11px] font-bold text-sky-400">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main Section ───────────────────────────────────────── */
export default function EHRAutomation() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Bg glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, #0EA5E9 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="text-[11px] font-semibold text-sky-400 tracking-widest uppercase">eClinicalWorks Native</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none mb-3">
            Six capabilities.<br />
            <span className="text-sky-400">One connection.</span>
          </h2>
          <p className="text-base text-white/40 max-w-md leading-relaxed">
            Every patient interaction flows directly into eClinicalWorks — no middleware, no manual entry, no lag.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px_1fr] xl:grid-cols-[1fr_220px_1fr] gap-3 lg:gap-4 items-stretch">
          {/* Left features */}
          <div className="flex flex-col gap-3">
            {leftFeatures.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 0.1} side="left" />
            ))}
          </div>

          {/* Center hub */}
          <div className="hidden lg:block">
            <EHRHub />
          </div>

          {/* Right features */}
          <div className="flex flex-col gap-3">
            {rightFeatures.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 0.1 + 0.15} side="right" />
            ))}
          </div>
        </div>

        {/* Mobile hub (below grid on mobile) */}
        <div className="lg:hidden mt-6">
          <EHRHub />
        </div>
      </div>
    </section>
  )
}
