'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const steps = [
  { id: 'ring', icon: '📞', title: 'Patient Calls', desc: 'A patient dials your clinic number at any hour of the day or night.' },
  { id: 'ai', icon: '🤖', title: 'AI Answers Naturally', desc: 'CareSync AI picks up within 2 rings with a warm, clinic-trained voice. No hold music.' },
  { id: 'verify', icon: '✅', title: 'Patient is Verified', desc: "AI collects name, date of birth, and phone to confirm the patient's identity against your records." },
  { id: 'book', icon: '📅', title: 'Appointment is Booked', desc: 'AI checks real-time calendar availability and books the slot directly — no staff needed.' },
  { id: 'sms', icon: '💬', title: 'Confirmation SMS Sent', desc: 'Patient receives an instant SMS with appointment details, address, and prep instructions.' },
  { id: 'log', icon: '📋', title: 'Staff Sees Everything', desc: 'Every call is transcribed, summarized, and logged in your dashboard. Staff review with one click.' },
]

function StepCard({ step, index, total, scrollYProgress }: {
  step: typeof steps[0]; index: number; total: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = Math.max(0, (index - 0.3) / total)
  const peak = index / total
  const end = Math.min(1, (index + 0.7) / total)
  const fade = Math.min(1, (index + 1) / total)
  const opacity = useTransform(scrollYProgress, [start, peak, end, fade], [0.35, 1, 1, 0.35])
  const scale = useTransform(scrollYProgress, [start, peak, end, fade], [0.97, 1, 1, 0.97])

  return (
    <motion.div style={{ opacity, scale }} className="p-1.5 rounded-[1.5rem] bg-[#0F172A]/[0.04] ring-1 ring-[#0F172A]/[0.07] hover:ring-[#3B8EF0]/25 transition-all duration-700">
      <div className="rounded-[calc(1.5rem-6px)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(15,23,42,0.06)] p-4 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-lg shrink-0">
          {step.icon}
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-[#0F172A] mb-0.5">{step.title}</div>
          <div className="text-xs text-[#64748B] leading-relaxed">{step.desc}</div>
        </div>
        <div className="ml-auto shrink-0 w-6 h-6 rounded-full bg-[#F0F7FF] border border-[#BFDBFE] flex items-center justify-center text-[10px] font-bold text-[#3B8EF0]">
          {index + 1}
        </div>
      </div>
    </motion.div>
  )
}

function PhonePanel({ step, index, total, scrollYProgress }: {
  step: typeof steps[0]; index: number; total: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const peak = index / total
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, (index - 0.5) / total), peak, (index + 0.5) / total, (index + 1) / total],
    [0, 1, 1, 0]
  )

  const screenContent = {
    ring: (
      <div className="flex flex-col items-center pt-6">
        <div className="text-[10px] text-[#94A3B8] uppercase tracking-widest mb-2 font-semibold">Incoming Call</div>
        <div className="relative flex items-center justify-center w-16 h-16 my-4">
          <span className="absolute inset-0 rounded-full border border-[#3B8EF0]/30 animate-pulse-ring" />
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-xl">👩‍⚕️</div>
        </div>
        <div className="text-sm font-bold text-[#0F172A] mb-0.5">Maria Chen</div>
        <div className="text-xs text-[#94A3B8]">Calling your clinic...</div>
      </div>
    ),
    ai: (
      <div className="flex flex-col items-center pt-6">
        <div className="text-[10px] text-[#10B981] uppercase tracking-widest font-semibold mb-2">AI Active</div>
        <div className="w-12 h-12 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-xl mb-3">🤖</div>
        <div className="flex items-center gap-1 h-10">
          {[0.4, 0.8, 1, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
            <div key={i} className="w-1 rounded-full bg-[#3B8EF0]" style={{ height: `${h * 32}px`, animation: `waveform ${0.6 + i * 0.08}s ease-in-out infinite ${i * 0.1}s` }} />
          ))}
        </div>
        <div className="text-xs text-[#64748B] mt-2 text-center px-2">"Thank you for calling. How can I help?"</div>
      </div>
    ),
    verify: (
      <div className="flex flex-col pt-4 gap-2">
        <div className="text-[10px] text-[#10B981] uppercase tracking-widest font-semibold mb-1">Verification</div>
        {['Name: Maria Chen', 'DOB: Apr 12, 1988', 'Phone: ✓ Confirmed'].map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="text-xs text-[#374151]">{item}</span>
          </div>
        ))}
      </div>
    ),
    book: (
      <div className="flex flex-col pt-4">
        <div className="text-[10px] text-[#3B8EF0] uppercase tracking-widest font-semibold mb-3">Booking Now...</div>
        <div className="p-3 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE]">
          <div className="text-[10px] text-[#94A3B8] mb-2 uppercase tracking-widest">New Appointment</div>
          <div className="text-xs font-semibold text-[#0F172A]">Dr. Johnson</div>
          <div className="text-xs text-[#64748B] mt-0.5">March 15 · 10:30 AM</div>
          <div className="mt-2 flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center">
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="text-[10px] text-[#10B981] font-semibold">Confirmed</span>
          </div>
        </div>
      </div>
    ),
    sms: (
      <div className="flex flex-col pt-4">
        <div className="text-[10px] text-[#3B8EF0] uppercase tracking-widest font-semibold mb-3">SMS Sent</div>
        <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="text-[10px] text-[#94A3B8] mb-2">To: Maria · (555) 012-3456</div>
          <div className="text-xs text-[#374151] leading-relaxed">
            ✓ Appt confirmed: Dr. Johnson, March 15, 10:30 AM. Reply CANCEL to cancel. See you soon!
          </div>
        </div>
      </div>
    ),
    log: (
      <div className="flex flex-col pt-3 gap-2">
        <div className="text-[10px] text-[#64748B] uppercase tracking-widest font-semibold mb-1">Call Log</div>
        {[
          { time: '10:14 AM', action: 'Call answered' },
          { time: '10:15 AM', action: 'Patient verified' },
          { time: '10:16 AM', action: 'Appt booked' },
          { time: '10:16 AM', action: 'SMS sent' },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span className="text-[10px] text-[#94A3B8] w-12 shrink-0">{row.time}</span>
            <span className="text-xs text-[#374151]">{row.action}</span>
          </div>
        ))}
      </div>
    ),
  }

  return (
    <motion.div style={{ opacity, position: 'absolute' as const, inset: 0, padding: '0.75rem' }}>
      {screenContent[step.id as keyof typeof screenContent]}
    </motion.div>
  )
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  return (
    <section ref={containerRef} className="relative bg-[#F0F7FF]" style={{ height: `${steps.length * 100}vh` }} id="how-it-works">
      <div className="sticky top-0 min-h-[100dvh] flex flex-col justify-center overflow-hidden">
        {/* Subtle bg image */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=60&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover object-center opacity-[0.04]"
          />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(59,142,240,0.07) 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3B8EF0]">How It Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0F172A]">
              From First Ring to Booked Appointment —{' '}
              <span className="font-serif italic text-[#3B8EF0]">Fully Automated</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Phone visual */}
            <div className="flex justify-center">
              <div className="relative w-[240px]">
                <div className="p-2 rounded-[2.5rem] bg-[#0F172A]/[0.07] ring-1 ring-[#0F172A]/[0.1] shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
                  <div
                    className="rounded-[calc(2.5rem-8px)] bg-white overflow-hidden border border-[#E2E8F0]"
                    style={{ minHeight: 380 }}
                  >
                    <div className="flex justify-center pt-4 pb-2">
                      <div className="w-12 h-1 rounded-full bg-[#0F172A]/10" />
                    </div>
                    {/* Phone screen panels */}
                    <div className="relative" style={{ minHeight: 320 }}>
                      {steps.map((step, i) => (
                        <PhonePanel key={step.id} step={step} index={i} total={steps.length} scrollYProgress={scrollYProgress} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Steps */}
            <div className="flex flex-col gap-4">
              {steps.map((step, i) => (
                <StepCard key={step.id} step={step} index={i} total={steps.length} scrollYProgress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
