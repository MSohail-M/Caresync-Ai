import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import MeetAlice from '@/components/MeetAlice'
import ScrollStory from '@/components/ScrollStory'
import EHRIntegrations from '@/components/EHRIntegrations'
import Demo from '@/components/Demo'
import FrontDeskComparison from '@/components/FrontDeskComparison'
import WhySwitch from '@/components/WhySwitch'
import ComparisonTable from '@/components/ComparisonTable'
import EHRAutomation from '@/components/EHRAutomation'
import ROI from '@/components/ROI'
import Trust from '@/components/Trust'
import ComplianceBar from '@/components/ComplianceBar'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <MeetAlice />
      <EHRIntegrations />
      <ScrollStory />
      <Demo />
      <Trust />
      <ComplianceBar />
      <FrontDeskComparison />
      <WhySwitch />
      <ComparisonTable />
      <EHRAutomation />
      <ROI />
      <FAQ />
      <Footer />
      <StickyBar />
    </main>
  )
}
