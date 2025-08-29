import { Card, CardContent } from '../ui/card'
import type { SingleProduct } from '@/utils/types'
import { useSelector } from 'react-redux'
import { ReviewForm } from '../formTypes'
import { useOrderExists } from '@/utils/hooks'
import { ReviewsFormSkeleton } from '../skeletons'

interface GiveReviewProp {
  product: SingleProduct | undefined
}
function GiveReview({ product }: GiveReviewProp) {
  const { user } = useSelector((state: any) => state.userState)
  const { data: orderExists, isLoading: orderExistsLoading } = useOrderExists({
    productId: product?.id,
    userEmail: user?.email,
  })
  return (
    <>
      {orderExistsLoading ? (
        <ReviewsFormSkeleton />
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Write a Review</h2>
          <Card>
            <CardContent>
              <ReviewForm product={product} orderExists={orderExists} />
            </CardContent>
          </Card>
        </>
      )}
    </>
  )
}
export default GiveReview
