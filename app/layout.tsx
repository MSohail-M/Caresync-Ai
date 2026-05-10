import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
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
    url: 'https://caresynai.com',
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
  themeColor: '#050B18',
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
      </head>
      <body className="bg-[#050B18] text-[#F8FAFC] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
