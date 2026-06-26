'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import TiltCard from './TiltCard'

const problems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 5.5A1.5 1.5 0 014.5 4h2a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-.96 1.4L5.75 8.5a8.5 8.5 0 003.75 3.75l.6-1.29A1.5 1.5 0 0111.5 10h1A1.5 1.5 0 0114 11.5v2A1.5 1.5 0 0112.5 15C7.25 15 3 10.75 3 5.5z" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M14 4l-3 3M17 4l-3 3" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Missed Calls',
    desc: 'Up to 30% of calls go unanswered during peak hours',
    glowColor: 'rgba(239,68,68,0.15)',
    accentColor: '#EF4444',
    colSpan: 'md:col-span-2',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="#FBBf24" strokeWidth="1.2"/>
        <path d="M10 6v4l2.5 2.5" stroke="#FBBf24" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Long Hold Times',
    desc: "Patients hang up after 2 minutes. They don't call back.",
    glowColor: 'rgba(245,158,11,0.15)',
    accentColor: '#F59E0B',
    colSpan: '',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3a7 7 0 100 14A7 7 0 0010 3z" stroke="#F87171" strokeWidth="1.2"/>
        <path d="M10 7v1M10 12v1" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M7 10h6" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Staff Burnout',
    desc: 'Front desk handles calls, check-ins, AND insurance questions simultaneously',
    glowColor: 'rgba(239,68,68,0.15)',
    accentColor: '#EF4444',
    colSpan: '',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 4h12a1 1 0 011 1v8a1 1 0 01-1 1H6l-3 3V5a1 1 0 011-1z" stroke="#FBBf24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 8h4M8 11h2" stroke="#FBBf24" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'After-Hours Loss',
    desc: "Patients call at 8pm. Voicemail doesn't book appointments.",
    glowColor: 'rgba(245,158,11,0.15)',
    accentColor: '#F59E0B',
    colSpan: '',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="4" width="14" height="13" rx="2" stroke="#F87171" strokeWidth="1.2"/>
        <path d="M7 4V2M13 4V2M3 8h14" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M7 12h2M11 12h2M7 15h2" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Scheduling Errors',
    desc: 'Double bookings, wrong dates, missed follow-ups cost your clinic time and trust',
    glowColor: 'rgba(239,68,68,0.15)',
    accentColor: '#EF4444',
    colSpan: '',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3v4M10 13v4M3 10h4M13 10h4" stroke="#FBBf24" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="3" stroke="#FBBf24" strokeWidth="1.2"/>
      </svg>
    ),
    title: 'Delayed Follow-Ups',
    desc: 'Patients fall through the cracks between visits without automated check-ins',
    glowColor: 'rgba(245,158,11,0.15)',
    accentColor: '#F59E0B',
    colSpan: 'md:col-span-2',
  },
]

export default function Problems() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const rawY  = useTransform(scrollYProgress, [0, 1], [60, -60])
  const rawY2 = useTransform(scrollYProgress, [0, 1], [-40, 40])
  const imgY  = useSpring(rawY,  { stiffness: 60, damping: 18 })
  const imgY2 = useSpring(rawY2, { stiffness: 60, damping: 18 })

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative" id="use-cases" style={{ background: '#F8FAFC' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ray-layer-a opacity-30" />
        <div className="absolute bottom-0 left-0 right-0 h-[35%] overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(239,68,68,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(239,68,68,0.06) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              transform: 'perspective(600px) rotateX(55deg) scaleX(2.8)',
              transformOrigin: '50% 0%',
              animation: 'grid-scroll 8s linear infinite',
            }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #F8FAFC 0%, transparent 30%)' }} />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]" style={{ background: 'radial-gradient(ellipse, rgba(239,68,68,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.08)] mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#F87171]">The Problem</span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight max-w-3xl mx-auto text-[#0F172A]"
          >
            Clinics Lose Patients Every Day to the Same{' '}
            <span className="font-serif italic text-[#F87171]">6 Problems</span>
          </motion.h2>
        </div>

        {/* ── 3D floating images ── */}
        <div className="relative h-0 overflow-visible pointer-events-none select-none">
          <motion.div
            style={{ y: imgY }}
            className="absolute -left-4 lg:-left-16 -top-8 w-[180px] lg:w-[220px] z-10 hidden lg:block"
          >
            <div className="p-1.5 rounded-[1.5rem]" style={{ background: 'rgba(16,185,129,0.04)', boxShadow: '0 0 0 1px rgba(16,185,129,0.12), 0 24px 60px rgba(239,68,68,0.14)' }}>
              <div className="rounded-[calc(1.5rem-6px)] overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80&auto=format&fit=crop"
                  alt="Overwhelmed healthcare staff"
                  className="w-full h-[200px] object-cover object-center"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(239,68,68,0.25) 100%)' }} />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 px-2.5 py-1.5 rounded-full text-[10px] font-semibold" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#F87171' }}>
              ↓ 30% calls missed
            </div>
          </motion.div>

          <motion.div
            style={{ y: imgY2 }}
            className="absolute -right-4 lg:-right-16 -top-16 w-[160px] lg:w-[200px] z-10 hidden lg:block"
          >
            <div className="p-1.5 rounded-[1.5rem]" style={{ background: 'rgba(16,185,129,0.04)', boxShadow: '0 0 0 1px rgba(16,185,129,0.12), 0 24px 60px rgba(245,158,11,0.14)' }}>
              <div className="rounded-[calc(1.5rem-6px)] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80&auto=format&fit=crop"
                  alt="Busy clinic waiting room"
                  className="w-full h-[180px] object-cover object-center"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -left-2 px-2.5 py-1.5 rounded-full text-[10px] font-semibold" style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#FBBf24' }}>
              Patients waiting
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
              className={problem.colSpan}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <TiltCard
                className="h-full"
                intensity={10}
                glowColor={problem.glowColor}
              >
                <div
                  className="p-1.5 rounded-[2rem] h-full transition-all duration-700"
                  style={{
                    background: 'rgba(16,185,129,0.04)',
                    boxShadow: hoveredIndex === i
                      ? `0 0 0 1px ${problem.accentColor}45, 0 8px 40px ${problem.accentColor}18`
                      : '0 0 0 1px rgba(15,23,42,0.06)',
                  }}
                >
                  <div
                    className="rounded-[calc(2rem-6px)] p-6 h-full relative"
                    style={{
                      background: hoveredIndex === i
                        ? `linear-gradient(135deg, ${problem.accentColor}0E 0%, rgba(255,255,255,0.98) 60%)`
                        : 'rgba(255,255,255,0.95)',
                      borderTop: `1px solid ${problem.accentColor}35`,
                      boxShadow: 'inset 0 1px 1px rgba(15,23,42,0.06)',
                    }}
                  >
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse, ${problem.accentColor}55 0%, transparent 70%)`,
                        filter: 'blur(3px)',
                        top: '-1px',
                      }}
                    />

                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300"
                      style={{
                        background: `${problem.accentColor}12`,
                        border: `1px solid ${problem.accentColor}35`,
                        transform: hoveredIndex === i ? 'scale(1.1) translateY(-1px)' : 'scale(1)',
                      }}
                    >
                      {problem.icon}
                    </div>
                    <h3 className="text-base font-semibold text-[#0F172A] mb-2">{problem.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{problem.desc}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
