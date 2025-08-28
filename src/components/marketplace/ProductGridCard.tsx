import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import type { CartItemType, ProductWithRating, UserRole } from '@/utils/types'
import { currencyFormatter, slugify } from '@/utils/format'
import AddToCart from './AddToCart'
import Reviews from './Reviews'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

interface ProductGridCardProp {
  product: ProductWithRating
}

const ProductGridCard = ({ product }: ProductGridCardProp) => {
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
      <Card className="group p-0 hover:shadow-lg transition-all duration-300 hover:scale-101 gap-0">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <Link to={`${slugify(product.name)}/${product.id}`}>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-104 transition-transform duration-300"
                loading="lazy"
              />
            </Link>
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
          <p className="font-semibold text-base line-clamp-2 h-12">
            <Link
              to={`${slugify(product.name)}/${product.id}`}
              className="hover:text-primary transition-colors"
            >
              {product.name}
            </Link>
          </p>
          <p className="text-sm text-muted-foreground hover:text-primary hover:underline text-ellipsis overflow-hidden line-clamp-1">
            <Link to={`/vendors/${product.vendorid}`}>
              Sold by {product.vendor}
            </Link>
          </p>

          <div className="my-2">
            <Reviews
              totalReviews={product.totalReviews}
              averageRating={product.averageRating}
            />
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-base font-bold text-primary">
              {currencyFormatter(product.price)}
            </span>
            {(userRole?.role == 'buyer' || userRole?.role == null) && (
              <AddToCart
                product={product}
                numProductInCart={numProductInCart}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default ProductGridCard
