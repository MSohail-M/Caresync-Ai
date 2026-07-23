'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'

/* ─── Service data ─────────────────────────────────────── */
const services = [
  {
    id: 'front-desk',
    kicker: 'AI Front Desk',
    heading: 'The AI receptionist your clinic deserves.',
    description:
      'Alice answers every inbound call in under 2 seconds — no hold music, no missed calls. She books appointments directly into your EHR, verifies insurance in real time, and handles reschedules and cancellations without involving your staff.',
    features: [
      { label: 'Answers every call 24/7', detail: 'No voicemail, no missed revenue. Every patient gets a live response.' },
      { label: 'Books directly in eClinicalWorks', detail: 'Slots created in real time — no double-booking, no manual entry.' },
      { label: 'Real-time eligibility checks', detail: 'Verifies coverage before the appointment is confirmed.' },
      { label: 'Handles reschedules & cancellations', detail: 'Patients self-serve without tying up front-desk staff.' },
      { label: 'Sends SMS confirmations', detail: 'Automated reminders reduce no-shows by up to 35%.' },
    ],
    visual: 'voice',
    dark: true,
  },
  {
    id: 'inbound',
    kicker: 'Inbound Agent',
    heading: 'Every call answered. Every patient helped.',
    description:
      'Our inbound voice agent manages the full intake flow — identifying the caller, pulling their chart, triaging the request, and routing to the right outcome. Prescription refills, lab results, referral requests — handled automatically.',
    features: [
      { label: 'Caller ID + chart lookup', detail: 'Recognizes existing patients and pulls context instantly.' },
      { label: 'Smart call triage', detail: 'Routes urgent calls to staff, routine calls to automation.' },
      { label: 'Prescription refill routing', detail: 'Sends refill requests to the provider queue without human handoff.' },
      { label: 'Lab result delivery', detail: 'Reads out results securely after identity verification.' },
      { label: 'Warm transfer to staff', detail: 'Hands off with full context when human touch is needed.' },
    ],
    visual: 'inbound',
    dark: false,
  },
  {
    id: 'outbound',
    kicker: 'Outbound Agent',
    heading: 'Proactive outreach. Zero staff time.',
    description:
      'Alice dials patients automatically for appointment reminders, recall campaigns, care gap outreach, and follow-ups after visits. She speaks naturally, handles responses, and updates your EHR — no human needed.',
    features: [
      { label: 'Appointment reminders', detail: 'Reduces no-shows with automated calls 48h and 2h before.' },
      { label: 'Recall & reactivation', detail: 'Brings back patients due for annual exams or preventive care.' },
      { label: 'Post-visit follow-up', detail: 'Checks on patients after procedures and flags concerns.' },
      { label: 'Care gap outreach', detail: 'Reaches patients missing screenings or chronic care milestones.' },
      { label: 'EHR status updates', detail: 'Logs every call outcome directly into the patient chart.' },
    ],
    visual: 'outbound',
    dark: true,
  },
  {
    id: 'chatbot',
    kicker: 'Website Chatbot',
    heading: 'Patients get answers. You get booked appointments.',
    description:
      'The Vocryn chatbot lives on your website and handles the questions your front desk answers 50 times a day — hours, directions, insurance, new patient intake — and converts visitors into booked appointments around the clock.',
    features: [
      { label: 'Instant FAQ responses', detail: 'Hours, location, insurance accepted, new patient process.' },
      { label: 'Appointment booking widget', detail: 'Books directly into your schedule without phone calls.' },
      { label: 'New patient intake forms', detail: 'Captures demographics and insurance before the first visit.' },
      { label: 'Multilingual support', detail: 'Serves Spanish, French, and 40+ languages automatically.' },
      { label: 'Branded to your clinic', detail: 'Matches your colors, name, and tone — not a generic bot.' },
    ],
    visual: 'chatbot',
    dark: false,
  },
  {
    id: 'automation',
    kicker: 'Referral & Prior Auth',
    heading: 'Referrals submitted. Auth approved. Staff freed.',
    description:
      'Vocryn automates the most time-consuming administrative workflows in your clinic — specialist referrals and insurance prior authorizations. What used to take 45 minutes of staff time now happens in minutes.',
    features: [
      { label: 'Referral packet generation', detail: 'Pulls chart notes, labs, and imaging into a complete packet automatically.' },
      { label: 'Specialist fax & follow-up', detail: 'Sends referrals and tracks acknowledgment without staff chasing.' },
      { label: 'Prior auth submission', detail: 'Submits to payer portals with the right clinical justification.' },
      { label: 'Status tracking & alerts', detail: 'Notifies your team the moment auth is approved or denied.' },
      { label: 'Denial appeal drafting', detail: 'Auto-generates appeal letters with supporting documentation.' },
    ],
    visual: 'automation',
    dark: true,
  },
  {
    id: 'scrub-master',
    kicker: 'Scrub Master',
    heading: 'Catch claim errors before payers do.',
    description:
      'Medical claims scrubbing is the difference between payment and denial. Vocryn\'s Scrub Master reviews every claim line-by-line before submission — catching coding errors, missing modifiers, duplicate billing, and payer-specific rules automatically.',
    features: [
      { label: 'Real-time claim scrubbing', detail: 'Every claim reviewed before it leaves your system.' },
      { label: 'ICD-10 / CPT validation', detail: 'Flags diagnosis-procedure mismatches and missing codes.' },
      { label: 'Modifier & bundling checks', detail: 'Catches modifier errors and unbundling violations.' },
      { label: 'Payer-specific rule engine', detail: 'Applies unique rules for Medicare, Medicaid, and each commercial payer.' },
      { label: 'First-pass rate reporting', detail: 'Tracks your clean claim rate and denial trends over time.' },
    ],
    visual: 'scrub',
    dark: false,
  },
]

