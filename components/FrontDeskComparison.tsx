'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Data ───────────────────────────────────────────────── */
const rows = [
  {
    old: {
      headline: 'Patients wait on hold. Missed after hours.',
      stat: '67% hang-up rate',
    },
    neu: {
      headline: 'Answered in under 2 seconds. Available 24/7/365.',
      stat: '< 2s',
      statLabel: 'response time',
    },
  },
  {
    old: {
      headline: 'Staff manually enters data, risking costly errors.',
      stat: '1-in-5 entries incorrect',
    },
    neu: {
      headline: 'EHR updated in real time, automatically.',
      stat: '99.3%',
      statLabel: 'data accuracy',
    },
  },
  {
    old: {
      headline: 'Front desk overwhelmed by repetitive routine tasks.',
      stat: '73% of calls are routine',
    },
    neu: {
      headline: 'Routine calls handled flawlessly — without staff.',
      stat: '0',
      statLabel: 'staff interruptions',
    },
  },
  {
    old: {
      headline: 'Constant retraining, high turnover, rising cost.',
      stat: '$4,800 avg cost per hire',
    },
    neu: {
      headline: 'Zero turnover. No retraining. Ever.',
      stat: 'Fixed',
      statLabel: 'monthly cost',
    },
  },
]

/* ── X Icon ─────────────────────────────────────────────── */
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6.5" stroke="#EF4444" strokeWidth="1"/>
    <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

/* ── Check Icon ─────────────────────────────────────────── */
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6.5" stroke="#34D399" strokeWidth="1"/>
    <path d="M4 7l2 2 4-4" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ── Row ────────────────────────────────────────────────── */
function ComparisonRow({
  old: oldData,
  neu,
  index,
}: {
  old: { headline: string; stat: string }
  neu: { headline: string; stat: string; statLabel: string }
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.32, 0.72, 0, 1] }}
      className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 group"
    >
      {/* OLD WAY */}
      <div className="relative flex items-start gap-3 p-5 md:pr-8 rounded-xl md:rounded-r-none bg-[#F8FAFC] border border-[rgba(15,23,42,0.07)] md:border-r-0 group-hover:bg-[#F1F5F9] transition-colors duration-300">
        <div className="shrink-0 mt-0.5">
          <XIcon />
        </div>
        <div className="flex-1">
          <p className="text-[13px] text-[#64748B] leading-snug">{oldData.headline}</p>
          <p className="mt-2 text-[11px] font-semibold text-red-400/60 tracking-wide">{oldData.stat}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:flex flex-col items-center justify-center w-10 relative bg-transparent z-10">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent absolute" />
        <div
          className="w-6 h-6 rounded-full border border-emerald-500/30 bg-white flex items-center justify-center shrink-0 z-10"
          style={{ boxShadow: '0 0 8px rgba(16,185,129,0.15)' }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 4h6M5 2l2 2-2 2" stroke="#34D399" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* WITH CARESYNC */}
      <div
        className="relative flex items-start gap-3 p-5 md:pl-8 rounded-xl md:rounded-l-none border border-emerald-500/10 md:border-l-0 transition-colors duration-300 group-hover:border-emerald-500/20"
        style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.04) 0%, rgba(255,255,255,0.95) 100%)',
          boxShadow: 'inset 0 1px 0 rgba(16,185,129,0.06)',
        }}
      >
        <div className="shrink-0 mt-0.5">
          <CheckIcon />
        </div>
        <div className="flex-1">
          <p className="text-[13px] text-[#334155] leading-snug font-medium">{neu.headline}</p>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-[18px] font-bold text-emerald-400 leading-none tracking-tight">{neu.stat}</span>
            <span className="text-[11px] text-emerald-400/50">{neu.statLabel}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main Section ───────────────────────────────────────── */
export default function FrontDeskComparison() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Bg treatment */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-20"
          style={{ background: 'linear-gradient(to right, transparent, #10B981, transparent)' }}
        />
      </div>

      <div className="relative max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:gap-10 mb-10 items-end">
          {/* old label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-4 md:mb-0"
          >
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <span className="text-[11px] font-semibold text-[#94A3B8] tracking-widest uppercase">The Old Way</span>
          </motion.div>

          <div className="hidden md:block w-10" />

          {/* new label */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <div
              className="w-2 h-2 rounded-full bg-emerald-400"
              style={{ boxShadow: '0 0 6px rgba(52,211,153,0.7)' }}
            />
            <span className="text-[11px] font-semibold text-emerald-400 tracking-widest uppercase">With CareSync AI</span>
          </motion.div>
        </div>

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-none">
            Redefining the<br />
            <span className="text-emerald-400">front desk baseline.</span>
          </h2>
        </motion.div>

        {/* Comparison rows */}
        <div className="flex flex-col gap-2">
          {rows.map((row, i) => (
            <ComparisonRow key={i} {...row} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl border border-[rgba(15,23,42,0.08)] bg-[#F8FAFC]"
        >
          <div>
            <p className="text-[13px] font-semibold text-[#334155]">Ready to switch your front desk to AI?</p>
            <p className="text-[12px] text-[#94A3B8] mt-0.5">Setup takes under 48 hours. No hardware required.</p>
          </div>
          <button className="btn-primary shrink-0 px-5 py-2.5 rounded-lg text-[13px] font-semibold text-white active:scale-[0.97]">
            Book a Demo
          </button>
        </motion.div>
      </div>
    </section>
  )
}
