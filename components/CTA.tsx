'use client'

import { motion } from 'framer-motion'
import TiltCard from './TiltCard'

export default function CTA() {
  return (
    <section className="py-24 md:py-40 relative overflow-hidden" id="cta">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,11,24,0.93) 0%, rgba(7,18,35,0.90) 40%, rgba(6,26,24,0.92) 100%)' }} />
      </div>

      {/* Perspective grid overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.15 }}>
        <div className="perspective-grid-dark" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,11,24,0.8) 0%, transparent 30%, transparent 70%, rgba(5,11,24,0.8) 100%)' }} />
      </div>

      {/* Floating glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 65%)',
          filter: 'blur(80px)',
          animation: 'orb-drift 10s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.14) 0%, transparent 65%)',
          filter: 'blur(100px)',
          animation: 'orb-drift 13s ease-in-out infinite 3s',
        }}
      />

      {/* Center radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(14,165,233,0.14) 0%, rgba(56,189,248,0.07) 40%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Glass card wrapping the CTA content */}
          <TiltCard intensity={4} glowColor="rgba(14,165,233,0.10)" className="w-full">
            <div
              className="bg-white/[0.04] border border-white/[0.06] rounded-[3rem] p-10 md:p-16"
              style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08), 0 32px 80px rgba(0,0,0,0.3)' }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-8">
                <span className="relative w-1.5 h-1.5 rounded-full bg-[#0284C7]">
                  <span className="absolute inset-0 rounded-full bg-[#0284C7] animate-pulse" />
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[rgba(248,250,252,0.65)]">
                  Ready to transform your clinic?
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6 text-[#F8FAFC]">
                Ready to Stop Losing Patients to{' '}
                <span className="font-serif italic text-gradient-blue">Missed Calls?</span>
              </h2>

              <p className="text-lg text-[rgba(248,250,252,0.55)] leading-relaxed max-w-2xl mx-auto mb-12">
                Join clinics across the US using CareSync AI to answer every call, book more appointments, and give patients the fast response they expect.
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <a
                  href="/calendar"
                  className="group flex items-center gap-2 px-8 py-4 rounded-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-semibold text-base transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-[0_0_50px_rgba(14,165,233,0.4)]"
                >
                  Book a Free Demo
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-[1px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
                <a
                  href="#how-it-works"
                  className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/[0.04] text-[#F8FAFC] font-semibold text-base hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  See How It Works
                </a>
              </div>

              {/* Floating glass "Join 500+ Clinics" social proof card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
                className="float-card-light inline-flex items-center gap-3 px-4 py-3 mb-8"
                style={{ animation: 'float 5s ease-in-out infinite' }}
              >
                {/* Avatar circles */}
                <div className="flex -space-x-2">
                  {['JM', 'SP', 'KC'].map((initials, i) => (
                    <div
                      key={initials}
                      className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white"
                      style={{
                        background: i === 0 ? '#0EA5E9' : i === 1 ? '#38BDF8' : '#38BDF8',
                      }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-[#0A1628]">Join 500+ Clinics</div>
                  <div className="text-[10px] text-[#64748B]">Already using CareSync AI</div>
                </div>
              </motion.div>

              {/* Social proof chips */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
                className="flex flex-wrap justify-center gap-3"
              >
                {[
                  { icon: '✓', label: 'No setup fees' },
                  { icon: '✓', label: '14-day free trial' },
                  { icon: '✓', label: 'Cancel anytime' },
                ].map((chip) => (
                  <div
                    key={chip.label}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.04]"
                  >
                    <span className="text-[#0284C7] text-xs font-bold">{chip.icon}</span>
                    <span className="text-xs text-[rgba(248,250,252,0.6)] font-medium">{chip.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}
