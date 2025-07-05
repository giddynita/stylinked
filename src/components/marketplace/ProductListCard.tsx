import type { ProductCardProps } from '@/utils/types'
import { Card, CardContent } from '../ui/card'
import { currencyFormatter } from '@/utils/format'
import { MoreVertical, ShoppingCart } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Link } from 'react-router-dom'

function ProductListCard({ product }: ProductCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow p-0">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-lg"
            loading="lazy"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-base line-clamp-1">
              {product.name}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-1">
              {product.vendor}
            </p>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-base font-bold text-primary">
                {currencyFormatter(product.price)}
              </span>
              <Badge
                variant={product.stock ? 'default' : 'secondary'}
                className="text-[10px]"
              >
                {product.stock ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </div>
          </div>
          <div className="hidden sm:flex flex-col justify-between space-y-2">
            <Button size="sm" variant="outline" className="text-[10px]">
              View Details
            </Button>
            <Button size="sm" className="text-[10px]" disabled={!product.stock}>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          </div>
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-[10px] w-full"
                  >
                    <Link to={`/marketplace/product/${product.id}`}>
                      View Details
                    </Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    size="sm"
                    className="text-[10px] w-full"
                    disabled={!product.stock}
                  >
                    <ShoppingCart className="w-4 h-4 text-primary-foreground" />
                    Add to Cart
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default ProductListCard
