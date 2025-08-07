import { LoadingIcon } from '@/components/global'
import { Suspense, type JSX } from 'react'
import LazyLoad from 'react-lazyload'

export const pageSuspense = (Component: JSX.Element) => (
  <Suspense fallback={<LoadingIcon />}>{Component}</Suspense>
)

export const sectionSuspense = (Component: JSX.Element) => (
  <LazyLoad height={200} offset={100}>
    <Suspense fallback={<div className="container h-full" />}>
      {Component}
    </Suspense>
  </LazyLoad>
)
export const sidebarSuspense = (Component: JSX.Element) => (
  <LazyLoad height={200} offset={100}>
    <Suspense fallback={<div className="fixed h-screen w-1/3" />}>
      {Component}
    </Suspense>
  </LazyLoad>
)
