'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TiltCard from './TiltCard'

const metrics = [
  { value: '↓ 87%', label: 'Missed call rate reduction', color: '#10B981', desc: 'From first week of deployment' },
  { value: '3.2×', label: 'More appointments booked', color: '#22C55E', desc: 'Compared to pre-CareSync baseline' },
  { value: '↓ 40%', label: 'Front desk call volume', color: '#10B981', desc: 'Staff redirected to in-person care' },
  { value: '< 2 sec', label: 'Average AI response time', color: '#22C55E', desc: 'Every call, every time' },
  { value: '24/7', label: 'Patient coverage', color: '#10B981', desc: 'Including nights, weekends, holidays' },
  { value: '100%', label: 'Calls answered & logged', color: '#22C55E', desc: 'Full transcription for every call' },
]

// Hardcoded starfield positions
const stars = [
  { top: '8%', left: '12%' }, { top: '15%', left: '85%' }, { top: '22%', left: '38%' },
  { top: '5%', left: '60%' }, { top: '32%', left: '92%' }, { top: '44%', left: '5%' },
  { top: '18%', left: '71%' }, { top: '55%', left: '25%' }, { top: '67%', left: '78%' },
  { top: '73%', left: '14%' }, { top: '82%', left: '52%' }, { top: '91%', left: '88%' },
  { top: '12%', left: '48%' }, { top: '38%', left: '65%' }, { top: '50%', left: '42%' },
  { top: '60%', left: '93%' }, { top: '78%', left: '33%' }, { top: '88%', left: '72%' },
  { top: '25%', left: '19%' }, { top: '41%', left: '80%' }, { top: '62%', left: '57%' },
  { top: '71%', left: '4%' }, { top: '84%', left: '40%' }, { top: '94%', left: '18%' },
  { top: '3%', left: '30%' }, { top: '47%', left: '11%' }, { top: '57%', left: '68%' },
  { top: '79%', left: '82%' }, { top: '35%', left: '50%' }, { top: '96%', left: '60%' },
]

function MetricCard({ metric, index }: { metric: typeof metrics[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.32, 0.72, 0, 1] }}
    >
      <TiltCard intensity={12} glowColor={`${metric.color}20`} className="h-full">
        <div
          className="p-2 rounded-[2rem] h-full"
          style={{ background: 'rgba(255,255,255,0.03)', boxShadow: `0 0 0 1px rgba(255,255,255,0.07)` }}
        >
          <div
            className="rounded-[calc(2rem-8px)] p-6 h-full flex flex-col relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${metric.color}08, #071209 60%)`,
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)',
            }}
          >
            {/* Bottom colored glow bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[40px] pointer-events-none"
              style={{
                background: `linear-gradient(to top, ${metric.color}18, transparent)`,
                filter: 'blur(8px)',
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2, ease: [0.32, 0.72, 0, 1] }}
              className="text-4xl font-serif font-bold tracking-tight mb-2 text-gradient-blue relative z-10"
            >
              {metric.value}
            </motion.div>
            <div className="text-sm font-semibold text-[#F8FAFC] mb-1 relative z-10">{metric.label}</div>
            <div className="text-xs text-[rgba(248,250,252,0.45)] leading-relaxed mt-auto pt-2 relative z-10">{metric.desc}</div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function ROI() {
  return (
    <section className="py-24 md:py-32 relative" id="results" style={{ background: '#030906' }}>

      {/* Starfield */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-white/20 pointer-events-none"
          style={{ top: star.top, left: star.left }}
        />
      ))}

      {/* Perspective grid overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.2 }}>
        <div className="perspective-grid-dark" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #030906 0%, transparent 20%, transparent 80%, #030906 100%)' }} />
      </div>

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 65%)',
          filter: 'blur(80px)',
          animation: 'orb-drift 10s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 65%)',
          filter: 'blur(100px)',
          animation: 'orb-drift 13s ease-in-out infinite 2.5s',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#16A34A]/20 bg-[#16A34A]/[0.06] mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#16A34A]">The Results</span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight max-w-3xl mx-auto text-[#F8FAFC]"
          >
            What Clinics See in the{' '}
            <span className="font-serif italic text-gradient-blue">First 30 Days</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
        >
          <TiltCard intensity={6} glowColor="rgba(34,197,94,0.10)" className="w-full">
            <div className="p-2 rounded-[2rem] bg-white/5 ring-1 ring-white/[0.08]">
              <div
                className="rounded-[calc(2rem-8px)] p-8 md:p-12 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.06) 0%, rgba(16,185,129,0.03) 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)',
                }}
              >
                {/* Huge decorative quote mark */}
                <div
                  className="absolute -top-4 -left-2 text-[120px] font-serif leading-none pointer-events-none select-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34,197,94,0.25) 0%, rgba(16,185,129,0.15) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  "
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                  <div className="flex-1">
                    <blockquote className="text-lg md:text-xl font-medium text-[#F8FAFC] leading-relaxed mb-6 pl-4">
                      We used to miss 8–10 calls per day. With CareSync, every patient gets answered immediately — even at 7pm. Our bookings are up 40%.
                    </blockquote>
                    <div className="flex items-center gap-3 pl-4">
                      <div className="w-10 h-10 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/20 flex items-center justify-center text-sm font-bold text-[#22C55E]">
                        SP
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#F8FAFC]">Dr. Sarah Patel</div>
                        <div className="text-xs text-[rgba(248,250,252,0.45)]">Greenfield Family Medicine</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 shrink-0">
                    {[
                      { label: 'Calls Missed', before: '8–10/day', after: '0', color: '#EF4444', arrow: '↓' },
                      { label: 'Bookings', before: 'baseline', after: '+40%', color: '#10B981', arrow: '↑' },
                    ].map((stat) => (
                      <div key={stat.label} className="p-3 rounded-2xl bg-[#040D06]/60 border border-white/[0.06]">
                        <div className="text-[10px] text-[rgba(248,250,252,0.4)] uppercase tracking-wide mb-1">{stat.label}</div>
                        <div className="text-xl font-bold" style={{ color: stat.color }}>{stat.arrow} {stat.after}</div>
                        <div className="text-[10px] text-[rgba(248,250,252,0.35)] mt-0.5">was: {stat.before}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}
