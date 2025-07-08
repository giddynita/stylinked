import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ProductCardProps } from '@/utils/types'
import { averageRating, currencyFormatter, slugify } from '@/utils/format'
import { getReviews } from '@/utils/loader'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '../ui/skeleton'

const ProductGridCard = ({ product }: ProductCardProps) => {
  const queryReviews = {
    queryKey: ['reviews'],
    queryFn: () => getReviews(product.id),
  }
  const { data: reviews, isLoading: productReviewsLoading } =
    useQuery(queryReviews)
  const rating = averageRating(reviews)
  const totalReviews = reviews?.length
  return (
    <Card className="group p-0 hover:shadow-lg transition-all duration-300 hover:scale-101 gap-0">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-104 transition-transform duration-300"
            loading="lazy"
          />
          {!product.stock && (
            <Badge
              variant="destructive"
              className="absolute top-2 left-2 text-[10px] "
            >
              Out of Stock
            </Badge>
          )}
          <Badge className="absolute top-2 right-2 capitalize flex items-center text-[10px]">
            {product.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-base line-clamp-2 h-12">
          <Link
            to={`${slugify(product.name)}/${product.id}`}
            className="hover:text-primary transition-colors"
          >
            {' '}
            {product.name}{' '}
          </Link>
        </h3>

        <p className="text-sm text-muted-foreground hover:text-accent-foreground text-ellipsis overflow-hidden line-clamp-1 w-full">
          <Link to={`/vendors/${product.vendor}`}>
            Sold by {product.vendor}
          </Link>
        </p>

        <div className="flex items-center space-x-1 my-2 h-6">
          {productReviewsLoading ? (
            <Skeleton className="w-16 h-6" />
          ) : (
            reviews &&
            reviews?.length > 1 && (
              <>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{rating}</span>
                <span className="text-sm text-muted-foreground">
                  (
                  {totalReviews &&
                    `${totalReviews} review${totalReviews > 1 && 's'}`}
                  )
                </span>
              </>
            )
          )}
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-base font-bold text-primary">
            {currencyFormatter(product.price)}
          </span>
          <Button size="sm" className="text-[10px]" disabled={!product.stock}>
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductGridCard
