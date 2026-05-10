'use client'

import { motion } from 'framer-motion'
import TiltCard from './TiltCard'

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 5.5A1.5 1.5 0 015.5 4h2A1.5 1.5 0 019 5.5v1A1.5 1.5 0 018.04 7.9L6.75 8.5a9.5 9.5 0 004.75 4.75l.6-1.29A1.5 1.5 0 0113.5 11h1A1.5 1.5 0 0116 12.5v2A1.5 1.5 0 0114.5 16C8.701 16 4 11.299 4 5.5z" stroke="#3B8EF0" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Inbound Call Answering',
    desc: 'Answers every call within 2 rings with a natural, clinic-trained voice',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 11h14M11 4l7 7-7 7" stroke="#3B8EF0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Missed Call Recovery',
    desc: 'Automatically texts back patients who hung up before answering',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="4" width="16" height="15" rx="2" stroke="#10B981" strokeWidth="1.2"/>
        <path d="M7 4V2M15 4V2M3 9h16" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M8 13h2M12 13h2M8 16h2" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Appointment Booking',
    desc: 'Checks real-time availability and books directly into your calendar system',
    size: 'large',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 11h14M4 11l5-5M4 11l5 5" stroke="#3B8EF0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Rescheduling & Cancellation',
    desc: 'Patients can reschedule or cancel via voice or SMS, 24/7',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="4" stroke="#3B8EF0" strokeWidth="1.2"/>
        <path d="M3 19c0-4 3.582-7 8-7s8 3 8 7" stroke="#3B8EF0" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Patient Lookup',
    desc: 'Verifies existing patients by name, DOB, and phone number instantly',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 4h14a2 2 0 012 2v9a2 2 0 01-2 2H7l-4 4V6a2 2 0 012-2z" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'SMS Reminders',
    desc: 'Sends automated appointment reminders with confirm/cancel links',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3a8 8 0 100 16A8 8 0 0011 3z" stroke="#3B8EF0" strokeWidth="1.2"/>
        <path d="M11 7v4l3 2" stroke="#3B8EF0" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Insurance & FAQ Handling',
    desc: 'Answers insurance questions, hours, directions, and common FAQs',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M17 12a5 5 0 01-5 5H7l-4 4V7a5 5 0 015-5h4a5 5 0 015 5v5z" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Human Handoff',
    desc: 'Instantly transfers to staff for clinical questions or emergencies',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 6h14M4 10h10M4 14h6" stroke="#3B8EF0" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="17" cy="15" r="3" stroke="#3B8EF0" strokeWidth="1.2"/>
        <path d="M15.5 15l1 1 2-2" stroke="#3B8EF0" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Call Summaries & Logs',
    desc: 'Every call is transcribed, summarized, and logged for staff review',
  },
]

export default function Solution() {
  const mainFeature = features.find(f => f.size === 'large')
  const smallFeatures = features.filter(f => f.size !== 'large')

  return (
    <section className="py-24 md:py-32 relative" id="solution" style={{ background: '#F0F7FF' }}>
      {/* Subtle background image overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1920&q=60&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover object-center opacity-[0.04]"
        />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2" style={{ background: 'radial-gradient(circle, rgba(59,142,240,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3B8EF0]">The Solution</span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight max-w-3xl mx-auto text-[#0F172A]"
          >
            Your AI Front Desk —{' '}
            <span className="font-serif italic text-[#3B8EF0]">Always On, Always Professional</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="mt-4 text-lg text-[#64748B] max-w-2xl mx-auto"
          >
            CareSync AI handles the full patient communication lifecycle so your staff can focus on care.
          </motion.p>
        </div>

        {/* Large featured card with internal perspective grid */}
        {mainFeature && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="mb-4"
          >
            <TiltCard intensity={8} glowColor="rgba(16,185,129,0.12)" className="w-full">
              <div className="p-1.5 rounded-[2rem] bg-[#0F172A]/[0.04] ring-1 ring-[#0F172A]/[0.06] group hover:ring-[#10B981]/30 transition-all duration-700">
                <div
                  className="rounded-[calc(2rem-6px)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(15,23,42,0.06)] relative"
                  style={{
                    background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FFF4 100%)',
                    borderTop: '2px solid #BBF7D0',
                  }}
                >
                  {/* Internal subtle perspective grid */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-full opacity-[0.03] pointer-events-none overflow-hidden"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(16,185,129,1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />

                  <div className="relative z-10 p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(16,185,129,0.15)]">
                        {mainFeature.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-[#0F172A]">{mainFeature.title}</h3>
                          <span className="px-2 py-0.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[10px] font-semibold text-[#10B981] uppercase tracking-wide">Core Feature</span>
                        </div>
                        <p className="text-[#64748B] leading-relaxed">{mainFeature.desc}</p>
                      </div>

                      {/* Animated live booking mini-UI */}
                      <div className="shrink-0 p-3 rounded-2xl bg-white/80 border border-[#BBF7D0] shadow-sm min-w-[160px]">
                        <div className="text-[9px] text-[#10B981] uppercase tracking-wider font-semibold mb-2">Live Booking</div>
                        {['9:00 AM', '10:30 AM', '2:00 PM'].map((time, i) => (
                          <div
                            key={time}
                            className="flex items-center gap-1.5 mb-1.5"
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                background: i === 1 ? '#10B981' : '#E2E8F0',
                                boxShadow: i === 1 ? '0 0 6px rgba(16,185,129,0.6)' : 'none',
                                animation: i === 1 ? 'glow-pulse 2s ease-in-out infinite' : 'none',
                              }}
                            />
                            <span className="text-[10px] text-[#374151] font-medium">{time}</span>
                            {i === 1 && (
                              <span className="ml-auto text-[9px] text-[#10B981] font-bold bg-[#F0FDF4] px-1.5 py-0.5 rounded-full">Booked</span>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                        <span className="text-xs text-[#10B981] font-medium">Always active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        )}

        {/* Small feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {smallFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.32, 0.72, 0, 1] }}
            >
              <TiltCard intensity={15} glowColor="rgba(59,142,240,0.12)" className="h-full">
                <div className="p-1.5 rounded-[1.75rem] bg-[#0F172A]/[0.04] ring-1 ring-[#0F172A]/[0.06] h-full transition-all duration-700 hover:ring-[#3B8EF0]/25">
                  <div className="rounded-[calc(1.75rem-6px)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(15,23,42,0.06)] p-5 h-full shimmer-card">
                    <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-[#0F172A] mb-2 leading-tight">{feature.title}</h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">{feature.desc}</p>
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
