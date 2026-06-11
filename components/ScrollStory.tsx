'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, AnimatePresence, useMotionValueEvent } from 'framer-motion'

const steps = [
  { id:'ring',   icon:'📞', title:'Patient Calls',         desc:'A patient dials your clinic number at any hour of the day or night.',                                       color:'#22C55E', angle: -90  },
  { id:'ai',     icon:'🤖', title:'AI Answers Naturally',  desc:'CareSync AI picks up within 2 rings with a warm, clinic-trained voice. No hold music.',                    color:'#4ADE80', angle: -30  },
  { id:'verify', icon:'✅', title:'Patient Verified',      desc:"AI collects name, DOB, and phone to confirm the patient's identity — instantly.",                           color:'#16A34A', angle:  30  },
  { id:'book',   icon:'📅', title:'Appointment Booked',    desc:'AI checks real-time availability and books directly into your calendar. No staff needed.',                  color:'#22C55E', angle:  90  },
  { id:'sms',    icon:'💬', title:'Confirmation SMS Sent', desc:'Patient gets an instant text with appointment details, address, and prep instructions.',                    color:'#4ADE80', angle: 150  },
  { id:'log',    icon:'📋', title:'Everything Logged',     desc:'Every call is transcribed, summarized, and logged in your dashboard for staff review.',                    color:'#16A34A', angle: 210  },
]

// Phone screen content per step
const phonePanels: Record<string, React.ReactNode> = {
  ring: (
    <div className="flex flex-col items-center pt-6 px-3">
      <div className="text-[9px] text-[rgba(248,250,252,0.4)] uppercase tracking-widest mb-2">Incoming Call</div>
      <div className="relative flex items-center justify-center w-14 h-14 my-3">
        <span className="absolute inset-0 rounded-full border border-[#22C55E]/30 animate-pulse-ring" />
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{background:'rgba(34,197,94,0.12)',border:'1px solid rgba(34,197,94,0.2)'}}>👩‍⚕️</div>
      </div>
      <div className="text-sm font-bold text-[#F8FAFC] mb-0.5">Maria Chen</div>
      <div className="text-xs text-[rgba(248,250,252,0.4)]">Calling your clinic...</div>
    </div>
  ),
  ai: (
    <div className="flex flex-col items-center pt-5 px-3">
      <div className="text-[9px] text-[#22C55E] uppercase tracking-widest font-semibold mb-2">AI Answering</div>
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg mb-3" style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.18)'}}>🤖</div>
      <div className="flex items-center gap-0.5 h-8">
        {[0.4,0.8,1,0.7,0.5,0.9,0.6].map((h,i)=>(
          <div key={i} className="w-1 rounded-full" style={{height:`${h*28}px`,background:`rgba(34,197,94,${0.4+h*0.6})`,animation:`waveform ${0.6+i*0.08}s ease-in-out infinite ${i*0.1}s`}}/>
        ))}
      </div>
      <div className="text-[10px] text-[rgba(248,250,252,0.4)] mt-2 text-center">&ldquo;How can I help?&rdquo;</div>
    </div>
  ),
  verify: (
    <div className="flex flex-col pt-4 gap-1.5 px-3">
      <div className="text-[9px] text-[#16A34A] uppercase tracking-widest font-semibold mb-1">Verifying</div>
      {['Maria Chen','Apr 12, 1988','✓ Confirmed'].map((item,i)=>(
        <div key={i} className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl" style={{background:'rgba(22,163,74,0.08)',border:'1px solid rgba(22,163,74,0.15)'}}>
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2" stroke="#16A34A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="text-[10px] text-[rgba(248,250,252,0.7)]">{item}</span>
        </div>
      ))}
    </div>
  ),
  book: (
    <div className="flex flex-col pt-4 px-3">
      <div className="text-[9px] text-[#22C55E] uppercase tracking-widest font-semibold mb-2">Booking...</div>
      <div className="p-2.5 rounded-xl" style={{background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.15)'}}>
        <div className="text-[9px] text-[rgba(248,250,252,0.35)] mb-1.5 uppercase tracking-widest">New Appointment</div>
        <div className="text-xs font-semibold text-[#F8FAFC]">Dr. Johnson</div>
        <div className="text-[10px] text-[rgba(248,250,252,0.5)] mt-0.5">March 15 · 10:30 AM</div>
        <div className="mt-1.5 flex items-center gap-1">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="text-[9px] text-[#22C55E] font-semibold">Confirmed</span>
        </div>
      </div>
    </div>
  ),
  sms: (
    <div className="flex flex-col pt-4 px-3">
      <div className="text-[9px] text-[#4ADE80] uppercase tracking-widest font-semibold mb-2">SMS Sent ✓</div>
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
          <div className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"/>
          <span className="text-[9px] text-[rgba(248,250,252,0.3)] w-10 shrink-0">{r.t}</span>
          <span className="text-[10px] text-[rgba(248,250,252,0.6)]">{r.a}</span>
        </div>
      ))}
    </div>
  ),
}

