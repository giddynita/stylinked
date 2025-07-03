import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '@/utils/types'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {!product.stock && (
            <Badge className="absolute top-2 left-2 bg-red-500">
              Out of Stock
            </Badge>
          )}
          <Badge className="absolute top-2 right-2 bg-purple-600">
            {product.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <Link
            to={`/product/${product.id}`}
            className="hover:text-purple-600 transition-colors"
          >
            <h3 className="font-semibold text-lg line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-600">by {product.businessname}</p>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-gray-500">(124 reviews)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-purple-600">
              ${product.price}
            </span>
            <Button
              size="sm"
              className="bg-purple-600 hover:bg-purple-700"
              disabled={!product.stock}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
