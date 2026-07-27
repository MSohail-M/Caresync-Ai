import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'
import { useCases, getUseCase } from '@/lib/useCases'

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const uc = getUseCase(params.slug)
  if (!uc) return { title: 'Use Case — Vocryn' }
  return {
    title: `${uc.heading} — Casey by Vocryn`,
    description: uc.blurb,
  }
}

export default function UseCasePage({ params }: { params: { slug: string } }) {
  const uc = getUseCase(params.slug)
  if (!uc) notFound()

  const idx = useCases.findIndex((u) => u.slug === uc.slug)
  const next = useCases[(idx + 1) % useCases.length]

  return (
    <main>
      <Nav />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-32 pb-16"
        style={{ background: `linear-gradient(180deg, #FFFFFF 0%, ${uc.bg} 100%)` }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${uc.color}12 0%, transparent 70%)` }}
          aria-hidden
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/#meet-casey"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold mb-6 transition-opacity hover:opacity-70"
            style={{ color: uc.color }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            All Casey capabilities
          </Link>

          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-bold mb-5"
            style={{ background: `${uc.color}12`, color: uc.color, border: `1px solid ${uc.color}25` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: uc.color }} />
            Casey · AI Receptionist
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-[1.05] mb-5">
            {uc.heading}
          </h1>
          <p className="text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            {uc.overview}
          </p>
        </div>
      </section>

      {/* ── Video placeholder ────────────────────────────── */}
      <section className="relative py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative aspect-video rounded-3xl border overflow-hidden flex flex-col items-center justify-center"
            style={{
              background: `linear-gradient(160deg, ${uc.bg}, #FFFFFF)`,
              borderColor: uc.border,
              boxShadow: `0 20px 60px ${uc.color}14`,
            }}
          >
            {/* faint grid */}
            <div
              className="absolute inset-0 opacity-[0.5] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(${uc.color}0c 1px, transparent 1px), linear-gradient(90deg, ${uc.color}0c 1px, transparent 1px)`,
                backgroundSize: '44px 44px',
              }}
              aria-hidden
            />
            <div className="relative flex flex-col items-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{ background: `${uc.color}18`, boxShadow: `0 8px 32px ${uc.color}25` }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill={uc.color}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-[15px] font-bold text-[#0F172A]">Watch Casey handle {uc.heading.toLowerCase()}</p>
              <p className="text-[13px] text-[#94A3B8] mt-1">Demo video coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] tracking-tight mb-8">
            What Casey does
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {uc.features.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl bg-white border border-[rgba(15,23,42,0.08)] p-5"
                style={{ boxShadow: '0 2px 14px rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5" style={{ background: `${uc.color}15` }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={uc.color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-[#0F172A] mb-1">{f.label}</p>
                    <p className="text-[13.5px] text-[#64748B] leading-relaxed">{f.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="py-4 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl border p-6 md:p-9"
            style={{ background: uc.bg, borderColor: uc.border }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] tracking-tight mb-8">
              How it works
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {uc.steps.map((step, i) => (
                <div key={step} className="relative">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[14px] font-bold text-white mb-3"
                    style={{ background: uc.color, boxShadow: `0 4px 14px ${uc.color}40` }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-[14px] font-semibold text-[#334155] leading-snug">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
            See Casey handle this for your clinic
          </h2>
          <p className="text-base text-[#64748B] mb-8 max-w-xl mx-auto leading-relaxed">
            Book a free demo and watch Casey answer, book, and verify — live, on your own workflows.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/calendar"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-bold text-white transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 60%, #0D9488 100%)', boxShadow: '0 4px 20px rgba(16,185,129,0.3)' }}
            >
              Book a Free Demo
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 11L11 3M11 3H5.5M11 3V8.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <Link
              href={`/use-cases/${next.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-bold text-[#334155] bg-white border border-[rgba(15,23,42,0.12)] transition-all duration-300 hover:border-[rgba(15,23,42,0.25)] active:scale-[0.98]"
            >
              Next: {next.heading}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <StickyBar />
    </main>
  )
}
