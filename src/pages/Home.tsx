import AppHeader from '@/components/headers/AppHeader'
import { PageHeading } from '@/components/headings'
import { sectionSuspense } from '@/utils/suspense'
import { lazy } from 'react'
const CallToAction = lazy(() => import('../components/home/CallToAction'))
const Features = lazy(() => import('../components/home/Features'))
const Hero = lazy(() => import('../components/home/Hero'))
const Stats = lazy(() => import('../components/home/Stats'))
const Testimonials = lazy(() => import('../components/home/CallToAction'))

const Home = () => {
  return (
    <>
      <AppHeader />
      <main>
        <PageHeading pageTitle="Home" pageDesc="Stylinked home page" />
        {sectionSuspense(<Hero />)}
        {sectionSuspense(<Stats />)}
        {sectionSuspense(<Features />)}
        {sectionSuspense(<Testimonials />)}
        {sectionSuspense(<CallToAction />)}
      </main>
    </>
  )
}

export default Home
