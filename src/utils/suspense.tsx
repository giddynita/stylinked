import { LoadingIcon } from '@/components/global'
import { Skeleton } from '@/components/ui/skeleton'
import { Suspense, type JSX } from 'react'

export const pageSuspense = (Component: JSX.Element) => (
  <Suspense fallback={<LoadingIcon />}>{Component}</Suspense>
)

export const sectionSuspense = (Component: JSX.Element) => (
  <Suspense
    fallback={
      <div className="container">
        <Skeleton className=" w-full h-40 my-10" />
      </div>
    }
  >
    {Component}
  </Suspense>
)
