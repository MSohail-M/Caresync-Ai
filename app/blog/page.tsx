import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { blogPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Blog — AI Automation for Healthcare & Dental Practices | CareSync AI',
  description:
    'Guides on AI voice agents, chatbots, HIPAA-compliant automation, and EMR/EHR integration for dental and medical practices.',
  alternates: { canonical: 'https://caresynai.com/blog' },
  openGraph: {
    type: 'website',
    url: 'https://caresynai.com/blog',
    title: 'Blog — AI Automation for Healthcare & Dental Practices | CareSync AI',
    description:
      'Guides on AI voice agents, chatbots, HIPAA-compliant automation, and EMR/EHR integration for dental and medical practices.',
    siteName: 'CareSync AI',
  },
}

export default function BlogIndexPage() {
  return (
    <>
      <Nav />
      <main className="relative pt-36 pb-24 overflow-hidden" style={{ background: '#050B18' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full" style={{background:'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 65%)',filter:'blur(60px)'}}/>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(14,165,233,0.2)] bg-[rgba(14,165,233,0.06)] mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#0EA5E9]">Blog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8FAFC] tracking-tight max-w-2xl mx-auto">
              AI Automation Guides for{' '}
              <span className="font-serif italic text-gradient-blue">Healthcare &amp; Dental Practices</span>
            </h1>
            <p className="mt-5 text-base text-[rgba(248,250,252,0.5)] max-w-xl mx-auto leading-relaxed">
              Practical breakdowns of AI voice agents, chatbots, HIPAA compliance, and EMR/EHR
              integration — written for clinic owners and office managers, not engineers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block p-1.5 rounded-[1.75rem] bg-white/[0.02] ring-1 ring-white/[0.06] hover:ring-[#0EA5E9]/30 transition-all duration-500"
              >
                <div className="h-full rounded-[calc(1.75rem-6px)] bg-[#0A1628] p-6 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.15em] font-semibold text-[#0EA5E9] border border-[#0EA5E9]/25 bg-[#0EA5E9]/[0.08]">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-[rgba(248,250,252,0.35)]">{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold text-[#F8FAFC] leading-snug mb-2 group-hover:text-[#38BDF8] transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[rgba(248,250,252,0.45)] leading-relaxed flex-1">
                    {post.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#0EA5E9]">
                    Read article
                    <span className="w-5 h-5 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300">
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                        <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
