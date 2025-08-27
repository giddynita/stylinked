import { AccountPagesHeading } from '@/components/headings'
import { ReviewsSkeleton } from '@/components/skeletons'
import { useReviews } from '@/utils/hooks'
import type { Reviews, UserRole } from '@/utils/types'
import type { User } from '@supabase/supabase-js'
import { useSelector } from 'react-redux'
import { lazy } from 'react'
import { accountPageSuspense, nullSuspense } from '@/utils/suspense'
import { Star } from 'lucide-react'

const BuyerReviews = lazy(
  () => import('@/components/account/reviews/BuyerReviews')
)
const VendorReviews = lazy(
  () => import('@/components/account/reviews/VendorReviews')
)
const NoResult = lazy(() => import('@/components/global/NoResult'))

function Reviews() {
  const { user, userRole }: { user: User; userRole: UserRole } = useSelector(
    (state: any) => state.userState
  )
  const rolePageDesc: Record<string, string> = {
    buyer: "Track reviews you've given",
    vendor: "Track reviews you've received",
  }
  const pageDesc = rolePageDesc[userRole.role]
  const {
    data: reviews,
    isLoading,
    isError,
  } = useReviews({
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
          <>
            {accountPageSuspense(<ReviewComponent reviews={reviews} />)}
            {nullSuspense(
              <>
                {reviews?.length == 0 && (
                  <NoResult
                    isError={isError}
                    errorText="your reviews"
                    icon={Star}
                    text="No reviews found."
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}
export default Reviews
