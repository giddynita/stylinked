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
        <PageHeading pageTitle="Home" pageDesc="Stylinked home page" />
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
