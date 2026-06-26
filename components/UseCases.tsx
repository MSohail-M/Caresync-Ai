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
    <section className="py-24 md:py-32 relative overflow-hidden" id="use-cases-detail" style={{ background: '#FFFFFF' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="ray-layer-a opacity-30" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px]" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px]" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)' }} />
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
            <span className="font-serif italic text-gradient-blue">Dental Offices</span>
            {' '}&{' '}
            <span className="font-serif italic text-[#34D399]">Primary Care</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="inline-flex items-center gap-1 mt-8 p-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(16,185,129,0.18)' }}
          >
            <button
              onClick={() => setActive('dental')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                active === 'dental'
                  ? 'bg-[#10B981] text-white shadow-[0_2px_16px_rgba(16,185,129,0.45)]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              🦷 Dental Office
            </button>
            <button
              onClick={() => setActive('primary')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                active === 'primary'
                  ? 'bg-[#059669] text-white shadow-[0_2px_16px_rgba(5,150,105,0.45)]'
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
              <div className="p-1.5 rounded-[2rem]" style={{ background: 'rgba(16,185,129,0.04)', boxShadow: '0 0 0 1px rgba(16,185,129,0.15), 0 8px 60px rgba(16,185,129,0.08)' }}>
                <div className="rounded-[calc(2rem-6px)] p-8 md:p-12" style={{ background: 'rgba(10,22,40,0.9)', borderTop: '1px solid rgba(16,185,129,0.2)', boxShadow: 'inset 0 1px 1px rgba(52,211,153,0.08)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div>
                      <div className="text-4xl mb-4">🦷</div>
                      <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Dental Office Front Desk</h3>
                      <p className="text-[#475569] mb-8 leading-relaxed">
                        New patient calls for a cleaning appointment or emergency dental visit. CareSync handles it start to finish.
                      </p>
                      <div className="space-y-3">
                        {dentalSteps.map((step, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }}
                            className="flex items-start gap-3 p-3 rounded-2xl"
                            style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}
                          >
                            {step.icon === '🤖'
                              ? <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 mt-0.5" style={{ border: '1px solid rgba(16,185,129,0.3)' }}><img src="/Gemini_Generated_Image_a1e9r2a1e9r2a1e9.png" alt="" className="w-full h-full object-cover object-top" /></div>
                              : <span className="text-sm mt-0.5 shrink-0">{step.icon}</span>
                            }
                            <span className="text-sm text-[#334155] leading-relaxed">{step.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="p-5 rounded-3xl" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
                        <div className="text-xs text-[#10B981] uppercase tracking-widest font-semibold mb-3">Live Transcript Sample</div>
                        <div className="space-y-2">
                          {[
                            { side: 'patient', text: 'Hi, I need to book a cleaning for next week.' },
                            { side: 'ai', text: 'Of course! Are you a new or existing patient with us?' },
                            { side: 'patient', text: "New patient — my name's Alex Williams." },
                            { side: 'ai', text: "Great, Alex! I have Tuesday at 2pm available — shall I book that?" },
                          ].map((msg, i) => (
                            <div key={i} className={`flex ${msg.side === 'ai' ? 'justify-start' : 'justify-end'}`}>
                              <div
                                className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${msg.side === 'ai' ? 'rounded-tl-sm' : 'rounded-tr-sm'}`}
                                style={msg.side === 'ai'
                                  ? { background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34D399' }
                                  : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(248,250,252,0.75)' }
                                }
                              >
                                {msg.text}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 rounded-3xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
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
              <div className="p-1.5 rounded-[2rem]" style={{ background: 'rgba(16,185,129,0.04)', boxShadow: '0 0 0 1px rgba(16,185,129,0.15), 0 8px 60px rgba(16,185,129,0.08)' }}>
                <div className="rounded-[calc(2rem-6px)] p-8 md:p-12" style={{ background: 'rgba(10,22,40,0.9)', borderTop: '1px solid rgba(52,211,153,0.2)', boxShadow: 'inset 0 1px 1px rgba(52,211,153,0.08)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div>
                      <div className="text-4xl mb-4">🩺</div>
                      <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Primary Care Clinic</h3>
                      <p className="text-[#475569] mb-8 leading-relaxed">
                        Patient calls for annual physical, sick visit, or medication follow-up. AI routes intelligently.
                      </p>
                      <div className="space-y-3">
                        {primarySteps.map((step, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }}
                            className="flex items-start gap-3 p-3 rounded-2xl"
                            style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)' }}
                          >
                            {step.icon === '🤖'
                              ? <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 mt-0.5" style={{ border: '1px solid rgba(16,185,129,0.3)' }}><img src="/Gemini_Generated_Image_a1e9r2a1e9r2a1e9.png" alt="" className="w-full h-full object-cover object-top" /></div>
                              : <span className="text-sm mt-0.5 shrink-0">{step.icon}</span>
                            }
                            <span className="text-sm text-[#334155] leading-relaxed">{step.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="p-5 rounded-3xl" style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)' }}>
                        <div className="text-xs text-[#34D399] uppercase tracking-widest font-semibold mb-3">Smart Routing Logic</div>
                        <div className="space-y-2">
                          {[
                            { type: 'Routine Visit', action: 'Auto-book', accentColor: '#10B981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
                            { type: 'Urgent / Same-day', action: 'Escalate to staff', accentColor: '#FBBf24', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
                            { type: 'Lab Results', action: 'Transfer to nurse', accentColor: '#2DD4BF', bg: 'rgba(45,212,191,0.08)', border: 'rgba(45,212,191,0.2)' },
                            { type: 'Emergency', action: 'Immediate handoff', accentColor: '#F87171', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)' },
                          ].map((route, i) => (
                            <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl" style={{ background: route.bg, border: `1px solid ${route.border}` }}>
                              <span className="text-xs text-[#334155] font-medium">{route.type}</span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ color: route.accentColor, background: `${route.accentColor}18`, border: `1px solid ${route.border}` }}>
                                {route.action}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 rounded-3xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                          <span className="text-xs text-[#10B981] font-semibold uppercase tracking-wide">Reminder Sent</span>
                        </div>
                        <div className="text-xs text-[#475569] leading-relaxed">
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
