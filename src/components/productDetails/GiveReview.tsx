import { Card, CardContent } from '../ui/card'
import type { SingleProduct } from '@/utils/types'
import { useSelector } from 'react-redux'
import { lazy } from 'react'
import { formSuspense } from '@/utils/suspense'

interface GiveReviewProp {
  product: SingleProduct | undefined
}
const ReviewForm = lazy(() => import('@/components/formTypes/ReviewForm'))

function GiveReview({ product }: GiveReviewProp) {
  const { user } = useSelector((state: any) => state.userState)

  return (
    <>
      {user && (
        <section>
          <h2 className="text-xl font-bold mb-4">Write a Review</h2>
          <Card>
            <CardContent>
              {formSuspense(<ReviewForm product={product} />)}
            </CardContent>
          </Card>
        </section>
      )}
    </>
  )
}
export default GiveReview