// Orbit radius responsive values (in px — we'll use CSS vars)
const ORBIT_R = 200  // desktop orbit radius

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const [activeIdx, setActiveIdx] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(Math.floor(v * steps.length), steps.length - 1)
    if (next !== activeIdx) setActiveIdx(next)
  })

  const active = steps[activeIdx]

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${steps.length * 100}vh`, background: '#040D06' }}
      id="how-it-works"
    >
      {/* ══ STICKY ORBIT VIEWPORT ══ */}
      <div className="sticky top-0 min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{background:'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 65%)',filter:'blur(60px)'}}/>
          <div className="ray-layer-a opacity-60"/>
          <div className="spotlight-glow opacity-40"/>
        </div>

        {/* Section header */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7 }}
          className="relative z-10 text-center mb-8 px-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(34,197,94,0.2)] bg-[rgba(34,197,94,0.06)] mb-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#22C55E]">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            From First Ring to{' '}
            <span className="font-serif italic text-gradient-green">Booked Appointment</span>
          </h2>
        </motion.div>

        {/* ══ ORBIT SYSTEM ══ */}
        <div className="relative flex items-center justify-center" style={{ width: ORBIT_R * 2 + 240, height: ORBIT_R * 2 + 240 }}>

          {/* Orbit ring — dashed circle */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${ORBIT_R*2+240} ${ORBIT_R*2+240}`}
          >
            <circle
              cx={(ORBIT_R*2+240)/2}
              cy={(ORBIT_R*2+240)/2}
              r={ORBIT_R}
              fill="none"
              stroke="rgba(34,197,94,0.12)"
              strokeWidth="1"
              strokeDasharray="6 8"
            />
            {/* Rotating glow dot on the orbit ring */}
            {steps.map((s, i) => {
              const rad = ((s.angle - 90) * Math.PI) / 180
              const cx = (ORBIT_R*2+240)/2 + ORBIT_R * Math.cos(rad)
              const cy = (ORBIT_R*2+240)/2 + ORBIT_R * Math.sin(rad)
              const isActive = i === activeIdx
              return (
                <circle
                  key={i}
                  cx={cx} cy={cy} r={isActive ? 6 : 3}
                  fill={isActive ? s.color : 'rgba(34,197,94,0.25)'}
                  style={{ filter: isActive ? `drop-shadow(0 0 8px ${s.color})` : 'none', transition: 'all 0.5s ease' }}
                />
              )
            })}
            {/* Line from center to active step dot */}
            {(() => {
              const s = steps[activeIdx]
              const rad = ((s.angle - 90) * Math.PI) / 180
              const cx = (ORBIT_R*2+240)/2 + ORBIT_R * Math.cos(rad)
              const cy = (ORBIT_R*2+240)/2 + ORBIT_R * Math.sin(rad)
              return (
                <line
                  x1={(ORBIT_R*2+240)/2} y1={(ORBIT_R*2+240)/2}
                  x2={cx} y2={cy}
                  stroke={`${s.color}30`}
                  strokeWidth="1"
                  strokeDasharray="3 5"
                />
              )
            })()}
          </svg>

          {/* CENTER: Phone mockup */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex:5 }}>
            <div className="p-1.5 rounded-[2rem]" style={{ background:'rgba(34,197,94,0.05)', boxShadow:`0 0 0 1px rgba(34,197,94,0.15), 0 20px 60px rgba(34,197,94,0.1), 0 40px 80px rgba(0,0,0,0.5)` }}>
              <div className="rounded-[calc(2rem-6px)] bg-[#071209] overflow-hidden shadow-[inset_0_1px_1px_rgba(74,222,128,0.08)]" style={{ width:180, minHeight:300 }}>
                {/* Speaker */}
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-10 h-0.5 rounded-full bg-[rgba(255,255,255,0.1)]"/>
                </div>
                {/* Screen */}
                <div className="relative" style={{ minHeight:250 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id}
                      initial={{ opacity:0, scale:0.95 }}
                      animate={{ opacity:1, scale:1 }}
                      exit={{ opacity:0, scale:0.95 }}
                      transition={{ duration:0.4, ease:[0.32,0.72,0,1] }}
                      className="absolute inset-0"
                    >
                      {phonePanels[active.id]}
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Home bar */}
                <div className="flex justify-center pb-3 mt-2">
                  <div className="w-12 h-0.5 rounded-full bg-[rgba(255,255,255,0.08)]"/>
                </div>
              </div>
            </div>
          </div>

          {/* ORBIT STEP CARDS — positioned around the ring */}
          {steps.map((s, i) => {
            const rad    = ((s.angle - 90) * Math.PI) / 180
            const cx     = (ORBIT_R*2+240)/2 + ORBIT_R * Math.cos(rad)
            const cy     = (ORBIT_R*2+240)/2 + ORBIT_R * Math.sin(rad)
            const isActive = i === activeIdx
            // Card anchor: shift so card centers on the orbit point
            const cardW  = 164
            const cardH  = 80
            const left   = cx - cardW / 2
            const top    = cy - cardH / 2

            return (
              <motion.div
                key={s.id}
                animate={{
                  scale:   isActive ? 1   : 0.82,
                  opacity: isActive ? 1   : i === (activeIdx + 1) % steps.length || i === (activeIdx - 1 + steps.length) % steps.length ? 0.45 : 0.2,
                  z:       isActive ? 20  : 0,
                }}
                transition={{ duration:0.6, ease:[0.32,0.72,0,1] }}
                style={{
                  position: 'absolute',
                  left, top,
                  width:  cardW,
                  zIndex: isActive ? 10 : 4,
                  pointerEvents: 'none',
                }}
              >
                <div
                  className="p-1 rounded-2xl transition-all duration-500"
                  style={{
                    background: isActive ? `${s.color}12` : 'rgba(255,255,255,0.03)',
                    boxShadow:  isActive ? `0 0 0 1px ${s.color}35, 0 8px 24px ${s.color}20` : '0 0 0 1px rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="rounded-[calc(1rem-4px)] bg-[#071209] px-3 py-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base leading-none">{s.icon}</span>
                      <span
                        className="text-[11px] font-bold leading-tight"
                        style={{ color: isActive ? s.color : 'rgba(248,250,252,0.5)' }}
                      >
                        {i + 1}. {s.title}
                      </span>
                    </div>
                    {isActive && (
                      <motion.p
                        initial={{ opacity:0, height:0 }}
                        animate={{ opacity:1, height:'auto' }}
                        transition={{ duration:0.4 }}
                        className="text-[10px] text-[rgba(248,250,252,0.5)] leading-relaxed"
                      >
                        {s.desc}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Step counter + scroll hint */}
        <div className="relative z-10 mt-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-500"
                style={{
                  width:  i === activeIdx ? 20 : 6,
                  height: 6,
                  background: i === activeIdx ? active.color : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
          <span className="text-[11px] text-[rgba(248,250,252,0.3)] font-medium">
            Step {activeIdx + 1} of {steps.length} — scroll to continue
          </span>
        </div>

        {/* Mobile fallback: linear steps (shown below orbit on small screens) */}
        <div className="lg:hidden w-full max-w-sm mx-auto px-4 mt-6">
          <div className="p-1.5 rounded-2xl" style={{background:`${active.color}10`,boxShadow:`0 0 0 1px ${active.color}25`}}>
            <div className="rounded-[calc(1rem)] bg-[#071209] px-4 py-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xl">{active.icon}</span>
                <span className="text-sm font-bold" style={{color:active.color}}>{activeIdx+1}. {active.title}</span>
              </div>
              <p className="text-xs text-[rgba(248,250,252,0.5)] leading-relaxed">{active.desc}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
