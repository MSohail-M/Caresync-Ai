import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ScrollStory from '@/components/ScrollStory'
import EHRIntegrations from '@/components/EHRIntegrations'
import Demo from '@/components/Demo'
import FrontDeskComparison from '@/components/FrontDeskComparison'
import EHRAutomation from '@/components/EHRAutomation'
import ROI from '@/components/ROI'
import Trust from '@/components/Trust'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <EHRIntegrations />
      <ScrollStory />
      <Demo />
      <FrontDeskComparison />
      <EHRAutomation />
      <ROI />
      <Trust />
      <CTA />
      <Footer />
      <StickyBar />
    </main>
  )
}
