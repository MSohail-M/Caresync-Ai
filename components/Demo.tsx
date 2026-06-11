'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const conversation = [
  { speaker: 'patient', text: "Hi, I need to book an appointment for next week." },
  { speaker: 'ai',      text: "Of course! Are you a new or existing patient?" },
  { speaker: 'patient', text: "I'm an existing patient — my name is James Torres." },
  { speaker: 'ai',      text: "Got it, James. What type of visit are you looking for today?" },
  { speaker: 'patient', text: "Just a follow-up for my blood pressure medication." },
  { speaker: 'ai',      text: "Perfect. I have Thursday March 20th at 2:30 PM available with Dr. Johnson — does that work?" },
  { speaker: 'patient', text: "Yes, that's perfect." },
  { speaker: 'ai',      text: "Great! I've booked that for you. You'll receive a confirmation text shortly." },
]

const waveformBars = Array.from({ length: 20 }, (_, i) => ({
  delay: `${i * 0.05}s`,
  duration: `${0.5 + (i % 5) * 0.12}s`,
  height: [0.3, 0.5, 0.9, 0.7, 0.4, 1, 0.6, 0.8, 0.5, 0.35, 0.9, 0.7, 0.4, 0.85, 0.6, 0.45, 0.75, 0.55, 0.8, 0.3][i],
}))

