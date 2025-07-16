import { Ratings } from '@/components/global'
import { Card, CardContent } from '@/components/ui/card'
import { formatCreatedAt } from '@/utils/format'
import type { Reviews } from '@/utils/types'
import { ExistingReviewsSkeleton } from '../skeletons'

function ProductReviews({
  reviews,
  displayProductName,
}: {
  reviews: Reviews[] | undefined
  displayProductName?: boolean
}) {
  return !reviews ? (
    <ExistingReviewsSkeleton />
  ) : (
    reviews.length > 0 && (
      <>
        <h2 className="text-xl font-bold mb-4">
          {`Customer Review ${reviews.length > 1 ? 's' : ''}`} ({reviews.length}
          )
        </h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent>
                <div className="space-y-3">
                  <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1">
                    <div className="flex items-center space-x-2 ">
                      <span className="font-medium">{review.name}</span>
                      <Ratings rating={review.rating} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      on {formatCreatedAt(review.createdat)}
                    </p>
                  </div>
                  {displayProductName && (
                    <p className="text-sm text-gray-600">
                      Purchased: {review.productname}
                    </p>
                  )}
                  <p className="text-foreground mb-3">{review.comment}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </>
    )
  )
}
export default ProductReviews
