import { AccountPagesHeading } from '@/components/headings'
import { ReviewsSkeleton } from '@/components/skeletons'
import { useReviews } from '@/utils/hooks'
import type { Reviews, UserRole } from '@/utils/types'
import type { User } from '@supabase/supabase-js'
import { useSelector } from 'react-redux'
import { lazy, Suspense } from 'react'
const BuyerReviews = lazy(
  () => import('@/components/account/reviews/BuyerReviews')
)
const VendorReviews = lazy(
  () => import('@/components/account/reviews/VendorReviews')
)

function Reviews() {
  const { user, userRole }: { user: User; userRole: UserRole } = useSelector(
    (state: any) => state.userState
  )
  const pageDesc =
    userRole.role == 'buyer'
      ? "Track reviews you've given"
      : "Track reviews you've received"
  const { data: reviews, isLoading } = useReviews({
    userRole: userRole.role,
    userid: user?.id,
  })
  const roleComponents: Record<
    string,
    React.ComponentType<{ reviews: Reviews[] | undefined }>
  > = {
    buyer: BuyerReviews,
    vendor: VendorReviews,
  }

  const ReviewComponent = roleComponents[userRole.role]

  return (
    <>
      <AccountPagesHeading pageTitle="Reviews" pageDesc={pageDesc} />
      <div className="my-6">
        {isLoading ? (
          <ReviewsSkeleton />
        ) : (
          <Suspense fallback={<ReviewsSkeleton />}>
            <ReviewComponent reviews={reviews} />
          </Suspense>
        )}
      </div>
    </>
  )
}
export default Reviews
