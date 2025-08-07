import { LoadingIcon } from '@/components/global'
import { Suspense, type JSX } from 'react'
import LazyLoad from 'react-lazyload'

export const pageSuspense = (Component: JSX.Element) => (
  <Suspense fallback={<LoadingIcon />}>{Component}</Suspense>
)

export const sectionSuspense = (Component: JSX.Element) => (
  <LazyLoad>
    <Suspense fallback={<div className="container py-20" />}>
      {Component}
    </Suspense>
  </LazyLoad>
)
