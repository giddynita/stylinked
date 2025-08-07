import AppHeader from '@/components/headers/AppHeader'
import { PageHeading } from '@/components/headings'
import Hero from '@/components/home/Hero'
import { sectionSuspense } from '@/utils/suspense'
import { lazy } from 'react'
const CallToAction = lazy(() => import('../components/home/CallToAction'))
const Features = lazy(() => import('../components/home/Features'))
const Stats = lazy(() => import('../components/home/Stats'))
const Testimonials = lazy(() => import('../components/home/Testimonials'))

const Home = () => {
  return (
    <>
      <AppHeader />
      <main>
        <PageHeading pageTitle="Home" pageDesc="Stylinked home page" />
        <Hero />
        {sectionSuspense(<Stats />)}
        {sectionSuspense(<Features />)}
        {sectionSuspense(<Testimonials />)}
        {sectionSuspense(<CallToAction />)}
      </main>
    </>
  )
}

export default Home
