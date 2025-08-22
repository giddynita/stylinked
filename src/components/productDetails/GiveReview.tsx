import { Card, CardContent } from '../ui/card'
import type { SingleProduct } from '@/utils/types'
import { ReviewForm } from '../formTypes'
import { useSelector } from 'react-redux'

interface GiveReviewProp {
  product: SingleProduct | undefined
}

function GiveReview({ product }: GiveReviewProp) {
  const { user } = useSelector((state: any) => state.userState)

  return (
    <>
      {user && (
        <section>
          <h2 className="text-xl font-bold mb-4">Write a Review</h2>
          <Card>
            <CardContent>
              <ReviewForm product={product} />
            </CardContent>
          </Card>
        </section>
      )}
    </>
  )
}
export default GiveReview