export default function Demo() {
  const [visibleLines, setVisibleLines]   = useState(0)
  const [showBooking, setShowBooking]     = useState(false)
  const [isPlaying, setIsPlaying]         = useState(false)
  const [aiSpeaking, setAiSpeaking]       = useState(false)
  const [isLoading, setIsLoading]         = useState(false)
  const [useElevenLabs, setUseElevenLabs] = useState(true)

  const cancelledRef   = useRef(false)
  const audioRef       = useRef<HTMLAudioElement | null>(null)
  // cache: `${speaker}:${text}` → blob URL
  const cacheRef       = useRef<Map<string, string>>(new Map())

  // Cleanup audio + speech on unmount
  useEffect(() => {
    return () => {
      cancelledRef.current = true
      audioRef.current?.pause()
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
      cacheRef.current.forEach(url => URL.revokeObjectURL(url))
    }
  }, [])

  // Listen for hero button trigger
  useEffect(() => {
    const handler = () => triggerDemo()
    window.addEventListener('caresync:play-demo', handler)
    return () => window.removeEventListener('caresync:play-demo', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useElevenLabs])

  // ── ElevenLabs audio fetch ──────────────────────────────────
  async function fetchElevenLabsAudio(text: string, speaker: string): Promise<string> {
    const key = `${speaker}:${text}`
    if (cacheRef.current.has(key)) return cacheRef.current.get(key)!

    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, speaker }),
    })

    if (res.status === 501) {
      // API key not set → permanently fall back to browser TTS
      setUseElevenLabs(false)
      throw new Error('no-key')
    }
    if (!res.ok) throw new Error(`tts-error-${res.status}`)

    const blob = await res.blob()
    const url  = URL.createObjectURL(blob)
    cacheRef.current.set(key, url)
    return url
  }

  // ── ElevenLabs playback chain ───────────────────────────────
  const speakElevenLabs = useCallback(async (index: number) => {
    if (cancelledRef.current) return
    if (index >= conversation.length) {
      setAiSpeaking(false)
      setIsPlaying(false)
      setTimeout(() => setShowBooking(true), 500)
      return
    }

    const { speaker, text } = conversation[index]

    try {
      if (index === 0) setIsLoading(true)
      const url = await fetchElevenLabsAudio(text, speaker)
      if (index === 0) setIsLoading(false)
      if (cancelledRef.current) return

      setAiSpeaking(speaker === 'ai')
      setVisibleLines(index + 1)

      const audio    = new Audio(url)
      audioRef.current = audio

      audio.onended = () => {
        if (!cancelledRef.current) setTimeout(() => speakElevenLabs(index + 1), 280)
      }
      audio.onerror = () => {
        if (!cancelledRef.current) setTimeout(() => speakElevenLabs(index + 1), 1200)
      }

      await audio.play()
    } catch (err) {
      setIsLoading(false)
      if (cancelledRef.current) return
      if ((err as Error).message === 'no-key') {
        // Fall back immediately to browser TTS
        speakBrowser(index)
      } else {
        setTimeout(() => speakElevenLabs(index + 1), 1400)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Browser TTS fallback chain ──────────────────────────────
  const speakBrowser = useCallback((index: number) => {
    if (cancelledRef.current) return
    if (index >= conversation.length) {
      setAiSpeaking(false)
      setIsPlaying(false)
      setTimeout(() => setShowBooking(true), 500)
      return
    }

    const { speaker, text } = conversation[index]
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setVisibleLines(index + 1)
      setAiSpeaking(speaker === 'ai')
      setTimeout(() => speakBrowser(index + 1), 1800)
      return
    }

    const synth = window.speechSynthesis
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate  = 0.92
    utter.pitch = speaker === 'ai' ? 1.15 : 0.9

    const voices = synth.getVoices().filter(v => v.lang.startsWith('en'))
    if (voices.length) {
      utter.voice = speaker === 'ai'
        ? (voices.find(v => /female|samantha|zira|victoria|karen|moira/i.test(v.name)) ?? voices[0])
        : (voices.find(v => /male|daniel|david|thomas|fred|alex/i.test(v.name)) ?? voices[voices.length - 1])
    }

    utter.onstart = () => { setAiSpeaking(speaker === 'ai'); setVisibleLines(index + 1) }
    utter.onend   = () => { if (!cancelledRef.current) setTimeout(() => speakBrowser(index + 1), 280) }
    utter.onerror = () => { if (!cancelledRef.current) setTimeout(() => speakBrowser(index + 1), 1200) }

    synth.speak(utter)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Trigger / stop ──────────────────────────────────────────
  const triggerDemo = useCallback(() => {
    cancelledRef.current = false
    audioRef.current?.pause()
    window.speechSynthesis?.cancel()

    setVisibleLines(0)
    setShowBooking(false)
    setIsPlaying(true)
    setAiSpeaking(false)
    setIsLoading(false)

    setTimeout(() => {
      if (useElevenLabs) speakElevenLabs(0)
      else speakBrowser(0)
    }, 150)
  }, [useElevenLabs, speakElevenLabs, speakBrowser])

  const stopDemo = useCallback(() => {
    cancelledRef.current = true
    audioRef.current?.pause()
    window.speechSynthesis?.cancel()
    setIsPlaying(false)
    setAiSpeaking(false)
    setIsLoading(false)
  }, [])

  const handleReplay = useCallback(() => {
    stopDemo()
    setTimeout(() => {
      cancelledRef.current = false
      triggerDemo()
    }, 120)
  }, [stopDemo, triggerDemo])

  return (
    <section className="py-24 md:py-32 relative bg-[#F0FDF4]" id="demo">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px]" style={{ background: 'radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#86EFAC] bg-[#F0FDF4] mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#22C55E]">Hear It Live</span>
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
            <span className="font-serif italic text-[#22C55E]">a Real Booking</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={triggerDemo}
              disabled={isPlaying && isLoading}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#22C55E] hover:bg-[#16A34A] disabled:opacity-70 text-white font-semibold text-base transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-[0_4px_24px_rgba(34,197,94,0.45)]"
            >
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {isLoading ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="animate-spin">
                    <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="8"/>
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M3 2.5L10.5 6.5L3 10.5V2.5Z" fill="white"/>
                  </svg>
                )}
              </span>
              {isLoading ? 'Loading voices...' : isPlaying ? 'Playing...' : 'Play Voice Demo'}
              {!useElevenLabs && (
                <span className="text-[11px] opacity-60 font-normal ml-1">(browser voice)</span>
              )}
            </button>

            {/* Voice badge */}
            {useElevenLabs && (
              <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#E2E8F0] bg-white text-xs text-[#64748B] shadow-sm">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <circle cx="5.5" cy="5.5" r="4.5" stroke="#22C55E" strokeWidth="1"/>
                  <path d="M3.5 5.5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" fill="#22C55E"/>
                </svg>
                ElevenLabs · Sarah (AI) + Adam (Patient)
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="p-1.5 rounded-[2rem] bg-[#0F172A]/[0.04] ring-1 ring-[#0F172A]/[0.06]" style={{ boxShadow: '0 8px 60px rgba(34,197,94,0.1)' }}>
            <div className="rounded-[calc(2rem-6px)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(15,23,42,0.06)] overflow-hidden">

              {/* Top bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isPlaying ? 'bg-[#16A34A] animate-pulse' : 'bg-[#CBD5E1]'}`} />
                  <span className="text-xs font-semibold text-[#64748B] uppercase tracking-widest">
                    {isLoading ? 'Loading...' : isPlaying ? 'Now Playing' : showBooking ? 'Completed' : 'Ready'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M3 3.5C3 3.5 1 5 1 6s2 2.5 2 2.5M9 3.5C9 3.5 11 5 11 6s-2 2.5-2 2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                  </svg>
                  {useElevenLabs ? 'ElevenLabs voice' : 'Browser voice'}
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
                          ? `rgba(34,197,94,${0.4 + bar.height * 0.6})`
                          : isPlaying
                          ? `rgba(16,185,129,${0.2 + bar.height * 0.35})`
                          : `rgba(15,23,42,${0.05 + bar.height * 0.07})`,
                        animation: isPlaying ? `waveform ${bar.duration} ease-in-out infinite ${bar.delay}` : 'none',
                        transformOrigin: 'center',
                        transition: 'background 0.4s ease',
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <span className="text-xs text-[#94A3B8]">
                    {isLoading ? 'Generating voice...' : aiSpeaking ? 'AI speaking...' : isPlaying ? 'Patient speaking...' : showBooking ? 'Booking confirmed' : 'Press Play above to start'}
                  </span>
                </div>
              </div>

              {/* Transcript */}
              <div className="px-6 pb-4" style={{ minHeight: 260 }}>
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
                          background: msg.speaker === 'ai' ? '#F0FDF4' : '#F1F5F9',
                          color: msg.speaker === 'ai' ? '#22C55E' : '#64748B',
                          border: `1px solid ${msg.speaker === 'ai' ? '#86EFAC' : '#E2E8F0'}`,
                        }}
                      >
                        {msg.speaker === 'ai' ? 'AI' : 'P'}
                      </div>
                      <div
                        className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          msg.speaker === 'ai'
                            ? 'bg-[#F0FDF4] border border-[#86EFAC] text-[#166534] rounded-tl-sm'
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

                  {visibleLines === 0 && !isPlaying && !showBooking && (
                    <div className="flex flex-col items-center justify-center py-10 gap-3 text-[#CBD5E1]">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M12 10.5L21.5 16L12 21.5V10.5Z" fill="currentColor"/>
                      </svg>
                      <span className="text-sm">Press &ldquo;Play Voice Demo&rdquo; above to start</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking confirmation */}
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
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <span className="text-xs font-semibold text-[#16A34A] uppercase tracking-wide">Appointment Confirmed</span>
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

              {/* Controls */}
              <div className="px-6 pb-6 flex justify-center gap-3">
                {isPlaying ? (
                  <button
                    onClick={stopDemo}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#FECACA] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-sm font-medium text-[#EF4444] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <rect x="2" y="2" width="3" height="8" rx="1" fill="currentColor"/>
                      <rect x="7" y="2" width="3" height="8" rx="1" fill="currentColor"/>
                    </svg>
                    Stop
                  </button>
                ) : (
                  <button
                    onClick={handleReplay}
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-sm"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:rotate-180 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <path d="M12 7A5 5 0 112 7M2 3v4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Replay Demo
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
