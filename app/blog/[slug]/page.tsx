import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { blogPosts, getPostBySlug } from '@/lib/blog-posts'
import { postContent } from '@/components/blog/postContent'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const url = `https://caresynai.com/blog/${post.slug}`
  return {
    title: `${post.title} | CareSync AI Blog`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      siteName: 'CareSync AI',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const Content = postContent[post.slug]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <Nav />
      <main className="relative pt-36 pb-24 overflow-hidden" style={{ background: '#050B18' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full" style={{background:'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 65%)',filter:'blur(60px)'}}/>
        </div>

        <article className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[rgba(248,250,252,0.5)] hover:text-[#0EA5E9] transition-colors duration-300 mb-8"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M8 2L2 8M2 8H6.5M2 8V3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.15em] font-semibold text-[#0EA5E9] border border-[#0EA5E9]/25 bg-[#0EA5E9]/[0.08]">
              {post.category}
            </span>
            <span className="text-[12px] text-[rgba(248,250,252,0.35)]">{formattedDate}</span>
            <span className="text-[12px] text-[rgba(248,250,252,0.35)]">·</span>
            <span className="text-[12px] text-[rgba(248,250,252,0.35)]">{post.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F8FAFC] tracking-tight leading-tight mb-10">
            {post.title}
          </h1>

          <div className="blog-prose">
            <Content />
          </div>

          {/* FAQ section */}
          <div className="mt-16">
            <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {post.faqs.map((faq) => (
                <div key={faq.q} className="p-1.5 rounded-2xl bg-white/[0.02] ring-1 ring-white/[0.06]">
                  <div className="rounded-[calc(1rem-2px)] bg-[#0A1628] p-5">
                    <h3 className="text-sm font-bold text-[#F8FAFC] mb-2">{faq.q}</h3>
                    <p className="text-sm text-[rgba(248,250,252,0.55)] leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 p-1.5 rounded-[2rem] bg-[#0EA5E9]/[0.08] ring-1 ring-[#0EA5E9]/20">
            <div className="rounded-[calc(2rem-6px)] bg-[#0A1628] p-8 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] mb-2">
                See it working for your practice
              </h2>
              <p className="text-sm text-[rgba(248,250,252,0.5)] mb-6 max-w-md mx-auto">
                Book a short call and we&apos;ll walk through how this would connect to your
                phone line, website, and scheduling system.
              </p>
              <Link
                href="/calendar"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_2px_16px_rgba(14,165,233,0.45)]"
              >
                Book a Demo
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  )
}
