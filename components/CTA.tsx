'use client'

import { motion } from 'framer-motion'

const proofItems = [
  { label: 'No setup fees' },
  { label: '14-day free trial' },
  { label: 'Cancel anytime' },
  { label: 'Setup in 48 hours' },
]

const clinics = [
  { initials: 'PM', color: '#0891B2' },
  { initials: 'RK', color: '#0369A1' },
  { initials: 'JT', color: '#0284C7' },
]

export default function CTA() {
  return (
    <section className="relative py-28 md:py-40 px-4 overflow-hidden bg-[#050A18]" id="cta">
      {/* Ambient blobs — hardware accelerated via transform only */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-[700px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(8,145,178,0.18) 0%, transparent 65%)',
            filter: 'blur(100px)',
            animation: 'orb-drift 12s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(34,211,238,0.10) 0%, transparent 65%)',
            filter: 'blur(120px)',
            animation: 'orb-drift 16s ease-in-out infinite 4s',
          }}
        />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(56,189,248,0.6) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-[900px] mx-auto text-center">
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/20 bg-sky-500/[0.06]">
            <motion.div
              className="w-2 h-2 rounded-full bg-sky-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="text-[12px] font-semibold text-sky-400 tracking-wide">
              500+ clinics already live on CareSync AI
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-5"
        >
          Stop losing patients<br />
          to <span className="text-sky-400">missed calls.</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16px] text-white/45 leading-relaxed max-w-xl mx-auto mb-10"
        >
          CareSync AI answers every call in under 2 seconds, books directly into your calendar, and logs everything — automatically.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        >
          {/* Primary CTA */}
          <a
            href="/calendar"
            className="group relative flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-[15px] text-white transition-all duration-300 active:scale-[0.97]"
            style={{
              background: 'linear-gradient(135deg, #0891B2 0%, #0284C7 100%)',
              boxShadow: '0 0 0 1px rgba(8,145,178,0.4), 0 8px 32px rgba(8,145,178,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
              <polyline points="9 16 11 18 15 14"/>
            </svg>
            Book a Free Demo
            <span
              className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300"
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>

          {/* Secondary CTA */}
          <a
            href="#demo"
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-[15px] text-white/75 border border-white/[0.09] bg-white/[0.03] hover:bg-white/[0.06] hover:text-white hover:border-white/[0.15] transition-all duration-300 active:scale-[0.97]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Hear a Live Call
          </a>
        </motion.div>

        {/* Trust chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {proofItems.map((p) => (
            <div key={p.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.02]">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4.5" stroke="#0891B2" strokeWidth="0.8"/>
                <path d="M3 5l1.5 1.5L7 3.5" stroke="#0891B2" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[12px] text-white/40">{p.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Social proof avatars */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3"
        >
          <div className="flex -space-x-2.5">
            {clinics.map((c) => (
              <div
                key={c.initials}
                className="w-8 h-8 rounded-full border-2 border-[#050A18] flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: c.color }}
              >
                {c.initials}
              </div>
            ))}
          </div>
          <p className="text-[12px] text-white/30">
            Joined by <span className="text-white/55 font-semibold">500+ clinics</span> across the US
          </p>
        </motion.div>
      </div>
    </section>
  )
}
