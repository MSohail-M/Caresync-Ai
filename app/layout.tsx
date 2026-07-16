import type { Metadata, Viewport } from 'next'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'CareSync AI — AI Front Desk for Dental & Primary Care Clinics',
  description:
    'AI voice agent that answers calls, books appointments, and follows up with patients 24/7. Reduce missed calls and staff workload.',
  keywords: [
    'AI voice agent',
    'clinic front desk',
    'dental AI',
    'primary care AI',
    'appointment booking',
    'healthcare automation',
    'HIPAA-aware',
    'missed calls',
  ],
  authors: [{ name: 'CareSync AI' }],
  creator: 'CareSync AI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'CareSync AI — AI Front Desk for Dental & Primary Care Clinics',
    description:
      'AI voice agent that answers calls, books appointments, and follows up with patients 24/7.',
    siteName: 'CareSync AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CareSync AI — AI Front Desk for Clinics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareSync AI — AI Front Desk for Dental & Primary Care Clinics',
    description:
      'AI voice agent that answers calls, books appointments, and follows up with patients 24/7.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#10B981',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap"
          rel="stylesheet"
        />
        {/* gtag must live in <head>: Search Console GA-based ownership verification rejects body placement */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9S3J3YR9F0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9S3J3YR9F0');
          `,
          }}
        />
      </head>
      <body className="bg-white text-[#0F172A] antialiased overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'CareSync AI',
              url: SITE_URL,
              logo: `${SITE_URL}/logo1.jpeg`,
              description:
                'AI front desk for dental and primary care clinics — voice agents and chatbots that answer every call, book appointments, and follow up with patients 24/7.',
            }),
          }}
        />
      </body>
    </html>
  )
}
