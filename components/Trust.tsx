'use client'

import { motion } from 'framer-motion'

/* ── Icons ──────────────────────────────────────────────── */
const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
)
const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
  </svg>
)
const FileTextIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <polyline points="9 15 11 17 15 13"/>
  </svg>
)
const PhoneForwardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="19 1 23 5 19 9"/>
    <line x1="15" y1="5" x2="23" y2="5"/>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.003 1.19 2 2 0 012 .003h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
  </svg>
)
const LockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
    <circle cx="12" cy="16" r="1" fill="currentColor"/>
  </svg>
)
const DatabaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
)

const trustItems = [
  {
    Icon: ShieldIcon,
    title: 'HIPAA-Aware Workflow Design',
    desc: 'Built following HIPAA privacy principles. Patient data handled with minimum necessary access at every touchpoint.',
    color: '#059669',
    glow: 'rgba(5,150,105,0.1)',
    stat: '100%',
    statLabel: 'privacy-first',
  },
  {
    Icon: UsersIcon,
    title: 'Role-Based Access Control',
    desc: 'Staff see only what they need. Admins control exactly who can access call logs, transcripts, and patient data.',
    color: '#0D9488',
    glow: 'rgba(13,148,136,0.1)',
    stat: 'Granular',
    statLabel: 'permissions',
  },
  {
    Icon: FileTextIcon,
    title: 'Full Audit Logs',
    desc: 'Every interaction timestamped with caller ID and outcome. Compliance-ready exports available on demand.',
    color: '#059669',
    glow: 'rgba(5,150,105,0.1)',
    stat: '100%',
    statLabel: 'traceable',
  },
  {
    Icon: PhoneForwardIcon,
    title: 'Human Handoff, Always',
    desc: 'Emergencies, clinical questions, and complaints route to real staff instantly. No exceptions, no dead ends.',
    color: '#0D9488',
    glow: 'rgba(13,148,136,0.1)',
    stat: '< 2s',
    statLabel: 'escalation',
  },
  {
    Icon: LockIcon,
    title: 'Data Minimization',
    desc: 'We collect only what is required to complete a booking. Nothing stored beyond operational necessity.',
    color: '#059669',
    glow: 'rgba(5,150,105,0.1)',
    stat: 'Zero',
    statLabel: 'excess storage',
  },
  {
    Icon: DatabaseIcon,
    title: 'Encrypted API Channels',
    desc: 'All integrations use TLS-encrypted connections with authenticated webhooks and rotating token validation.',
    color: '#0D9488',
    glow: 'rgba(13,148,136,0.1)',
    stat: 'TLS 1.3',
    statLabel: 'encryption',
  },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function Trust() {
  return (
    <section className="relative py-24 lg:py-32 px-4 overflow-hidden" id="trust" style={{ background: '#FFFFFF' }}>

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial green glow top-center */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.09) 0%, transparent 65%)' }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.07) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.5,
          }}
        />
        {/* Bottom green gradient fade into compliance bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(240,253,248,0.5))' }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">

          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-5">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold text-emerald-600 tracking-[0.18em] uppercase">Built for Healthcare</span>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0F172A] tracking-tight leading-[1.0] mb-4">
              Patient privacy<br />
              <span className="font-serif italic text-gradient-blue">at the core.</span>
            </h2>

            <p className="text-[16px] text-[#64748B] leading-relaxed max-w-lg">
              Every architectural decision in CareSync AI starts with one question: <em>how do we protect patient data?</em> Here's how we answer it.
            </p>
          </motion.div>

          {/* Right: HIPAA prominent card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:max-w-sm w-full"
          >
            <div
              className="flex items-start gap-4 p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 60%, #FDE68A 100%)',
                border: '2px solid rgba(245,158,11,0.3)',
                boxShadow: '0 8px 32px rgba(245,158,11,0.15), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              <div
                className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(245,158,11,0.15)', border: '1.5px solid rgba(245,158,11,0.35)' }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="9.5" stroke="#D97706" strokeWidth="1.5"/>
                  <path d="M11 7v5M11 14v1" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-[14px] font-bold text-amber-800 mb-1.5">HIPAA-Aware Platform</p>
                <p className="text-[12px] text-amber-700/85 leading-relaxed">
                  CareSync AI is designed with HIPAA-aware workflows — secure data handling, role-based access, and minimum necessary disclosure at every touchpoint. We do not claim formal HIPAA certification.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Trust cards ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {trustItems.map(({ Icon, title, desc, color, glow, stat, statLabel }) => (
            <motion.div key={title} variants={fadeUp}>
              <div
                className="group h-full p-6 rounded-2xl bg-white relative overflow-hidden transition-all duration-300 cursor-default"
                style={{
                  border: '1px solid rgba(15,23,42,0.08)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = `0 0 0 1.5px ${color}40, 0 12px 32px ${color}14`
                  el.style.borderColor = `${color}35`
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
                  el.style.borderColor = 'rgba(15,23,42,0.08)'
                  el.style.transform = ''
                }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
                />

                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: glow, color, border: `1px solid ${color}20` }}
                  >
                    <Icon />
                  </div>
                  {/* Stat badge */}
                  <div
                    className="text-right"
                    style={{ color }}
                  >
                    <div className="text-[16px] font-black leading-none">{stat}</div>
                    <div className="text-[9px] font-semibold uppercase tracking-widest opacity-60 mt-0.5">{statLabel}</div>
                  </div>
                </div>

                <p className="text-[14px] font-bold text-[#0F172A] mb-2 leading-snug">{title}</p>
                <p className="text-[12px] text-[#64748B] leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
