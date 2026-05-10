'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const conversation = [
  { speaker: 'patient', text: "Hi, I need to book an appointment for next week." },
  { speaker: 'ai', text: "Of course! Are you a new or existing patient?" },
  { speaker: 'patient', text: "I'm an existing patient — my name is James Torres." },
  { speaker: 'ai', text: "Got it, James. What type of visit are you looking for today?" },
  { speaker: 'patient', text: "Just a follow-up for my blood pressure medication." },
  { speaker: 'ai', text: "Perfect. I have Thursday March 20th at 2:30 PM available with Dr. Johnson — does that work?" },
  { speaker: 'patient', text: "Yes, that's perfect." },
  { speaker: 'ai', text: "Great! I've booked that for you. You'll receive a confirmation text shortly." },
]

const waveformBars = Array.from({ length: 20 }, (_, i) => ({
  delay: `${i * 0.05}s`,
  duration: `${0.5 + (i % 5) * 0.12}s`,
  height: [0.3, 0.5, 0.9, 0.7, 0.4, 1, 0.6, 0.8, 0.5, 0.35, 0.9, 0.7, 0.4, 0.85, 0.6, 0.45, 0.75, 0.55, 0.8, 0.3][i],
}))

export default function Demo() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showBooking, setShowBooking] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [aiSpeaking, setAiSpeaking] = useState(false)

  const startDemo = useCallback(() => {
    setVisibleLines(0)
    setShowBooking(false)
    setIsPlaying(true)
    setAiSpeaking(false)
  }, [])

  useEffect(() => {
    startDemo()
  }, [startDemo])

  useEffect(() => {
    if (!isPlaying) return
    if (visibleLines >= conversation.length) {
      setTimeout(() => setShowBooking(true), 800)
      setIsPlaying(false)
      return
    }

    const current = conversation[visibleLines]
    const isAi = current.speaker === 'ai'
    setAiSpeaking(isAi)

    const timeout = setTimeout(() => {
      setVisibleLines(v => v + 1)
    }, visibleLines === 0 ? 500 : 1600)

    return () => clearTimeout(timeout)
  }, [visibleLines, isPlaying])

  return (
    <section className="py-24 md:py-32 relative bg-[#F0F7FF]" id="demo">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px]" style={{ background: 'radial-gradient(ellipse, rgba(59,142,240,0.07) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3B8EF0]">Hear It Live</span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0F172A]"
          >
            Listen to CareSync AI Handle{' '}
            <span className="font-serif italic text-[#3B8EF0]">a Real Booking</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="p-1.5 rounded-[2rem] bg-[#0F172A]/[0.04] ring-1 ring-[#0F172A]/[0.06]" style={{ boxShadow: '0 8px_60px_rgba(59,142,240,0.1)' }}>
            <div className="rounded-[calc(2rem-6px)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(15,23,42,0.06)] overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-xs font-semibold text-[#64748B] uppercase tracking-widest">Now Playing</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                  Live demo
                </div>
              </div>

              {/* Waveform */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center gap-0.5 justify-center h-14">
                  {waveformBars.map((bar, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full"
                      style={{
                        height: `${bar.height * 48}px`,
                        background: aiSpeaking
                          ? `rgba(59,142,240,${0.4 + bar.height * 0.6})`
                          : `rgba(15,23,42,${0.05 + bar.height * 0.07})`,
                        animation: aiSpeaking ? `waveform ${bar.duration} ease-in-out infinite ${bar.delay}` : 'none',
                        transformOrigin: 'center',
                        transition: 'background 0.5s ease',
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <span className="text-xs text-[#94A3B8]">
                    {aiSpeaking ? 'AI speaking...' : isPlaying ? 'Patient speaking...' : 'Demo complete'}
                  </span>
                </div>
              </div>

              {/* Transcript */}
              <div className="px-6 pb-4" style={{ minHeight: 300 }}>
                <div className="text-[10px] text-[#94A3B8] uppercase tracking-widest mb-4 font-semibold">Live Transcript</div>
                <div className="space-y-3">
                  {conversation.slice(0, visibleLines).map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                      className={`flex items-start gap-2 ${msg.speaker === 'ai' ? '' : 'flex-row-reverse'}`}
                    >
                      <div
                        className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5"
                        style={{
                          background: msg.speaker === 'ai' ? '#EFF6FF' : '#F1F5F9',
                          color: msg.speaker === 'ai' ? '#3B8EF0' : '#64748B',
                          border: `1px solid ${msg.speaker === 'ai' ? '#BFDBFE' : '#E2E8F0'}`,
                        }}
                      >
                        {msg.speaker === 'ai' ? 'AI' : 'P'}
                      </div>
                      <div
                        className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          msg.speaker === 'ai'
                            ? 'bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] rounded-tl-sm'
                            : 'bg-[#F1F5F9] border border-[#E2E8F0] text-[#374151] rounded-tr-sm'
                        }`}
                      >
                        {msg.text}
                        {i === visibleLines - 1 && isPlaying && (
                          <span className="inline-block w-0.5 h-3.5 bg-current ml-0.5 rounded-full" style={{ animation: 'typing-cursor 1s ease-in-out infinite' }} />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Booking confirmation card */}
              <AnimatePresence>
                {showBooking && (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className="mx-6 mb-6"
                  >
                    <div className="p-4 rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-white border border-[#BBF7D0] flex items-center justify-center">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5L8 2.5" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-[#10B981] uppercase tracking-wide">Appointment Confirmed</span>
                        <span className="ml-auto text-[10px] text-[#94A3B8]">SMS Sent ✓</span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {[
                          { label: 'Patient', value: 'James Torres' },
                          { label: 'Doctor', value: 'Dr. Johnson' },
                          { label: 'Date', value: 'Thursday, March 20' },
                          { label: 'Time', value: '2:30 PM' },
                        ].map((detail) => (
                          <div key={detail.label}>
                            <span className="text-[10px] text-[#94A3B8]">{detail.label}: </span>
                            <span className="text-xs text-[#0F172A] font-semibold">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Play/replay button */}
              <div className="px-6 pb-6 flex justify-center">
                <button
                  onClick={startDemo}
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-sm"
                >
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className="group-hover:rotate-180 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  >
                    <path d="M12 7A5 5 0 112 7M2 3v4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {showBooking || !isPlaying ? 'Replay Demo' : 'Playing...'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
