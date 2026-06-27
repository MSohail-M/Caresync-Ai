'use client'

import { motion } from 'framer-motion'

/* ── Brand data ──────────────────────────────────────────── */
const medical = [
  {
    name: 'Epic Systems',
    domain: 'epic.com',
    label: 'Gold Standard · Hospital Networks',
    color: '#e11d48',
    abbr: 'EP',
  },
  {
    name: 'athenahealth',
    domain: 'athenahealth.com',
    label: 'Cloud-Native · Ambulatory Clinics',
    color: '#0077b6',
    abbr: 'AH',
  },
  {
    name: 'eClinicalWorks',
    domain: 'eclinicalworks.com',
    label: 'Multi-Specialty · AI Charting',
    color: '#003087',
    abbr: 'eCW',
  },
  {
    name: 'NextGen Healthcare',
    domain: 'nextgen.com',
    label: 'Specialty · Fully Customizable',
    color: '#e05600',
    abbr: 'NG',
  },
  {
    name: 'Practice Fusion',
    domain: 'practicefusion.com',
    label: 'Cloud-Based · Independent Clinics',
    color: '#0066cc',
    abbr: 'PF',
  },
]

const dental = [
  {
    name: 'Dentrix',
    domain: 'dentrix.com',
    label: 'Henry Schein One · AI Diagnostics',
    color: '#004b8d',
    abbr: 'DX',
  },
  {
    name: 'NexHealth',
    domain: 'nexhealth.com',
    label: 'Patient Experience · Scheduling',
    color: '#5b21b6',
    abbr: 'NH',
  },
  {
    name: 'Curve Dental',
    domain: 'curvedental.com',
    label: 'Cloud · Built-in Imaging & AI',
    color: '#1a73e8',
    abbr: 'CD',
  },
  {
    name: 'Open Dental',
    domain: 'opendental.com',
    label: 'Open Source · Highly Flexible',
    color: '#0d8a6a',
    abbr: 'OD',
  },
  {
    name: 'Denticon',
    domain: 'planetdds.com',
    label: 'Planet DDS · Multi-Location DSO',
    color: '#1e40af',
    abbr: 'DC',
  },
]

/* ── Logo card ───────────────────────────────────────────── */
function LogoCard({
  name, domain, label, color, abbr,
}: { name: string; domain: string; label: string; color: string; abbr: string }) {
  return (
    <div
      className="group mx-2.5 flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white shrink-0 cursor-default select-none"
      style={{
        border: '1px solid rgba(16,185,129,0.1)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)',
        minWidth: 210,
        transition: 'box-shadow 0.3s, transform 0.3s, border-color 0.3s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.boxShadow = '0 0 0 1.5px rgba(16,185,129,0.35), 0 8px 28px rgba(16,185,129,0.18), 0 2px 8px rgba(0,0,0,0.06)'
        el.style.transform = 'scale(1.05) translateY(-2px)'
        el.style.borderColor = 'rgba(16,185,129,0.35)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)'
        el.style.transform = ''
        el.style.borderColor = 'rgba(16,185,129,0.1)'
      }}
    >
      {/* Logo with fallback */}
      <div
        className="w-10 h-10 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
        style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.06)' }}
      >
        <img
          src={`https://logo.clearbit.com/${domain}?size=80`}
          alt={name}
          className="w-full h-full object-contain"
          style={{ padding: '3px' }}
          onError={e => {
            const img = e.currentTarget
            img.style.display = 'none'
            const parent = img.parentElement
            if (parent) {
              parent.style.background = color
              parent.style.border = 'none'
              parent.innerHTML = `<span style="color:white;font-size:11px;font-weight:800;letter-spacing:-0.02em">${abbr}</span>`
            }
          }}
        />
      </div>

      {/* Text */}
      <div className="overflow-hidden">
        <div className="text-[13px] font-bold text-[#0F172A] leading-tight truncate">{name}</div>
        <div className="text-[10px] text-[#94A3B8] mt-0.5 leading-tight truncate">{label}</div>
      </div>

      {/* Live integration dot */}
      <div className="ml-auto pl-2 shrink-0">
        <div className="flex items-center gap-1">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-[#10B981] animate-ping opacity-40" />
            <span className="relative w-2 h-2 rounded-full bg-[#10B981]" />
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Marquee row ─────────────────────────────────────────── */
function MarqueeRow({
  items, direction = 'left', speed = 32,
}: {
  items: typeof medical
  direction?: 'left' | 'right'
  speed?: number
}) {
  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden">
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #F8FAFC 20%, transparent 100%)' }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #F8FAFC 20%, transparent 100%)' }}
      />

      {/* Track */}
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
        {doubled.map((item, i) => (
          <LogoCard key={`${item.name}-${i}`} {...item} />
        ))}
      </div>
    </div>
  )
}

/* ── Category badge ──────────────────────────────────────── */
function CategoryBadge({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <div className="text-center mb-4">
      <span
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.12em]"
        style={{
          background: `${color}10`,
          border: `1px solid ${color}25`,
          color,
        }}
      >
        {icon}
        {label}
      </span>
    </div>
  )
}

/* ── Main section ────────────────────────────────────────── */
export default function EHRIntegrations() {
  return (
    <section
      id="integrations"
      className="relative py-16 lg:py-20 overflow-hidden"
      style={{ background: '#F8FAFC' }}
    >
      {/* Background dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.5,
        }}
      />

      {/* Top + bottom divider lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(16,185,129,0.25), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(16,185,129,0.25), transparent)' }}
      />

      {/* Soft glow blobs */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -left-32 w-[400px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -right-32 w-[400px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(13,148,136,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-10 px-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(16,185,129,0.22)] bg-[rgba(16,185,129,0.07)] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#059669]">
              Native EHR Integration
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight mb-4">
            Works with the systems{' '}
            <span className="font-serif italic text-gradient-blue">you already use</span>
          </h2>

          <p className="text-[15px] text-[#64748B] max-w-lg mx-auto leading-relaxed">
            CareSync AI connects directly to leading medical and dental EHR platforms.
            Your call data, bookings, and transcripts sync automatically — zero manual entry.
          </p>
        </motion.div>

        {/* ── Medical EHR row ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5"
        >
          <CategoryBadge
            color="#3b82f6"
            label="Medical EHR Systems"
            icon={
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            }
          />
          <MarqueeRow items={medical} direction="left" speed={38} />
        </motion.div>

        {/* ── Dental row ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CategoryBadge
            color="#10B981"
            label="Dental Practice Management"
            icon={
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 4c0-1.66 1.34-3 3-3 .55 0 1.07.15 1.5.41A3 3 0 019 4c0 2.8-1 4-2 5-.5.5-1.5.5-2 0C4 8 3 6.8 3 4H2z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            }
          />
          <MarqueeRow items={dental} direction="right" speed={30} />
        </motion.div>

        {/* ── Bottom note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 px-4"
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(16,185,129,0.15)',
              boxShadow: '0 2px 8px rgba(16,185,129,0.08)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1C3.69 1 1 3.69 1 7s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" stroke="#10B981" strokeWidth="1" />
              <path d="M7 5v3M7 9.5v.5" stroke="#10B981" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span className="text-[12px] text-[#475569] font-medium">
              Not listed? CareSync integrates with any EHR or scheduling system via open API.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
