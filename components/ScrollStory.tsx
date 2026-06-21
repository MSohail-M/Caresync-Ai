'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const steps = [
  { id:'ring',   icon:'📞', title:'Patient Calls',         desc:'A patient dials your clinic number at any hour of the day or night.',                       color:'#0EA5E9' },
  { id:'ai',     icon:'🤖', title:'AI Answers Naturally',  desc:'CareSync AI picks up within 2 rings with a warm, clinic-trained voice. No hold music.',      color:'#38BDF8' },
  { id:'verify', icon:'✅', title:'Patient Verified',      desc:"AI collects name, DOB, and phone to confirm the patient's identity — instantly.",           color:'#0284C7' },
  { id:'book',   icon:'📅', title:'Appointment Booked',    desc:'AI checks real-time availability and books directly into your calendar. No staff needed.',  color:'#0EA5E9' },
  { id:'sms',    icon:'💬', title:'Confirmation SMS Sent', desc:'Patient gets an instant text with appointment details, address, and prep instructions.',    color:'#38BDF8' },
  { id:'log',    icon:'📋', title:'Everything Logged',     desc:'Every call is transcribed, summarized, and logged in your dashboard for staff review.',     color:'#0284C7' },
]

// Phone screen content per step
const phonePanels: Record<string, React.ReactNode> = {
  ring: (
    <div className="flex flex-col items-center pt-6 px-3">
      <div className="text-[9px] text-[rgba(248,250,252,0.4)] uppercase tracking-widest mb-2">Incoming Call</div>
      <div className="relative flex items-center justify-center w-14 h-14 my-3">
        <span className="absolute inset-0 rounded-full border border-[#0EA5E9]/30 animate-pulse-ring" />
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{background:'rgba(14,165,233,0.12)',border:'1px solid rgba(14,165,233,0.2)'}}>👩‍⚕️</div>
      </div>
      <div className="text-sm font-bold text-[#F8FAFC] mb-0.5">Maria Chen</div>
      <div className="text-xs text-[rgba(248,250,252,0.4)]">Calling your clinic...</div>
    </div>
  ),
  ai: (
    <div className="flex flex-col items-center pt-5 px-3">
      <div className="text-[9px] text-[#0EA5E9] uppercase tracking-widest font-semibold mb-2">AI Answering</div>
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg mb-3" style={{background:'rgba(14,165,233,0.1)',border:'1px solid rgba(14,165,233,0.18)'}}>🤖</div>
      <div className="flex items-center gap-0.5 h-8">
        {[0.4,0.8,1,0.7,0.5,0.9,0.6].map((h,i)=>(
          <div key={i} className="w-1 rounded-full" style={{height:`${h*28}px`,background:`rgba(14,165,233,${0.4+h*0.6})`,animation:`waveform ${0.6+i*0.08}s ease-in-out infinite ${i*0.1}s`}}/>
        ))}
      </div>
      <div className="text-[10px] text-[rgba(248,250,252,0.4)] mt-2 text-center">&ldquo;How can I help?&rdquo;</div>
    </div>
  ),
  verify: (
    <div className="flex flex-col pt-4 gap-1.5 px-3">
      <div className="text-[9px] text-[#0284C7] uppercase tracking-widest font-semibold mb-1">Verifying</div>
      {['Maria Chen','Apr 12, 1988','✓ Confirmed'].map((item,i)=>(
        <div key={i} className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl" style={{background:'rgba(2,132,199,0.08)',border:'1px solid rgba(2,132,199,0.15)'}}>
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2" stroke="#0284C7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="text-[10px] text-[rgba(248,250,252,0.7)]">{item}</span>
        </div>
      ))}
    </div>
  ),
  book: (
    <div className="flex flex-col pt-4 px-3">
      <div className="text-[9px] text-[#0EA5E9] uppercase tracking-widest font-semibold mb-2">Booking...</div>
      <div className="p-2.5 rounded-xl" style={{background:'rgba(14,165,233,0.08)',border:'1px solid rgba(14,165,233,0.15)'}}>
        <div className="text-[9px] text-[rgba(248,250,252,0.35)] mb-1.5 uppercase tracking-widest">New Appointment</div>
        <div className="text-xs font-semibold text-[#F8FAFC]">Dr. Johnson</div>
        <div className="text-[10px] text-[rgba(248,250,252,0.5)] mt-0.5">March 15 · 10:30 AM</div>
        <div className="mt-1.5 flex items-center gap-1">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#0EA5E9" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="text-[9px] text-[#0EA5E9] font-semibold">Confirmed</span>
        </div>
      </div>
    </div>
  ),
  sms: (
    <div className="flex flex-col pt-4 px-3">
      <div className="text-[9px] text-[#38BDF8] uppercase tracking-widest font-semibold mb-2">SMS Sent ✓</div>
      <div className="p-2.5 rounded-xl" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)'}}>
        <div className="text-[9px] text-[rgba(248,250,252,0.35)] mb-1.5">To: Maria · (555) 012-3456</div>
        <div className="text-[10px] text-[rgba(248,250,252,0.65)] leading-relaxed">✓ Appt: Dr. Johnson, Mar 15, 10:30 AM. Reply CANCEL to cancel.</div>
      </div>
    </div>
  ),
  log: (
    <div className="flex flex-col pt-3 gap-1.5 px-3">
      <div className="text-[9px] text-[rgba(248,250,252,0.35)] uppercase tracking-widest font-semibold mb-1">Call Log</div>
      {[{t:'10:14',a:'Answered'},{t:'10:15',a:'Verified'},{t:'10:16',a:'Booked'},{t:'10:16',a:'SMS sent'}].map((r,i)=>(
        <div key={i} className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.05)'}}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#0284C7]"/>
          <span className="text-[9px] text-[rgba(248,250,252,0.3)] w-10 shrink-0">{r.t}</span>
          <span className="text-[10px] text-[rgba(248,250,252,0.6)]">{r.a}</span>
        </div>
      ))}
    </div>
  ),
}

