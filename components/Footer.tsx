'use client'

import { motion } from 'framer-motion'

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: 'Services',     href: '/services' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Live Demo',    href: '/#demo' },
    { label: 'Book a Demo',  href: '/calendar' },
  ],
  Company: [
    { label: 'Blog',    href: '/blog' },
    { label: 'Contact', href: '/calendar' },
  ],
  Legal: [
    { label: 'Privacy Policy',   href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'HIPAA Notice',     href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(15,23,42,0.08)] py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(34,197,94,0.03) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="relative w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-[#16A34A]" />
                <span className="absolute inset-0 rounded-full bg-[#16A34A] animate-pulse" />
              </div>
              <span className="text-base font-bold text-[#0F172A]">Vocryn AI</span>
            </div>
            <p className="text-sm text-[#64748B] leading-relaxed mb-5">
              AI Front Desk for Modern Clinics
            </p>
            <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
              Helping dental and primary care clinics answer every call, book more appointments, and deliver better patient experiences.
            </p>

            {/* Contact buttons */}
            <div className="flex flex-col gap-2">
              <a
                href="tel:+15717034510"
                className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-300 hover:scale-[1.02]"
                style={{ borderColor: 'rgba(15,23,42,0.1)', background: 'rgba(15,23,42,0.03)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,23,42,0.2)'; (e.currentTarget as HTMLElement).style.background = 'rgba(15,23,42,0.06)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,23,42,0.1)'; (e.currentTarget as HTMLElement).style.background = 'rgba(15,23,42,0.03)' }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(15,23,42,0.07)' }}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M3.5 1.5h2l1.2 3.2-1.4 1.4a8 8 0 004.6 4.6l1.4-1.4 3.2 1.2v2c0 .8-.7 1.5-1.5 1.5C7.5 14 2 8.5 2 3c0-.8.7-1.5 1.5-1.5z" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-[#94A3B8] font-medium leading-none mb-0.5">Call us</p>
                  <p className="text-[13px] font-semibold text-[#334155]">1-571-703-4510</p>
                </div>
              </a>

              <a
                href="mailto:care@vocryn.com"
                className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-300 hover:scale-[1.02]"
                style={{ borderColor: 'rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.04)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.4)'; (e.currentTarget as HTMLElement).style.background = 'rgba(16,185,129,0.09)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.2)'; (e.currentTarget as HTMLElement).style.background = 'rgba(16,185,129,0.04)' }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(16,185,129,0.12)' }}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="#059669" strokeWidth="1.2"/>
                    <path d="M1 5l7 5 7-5" stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-[#059669] font-medium leading-none mb-0.5 opacity-70">Email us</p>
                  <p className="text-[13px] font-semibold text-[#059669]">care@vocryn.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-[#64748B] uppercase tracking-[0.15em] mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-[#475569] hover:text-[#059669] transition-colors duration-300"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[rgba(15,23,42,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#94A3B8]">
            © 2026 Vocryn AI. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@vocrynai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vocryn AI on TikTok"
              className="w-8 h-8 rounded-lg border border-[rgba(15,23,42,0.1)] bg-[rgba(15,23,42,0.03)] flex items-center justify-center hover:bg-[rgba(15,23,42,0.08)] hover:border-[rgba(15,23,42,0.2)] transition-all duration-300"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#94A3B8">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.72a4.85 4.85 0 01-1.01-.03z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@Vocrynai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vocryn AI on YouTube"
              className="w-8 h-8 rounded-lg border border-[rgba(15,23,42,0.1)] bg-[rgba(15,23,42,0.03)] flex items-center justify-center hover:bg-[rgba(255,0,0,0.06)] hover:border-[rgba(255,0,0,0.2)] transition-all duration-300"
            >
              <svg width="14" height="10" viewBox="0 0 24 17" fill="none">
                <path d="M23.5 2.7S23.2 1 22.5.3C21.7-.5 20.8-.5 20.4-.5 17 .7 12 .7 12 .7s-5 0-8.4-.2C3.2.5 2.3.5 1.5 1.3.8 2 .5 2.7.5 2.7S0 4.8 0 6.8v1.9c0 2 .5 4 .5 4S.8 14.5 1.5 15.2c.8.8 1.9.8 2.4.9C5.5 16.3 12 16.3 12 16.3s5 0 8.4-.2c.4 0 1.3 0 2.1-.8.7-.7 1-1.5 1-1.5s.5-2 .5-4V6.8c0-2-.5-4.1-.5-4.1zm-14 8.1V3.7l6.5 3.5-6.5 3.6z" fill="#94A3B8"/>
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/Vocrynai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vocryn AI on X"
              className="w-8 h-8 rounded-lg border border-[rgba(15,23,42,0.1)] bg-[rgba(15,23,42,0.03)] flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-105"
            >
              <svg width="12" height="12" viewBox="0 0 13 13" fill="#0F172A">
                <path d="M9.916.5h2.069L7.69 5.62 13 12.5H8.558L5.165 8.07 1.27 12.5H-.8l4.62-5.483L-1 .5h4.55l3.067 4.054L9.916.5zm-.727 10.8h1.146L3.871 1.672H2.64L9.19 11.3z"/>
              </svg>
            </a>

            {/* Reddit */}
            <a
              href="#"
              aria-label="Vocryn AI on Reddit (coming soon)"
              className="w-8 h-8 rounded-lg border border-[rgba(15,23,42,0.1)] bg-[rgba(15,23,42,0.03)] flex items-center justify-center opacity-50 cursor-not-allowed transition-all duration-300"
              onClick={e => e.preventDefault()}
            >
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="10" fill="#94A3B8" opacity="0.5"/>
                <path d="M16.67 10a1.46 1.46 0 00-2.47-1 7.12 7.12 0 00-3.85-1.23l.65-3.08 2.13.45a1 1 0 101 1 1 1 0 00-1-.88l-2.38-.5a.27.27 0 00-.32.2l-.73 3.43a7.14 7.14 0 00-3.89 1.23 1.46 1.46 0 10-1.61 2.39 2.87 2.87 0 000 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a2.87 2.87 0 000-.44 1.46 1.46 0 00.71-1.01zM7.27 11a1 1 0 111 1 1 1 0 01-1-1zm5.58 2.71a3.58 3.58 0 01-2.85.86 3.58 3.58 0 01-2.85-.86.22.22 0 01.31-.31 3.17 3.17 0 002.54.71 3.17 3.17 0 002.54-.71.22.22 0 01.31.31zm-.17-1.71a1 1 0 111-1 1 1 0 01-1 1z" fill="white"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
