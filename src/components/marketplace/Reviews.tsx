import { averageRating } from '@/utils/format'
import { getReviews } from '@/utils/loader'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '../ui/skeleton'
import { Star } from 'lucide-react'

function Reviews({ productId }: { productId: string }) {
  const queryReviews = {
    queryKey: ['reviews'],
    queryFn: () => getReviews(productId),
  }
  const { data: reviews, isLoading: productReviewsLoading } =
    useQuery(queryReviews)

  const rating = averageRating(reviews)

  const totalReviews = reviews?.length

  return (
    <div className="flex items-center space-x-1 h-6">
      {productReviewsLoading ? (
        <Skeleton className="w-16 h-6" />
      ) : (
        reviews &&
        reviews?.length >= 1 && (
          <>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-muted-foreground">
              (
              {totalReviews &&
                `${totalReviews} review${totalReviews > 1 ? 's' : ''}`}
              )
            </span>
          </>
        )
      )}
    </div>
  )
}
export default Reviews
