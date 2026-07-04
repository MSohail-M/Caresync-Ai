'use client'

import { motion } from 'framer-motion'

const benefits = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.003 1.19 2 2 0 012 .003h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
      </svg>
    ),
    title: 'Zero Hold Times',
    desc: 'CareSync AI answers every patient call in under 2 seconds — warm, natural, and clinic-trained. No queues, no missed calls, no frustrated patients.',
    stat: '< 2s',
    statLabel: 'answer time',
    color: '#10B981',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: 'Real World Impact',
    desc: 'Clinics using CareSync report measurable results — higher patient satisfaction, fewer dropped calls, and up to 50% fewer no-shows and cancellations.',
    stat: '97%',
    statLabel: 'satisfaction rate',
    color: '#059669',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Scales Without Extra Staff',
    desc: 'Handle thousands of calls for multi-location clinics and group practices — without adding headcount, training, or overhead.',
    stat: '100×',
    statLabel: 'call capacity',
    color: '#0D9488',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    title: 'Language + Location Ready',
    desc: 'More than 20 languages and accents supported out of the box. Intelligent routing by clinic, specialty, or region — any language, any location.',
    stat: '20+',
    statLabel: 'languages',
    color: '#10B981',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'Secure, Live 24/7',
    desc: 'HIPAA-aware workflows, encrypted data channels, and real-time visibility into every interaction. Always on, always compliant, never down.',
    stat: '24/7',
    statLabel: 'uptime',
    color: '#059669',
  },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } },
}

export default function WhySwitch() {
  return (
    <section
      className="relative py-24 lg:py-32 px-4 overflow-hidden"
      style={{ background: '#F0FDF4' }}
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[500px]" style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(16,185,129,0.14) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px]" style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(13,148,136,0.1) 0%, transparent 60%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.12) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(16,185,129,0.25)] bg-[rgba(16,185,129,0.08)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#10B981]">Why Teams Switch</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-tight leading-[1.08] mb-5">
            Why Care Teams<br />
            <span className="font-serif italic text-gradient-blue">Choose CareSync AI</span>
          </h2>

          <p className="text-[16px] leading-relaxed text-[#64748B]">
            From solo practices to multi-location hospital groups — CareSync replaces inefficient call handling with intelligent, always-on patient communication.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {benefits.map(({ icon, title, desc, stat, statLabel, color }, i) => (
            <motion.div key={title} variants={fadeUp} className={i === 3 ? 'sm:col-span-1 lg:col-span-1' : ''}>
              <div
                className="group h-full p-6 rounded-2xl relative overflow-hidden transition-all duration-300 cursor-default"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(16,185,129,0.15)',
                  boxShadow: '0 2px 12px rgba(16,185,129,0.06)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = `${color}50`
                  el.style.boxShadow = `0 0 0 1px ${color}30, 0 16px 48px ${color}14`
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(16,185,129,0.15)'
                  el.style.boxShadow = '0 2px 12px rgba(16,185,129,0.06)'
                  el.style.transform = ''
                }}
              >
                {/* Top accent line on hover */}
                <div
                  className="absolute top-0 left-6 right-6 h-[1.5px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
                />

                {/* Corner glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 100% 0%, ${color}10 0%, transparent 70%)` }}
                />

                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
                  >
                    {icon}
                  </div>
                  <div className="text-right">
                    <div className="text-[18px] font-black leading-none" style={{ color }}>{stat}</div>
                    <div className="text-[9px] font-semibold uppercase tracking-widest mt-0.5" style={{ color: `${color}80` }}>{statLabel}</div>
                  </div>
                </div>

                <p className="text-[14px] font-bold text-[#0F172A] mb-2 leading-snug">{title}</p>
                <p className="text-[13px] leading-relaxed text-[#64748B]">{desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Last card spans remaining space — Book a Demo CTA */}
          <motion.div variants={fadeUp}>
            <div
              className="h-full p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10B981 60%, #0D9488 100%)',
                boxShadow: '0 16px 48px rgba(16,185,129,0.25)',
              }}
            >
              <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/[0.06] pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white/[0.04] pointer-events-none" />
              <div>
                <p className="text-white/60 text-[11px] font-semibold uppercase tracking-[0.18em] mb-2">Ready to start?</p>
                <p className="text-[22px] font-bold text-white leading-snug mb-2">See it live in your clinic — free demo.</p>
                <p className="text-white/65 text-[13px]">No setup fees. No long-term contracts. Live in 48 hours.</p>
              </div>
              <a
                href="/calendar"
                className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[14px] bg-white text-[#059669] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97] w-fit"
              >
                Book a Free Demo
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2v7" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
