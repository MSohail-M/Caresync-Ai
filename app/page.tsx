import SmoothScroll from '@/components/SmoothScroll'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ScrollStory from '@/components/ScrollStory'
import Problems from '@/components/Problems'
import Solution from '@/components/Solution'
import Workflow from '@/components/Workflow'
import UseCases from '@/components/UseCases'
import ROI from '@/components/ROI'
import Demo from '@/components/Demo'
import Trust from '@/components/Trust'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

function Divider() {
  return <div className="section-glow-divider" />
}

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Nav />
        <Hero />
        <Divider />
        <ScrollStory />
        <Divider />
        <Problems />
        <Divider />
        <Solution />
        <Divider />
        <Workflow />
        <Divider />
        <UseCases />
        <Divider />
        <ROI />
        <Divider />
        <Demo />
        <Divider />
        <Trust />
        <Divider />
        <Pricing />
        <CTA />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
