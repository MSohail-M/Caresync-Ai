'use client'

import { motion } from 'framer-motion'
import TiltCard from './TiltCard'

const nodes = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 7A2 2 0 017 5h2.5a2 2 0 011.93 1.48L12.4 10a2 2 0 01-.57 2L10.3 13.47A12 12 0 0014.53 17.7l1.47-1.53a2 2 0 012-.57l3.52.97A2 2 0 0123 18.5V21a2 2 0 01-2 2C10.955 23 5 17.045 5 9.5V7z" stroke="#3B8EF0" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Phone Call',
    desc: 'Patient dials clinic number',
    color: '#3B8EF0',
    bg: '#EFF6FF',
    border: '#BFDBFE',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="5" stroke="#10B981" strokeWidth="1.2"/>
        <path d="M6 23c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M20 6l2 2-2 2M24 8h-4" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'AI Voice Agent',
    desc: 'CareSync AI answers, verifies, books',
    color: '#10B981',
    bg: '#F0FDF4',
    border: '#BBF7D0',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="3" stroke="#3B8EF0" strokeWidth="1.2"/>
        <path d="M4 11h20" stroke="#3B8EF0" strokeWidth="1.2"/>
        <path d="M9 16h2M13 16h2M17 16h2M9 19h6" stroke="#3B8EF0" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Automation Layer',
    desc: 'n8n / logic processing',
    color: '#3B8EF0',
    bg: '#EFF6FF',
    border: '#BFDBFE',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="5" width="20" height="18" rx="2" stroke="#10B981" strokeWidth="1.2"/>
        <path d="M9 5V3M19 5V3M4 11h20" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M9 16h2M13 16h2M9 19h4" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Calendar / EHR / PMS',
    desc: 'Appointment written to system',
    color: '#10B981',
    bg: '#F0FDF4',
    border: '#BBF7D0',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 5h18a2 2 0 012 2v11a2 2 0 01-2 2H8l-5 5V7a2 2 0 012-2z" stroke="#3B8EF0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 12h8M10 16h4" stroke="#3B8EF0" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    label: 'SMS Confirmation',
    desc: 'Patient notified instantly',
    color: '#3B8EF0',
    bg: '#EFF6FF',
    border: '#BFDBFE',
  },
]

const integrations = [
  'Google Calendar', 'Calendly', 'Jane App', 'Dentrix', 'Open Dental', 'Twilio', 'GoHighLevel',
]

export default function Workflow() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden" id="architecture">
      {/* Background clinic image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=1920&q=60&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover object-center opacity-[0.05]"
        />
        {/* Very light perspective grid */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59,142,240,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,142,240,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              transform: 'perspective(600px) rotateX(55deg) scaleX(2.8)',
              transformOrigin: '50% 0%',
              animation: 'grid-scroll 8s linear infinite',
            }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, white 0%, transparent 25%)' }} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(59,142,240,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#64748B]">The Architecture</span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight max-w-3xl mx-auto text-[#0F172A]"
          >
            Secure, Validated, and Connected to{' '}
            <span className="font-serif italic text-[#3B8EF0]">Your Clinic Systems</span>
          </motion.h2>
        </div>

        {/* Flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="flex flex-col md:flex-row items-stretch gap-0 mb-8"
        >
          {nodes.map((node, i) => (
            <div key={node.label} className="flex flex-col md:flex-row items-center flex-1">
              <div className="flex-1 w-full">
                <TiltCard intensity={8} glowColor={`${node.color}15`} className="h-full">
                  <div className="p-1.5 rounded-[1.75rem] bg-[#0F172A]/[0.04] ring-1 ring-[#0F172A]/[0.06] transition-all duration-500 hover:ring-[#3B8EF0]/20">
                    <div className="rounded-[calc(1.75rem-6px)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(15,23,42,0.06)] p-5 flex flex-col items-center text-center gap-3">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{
                          background: node.bg,
                          border: `1px solid ${node.border}`,
                          boxShadow: `0 4px 16px ${node.color}18`,
                        }}
                      >
                        {node.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#0F172A] mb-0.5 leading-tight">{node.label}</div>
                        <div className="text-[11px] text-[#94A3B8]">{node.desc}</div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* Arrow connector */}
              {i < nodes.length - 1 && (
                <div className="relative flex items-center justify-center w-8 md:w-10 h-8 md:h-auto shrink-0 my-1 md:my-0">
                  <div className="hidden md:block w-full h-px bg-[#E2E8F0]" />
                  <div className="md:hidden w-px h-full bg-[#E2E8F0]" />
                  {/* Glowing traveling dot */}
                  <div
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#3B8EF0]"
                    style={{
                      animation: `traveling-dot 2s ease-in-out infinite ${i * 0.4}s`,
                      boxShadow: '0 0 8px rgba(59,142,240,0.8)',
                    }}
                  />
                  <svg className="absolute hidden md:block right-0" width="6" height="10" viewBox="0 0 6 10" fill="none">
                    <path d="M1 1l4 4-4 4" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Security callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="mb-10"
        >
          <div className="p-1.5 rounded-[2rem] bg-[#0F172A]/[0.04] ring-1 ring-[#BBF7D0]">
            <div className="rounded-[calc(2rem-6px)] bg-[#F0FDF4] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
              <div className="w-10 h-10 rounded-2xl bg-white border border-[#BBF7D0] flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L3 5v5c0 3.314 2.686 6 6 6s6-2.686 6-6V5L9 2z" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 9l2 2 4-4" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm text-[#374151] leading-relaxed">
                <span className="font-semibold text-[#10B981]">Safety first: </span>
                AI does not take unsafe or unvalidated actions. Every booking is confirmed before completion. Human escalation is always available for clinical questions, emergencies, or sensitive requests.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Integrations row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="text-center"
        >
          <div className="text-xs text-[#94A3B8] uppercase tracking-[0.2em] mb-4 font-semibold">Supported Integrations</div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {integrations.map((integration) => (
              <span
                key={integration}
                className="px-3 py-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#64748B] font-medium hover:border-[#3B8EF0]/30 hover:bg-[#EFF6FF] transition-all duration-300"
              >
                {integration}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
