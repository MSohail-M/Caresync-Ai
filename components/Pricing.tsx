'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TiltCard from './TiltCard'

const plans = [
  {
    name: 'Starter',
    price: { monthly: 1799, annual: 1439 },
    subtitle: 'Perfect for solo practitioners',
    accent: '#0EA5E9',
    featured: false,
    features: [
      '3,000 minutes / month included',
      'One-time agent setup: $4,000',
      'Missed call recovery via SMS',
      'FAQ & hours answering',
      'Call transcription & logs',
      'Email support',
    ],
    cta: 'Get Started',
    ctaStyle: 'ghost',
  },
  {
    name: 'Growth',
    price: { monthly: 399, annual: 319 },
    subtitle: 'For growing clinics',
    accent: '#0EA5E9',
    featured: true,
    badge: 'Most Popular',
    features: [
      'Everything in Starter',
      'Live appointment booking',
      'Rescheduling & cancellation',
      'SMS reminders & confirmations',
      'Patient verification',
      'Up to 2,000 calls/month',
      'Priority support',
    ],
    cta: 'Book a Demo',
    ctaStyle: 'filled',
  },
  {
    name: 'Enterprise',
    price: { monthly: null, annual: null },
    subtitle: 'Multi-location practices',
    accent: '#38BDF8',
    featured: false,
    features: [
      'Everything in Growth',
      'EHR/PMS integration (Dentrix, Jane App)',
      'Multi-location support',
      'Custom voice & workflows',
      'Dedicated success manager',
      'Unlimited calls',
      'SLA guarantees',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'green',
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="py-24 md:py-32 relative" id="pricing" style={{ background: '#F8FAFC' }}>

      {/* Very subtle perspective grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(600px) rotateX(55deg) scaleX(2.8)',
            transformOrigin: '50% 0%',
            animation: 'grid-scroll 10s linear infinite',
            opacity: 0.8,
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #F8FAFC 0%, transparent 20%, transparent 80%, #F8FAFC 100%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px]" style={{ background: 'radial-gradient(ellipse, rgba(14,165,233,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#64748B]">Simple Pricing</span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-8 text-[#0F172A]"
          >
            Start Small, Scale With{' '}
            <span className="font-serif italic text-[#0EA5E9]">Your Clinic</span>
          </motion.h2>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="inline-flex items-center gap-3 p-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm"
          >
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                !annual ? 'bg-white text-[#0F172A] shadow-sm border border-[#E2E8F0]' : 'text-[#64748B]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                annual ? 'bg-white text-[#0F172A] shadow-sm border border-[#E2E8F0]' : 'text-[#64748B]'
              }`}
            >
              Annual
              <span className="px-1.5 py-0.5 rounded-full bg-[#EFF8FF] border border-[#BAE6FD] text-[#0284C7] text-[10px] font-semibold">Save 20%</span>
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }}
              className={`flex flex-col ${plan.featured ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              <TiltCard
                intensity={plan.featured ? 8 : 12}
                glowColor={plan.featured ? 'rgba(14,165,233,0.15)' : 'rgba(14,165,233,0.08)'}
                className="h-full"
              >
                <div
                  className="p-1.5 rounded-[2rem] h-full flex flex-col transition-all duration-700 relative overflow-hidden"
                  style={plan.featured ? {
                    background: 'rgba(14,165,233,0.06)',
                    boxShadow: '0 0 60px rgba(14,165,233,0.2), 0 20px 60px rgba(14,165,233,0.1)',
                  } : {
                    background: 'rgba(15,23,42,0.04)',
                    boxShadow: '0 0 0 1px rgba(15,23,42,0.06)',
                  }}
                >
                  {/* Featured: animated border beam */}
                  {plan.featured && (
                    <div
                      className="absolute inset-0 rounded-[2rem] pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.4), rgba(56,189,248,0.3), transparent)',
                        backgroundSize: '200% 100%',
                        animation: 'border-beam 3s linear infinite',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        padding: '1.5px',
                      }}
                    />
                  )}

                  <div
                    className="rounded-[calc(2rem-6px)] p-7 h-full flex flex-col shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(15,23,42,0.06)]"
                    style={{
                      background: plan.featured
                        ? 'linear-gradient(135deg, #EFF8FF 0%, #BAE6FD 100%)'
                        : plan.name === 'Enterprise'
                        ? 'linear-gradient(135deg, #EFF8FF 0%, #F8FAFC 60%)'
                        : '#FFFFFF',
                      borderTop: plan.featured ? '2px solid #7DD3FC' : plan.name === 'Enterprise' ? '2px solid #BAE6FD' : '2px solid #E2E8F0',
                    }}
                  >
                    {/* Badge */}
                    {plan.badge && (
                      <div className="inline-flex mb-3 self-start">
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide text-white"
                          style={{
                            background: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
                            backgroundSize: '200% 200%',
                            animation: 'gradient-shift 3s ease infinite',
                            boxShadow: '0 2px 12px rgba(14,165,233,0.35)',
                          }}
                        >
                          {plan.badge}
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-[#0F172A] mb-1">{plan.name}</h3>
                    <p className="text-xs text-[#64748B] mb-6">{plan.subtitle}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={annual ? 'annual' : 'monthly'}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                        >
                          {plan.price.monthly ? (
                            <div className="flex items-end gap-1">
                              <span className="text-5xl font-bold font-serif" style={{ color: plan.accent }}>
                                ${annual ? plan.price.annual : plan.price.monthly}
                              </span>
                              <span className="text-sm text-[#94A3B8] mb-2">/mo</span>
                            </div>
                          ) : (
                            <div className="text-4xl font-bold font-serif" style={{ color: plan.accent }}>
                              Custom
                            </div>
                          )}
                          {annual && plan.price.monthly && (
                            <div className="text-xs text-[#94A3B8] mt-1">
                              billed annually · saves ${(plan.price.monthly - (plan.price.annual ?? 0)) * 12}/yr
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 flex-1 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${plan.accent}15`, border: `1px solid ${plan.accent}25` }}>
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <path d="M1.5 4l1.5 1.5L6.5 2" stroke={plan.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="text-sm text-[#374151] leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href="/calendar"
                      className={`group flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${
                        plan.ctaStyle === 'filled'
                          ? 'bg-[#0EA5E9] hover:bg-[#0284C7] text-white shadow-[0_0_20px_rgba(14,165,233,0.3)]'
                          : plan.ctaStyle === 'green'
                          ? 'bg-[#0284C7]/15 hover:bg-[#0284C7]/25 text-[#0284C7] border border-[#0284C7]/25'
                          : 'border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white text-[#374151]'
                      }`}
                    >
                      {plan.cta}
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-[1px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                          plan.ctaStyle === 'filled' ? 'bg-white/20' : 'bg-[#0F172A]/[0.06]'
                        }`}
                      >
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M1.5 7.5L7.5 1.5M7.5 1.5H3M7.5 1.5V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </a>
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
