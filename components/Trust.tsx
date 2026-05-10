'use client'

import { motion } from 'framer-motion'

const trustCards = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L3 5v5c0 4.418 3.13 7 7 7s7-2.582 7-7V5L10 2z" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 10l2 2 4-4" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'HIPAA-Aware Workflow Design',
    desc: 'Built following HIPAA privacy principles for patient data handling at every step',
    color: '#10B981',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3.5" stroke="#10B981" strokeWidth="1.2"/>
        <path d="M4 17c0-3.314 2.686-6 6-6" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M13 14h4M15 12v4" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Role-Based Access',
    desc: 'Staff see only what they need. Admin controls who accesses call logs and transcripts.',
    color: '#10B981',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 5h12M4 9h8M4 13h6" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="15.5" cy="14.5" r="3" stroke="#10B981" strokeWidth="1.2"/>
        <path d="M14 14.5l1 1 2-2" stroke="#10B981" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Audit Logs',
    desc: 'Every interaction is logged with timestamps, caller ID, and outcomes for compliance review',
    color: '#10B981',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M18 14v-1a4 4 0 00-4-4H6a4 4 0 00-4 4v1" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="10" cy="6" r="3" stroke="#10B981" strokeWidth="1.2"/>
        <path d="M13 17l2 2 4-4" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Human Handoff Always Available',
    desc: 'Clinical questions, emergencies, and complaints route to real staff instantly — no exceptions',
    color: '#10B981',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="#10B981" strokeWidth="1.2"/>
        <path d="M10 6v4M10 14v.5" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Data Minimization',
    desc: 'We collect only the minimum patient data needed to complete a booking — nothing more',
    color: '#10B981',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="8" width="14" height="10" rx="2" stroke="#10B981" strokeWidth="1.2"/>
        <path d="M7 8V6a3 3 0 016 0v2" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="10" cy="13" r="1.5" fill="#10B981"/>
      </svg>
    ),
    title: 'Secure API & Webhook Logic',
    desc: 'All integrations use encrypted channels with authenticated webhooks and token validation',
    color: '#10B981',
  },
]

export default function Trust() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden" id="trust">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#BBF7D0] bg-[#F0FDF4] mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#10B981]">Built for Healthcare</span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight max-w-3xl mx-auto text-[#0F172A]"
          >
            Designed With Patient Privacy{' '}
            <span className="font-serif italic text-[#10B981]">at the Core</span>
          </motion.h2>
        </div>

        {/* Disclaimer pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="flex justify-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FDE68A] bg-[#FFFBEB]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#D97706" strokeWidth="1.2"/>
              <path d="M6 4v3M6 8.5v.5" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="text-[11px] text-[#D97706] font-medium">
              Note: CareSync AI is designed with HIPAA-aware workflows. We do not claim HIPAA certification.
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trustCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.32, 0.72, 0, 1] }}
              className="group"
            >
              <div className="p-1.5 rounded-[2rem] bg-[#0F172A]/[0.04] ring-1 ring-[#0F172A]/[0.06] h-full group-hover:ring-[#10B981]/25 transition-all duration-700">
                <div
                  className="rounded-[calc(2rem-6px)] bg-white p-6 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(15,23,42,0.06)]"
                  style={{ borderTop: '2px solid #BBF7D0' }}
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center mb-4">
                    {card.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-[#0F172A] mb-2 leading-tight">{card.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{card.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
