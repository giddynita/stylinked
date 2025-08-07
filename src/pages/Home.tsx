import AppHeader from '@/components/headers/AppHeader'
import Hero from '@/components/home/Hero'
import { nullSuspense, sectionSuspense } from '@/utils/suspense'
import { lazy } from 'react'
const CallToAction = lazy(() => import('../components/home/CallToAction'))
const Features = lazy(() => import('../components/home/Features'))
const Stats = lazy(() => import('../components/home/Stats'))
const Testimonials = lazy(() => import('../components/home/Testimonials'))
const PageHeading = lazy(() => import('../components/headings/PageHeading'))

const Home = () => {
  return (
    <>
      {nullSuspense(
        <PageHeading pageTitle="Home" pageDesc="Stylinked home page" />
      )}
      <AppHeader />
      <main>
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
