import { Star } from 'lucide-react'

interface ReviewsProp {
  totalReviews: number
  averageRating: number
}

function Reviews({ totalReviews, averageRating }: ReviewsProp) {
  return (
    <div className="flex items-center space-x-1 h-6">
      <>
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">{averageRating}</span>
        <span className="text-sm text-muted-foreground">
          ({`${totalReviews} review${totalReviews > 1 ? 's' : ''}`})
        </span>
      </>
    </div>
  )
}
export default Reviews
