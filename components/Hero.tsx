'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type PhoneState = 'ringing' | 'answering' | 'transcript' | 'booked' | 'sms'

const transcriptLines = [
  { speaker: 'patient', text: "Hi, I'd like to book an appointment" },
  { speaker: 'ai', text: 'Of course! Are you a new or existing patient?' },
  { speaker: 'patient', text: "I'm an existing patient." },
  { speaker: 'ai', text: 'Perfect — I have a slot available. Let me book that for you!' },
]

const floatingBadges = [
  { label: 'AI Answering', color: '#3B8EF0', dot: '#3B8EF0', delay: '0s' },
  { label: 'Appointment Booked', color: '#10B981', dot: '#10B981', delay: '1.4s' },
  { label: 'SMS Sent', color: '#8B5CF6', dot: '#8B5CF6', delay: '2.8s' },
]

export default function Hero() {
  const [phoneState, setPhoneState] = useState<PhoneState>('ringing')
  const [transcriptStep, setTranscriptStep] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const sequence: [PhoneState, number][] = [
      ['ringing', 3000],
      ['answering', 2500],
      ['transcript', 6000],
      ['booked', 3000],
      ['sms', 3000],
    ]
    let timeout: ReturnType<typeof setTimeout>
    let currentIndex = 0

    const advance = () => {
      const [state, duration] = sequence[currentIndex]
      setPhoneState(state)
      if (state === 'transcript') setTranscriptStep(0)
      currentIndex = (currentIndex + 1) % sequence.length
      timeout = setTimeout(advance, duration)
    }

    timeout = setTimeout(advance, sequence[0][1])
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (phoneState !== 'transcript') return
    setTranscriptStep(0)
    const timers = transcriptLines.map((_, i) =>
      setTimeout(() => setTranscriptStep(i + 1), i * 1400)
    )
    return () => timers.forEach(clearTimeout)
  }, [phoneState])

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden" id="features">

      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(248,250,252,0.96) 0%, rgba(240,247,255,0.93) 50%, rgba(240,253,249,0.91) 100%)' }}
        />
      </div>

      {/* ── Cinematic glow orbs ── */}
      <div
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none glow-blue"
        style={{
          background: 'radial-gradient(circle, rgba(59,142,240,0.18) 0%, transparent 65%)',
          filter: 'blur(80px)',
          animation: `orb-drift 10s ease-in-out infinite`,
        }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none glow-green"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 65%)',
          filter: 'blur(100px)',
          animation: `orb-drift 12s ease-in-out infinite 2s`,
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)',
          filter: 'blur(120px)',
          animation: `orb-drift 14s ease-in-out infinite 4s`,
        }}
      />

      {/* ── Perspective grid at bottom 40% ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] overflow-hidden pointer-events-none">
        <div className="perspective-grid" style={{ opacity: 0.5 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(248,250,252,0.9) 0%, transparent 40%)' }} />
      </div>

      {/* ── Fixed grain overlay ── */}
      <div
        className="pointer-events-none"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Text ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0F172A]/[0.1] bg-white/70 mb-8 shadow-sm">
                <span className="relative w-1.5 h-1.5 rounded-full bg-[#10B981]">
                  <span className="absolute inset-0 rounded-full bg-[#10B981] animate-pulse" />
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#374151]">
                  AI Voice Agent for Clinics
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6 text-[#0F172A]"
            >
              AI Front Desk That{' '}
              <span className="font-serif italic text-gradient-blue">Answers, Books,</span>
              {' '}and Follows Up With Patients 24/7
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
              className="text-lg text-[#64748B] leading-relaxed mb-10 max-w-xl"
            >
              Stop losing patients to missed calls. CareSync AI answers every inbound call, verifies patients, books appointments, and sends confirmations — automatically, around the clock.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="#demo"
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[#3B8EF0] hover:bg-[#2d7de0] text-white font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-[0_4px_24px_rgba(59,142,240,0.45)]"
              >
                Book a Demo
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-[1px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
              <a
                href="#demo"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#0F172A]/[0.12] bg-white/80 text-[#374151] font-semibold hover:bg-white hover:border-[#0F172A]/20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-sm"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M5.5 4.5L9.5 7L5.5 9.5V4.5Z" fill="currentColor"/>
                </svg>
                Listen to Voice Demo
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-wrap gap-6"
            >
              {[
                { value: '94%', label: 'calls answered' },
                { value: '3×', label: 'more bookings' },
                { value: 'Zero', label: 'missed patients' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="text-xl font-bold text-[#3B8EF0]">{stat.value}</span>
                  <span className="text-sm text-[#64748B]">{stat.label}</span>
                  {i < 2 && <span className="hidden sm:block w-px h-4 bg-[#0F172A]/10 ml-2" />}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: 3D Phone Mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: 20, rotateX: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: -8, rotateX: 4 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="flex justify-center items-center relative no-3d-mobile"
            style={{ transformStyle: 'preserve-3d', perspective: 1200, willChange: 'transform' }}
          >
            {/* Depth shadow layer behind phone */}
            <div
              className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
              style={{
                background: 'rgba(59,142,240,0.12)',
                filter: 'blur(24px)',
                transform: 'translate(-10px, 12px) scale(0.96)',
              }}
            />

            {/* Glow reflection beneath */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[220px] h-[40px] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(59,142,240,0.25) 0%, transparent 70%)',
                filter: 'blur(16px)',
              }}
            />

            {/* Floating stat cards */}
            <div
              className="absolute -top-4 -right-4 md:-right-8 z-20 px-3 py-2 rounded-2xl bg-white border border-[#E2E8F0] text-xs font-medium text-[#0F172A] whitespace-nowrap shadow-[0_4px_20px_rgba(15,23,42,0.12)]"
              style={{ animation: 'float-3d 4s ease-in-out infinite', willChange: 'transform' }}
            >
              <span className="text-[#10B981] font-bold">●</span> 24 calls handled today
            </div>
            <div
              className="absolute -bottom-4 -left-4 md:-left-8 z-20 px-3 py-2 rounded-2xl bg-white border border-[#E2E8F0] text-xs font-medium text-[#0F172A] whitespace-nowrap shadow-[0_4px_20px_rgba(15,23,42,0.12)]"
              style={{ animation: 'float-3d 4s ease-in-out infinite 2s', willChange: 'transform' }}
            >
              <span className="text-[#3B8EF0] font-bold">↑</span> 3 bookings this hour
            </div>

            {/* Floating glass badge row */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {floatingBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/90 border border-[#E2E8F0] text-[10px] font-semibold whitespace-nowrap shadow-sm"
                  style={{
                    animation: `float 3.5s ease-in-out infinite ${badge.delay}`,
                    color: badge.color,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: badge.dot, boxShadow: `0 0 6px ${badge.dot}` }}
                  />
                  {badge.label}
                </div>
              ))}
            </div>

            {/* Phone — double bezel, light mode */}
            <div className="relative w-[280px] sm:w-[300px]">
              <div className="p-2 rounded-[2.5rem] bg-[#0F172A]/[0.07] ring-1 ring-[#0F172A]/[0.1] shadow-[0_24px_80px_rgba(15,23,42,0.18),0_8px_32px_rgba(59,142,240,0.12)]">
                <div
                  className="rounded-[calc(2.5rem-8px)] bg-white overflow-hidden border border-[#E2E8F0]"
                  style={{ minHeight: 520 }}
                >
                  {/* Speaker grille */}
                  <div className="flex justify-center pt-4 pb-2">
                    <div className="w-16 h-1 rounded-full bg-[#0F172A]/10" />
                  </div>

                  {/* Screen content */}
                  <div className="px-4 pb-8" style={{ minHeight: 460 }}>
                    <AnimatePresence mode="wait">

                      {phoneState === 'ringing' && (
                        <motion.div
                          key="ringing"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                          className="flex flex-col items-center pt-8"
                        >
                          <div className="text-[10px] text-[#94A3B8] mb-1 uppercase tracking-widest font-semibold">Incoming Call</div>
                          <div className="relative flex items-center justify-center w-20 h-20 my-6">
                            <span className="absolute inset-0 rounded-full border border-[#3B8EF0]/30 animate-pulse-ring" />
                            <span className="absolute inset-2 rounded-full border border-[#3B8EF0]/20 animate-pulse-ring" style={{ animationDelay: '0.4s' }} />
                            <div className="w-16 h-16 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-2xl">
                              👩‍⚕️
                            </div>
                          </div>
                          <div className="text-lg font-bold text-[#0F172A] mb-1">Maria Chen</div>
                          <div className="text-sm text-[#94A3B8]">Patient · (555) 012-3456</div>
                          <div className="flex gap-4 mt-8">
                            <div className="w-12 h-12 rounded-full bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-center">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M14 4L4 14M4 4l10 10" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
                              </svg>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M3 6.5C3 5.67 3.67 5 4.5 5h1.08a1 1 0 01.97.757l.6 2.4a1 1 0 01-.284.99L5.65 10.35a9.4 9.4 0 004 4l1.2-1.2a1 1 0 01.99-.285l2.4.6A1 1 0 0115 14.42V15.5c0 .83-.67 1.5-1.5 1.5C7.044 17 1 10.956 1 4.5" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round"/>
                              </svg>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {phoneState === 'answering' && (
                        <motion.div
                          key="answering"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                          className="flex flex-col items-center pt-8"
                        >
                          <div className="text-[10px] text-[#10B981] mb-1 uppercase tracking-widest font-semibold">AI Answering...</div>
                          <div className="w-14 h-14 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-2xl my-6">
                            🤖
                          </div>
                          <div className="text-sm font-semibold text-[#0F172A] mb-6">CareSync AI</div>
                          <div className="flex items-center gap-1 h-12">
                            {[0.4, 0.7, 1, 0.8, 0.6, 1, 0.5, 0.9, 0.7, 0.4].map((h, i) => (
                              <div
                                key={i}
                                className="w-1.5 rounded-full bg-[#3B8EF0]"
                                style={{
                                  height: `${h * 40}px`,
                                  animation: `waveform ${0.6 + i * 0.08}s ease-in-out infinite ${i * 0.1}s`,
                                  transformOrigin: 'center',
                                }}
                              />
                            ))}
                          </div>
                          <div className="text-xs text-[#94A3B8] mt-4">Clinic voice assistant active</div>
                        </motion.div>
                      )}

                      {phoneState === 'transcript' && (
                        <motion.div
                          key="transcript"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                          className="pt-4 flex flex-col gap-3"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                            <span className="text-xs text-[#10B981] font-semibold uppercase tracking-wider">Live Call</span>
                          </div>
                          {transcriptLines.slice(0, transcriptStep).map((line, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                              className={`flex ${line.speaker === 'ai' ? 'justify-start' : 'justify-end'}`}
                            >
                              <div
                                className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                                  line.speaker === 'ai'
                                    ? 'bg-[#F1F5F9] text-[#0F172A] rounded-tl-sm'
                                    : 'bg-[#EFF6FF] text-[#1D4ED8] rounded-tr-sm border border-[#BFDBFE]'
                                }`}
                              >
                                {line.text}
                              </div>
                            </motion.div>
                          ))}
                          {transcriptStep < transcriptLines.length && (
                            <div className="flex gap-1 items-center px-3 py-2">
                              {[0, 1, 2].map((i) => (
                                <div
                                  key={i}
                                  className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]"
                                  style={{ animation: `waveform 0.8s ease-in-out infinite ${i * 0.2}s` }}
                                />
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}

                      {phoneState === 'booked' && (
                        <motion.div
                          key="booked"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                          className="flex flex-col items-center pt-10"
                        >
                          <div className="w-14 h-14 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center mb-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M5 13L9 17L19 7" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="text-base font-bold text-[#10B981] mb-1">Appointment Booked</div>
                          <div className="text-xs text-[#94A3B8] mb-6">Confirmation sent to Maria</div>
                          <div className="w-full p-3 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0]">
                            <div className="text-[10px] text-[#10B981] uppercase tracking-widest mb-2 font-semibold">Appointment Details</div>
                            <div className="text-xs text-[#0F172A] font-semibold">Dr. Johnson</div>
                            <div className="text-xs text-[#64748B] mt-1">March 15 · 10:30 AM</div>
                            <div className="text-xs text-[#64748B]">New Patient Visit</div>
                          </div>
                        </motion.div>
                      )}

                      {phoneState === 'sms' && (
                        <motion.div
                          key="sms"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                          className="flex flex-col items-center pt-10"
                        >
                          <div className="w-14 h-14 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center mb-4">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                              <path d="M4 4h14a2 2 0 012 2v8a2 2 0 01-2 2H6l-4 4V6a2 2 0 012-2z" stroke="#3B8EF0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="text-base font-bold text-[#3B8EF0] mb-1">SMS Sent</div>
                          <div className="text-xs text-[#94A3B8] mb-6">Patient notified instantly</div>
                          <div className="w-full p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                            <div className="text-[10px] text-[#94A3B8] mb-2">To: Maria Chen · (555) 012-3456</div>
                            <div className="text-xs text-[#374151] leading-relaxed">
                              ✓ Your appointment with Dr. Johnson is confirmed for March 15 at 10:30 AM. Reply CANCEL to cancel.
                            </div>
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>

                  {/* Home bar */}
                  <div className="flex justify-center pb-4">
                    <div className="w-24 h-1 rounded-full bg-[#0F172A]/10" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
