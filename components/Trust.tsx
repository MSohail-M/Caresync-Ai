'use client'

import { motion } from 'framer-motion'

/* ── Icons ──────────────────────────────────────────────── */
const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
)
const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
  </svg>
)
const FileTextIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <polyline points="9 15 11 17 15 13"/>
  </svg>
)
const PhoneForwardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="19 1 23 5 19 9"/>
    <line x1="15" y1="5" x2="23" y2="5"/>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.003 1.19 2 2 0 012 .003h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
  </svg>
)
const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
    <circle cx="12" cy="16" r="1" fill="currentColor"/>
  </svg>
)
const DatabaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    <path d="M12 12v6"/>
  </svg>
)

const trustItems = [
  {
    Icon: ShieldIcon,
    title: 'HIPAA-Aware Workflow Design',
    desc: 'Built following HIPAA privacy principles. Patient data handled with minimum necessary access at every touchpoint.',
    color: '#059669',
    glow: 'rgba(5,150,105,0.1)',
  },
  {
    Icon: UsersIcon,
    title: 'Role-Based Access Control',
    desc: 'Staff see only what they need. Admins control exactly who can access call logs, transcripts, and patient data.',
    color: '#0891B2',
    glow: 'rgba(8,145,178,0.1)',
  },
  {
    Icon: FileTextIcon,
    title: 'Full Audit Logs',
    desc: 'Every interaction timestamped with caller ID and outcome. Compliance-ready exports available on demand.',
    color: '#059669',
    glow: 'rgba(5,150,105,0.1)',
  },
  {
    Icon: PhoneForwardIcon,
    title: 'Human Handoff, Always',
    desc: 'Emergencies, clinical questions, and complaints route to real staff instantly. No exceptions, no dead ends.',
    color: '#0891B2',
    glow: 'rgba(8,145,178,0.1)',
  },
  {
    Icon: LockIcon,
    title: 'Data Minimization',
    desc: 'We collect only what is required to complete a booking. Nothing stored beyond operational necessity.',
    color: '#059669',
    glow: 'rgba(5,150,105,0.1)',
  },
  {
    Icon: DatabaseIcon,
    title: 'Encrypted API Channels',
    desc: 'All integrations use TLS-encrypted connections with authenticated webhooks and rotating token validation.',
    color: '#0891B2',
    glow: 'rgba(8,145,178,0.1)',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function Trust() {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-[#050A18]" id="trust">
      {/* Ambient bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] opacity-20"
          style={{ background: 'radial-gradient(ellipse, #059669 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header — left aligned, asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-semibold text-emerald-400 tracking-widest uppercase">Built for Healthcare</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none">
              Patient privacy<br />
              <span className="text-emerald-400">at the core.</span>
            </h2>
          </motion.div>

          {/* HIPAA disclaimer — right side */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-2 max-w-xs p-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.04]"
          >
            <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#D97706" strokeWidth="1"/>
              <path d="M7 4.5v3M7 9.5v.5" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <p className="text-[11px] text-amber-400/80 leading-snug">
              CareSync AI is designed with HIPAA-aware workflows. We do not claim formal HIPAA certification.
            </p>
          </motion.div>
        </div>

        {/* Trust grid — asymmetric 2-col on md, 3-col on lg */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {trustItems.map(({ Icon, title, desc, color, glow }) => (
            <motion.div key={title} variants={item}>
              <div
                className="group h-full flex gap-4 p-5 rounded-2xl border border-white/[0.06] bg-[#0A1628]/60 hover:border-white/10 transition-all duration-300"
                style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04)` }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5 transition-colors duration-300"
                  style={{ background: glow, color }}
                >
                  <Icon />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white/90 mb-1.5 leading-snug">{title}</p>
                  <p className="text-[12px] text-white/40 leading-relaxed">{desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Compliance logos strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-6 pt-8 border-t border-white/[0.05]"
        >
          <span className="text-[11px] text-white/25 uppercase tracking-widest">Compliance signals</span>
          {['SOC 2 Aware', 'TLS 1.3 Encrypted', 'Data Minimization', 'Audit Logs', 'US-based Servers'].map((label) => (
            <div key={label} className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4.5" stroke="#059669" strokeWidth="0.8"/>
                <path d="M3 5l1.5 1.5L7 3.5" stroke="#059669" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[11px] text-white/40">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
