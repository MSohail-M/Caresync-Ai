'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'What are the operating hours of TelVyn?',
    a: 'TelVyn is available 24 hours a day, 7 days a week, 365 days a year — including weekends, holidays, and after hours. Every patient call is answered instantly, no matter when they call.',
  },
  {
    q: "What happens when TelVyn doesn't know the answer?",
    a: 'TelVyn is trained on your clinic\'s specific protocols and FAQs. For anything outside its knowledge — clinical questions, complaints, or emergencies — it escalates immediately to the appropriate staff member or on-call provider in under 2 seconds. No dead ends, ever.',
  },
  {
    q: 'Can TelVyn support different languages like Spanish, Mandarin, and others?',
    a: 'Yes. TelVyn currently supports more than 20 popular languages and accents. We can also configure support for any additional language or regional accent to match your patient population.',
  },
  {
    q: 'Can we customize the workflows to suit our practice needs?',
    a: 'Absolutely. TelVyn is built around your clinic\'s specific workflows — appointment types, provider schedules, insurance rules, recall protocols, and more. Our onboarding team configures everything before go-live, and you can update workflows at any time.',
  },
  {
    q: 'Can we access call and message transcripts for quality analysis?',
    a: 'Yes. Every interaction is logged with a full transcript, caller ID, intent classification, and outcome. You can access transcripts from your dashboard at any time, export compliance-ready reports, and use them to coach staff or refine workflows.',
  },
  {
    q: 'Is it compulsory to have recorded calls for you to implement?',
    a: 'No, recorded calls are not required to get started. TelVyn can be configured and go live using your practice protocols, scheduling rules, and intake forms. Existing call recordings are helpful for fine-tuning but never a prerequisite.',
  },
  {
    q: 'Does TelVyn provide medical advice?',
    a: 'No. TelVyn handles administrative tasks — scheduling, eligibility, FAQs, refill routing, recalls, and more. For any clinical question or urgent medical concern, it immediately transfers the patient to a qualified staff member or provider.',
  },
  {
    q: 'How quickly can we get started?',
    a: 'Most practices are live within 48 hours of onboarding. There is no hardware to install and no long-term contract required. Book a demo and we\'ll show you the exact go-live process for your clinic.',
  },
]

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.32, 0.72, 0, 1] }}
    >
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          border: open ? '1px solid rgba(16,185,129,0.25)' : '1px solid rgba(15,23,42,0.08)',
          boxShadow: open ? '0 4px 24px rgba(16,185,129,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
          background: '#FFFFFF',
        }}
      >
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between px-6 py-5 text-left group"
        >
          <span
            className="text-[15px] font-semibold leading-snug pr-4 transition-colors duration-200"
            style={{ color: open ? '#059669' : '#0F172A' }}
          >
            {faq.q}
          </span>
          <span
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: open ? 'rgba(16,185,129,0.12)' : 'rgba(15,23,42,0.05)',
              transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1v11M1 6.5h11" stroke={open ? '#10B981' : '#64748B'} strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-6 pb-5">
                <div
                  className="h-px mb-4"
                  style={{ background: 'rgba(16,185,129,0.15)' }}
                />
                <p className="text-[14px] text-[#64748B] leading-relaxed">{faq.a}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section className="relative py-24 lg:py-32 px-4 overflow-hidden" style={{ background: '#F8FAFC' }}>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[500px]" style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(16,185,129,0.07) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px]" style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(13,148,136,0.06) 0%, transparent 60%)' }} />
      </div>

      <div className="relative z-10 max-w-[760px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.07)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#059669]">Common Questions</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-tight leading-[1.08] mb-4">
            How TelVyn<br />
            <span className="font-serif italic text-gradient-blue">AI Works</span>
          </h2>

          <p className="text-[16px] text-[#64748B] leading-relaxed">
            Everything you need to know before your first call goes live.
          </p>
        </motion.div>

        {/* FAQ list */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-[14px] text-[#64748B] mb-4">Still have questions?</p>
          <a
            href="/calendar"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[14px] text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
              boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
            }}
          >
            Talk to Our Team
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2v7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
