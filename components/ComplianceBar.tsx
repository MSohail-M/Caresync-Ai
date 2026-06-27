'use client'

import { motion } from 'framer-motion'

/* ── Compliance items ───────────────────────────────────────── */
const items = [
  {
    label: 'SOC 2 Aware',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1.5L2 4v4c0 3.3 2.7 6.4 6 7 3.3-.6 6-3.7 6-7V4L8 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M5.5 8l1.8 1.8L11 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'TLS 1.3 Encrypted',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5.5 7V5.5a2.5 2.5 0 015 0V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="8" cy="10.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Data Minimization',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M8 5v4M6 7l2-2 2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Full Audit Logs',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 2h8a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5.5 6h5M5.5 8.5h5M5.5 11h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'US-Based Servers',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2 8h12M8 2c-1.5 2-2.5 3.8-2.5 6s1 4 2.5 6M8 2c1.5 2 2.5 3.8 2.5 6S9.5 12 8 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'HIPAA-Aware Design',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1.5L2 4v4c0 3.3 2.7 6.4 6 7 3.3-.6 6-3.7 6-7V4L8 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M8 5.5v3M8 10v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Role-Based Access',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M3 13c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M11.5 9.5l1 1 2-2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'End-to-End Encrypted',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 8h12M5 5l-3 3 3 3M11 5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: '99.9% Uptime SLA',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Zero Data Retention',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

/* ── Badge pill ─────────────────────────────────────────────── */
function Badge({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div
      className="group mx-3 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white shrink-0 cursor-default"
      style={{
        border: '1px solid rgba(16,185,129,0.15)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s, transform 0.3s, border-color 0.3s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 0 0 2px rgba(16,185,129,0.4), 0 8px 24px rgba(16,185,129,0.18)'
        el.style.transform = 'translateY(-2px) scale(1.04)'
        el.style.borderColor = 'rgba(16,185,129,0.45)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'
        el.style.transform = ''
        el.style.borderColor = 'rgba(16,185,129,0.15)'
      }}
    >
      {/* Icon circle */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff' }}
      >
        {icon}
      </div>
      <span className="text-[13px] font-semibold text-[#1E293B] whitespace-nowrap">{label}</span>
    </div>
  )
}

/* ── Section ────────────────────────────────────────────────── */
export default function ComplianceBar() {
  const track = [...items, ...items, ...items]

  return (
    <section
      id="compliance"
      className="relative overflow-hidden py-8"
      style={{ background: 'linear-gradient(180deg, #F0FDF8 0%, #ECFDF5 100%)' }}
    >
      {/* Background treatments */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.1) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            opacity: 0.5,
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px]"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 65%)', filter: 'blur(50px)' }}
        />
        <div className="absolute top-0 left-0 right-0 h-[1.5px]"
          style={{ background: 'linear-gradient(to right, transparent, rgba(16,185,129,0.45), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px]"
          style={{ background: 'linear-gradient(to right, transparent, rgba(16,185,129,0.45), transparent)' }} />
      </div>

      <div className="relative z-10">
        {/* Marquee only — no header, flows directly from Trust section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative overflow-hidden"
        >
          {/* Fade masks */}
          <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #ECFDF5 10%, transparent 100%)' }} />
          <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #ECFDF5 10%, transparent 100%)' }} />

          {/* Scrolling track */}
          <div
            className="flex py-3"
            style={{
              animation: 'marquee-left 40s linear infinite',
              width: 'max-content',
              willChange: 'transform',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.animationPlayState = 'paused' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.animationPlayState = 'running' }}
          >
            {track.map((item, i) => (
              <Badge key={`${item.label}-${i}`} label={item.label} icon={item.icon} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
