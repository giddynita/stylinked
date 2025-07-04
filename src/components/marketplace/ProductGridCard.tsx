import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ProductCardProps } from '@/utils/types'
import { currencyFormatter } from '@/utils/format'

const ProductGridCard = ({ product }: ProductCardProps) => {
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
            to={`product/${product.id}`}
            className="hover:text-primary transition-colors"
          >
            {' '}
            {product.name}{' '}
          </Link>
        </h3>

        <p className="w-max line-clamp-1">
          <Link
            to={`/vendors/${product.vendor}`}
            className="text-sm text-muted-foreground hover:text-accent-foreground"
          >
            by {product.vendor}
          </Link>
        </p>

        <div className="flex items-center space-x-1 mt-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-gray-500">(124 reviews)</span>
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
