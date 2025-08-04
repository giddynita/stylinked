import AppHeader from '@/components/headers/AppHeader'
import { PageHeading } from '@/components/headings'
import {
  CallToAction,
  Features,
  Hero,
  Stats,
  Testimonials,
} from '@/components/home'

const Home = () => {
  return (
    <>
      <AppHeader />
      <main>
        <div className="sr-only">
          <PageHeading pageTitle="Home" pageDesc="Stylinked home page" />
        </div>
        <Hero />
        <Stats />
        <Features />
        <Testimonials />
        <CallToAction />
      </main>
    </>
  )
}

export default Home
