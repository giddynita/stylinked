import type { CartItemType, ProductWithRating, UserRole } from '@/utils/types'
import { Card, CardContent } from '../ui/card'
import { currencyFormatter, slugify } from '@/utils/format'
import { Eye } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Link } from 'react-router-dom'
import AddToCart from './AddToCart'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Reviews from './Reviews'

interface ProductListCardProp {
  product: ProductWithRating
}

function ProductListCard({ product }: ProductListCardProp) {
  const { cartItems, numItemsInCart } = useSelector(
    (state: any) => state.cartState
  )
  const { userRole }: { userRole: UserRole } = useSelector(
    (state: any) => state.userState
  )
  const [numProductInCart, setNumProductInCart] = useState<number>(0)
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
          <div className="flex gap-4">
            <div className="relative max-w-[150px] rounded-l-xl ">
              <img
                src={product.images[0]}
                alt={product.name}
                className=" object-cover w-full h-full rounded-l-xl  "
                loading="lazy"
              />
              <Badge className="absolute top-2 left-2 capitalize flex items-center text-[10px]">
                {product.category}
              </Badge>
            </div>
            <div className="py-4 pr-4 flex flex-1 flex-col sm:flex-row justify-between gap-y-4 gap-x-8">
              <div className="space-y-2">
                <p className="font-semibold text-base line-clamp-1">
                  {product.name}
                </p>
                <Link
                  to={`/vendors/${slugify(product.vendor)}/${product.vendorid}`}
                  className="text-muted-foreground text-sm line-clamp-1 hover:text-primary hover:underline"
                >
                  Sold by {product.vendor}
                </Link>
                <Reviews
                  totalReviews={product.totalReviews}
                  averageRating={product.averageRating}
                />
                <div className="flex flex-wrap items-center gap-2">
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
              <div className="flex flex-row sm:flex-col justify-end sm:justify-start gap-x-2 gap-y-4">
                <Button size="sm" variant="outline" asChild>
                  <Link to={`${slugify(product.name)}/${product.id}`}>
                    <span className="sr-only">view product details</span>
                    <Eye />
                  </Link>
                </Button>
                {(userRole?.role == 'buyer' || userRole?.role == null) && (
                  <AddToCart
                    product={product}
                    numProductInCart={numProductInCart}
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
export default ProductListCard
