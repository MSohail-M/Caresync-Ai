import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ScrollStory from '@/components/ScrollStory'
import EHRIntegrations from '@/components/EHRIntegrations'
import Demo from '@/components/Demo'
import FrontDeskComparison from '@/components/FrontDeskComparison'
import WhySwitch from '@/components/WhySwitch'
import ComparisonTable from '@/components/ComparisonTable'
import FAQ from '@/components/FAQ'
import EHRAutomation from '@/components/EHRAutomation'
import ROI from '@/components/ROI'
import Trust from '@/components/Trust'
import ComplianceBar from '@/components/ComplianceBar'
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
      <Trust />
      <ComplianceBar />
      <FrontDeskComparison />
      <WhySwitch />
      <ComparisonTable />
      <FAQ />
      <EHRAutomation />
      <ROI />
      <CTA />
      <Footer />
      <StickyBar />
    </main>
  )
}
