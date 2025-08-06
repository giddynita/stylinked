import type { CartItemType, ProductWithRating } from '@/utils/types'
import { Card, CardContent } from '../ui/card'
import { currencyFormatter, slugify } from '@/utils/format'
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
import AddToCart from './AddToCart'
import { useSelector } from 'react-redux'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '@/utils/globalContext'
import Reviews from './Reviews'

interface ProductListCardProp {
  product: ProductWithRating
}

function ProductListCard({ product }: ProductListCardProp) {
  const { cartItems, numItemsInCart } = useSelector(
    (state: any) => state.cartState
  )
  const [numProductInCart, setNumProductInCart] = useState<number>(0)
  const { setIsAddToCartDialogOpen } = useContext(GlobalContext)
  useEffect(() => {
    const numProductInCart: CartItemType[] = cartItems.filter(
      (item: CartItemType) => item.id === product.id
    )
    const numProductItemsInCart = numProductInCart.reduce(
      (acc, current) => acc + current.amount,
      0
    )

    setNumProductInCart(numProductItemsInCart)
  }, [numItemsInCart])

  return (
    <>
      <Card className="hover:shadow-md transition-shadow p-0">
        <CardContent className="p-0">
          <div className="flex items-stretch gap-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className=" object-cover w-[30%] max-w-[150px] rounded-l-xl "
              loading="lazy"
            />
            <div className="flex-1 space-y-2 py-4">
              <p className="font-semibold text-base line-clamp-1">
                {product.name}
              </p>
              <p className="text-muted-foreground text-sm line-clamp-1">
                Sold by {product.vendor}
              </p>
              <Reviews
                totalReviews={product.totalReviews}
                averageRating={product.averageRating}
              />
              <div className="flex items-center space-x-4">
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
            <div className="hidden sm:flex flex-col justify-start pt-4 pr-4 space-y-4">
              <Button
                size="sm"
                variant="outline"
                className="text-[10px]"
                asChild
              >
                <Link to={`${slugify(product.name)}/${product.id}`}>
                  View Details
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-[10px] relative"
                disabled={!product.stock}
                onClick={() => setIsAddToCartDialogOpen(true)}
              >
                Add to Cart
                <ShoppingCart className="w-6 h-6" />
                {numProductInCart >= 1 && (
                  <p className="absolute -top-2 -right-2 text-xs font-bold bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center">
                    {numProductInCart}
                  </p>
                )}
              </Button>
            </div>
            <div className="sm:hidden pt-2 pr-2">
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
                      asChild
                    >
                      <Link to={`${slugify(product.name)}/${product.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[10px] relative"
                      disabled={!product.stock}
                      onClick={() => setIsAddToCartDialogOpen(true)}
                    >
                      Add to Cart
                      <ShoppingCart className="w-6 h-6" />
                      {numProductInCart >= 1 && (
                        <p className="absolute -top-2 -right-2 text-xs font-bold bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center">
                          {numProductInCart}
                        </p>
                      )}
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
      <AddToCart product={product} />
    </>
  )
}
export default ProductListCard
