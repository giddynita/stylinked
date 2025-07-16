import { Star } from 'lucide-react'

function Ratings({ rating }: { rating: number | undefined }) {
  const roundOffRating = Math.round(rating ?? 0)
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= roundOffRating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-muted-foreground'
          }`}
        />
      ))}
    </div>
  )
}
export default Ratings
