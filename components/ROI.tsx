'use client'

import { motion } from 'framer-motion'

const bigMetrics = [
  {
    value: '87%',
    label: 'Fewer missed calls',
    desc: 'From the first week of deployment',
    color: '#0D9488',
    glow: 'rgba(13,148,136,0.12)',
    span: 'lg:col-span-1',
  },
  {
    value: '3.2×',
    label: 'More appointments booked',
    desc: 'Compared to pre-CareSync baseline',
    color: '#2DD4BF',
    glow: 'rgba(45,212,191,0.10)',
    span: 'lg:col-span-1',
  },
]

const smallMetrics = [
  { value: '< 2s', label: 'AI response time', color: '#34D399' },
  { value: '40%', label: 'Less front-desk volume', color: '#0D9488' },
  { value: '24/7', label: 'Patient coverage', color: '#2DD4BF' },
  { value: '100%', label: 'Calls logged', color: '#34D399' },
]

const testimonial = {
  quote: "We used to miss 8–10 calls per day. With CareSync, every patient gets answered immediately — even at 7pm. Our bookings are up 41% in the first month.",
  name: 'Dr. Priya Mehta',
  clinic: 'Lakeview Primary Care, Chicago',
  initials: 'PM',
  stats: [
    { label: 'Calls missed', before: '8–10/day', after: '0', up: false },
    { label: 'Bookings', before: 'baseline', after: '+41%', up: true },
  ],
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function ROI() {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-[#F8FAFC]" id="results">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #0D9488 0%, transparent 65%)', filter: 'blur(80px)', animation: 'orb-drift 12s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #2DD4BF 0%, transparent 65%)', filter: 'blur(100px)', animation: 'orb-drift 15s ease-in-out infinite 3s' }} />
      </div>

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-semibold text-emerald-400 tracking-widest uppercase">Real Results</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-none">
            What clinics see<br />
            <span className="text-emerald-400">in the first 30 days.</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3"
        >
          {/* Two large metric cards */}
          {bigMetrics.map((m) => (
            <motion.div key={m.label} variants={fadeUp} className="md:col-span-1 lg:col-span-2">
              <div
                className="relative h-full min-h-[160px] p-6 rounded-2xl border border-[rgba(15,23,42,0.08)] overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${m.glow.replace('0.12', '0.06')} 0%, #FFFFFF 100%)`,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05)`,
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${m.glow}, transparent)` }} />
                <div className="relative z-10">
                  <p className="text-5xl md:text-6xl font-bold tracking-tighter leading-none mb-2" style={{ color: m.color }}>{m.value}</p>
                  <p className="text-[14px] font-semibold text-[#334155] mb-1">{m.label}</p>
                  <p className="text-[12px] text-[#94A3B8]">{m.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Four small metric pills */}
          {smallMetrics.map((m) => (
            <motion.div key={m.label} variants={fadeUp}>
              <div
                className="h-full min-h-[100px] p-5 rounded-2xl border border-[rgba(15,23,42,0.07)] bg-white flex flex-col justify-center"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)' }}
              >
                <p className="text-3xl font-bold tracking-tight leading-none mb-1.5" style={{ color: m.color }}>{m.value}</p>
                <p className="text-[12px] text-[#64748B]">{m.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-6 md:p-8 rounded-2xl border border-[rgba(15,23,42,0.08)] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.04) 0%, rgba(255,255,255,0.95) 100%)',
            boxShadow: 'inset 0 1px 0 rgba(16,185,129,0.08)',
          }}
        >
          {/* Decorative quote mark */}
          <div className="absolute -top-3 left-6 text-[80px] font-bold leading-none pointer-events-none select-none"
            style={{ color: 'rgba(16,185,129,0.15)' }}>
            "
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <blockquote className="text-[15px] md:text-base text-[#475569] leading-relaxed mb-5">
                {testimonial.quote}
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-emerald-300"
                  style={{ background: 'rgba(13,148,136,0.15)', border: '1px solid rgba(13,148,136,0.25)' }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#1E293B]">{testimonial.name}</p>
                  <p className="text-[11px] text-[#94A3B8]">{testimonial.clinic}</p>
                </div>
              </div>
            </div>

            {/* Before/after mini stats */}
            <div className="flex gap-2 shrink-0">
              {testimonial.stats.map((s) => (
                <div key={s.label}
                  className="min-w-[100px] p-3 rounded-xl bg-[#FFFFFF]/80 border border-[rgba(15,23,42,0.07)]">
                  <p className="text-[10px] text-[#94A3B8] uppercase tracking-wide mb-1">{s.label}</p>
                  <p className="text-lg font-bold" style={{ color: s.up ? '#059669' : '#EF4444' }}>
                    {s.up ? '+' : ''}{s.after}
                  </p>
                  <p className="text-[10px] text-[#94A3B8] mt-0.5">from {s.before}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Inline CTA — after proof is established */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white"
        >
          <div>
            <p className="text-[14px] font-semibold text-[#334155]">See these numbers at your clinic.</p>
            <p className="text-[12px] text-[#94A3B8] mt-0.5">Setup in 48 hours. No hardware. No contracts.</p>
          </div>
          <a
            href="/calendar"
            className="btn-primary shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-semibold text-white active:scale-[0.97]"
          >
            Book a Free Demo
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
