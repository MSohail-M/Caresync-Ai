import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ScrollStory from '@/components/ScrollStory'
import Demo from '@/components/Demo'
import FrontDeskComparison from '@/components/FrontDeskComparison'
import EHRAutomation from '@/components/EHRAutomation'
import ROI from '@/components/ROI'
import Trust from '@/components/Trust'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

function Divider() {
  return (
    <div className="relative h-px mx-auto max-w-5xl">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Divider />
      <ScrollStory />
      <Demo />
      <Divider />
      <FrontDeskComparison />
      <Divider />
      <EHRAutomation />
      <Divider />
      <ROI />
      <Divider />
      <Trust />
      <Divider />
      <CTA />
      <Footer />
    </main>
  )
}
