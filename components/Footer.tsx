'use client'

import { motion } from 'framer-motion'

const footerLinks = {
  Product: ['Features', 'How It Works', 'Pricing', 'Demo'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'HIPAA Notice'],
}

const linkHrefOverrides: Record<string, string> = {
  Blog: '/blog',
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-16 overflow-hidden">
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
              <span className="text-base font-bold text-[#F8FAFC]">CareSync AI</span>
            </div>
            <p className="text-sm text-[rgba(248,250,252,0.45)] leading-relaxed mb-6">
              AI Front Desk for Modern Clinics
            </p>
            <p className="text-xs text-[rgba(248,250,252,0.3)] leading-relaxed">
              Helping dental and primary care clinics answer every call, book more appointments, and deliver better patient experiences.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-[rgba(248,250,252,0.4)] uppercase tracking-[0.15em] mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={linkHrefOverrides[link] ?? '#'}
                      className="text-sm text-[rgba(248,250,252,0.55)] hover:text-[#F8FAFC] transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[rgba(248,250,252,0.35)]">
            © 2026 CareSync AI. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {/* Twitter/X */}
            <a
              href="#"
              aria-label="CareSync AI on X / Twitter"
              className="w-8 h-8 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/15 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M9.916.5h2.069L7.69 5.62 13 12.5H8.558L5.165 8.07 1.27 12.5H-.8l4.62-5.483L-1 .5h4.55l3.067 4.054L9.916.5zm-.727 10.8h1.146L3.871 1.672H2.64L9.19 11.3z" fill="rgba(248,250,252,0.5)"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              aria-label="CareSync AI on LinkedIn"
              className="w-8 h-8 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/15 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect x="1" y="1" width="11" height="11" rx="2" stroke="rgba(248,250,252,0.5)" strokeWidth="1"/>
                <path d="M3 5.5V10" stroke="rgba(248,250,252,0.5)" strokeWidth="1" strokeLinecap="round"/>
                <circle cx="3" cy="3.5" r="0.7" fill="rgba(248,250,252,0.5)"/>
                <path d="M6 10V7.5c0-1.1.9-2 2-2s2 .9 2 2V10" stroke="rgba(248,250,252,0.5)" strokeWidth="1" strokeLinecap="round"/>
                <path d="M6 5.5V10" stroke="rgba(248,250,252,0.5)" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
