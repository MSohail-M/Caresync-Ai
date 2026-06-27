'use client'

import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────
   Brand mapping — local /public logos
   ───────────────────────────────────────────────────────── */
const medical = [
  { name: 'Epic Systems',       src: '/logo5.jpeg',  label: 'Hospital Networks'    },
  { name: 'athenahealth',       src: '/logo6.jpeg',  label: 'Ambulatory Clinics'   },
  { name: 'eClinicalWorks',     src: '/logo7.jpeg',  label: 'Multi-Specialty EHR'  },
  { name: 'NextGen Healthcare', src: '/logo8.jpeg',  label: 'Specialty Practices'  },
  { name: 'Practice Fusion',    src: '/logo10.jpeg', label: 'Independent Clinics'  },
]

const dental = [
  { name: 'Dentrix',            src: '/logo1.jpeg', label: 'Henry Schein One'      },
  { name: 'Dentrix Ascend',     src: '/logo2.jpeg', label: 'Cloud Practice Mgmt'   },
  { name: 'NexHealth',          src: '/logo3.jpeg', label: 'Patient Experience'    },
  { name: 'Curve Dental',       src: '/logo4.jpeg', label: 'Cloud-Based Imaging'   },
  { name: 'Open Dental',        src: '/logo9.jpeg', label: 'Open Source Platform'  },
]

/* ─────────────────────────────────────────────────────────
   Single logo card
   ───────────────────────────────────────────────────────── */
function LogoCard({ name, src, label }: { name: string; src: string; label: string }) {
  return (
    <div
      className="group mx-3 shrink-0 flex flex-col items-center justify-center gap-2
                 rounded-2xl bg-white px-5 py-4 cursor-default select-none"
      style={{
        minWidth: 160,
        height: 90,
        border: '1px solid rgba(16,185,129,0.1)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 0 0 2px rgba(16,185,129,0.35), 0 12px 32px rgba(16,185,129,0.18)'
        el.style.transform = 'translateY(-3px) scale(1.04)'
        el.style.borderColor = 'rgba(16,185,129,0.4)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'
        el.style.transform = ''
        el.style.borderColor = 'rgba(16,185,129,0.1)'
      }}
    >
      {/* Logo image */}
      <img
        src={src}
        alt={name}
        style={{
          maxHeight: 40,
          maxWidth: 140,
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
        }}
        draggable={false}
      />
      {/* Label */}
      <span
        className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#94A3B8]
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {label}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Infinite marquee row
   ───────────────────────────────────────────────────────── */
function MarqueeRow({
  items,
  direction = 'left',
  speed = 34,
}: {
  items: typeof medical
  direction?: 'left' | 'right'
  speed?: number
}) {
  /* triple-duplicate so the seamless 1/3 loop is always wider than viewport */
  const track = [...items, ...items, ...items]

  return (
    <div className="relative overflow-hidden">
      {/* Fade masks */}
      <div
        className="absolute inset-y-0 left-0 w-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #F0FDF8 10%, transparent 100%)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #F0FDF8 10%, transparent 100%)' }}
      />

      {/* Scrolling track */}
      <div
        className="flex py-2"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
          width: 'max-content',
          willChange: 'transform',
        }}
        onMouseEnter={e => {
          ;(e.currentTarget as HTMLElement).style.animationPlayState = 'paused'
        }}
        onMouseLeave={e => {
          ;(e.currentTarget as HTMLElement).style.animationPlayState = 'running'
        }}
      >
        {track.map((item, i) => (
          <LogoCard key={`${item.name}-${i}`} {...item} />
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Section
   ───────────────────────────────────────────────────────── */
export default function EHRIntegrations() {
  return (
    <section
      id="integrations"
      className="relative overflow-hidden py-16 lg:py-24"
      style={{ background: 'linear-gradient(180deg, #F0FDF8 0%, #FFFFFF 100%)' }}
    >
      {/* ── Background treatments ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.12) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            opacity: 0.45,
          }}
        />
        {/* Center radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Top hairline */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px]"
          style={{ background: 'linear-gradient(to right, transparent, rgba(16,185,129,0.4), transparent)' }}
        />
        {/* Bottom hairline */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1.5px]"
          style={{ background: 'linear-gradient(to right, transparent, rgba(16,185,129,0.4), transparent)' }}
        />
      </div>

      <div className="relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-12 px-4"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(16,185,129,0.25)] bg-[rgba(16,185,129,0.08)] mb-5">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-[#10B981] animate-ping opacity-50" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#059669]">
              Native EHR + Practice Management Integration
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight mb-4">
            Works with the platform{' '}
            <span className="font-serif italic text-gradient-blue">your clinic already runs</span>
          </h2>

          {/* Subtext */}
          <p className="text-[15px] text-[#64748B] max-w-xl mx-auto leading-relaxed">
            CareSync AI reads availability, writes bookings, and syncs call data directly into
            your existing EHR — no third-party middleware, no manual entry.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {[
              { v: '10+', l: 'EHR platforms' },
              { v: 'Real-time', l: 'bi-directional sync' },
              { v: 'Zero', l: 'manual data entry' },
            ].map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white"
                style={{
                  border: '1px solid rgba(16,185,129,0.18)',
                  boxShadow: '0 2px 8px rgba(16,185,129,0.08)',
                }}
              >
                <span className="text-[13px] font-bold text-[#10B981]">{s.v}</span>
                <span className="text-[12px] text-[#64748B]">{s.l}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Medical EHR row ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5"
        >
          {/* Row label */}
          <div className="text-center mb-4">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.12em]"
              style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#2563EB' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Medical EHR Systems
            </span>
          </div>

          <MarqueeRow items={medical} direction="left" speed={36} />
        </motion.div>

        {/* ── Dental row ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          {/* Row label */}
          <div className="text-center mb-4">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.12em]"
              style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#059669' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1C3.8 1 2 2.8 2 5c0 3.5 1.5 5.5 2.8 6.2.6.3 1.4.3 2-.1.4-.3.8-.3 1.2 0 .6.4 1.4.4 2 .1C11.3 10.5 10 8.5 10 5c0-2.2-1.8-4-4-4z" stroke="currentColor" strokeWidth="1" />
              </svg>
              Dental Practice Management
            </span>
          </div>

          <MarqueeRow items={dental} direction="right" speed={30} />
        </motion.div>

        {/* ── Bottom note ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-center mt-10 px-4"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white"
            style={{
              border: '1px solid rgba(16,185,129,0.18)',
              boxShadow: '0 2px 10px rgba(16,185,129,0.08)',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="6.5" stroke="#10B981" strokeWidth="1"/>
              <path d="M7.5 5v3.5M7.5 10v.5" stroke="#10B981" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <span className="text-[12px] text-[#475569] font-medium">
              Don't see yours? CareSync integrates with any EHR via open API — setup in under 48 hours.
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
