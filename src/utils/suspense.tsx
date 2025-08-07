import { LoadingIcon } from '@/components/global'
import { Suspense, type JSX } from 'react'
import LazyLoad from 'react-lazyload'

export const layoutSuspense = (Component: JSX.Element) => (
  <LazyLoad>{Component}</LazyLoad>
)
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

export const nullSuspense = (Component: JSX.Element) => (
  <Suspense fallback={null}>{Component}</Suspense>
)
export const sidebarSuspense = (Component: JSX.Element) => (
  <Suspense fallback={<div className="w-1/3 fixed h-screen" />}>
    {Component}
  </Suspense>
)
