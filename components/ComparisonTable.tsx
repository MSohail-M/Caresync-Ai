'use client'

import { motion } from 'framer-motion'

const rows = [
  {
    feature: 'Hold Times',
    caresync: 'Zero — instant answer',
    traditional: 'Long wait queues',
    level: 'win',
  },
  {
    feature: 'Availability',
    caresync: '24/7, no downtime',
    traditional: 'Limited by staff hours',
    level: 'win',
  },
  {
    feature: 'Call Efficiency',
    caresync: 'Handles 100× more calls/day',
    traditional: 'Staffing bottlenecks',
    level: 'win',
  },
  {
    feature: 'Cost',
    caresync: '80% lower than staff',
    traditional: 'Rises with call volume',
    level: 'win',
  },
  {
    feature: 'EHR / PMS Integration',
    caresync: '40+ deep EHR integrations',
    traditional: 'Often manual or none',
    level: 'critical',
  },
  {
    feature: 'Accuracy',
    caresync: '99.9% data accuracy',
    traditional: 'Prone to human error',
    level: 'win',
  },
  {
    feature: 'Consistency',
    caresync: 'Always natural, reliable',
    traditional: 'Dependent on agent skill',
    level: 'win',
  },
  {
    feature: 'Analytics',
    caresync: 'Real-time dashboards',
    traditional: 'Manual QA samples only',
    level: 'win',
  },
  {
    feature: 'Scope',
    caresync: 'Full workflow automation',
    traditional: 'Call handling only',
    level: 'win',
  },
]

const WarnIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="1.5"/>
    <line x1="12" y1="9" x2="12" y2="13" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="0.8" fill="#F59E0B"/>
  </svg>
)

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
    <circle cx="12" cy="12" r="9.5" fill="#EF4444" fillOpacity="0.1" stroke="#EF4444" strokeWidth="1.5"/>
    <path d="M9 9l6 6M15 9l-6 6" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const CheckIcon = ({ color = '#10B981' }: { color?: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
    <circle cx="12" cy="12" r="9.5" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5"/>
    <path d="M8 12l3 3 5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function ComparisonTable() {
  return (
    <section className="relative py-24 lg:py-32 px-4 overflow-hidden" style={{ background: '#FFFFFF' }}>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px]" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 65%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.05) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
      </div>

      <div className="relative z-10 max-w-[960px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.06)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#059669]">Head to Head</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-tight leading-[1.08] mb-5">
            CareSync AI vs<br />
            <span className="font-serif italic text-gradient-blue">Traditional Call Center</span>
          </h2>

          <p className="text-[16px] text-[#64748B] leading-relaxed">
            See exactly why healthcare practices are replacing human call centers with CareSync AI.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
        >
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              border: '1px solid rgba(15,23,42,0.08)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            {/* Table header */}
            <div className="grid grid-cols-[1.2fr_1.4fr_1.4fr]">
              <div className="px-6 py-4 bg-[#F8FAFC] border-b border-r border-[rgba(15,23,42,0.07)]">
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.18em]">Feature</span>
              </div>
              <div
                className="px-6 py-4 border-b border-r border-[rgba(15,23,42,0.07)]"
                style={{ background: 'linear-gradient(to bottom, rgba(16,185,129,0.08), rgba(16,185,129,0.04))' }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-[13px] font-bold text-[#059669]">CareSync AI</span>
                </div>
              </div>
              <div className="px-6 py-4 bg-[#F8FAFC] border-b border-[rgba(15,23,42,0.07)]">
                <span className="text-[13px] font-bold text-[#94A3B8]">Traditional Call Center</span>
              </div>
            </div>

            {/* Table rows */}
            {rows.map((row, i) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="grid grid-cols-[1.2fr_1.4fr_1.4fr] group"
              >
                {/* Feature name */}
                <div
                  className="px-6 py-4 flex items-center border-b border-r border-[rgba(15,23,42,0.06)] group-hover:bg-[rgba(16,185,129,0.02)] transition-colors"
                  style={{ borderColor: i === rows.length - 1 ? 'transparent' : undefined }}
                >
                  <span className="text-[13px] font-semibold text-[#0F172A]">{row.feature}</span>
                </div>

                {/* CareSync cell */}
                <div
                  className="px-6 py-4 flex items-start gap-2.5 border-b border-r border-[rgba(15,23,42,0.06)] group-hover:bg-[rgba(16,185,129,0.04)] transition-colors"
                  style={{
                    background: 'rgba(16,185,129,0.03)',
                    borderColor: i === rows.length - 1 ? 'transparent' : undefined,
                  }}
                >
                  <CheckIcon color={row.level === 'critical' ? '#10B981' : '#059669'} />
                  <span className="text-[13px] font-medium" style={{ color: row.level === 'critical' ? '#059669' : '#047857' }}>
                    {row.caresync}
                  </span>
                </div>

                {/* Traditional cell */}
                <div
                  className="px-6 py-4 flex items-start gap-2.5 border-b border-[rgba(15,23,42,0.06)] group-hover:bg-[rgba(0,0,0,0.01)] transition-colors"
                  style={{ borderColor: i === rows.length - 1 ? 'transparent' : undefined }}
                >
                  {row.level === 'critical' ? <XIcon /> : <WarnIcon />}
                  <span className="text-[13px]" style={{ color: row.level === 'critical' ? '#DC2626' : '#92400E' }}>
                    {row.traditional}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-[12px] text-[#94A3B8] mt-6"
        >
          Based on aggregate data from healthcare practices using CareSync AI. Results may vary by clinic size and specialty.
        </motion.p>

      </div>
    </section>
  )
}
