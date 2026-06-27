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
    color: '#0D9488',
    glow: 'rgba(13,148,136,0.1)',
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
    color: '#0D9488',
    glow: 'rgba(13,148,136,0.1)',
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
    color: '#0D9488',
    glow: 'rgba(13,148,136,0.1)',
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
    <section className="relative py-24 px-4 overflow-hidden bg-white" id="trust">
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-none">
              Patient privacy<br />
              <span className="text-emerald-400">at the core.</span>
            </h2>
          </motion.div>

          {/* HIPAA disclaimer — prominent card */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-4 p-5 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
              border: '1.5px solid rgba(245,158,11,0.35)',
              boxShadow: '0 4px 20px rgba(245,158,11,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
          >
            {/* Icon circle */}
            <div
              className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: '#FEF3C7', border: '1.5px solid rgba(245,158,11,0.4)' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="#D97706" strokeWidth="1.5"/>
                <path d="M10 6v5M10 13v1" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-bold text-amber-700 mb-1 tracking-tight">
                HIPAA-Aware Platform
              </p>
              <p className="text-[12px] text-amber-600/90 leading-relaxed">
                CareSync AI is built with HIPAA-aware workflows — secure data handling, role-based access, and minimum necessary disclosure at every step. We do not claim formal HIPAA certification.
              </p>
            </div>
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
                className="group h-full flex gap-4 p-5 rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/60 hover:border-[rgba(15,23,42,0.14)] transition-all duration-300"
                style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04)` }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5 transition-colors duration-300"
                  style={{ background: glow, color }}
                >
                  <Icon />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#1E293B] mb-1.5 leading-snug">{title}</p>
                  <p className="text-[12px] text-[#64748B] leading-relaxed">{desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