const AUTOPLAY_MS = 4500

export default function ScrollStory() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = (idx: number) => {
    setDirection(idx > activeIdx || (activeIdx === steps.length - 1 && idx === 0) ? 1 : -1)
    setActiveIdx(idx)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1)
      setActiveIdx((i) => (i + 1) % steps.length)
    }, AUTOPLAY_MS)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const restartTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setDirection(1)
      setActiveIdx((i) => (i + 1) % steps.length)
    }, AUTOPLAY_MS)
  }

  const active = steps[activeIdx]

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: '#050A18' }} id="how-it-works">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{background:'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 65%)',filter:'blur(60px)'}}/>
        <div className="ray-layer-a opacity-60"/>
        <div className="spotlight-glow opacity-40"/>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7 }}
          className="text-center mb-12 px-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(14,165,233,0.2)] bg-[rgba(14,165,233,0.06)] mb-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#0EA5E9]">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            From First Ring to{' '}
            <span className="font-serif italic text-gradient-blue">Booked Appointment</span>
          </h2>
        </motion.div>

        {/* SLIDE STAGE */}
        <div
          className="relative p-1.5 rounded-[2.5rem]"
          style={{ background: 'rgba(14,165,233,0.05)', boxShadow: '0 0 0 1px rgba(14,165,233,0.12), 0 30px 80px rgba(0,0,0,0.4)' }}
          onMouseEnter={() => timerRef.current && clearInterval(timerRef.current)}
          onMouseLeave={restartTimer}
        >
          <div className="relative rounded-[calc(2.5rem-6px)] bg-[#0A1628] overflow-hidden" style={{ minHeight: 420 }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 sm:p-12 md:py-16"
              >
                {/* Phone mockup */}
                <div className="shrink-0 flex justify-center">
                  <div className="p-1.5 rounded-[2rem]" style={{ background:'rgba(14,165,233,0.05)', boxShadow:'0 0 0 1px rgba(14,165,233,0.15), 0 20px 60px rgba(14,165,233,0.1), 0 40px 80px rgba(0,0,0,0.5)' }}>
                    <div className="rounded-[calc(2rem-6px)] bg-[#0A1628] overflow-hidden shadow-[inset_0_1px_1px_rgba(56,189,248,0.08)]" style={{ width:180, minHeight:300 }}>
                      {/* Speaker */}
                      <div className="flex justify-center pt-3 pb-1">
                        <div className="w-10 h-0.5 rounded-full bg-[rgba(255,255,255,0.1)]"/>
                      </div>
                      {/* Screen */}
                      <div className="relative" style={{ minHeight:250 }}>
                        <div className="absolute inset-0 pointer-events-none">
                          <img
                            src="/Gemini_Generated_Image_a1e9r2a1e9r2a1e9.png"
                            alt=""
                            className="w-full h-full object-cover object-top opacity-35"
                          />
                          <div className="absolute inset-0" style={{
                            background: 'linear-gradient(to bottom, rgba(10,22,40,0.35) 0%, rgba(10,22,40,0.85) 55%, #0A1628 100%)',
                          }} />
                        </div>
                        <div className="absolute inset-0">
                          {phonePanels[active.id]}
                        </div>
                      </div>
                      {/* Home bar */}
                      <div className="flex justify-center pb-3 mt-2">
                        <div className="w-12 h-0.5 rounded-full bg-[rgba(255,255,255,0.08)]"/>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step info */}
                <div className="flex-1 text-center md:text-left">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-[11px] font-semibold uppercase tracking-[0.15em]"
                    style={{ background: `${active.color}14`, color: active.color, border: `1px solid ${active.color}35` }}
                  >
                    Step {activeIdx + 1} of {steps.length}
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                    <span className="text-3xl leading-none">{active.icon}</span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">{active.title}</h3>
                  </div>
                  <p className="text-base text-[rgba(248,250,252,0.5)] leading-relaxed max-w-md mx-auto md:mx-0">
                    {active.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dot navigation */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { goTo(i); restartTimer() }}
              aria-label={`Go to step ${i + 1}: ${s.title}`}
              className="rounded-full transition-all duration-500"
              style={{
                width:  i === activeIdx ? 28 : 8,
                height: 8,
                background: i === activeIdx ? active.color : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