/* ─── Visual mockup components ─────────────────────────── */
function VoiceVisual() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8" style={{ background: 'linear-gradient(145deg,#0A1628,#10233A)' }}>
      <div className="p-6">
        {/* header */}
        <div className="flex items-center gap-3 pb-5 border-b border-white/8 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(120deg,#0A5783,#14757C,#339D65)' }}>
            <svg width="18" height="18" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.003 1.19 2 2 0 012 .003h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div>
            <div className="text-sm font-bold text-white">Alice — AI Front Desk</div>
            <div className="text-xs text-white/40">Primary Care Clinic</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-[11px] font-bold text-[#4FBE78]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FBE78] animate-pulse" />
            Live
          </div>
        </div>
        {/* wave bars */}
        <div className="flex items-end gap-0.5 h-10 mb-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                background: 'linear-gradient(120deg,#0A5783,#14757C,#339D65)',
                height: `${30 + Math.sin(i * 0.7) * 20 + Math.cos(i * 1.3) * 15}%`,
                animationDelay: `${i * 0.07}s`,
              }}
            />
          ))}
        </div>
        {/* transcript */}
        <div className="rounded-xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
          {[
            { who: 'Patient', text: "Hi, I need to book an appointment for next week.", patient: true },
            { who: 'Alice', text: "Of course! Are you a new or existing patient?", patient: false },
            { who: 'Patient', text: "Existing patient — it's Sarah Miller.", patient: true },
            { who: 'Alice', text: "Found you, Sarah. I have Tuesday at 10 AM — shall I book it?", patient: false },
          ].map((line, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider w-12 shrink-0 pt-0.5" style={{ color: line.patient ? 'rgba(255,255,255,0.3)' : '#4FBE78' }}>{line.who}</span>
              <span className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{line.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function InboundVisual() {
  const steps = [
    { icon: '📞', label: 'Incoming call identified', status: 'done' },
    { icon: '👤', label: 'Patient chart pulled from eCW', status: 'done' },
    { icon: '🔀', label: 'Request triaged: Prescription refill', status: 'done' },
    { icon: '📋', label: 'Routing to provider queue', status: 'active' },
    { icon: '✅', label: 'Confirmation SMS sent to patient', status: 'pending' },
  ]
  return (
    <div className="rounded-2xl border border-[rgba(16,185,129,0.15)] overflow-hidden bg-white shadow-xl shadow-emerald-900/5">
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Call Flow</div>
        <div className="text-sm font-bold text-[#0F172A] mt-0.5">Inbound — Rx Refill Request</div>
      </div>
      <div className="p-5 space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg border" style={{
            borderColor: step.status === 'active' ? 'rgba(16,185,129,0.3)' : step.status === 'done' ? 'rgba(16,185,129,0.1)' : 'rgba(15,23,42,0.06)',
            background: step.status === 'active' ? 'rgba(16,185,129,0.06)' : step.status === 'done' ? 'rgba(16,185,129,0.03)' : 'transparent',
          }}>
            <span className="text-base">{step.icon}</span>
            <span className="text-xs font-medium text-[#334155] flex-1">{step.label}</span>
            {step.status === 'done' && <span className="text-[10px] font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded-full">Done</span>}
            {step.status === 'active' && <span className="text-[10px] font-bold text-[#0A5783] bg-blue-50 px-2 py-0.5 rounded-full animate-pulse">Active</span>}
            {step.status === 'pending' && <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">Pending</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

function OutboundVisual() {
  const calls = [
    { name: 'James T.', reason: 'Annual exam due', time: '9:02 AM', result: 'Booked' },
    { name: 'Maria R.', reason: 'Appt reminder (2h)', time: '9:05 AM', result: 'Confirmed' },
    { name: 'David K.', reason: 'Care gap — A1C test', time: '9:08 AM', result: 'Scheduled' },
    { name: 'Susan L.', reason: 'Post-visit follow-up', time: '9:11 AM', result: 'No concern' },
  ]
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8" style={{ background: 'linear-gradient(145deg,#0A1628,#10233A)' }}>
      <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-white">Outbound Campaign</div>
          <div className="text-xs text-white/40 mt-0.5">Today · 23 calls queued</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-[#4FBE78]">87%</div>
          <div className="text-[10px] text-white/40 uppercase tracking-wider">Reach rate</div>
        </div>
      </div>
      <div className="p-4 space-y-2">
        {calls.map((c, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: 'linear-gradient(120deg,#0A5783,#339D65)' }}>{c.name[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white">{c.name}</div>
              <div className="text-[11px] text-white/40 truncate">{c.reason}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] text-white/30">{c.time}</div>
              <div className="text-[10px] font-bold text-[#4FBE78]">{c.result}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChatbotVisual() {
  return (
    <div className="rounded-2xl border border-[rgba(15,23,42,0.08)] overflow-hidden bg-white shadow-xl shadow-slate-900/8">
      <div className="px-5 py-3.5 flex items-center gap-3" style={{ background: 'linear-gradient(120deg,#0A5783,#14757C,#339D65)' }}>
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
          <svg width="14" height="14" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div>
          <div className="text-xs font-bold text-white">Vocryn Assistant</div>
          <div className="text-[10px] text-white/60">Online · vocrynclinic.com</div>
        </div>
        <div className="ml-auto w-2 h-2 rounded-full bg-[#4FBE78] animate-pulse" />
      </div>
      <div className="p-4 space-y-3 min-h-[180px]">
        {[
          { bot: true,  text: "Hi! I'm the Vocryn assistant. How can I help you today?" },
          { bot: false, text: "Do you accept Blue Cross insurance?" },
          { bot: true,  text: "Yes! We accept Blue Cross PPO and HMO. Would you like to book an appointment?" },
          { bot: false, text: "Yes please — for next Tuesday" },
          { bot: true,  text: "Great! I have Tuesday at 11:00 AM or 2:30 PM. Which works better?" },
        ].map((msg, i) => (
          <div key={i} className={`flex ${msg.bot ? '' : 'justify-end'}`}>
            <div className="max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed" style={
              msg.bot
                ? { background: '#F1F5F9', color: '#334155', borderRadius: '4px 16px 16px 16px', border: '1px solid rgba(15,23,42,0.06)' }
                : { background: 'linear-gradient(120deg,#0A5783,#14757C,#339D65)', color: 'white', borderRadius: '16px 4px 16px 16px' }
            }>{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="mx-4 mb-4 flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-100 bg-slate-50">
        <span className="text-xs text-slate-400 flex-1">Type a message…</span>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(120deg,#0A5783,#339D65)' }}>
          <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </div>
      </div>
    </div>
  )
}

function AutomationVisual() {
  const tasks = [
    { label: 'Referral packet compiled', icon: '📄', done: true },
    { label: 'Sent to Dr. Nguyen Cardiology', icon: '📠', done: true },
    { label: 'Prior auth submitted to Aetna', icon: '🏦', done: true },
    { label: 'Auth approved — notifying team', icon: '✅', done: false, active: true },
  ]
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8" style={{ background: 'linear-gradient(145deg,#0A1628,#10233A)' }}>
      <div className="px-5 py-4 border-b border-white/8">
        <div className="text-sm font-bold text-white">Referral Workflow</div>
        <div className="text-xs text-white/40 mt-0.5">Patient: James T. · Cardiology referral</div>
      </div>
      <div className="p-5 space-y-3">
        {tasks.map((t, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-3 rounded-xl" style={{
            background: t.active ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${t.active ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.06)'}`,
          }}>
            <span className="text-base">{t.icon}</span>
            <span className="text-xs font-medium flex-1" style={{ color: t.active ? '#4FBE78' : 'rgba(255,255,255,0.6)' }}>{t.label}</span>
            {t.done && !t.active && <span className="text-[#4FBE78]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg></span>}
            {t.active && <span className="text-[10px] font-bold text-[#4FBE78] animate-pulse">●</span>}
          </div>
        ))}
        <div className="mt-2 px-3 py-2.5 rounded-xl text-center text-xs font-bold text-[#4FBE78]" style={{ background: 'rgba(79,190,120,0.1)', border: '1px solid rgba(79,190,120,0.2)' }}>
          Auth Approved — 0 staff hours used
        </div>
      </div>
    </div>
  )
}

function ScrubVisual() {
  const claims = [
    { code: '99213', desc: 'Office visit, Est. patient', status: 'ok' },
    { code: '85025', desc: 'CBC w/ differential', status: 'ok' },
    { code: 'J0696', desc: 'Ceftriaxone injection', status: 'fix', note: 'Missing modifier JW' },
    { code: '93000', desc: 'EKG with interpretation', status: 'warn', note: 'Bundled — unbundle' },
    { code: '99000', desc: 'Specimen handling', status: 'ok' },
  ]
  return (
    <div className="rounded-2xl border border-[rgba(15,23,42,0.08)] overflow-hidden bg-white shadow-xl shadow-slate-900/8">
      <div className="px-5 py-3.5 flex items-center justify-between border-b border-slate-100">
        <div>
          <div className="text-sm font-bold text-[#0F172A]">Scrub Master</div>
          <div className="text-xs text-slate-400 mt-0.5">Claim #CLM-20260721</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-[#059669]">3/5</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Clean lines</div>
        </div>
      </div>
      <div className="p-4 space-y-1.5">
        {claims.map((c, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg border border-slate-100">
            <span className="text-[11px] font-bold font-mono text-[#1E3A6E] w-14 shrink-0">{c.code}</span>
            <span className="text-xs text-slate-500 flex-1 min-w-0 truncate">{c.desc}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
              c.status === 'ok'   ? 'bg-emerald-50 text-emerald-700' :
              c.status === 'fix'  ? 'bg-blue-50 text-blue-700' :
              'bg-amber-50 text-amber-700'
            }`}>
              {c.status === 'ok' ? '✓ Clean' : c.status === 'fix' ? 'Fix needed' : 'Review'}
            </span>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs font-bold text-slate-500">Est. first-pass rate</div>
        <div className="text-sm font-bold text-[#059669]">94%</div>
      </div>
    </div>
  )
}

const visualMap: Record<string, React.ReactNode> = {
  voice:      <VoiceVisual />,
  inbound:    <InboundVisual />,
  outbound:   <OutboundVisual />,
  chatbot:    <ChatbotVisual />,
  automation: <AutomationVisual />,
  scrub:      <ScrubVisual />,
}

/* ─── Service section ───────────────────────────────────── */
function ServiceSection({ svc, index }: { svc: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const flip = index % 2 === 1

  return (
    <div
      ref={ref}
      id={svc.id}
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: svc.dark ? 'linear-gradient(180deg,#F8FAFC 0%,#F0FDF4 100%)' : '#FFFFFF' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${flip ? 'lg:[direction:rtl]' : ''}`}>
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: flip ? 32 : -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            style={{ direction: 'ltr' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.06)] mb-5">
              <span className="text-[11px] font-semibold text-[#059669] uppercase tracking-[0.2em]">{svc.kicker}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight tracking-tight mb-4">
              {svc.heading}
            </h2>
            <p className="text-[15px] text-[#64748B] leading-relaxed mb-8">{svc.description}</p>

            <ul className="space-y-4 mb-8">
              {svc.features.map((f) => (
                <li key={f.label} className="flex gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,rgba(10,87,131,0.12),rgba(51,157,101,0.12))' }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#0F172A]">{f.label}</span>
                    <span className="text-sm text-[#64748B]"> — {f.detail}</span>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="/calendar"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg,#059669 0%,#10B981 100%)', boxShadow: '0 2px 16px rgba(16,185,129,0.3)' }}
            >
              See it in action
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: flip ? -32 : 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            style={{ direction: 'ltr' }}
          >
            {visualMap[svc.visual]}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <main>
      <Nav />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ background: 'linear-gradient(175deg,#F0FDF4 0%,#ECFDF5 50%,#F0FDF4 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full opacity-40" style={{ background: 'radial-gradient(ellipse,rgba(16,185,129,0.15) 0%,transparent 70%)' }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.06)] mb-5">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
              <span className="text-[11px] font-semibold text-[#059669] uppercase tracking-[0.2em]">What We Build</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-[#0F172A] mb-5">
              AI that works every part<br />
              <span className="font-serif italic" style={{ background: 'linear-gradient(120deg,#0A5783,#14757C,#339D65)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                of your clinic.
              </span>
            </h1>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed mb-10">
              From the first ring to the final claim — Vocryn automates every touchpoint so your team can focus on patients, not paperwork.
            </p>
          </motion.div>

          {/* Service jump links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-4 py-2 rounded-lg text-xs font-semibold border transition-all duration-300 hover:border-[rgba(16,185,129,0.4)] hover:bg-[rgba(16,185,129,0.06)] hover:text-[#059669]"
                style={{ borderColor: 'rgba(15,23,42,0.1)', color: '#475569' }}
              >
                {s.kicker}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service sections */}
      {services.map((svc, i) => (
        <ServiceSection key={svc.id} svc={svc} index={i} />
      ))}

      {/* Bottom CTA */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ background: 'linear-gradient(145deg,#0A1628,#10233A)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30" style={{ background: 'radial-gradient(ellipse,rgba(51,157,101,0.4) 0%,transparent 70%)' }} />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(79,190,120,0.3)] bg-[rgba(79,190,120,0.1)] mb-5">
            <span className="text-[11px] font-semibold text-[#4FBE78] uppercase tracking-[0.2em]">Get Started</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            Ready to see it in your clinic?
          </h2>
          <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
            Book a 30-minute demo and we'll show you exactly how Vocryn fits your workflow — live, with your EHR.
          </p>
          <a
            href="/calendar"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#059669 0%,#10B981 100%)', boxShadow: '0 4px 24px rgba(16,185,129,0.4)' }}
          >
            Book a Free Demo
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </section>

      <Footer />
      <StickyBar />
    </main>
  )
}
