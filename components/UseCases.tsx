'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const dentalSteps = [
  { icon: '📞', text: 'Patient calls: "I need to book a cleaning"' },
  { icon: '🤖', text: 'AI collects: Name → Phone → DOB → Visit Reason → Preferred Time' },
  { icon: '🔍', text: 'Checks real-time availability in your calendar' },
  { icon: '✅', text: 'Books appointment — no staff required' },
  { icon: '💬', text: 'Sends SMS confirmation with address + prep instructions' },
]

const primarySteps = [
  { icon: '📞', text: 'Patient calls: "I need to see Dr. Johnson"' },
  { icon: '🤖', text: 'AI identifies: New or existing? What visit type?' },
  { icon: '🔀', text: 'Routes: Routine → book directly | Urgent → escalate to staff | Labs → transfer to nurse' },
  { icon: '📅', text: 'Confirms appointment + insurance info collected' },
  { icon: '🔔', text: 'Sends reminder 24h before with confirm/cancel link' },
]

export default function UseCases() {
  const [active, setActive] = useState<'dental' | 'primary'>('dental')

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="use-cases-detail" style={{ background: '#F0FDF4' }}>
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1588776814546-1ffbb172ef41?w=1920&q=60&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover object-center opacity-[0.05]"
        />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px]" style={{ background: 'radial-gradient(circle, rgba(59,142,240,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px]" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0F172A]"
          >
            Built for{' '}
            <span className="font-serif italic text-[#3B8EF0]">Dental Offices</span>
            {' '}&{' '}
            <span className="font-serif italic text-[#10B981]">Primary Care</span>
          </motion.h2>

          {/* Tab toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="inline-flex items-center gap-1 mt-8 p-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-sm"
          >
            <button
              onClick={() => setActive('dental')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                active === 'dental'
                  ? 'bg-[#3B8EF0] text-white shadow-[0_2px_12px_rgba(59,142,240,0.35)]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              🦷 Dental Office
            </button>
            <button
              onClick={() => setActive('primary')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                active === 'primary'
                  ? 'bg-[#10B981] text-white shadow-[0_2px_12px_rgba(16,185,129,0.35)]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              🩺 Primary Care
            </button>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {active === 'dental' && (
            <motion.div
              key="dental"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="p-1.5 rounded-[2rem] bg-[#0F172A]/[0.04] ring-1 ring-[#BFDBFE]">
                <div className="rounded-[calc(2rem-6px)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(15,23,42,0.06)] p-8 md:p-12" style={{ borderTop: '2px solid #BFDBFE' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div>
                      <div className="text-4xl mb-4">🦷</div>
                      <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Dental Office Front Desk</h3>
                      <p className="text-[#64748B] mb-8 leading-relaxed">
                        New patient calls for a cleaning appointment or emergency dental visit. CareSync handles it start to finish.
                      </p>
                      <div className="space-y-3">
                        {dentalSteps.map((step, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }}
                            className="flex items-start gap-3 p-3 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE]"
                          >
                            <span className="text-sm mt-0.5">{step.icon}</span>
                            <span className="text-sm text-[#374151] leading-relaxed">{step.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="p-5 rounded-3xl bg-[#F0F7FF] border border-[#BFDBFE]">
                        <div className="text-xs text-[#3B8EF0] uppercase tracking-widest font-semibold mb-3">Live Transcript Sample</div>
                        <div className="space-y-2">
                          {[
                            { side: 'patient', text: 'Hi, I need to book a cleaning for next week.' },
                            { side: 'ai', text: 'Of course! Are you a new or existing patient with us?' },
                            { side: 'patient', text: "New patient — my name's Alex Williams." },
                            { side: 'ai', text: "Great, Alex! I have Tuesday at 2pm available — shall I book that?" },
                          ].map((msg, i) => (
                            <div key={i} className={`flex ${msg.side === 'ai' ? 'justify-start' : 'justify-end'}`}>
                              <div
                                className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                                  msg.side === 'ai'
                                    ? 'bg-[#F1F5F9] text-[#0F172A] rounded-tl-sm'
                                    : 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] rounded-tr-sm'
                                }`}
                              >
                                {msg.text}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 rounded-3xl bg-[#F0FDF4] border border-[#BBF7D0]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                          <span className="text-xs text-[#10B981] font-semibold uppercase tracking-wide">Appointment Booked</span>
                        </div>
                        <div className="text-sm text-[#0F172A] font-semibold">Alex Williams — Cleaning</div>
                        <div className="text-xs text-[#64748B] mt-0.5">Tuesday · 2:00 PM · Dr. Martinez</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {active === 'primary' && (
            <motion.div
              key="primary"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="p-1.5 rounded-[2rem] bg-[#0F172A]/[0.04] ring-1 ring-[#BBF7D0]">
                <div className="rounded-[calc(2rem-6px)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(15,23,42,0.06)] p-8 md:p-12" style={{ borderTop: '2px solid #BBF7D0' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div>
                      <div className="text-4xl mb-4">🩺</div>
                      <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Primary Care Clinic</h3>
                      <p className="text-[#64748B] mb-8 leading-relaxed">
                        Patient calls for annual physical, sick visit, or medication follow-up. AI routes intelligently.
                      </p>
                      <div className="space-y-3">
                        {primarySteps.map((step, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }}
                            className="flex items-start gap-3 p-3 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0]"
                          >
                            <span className="text-sm mt-0.5">{step.icon}</span>
                            <span className="text-sm text-[#374151] leading-relaxed">{step.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="p-5 rounded-3xl bg-[#F0FDF4] border border-[#BBF7D0]">
                        <div className="text-xs text-[#10B981] uppercase tracking-widest font-semibold mb-3">Smart Routing Logic</div>
                        <div className="space-y-2">
                          {[
                            { type: 'Routine Visit', action: 'Auto-book', color: '#10B981', bg: '#F0FDF4', border: '#BBF7D0' },
                            { type: 'Urgent / Same-day', action: 'Escalate to staff', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
                            { type: 'Lab Results', action: 'Transfer to nurse', color: '#3B8EF0', bg: '#EFF6FF', border: '#BFDBFE' },
                            { type: 'Emergency', action: 'Immediate handoff', color: '#EF4444', bg: '#FEF2F2', border: '#FECACA' },
                          ].map((route, i) => (
                            <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl" style={{ background: route.bg, border: `1px solid ${route.border}` }}>
                              <span className="text-xs text-[#374151] font-medium">{route.type}</span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white" style={{ color: route.color, border: `1px solid ${route.border}` }}>
                                {route.action}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 rounded-3xl bg-[#EFF6FF] border border-[#BFDBFE]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-[#3B8EF0] animate-pulse" />
                          <span className="text-xs text-[#3B8EF0] font-semibold uppercase tracking-wide">Reminder Sent</span>
                        </div>
                        <div className="text-xs text-[#374151] leading-relaxed">
                          "Your appointment with Dr. Johnson is tomorrow at 10:30 AM. Reply 1 to confirm, 2 to cancel."
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
