import { activeConfig } from '@/configs/active'
import { SectionKey } from '@/lib/client-config'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Comparison from '@/components/Comparison'
import About from '@/components/About'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

const SECTION_COMPONENTS: Record<SectionKey, React.ComponentType> = {
  hero: Hero,
  services: Services,
  comparison: Comparison,
  about: About,
  gallery: Gallery,
  testimonials: Testimonials,
  contact: Contact,
}

export default function HomePage() {
  return (
    <>
      <Nav />
      {activeConfig.sectionOrder.map((key) => {
        const Section = SECTION_COMPONENTS[key]
        return <Section key={key} />
      })}
      <Footer />
    </>
  )
}
