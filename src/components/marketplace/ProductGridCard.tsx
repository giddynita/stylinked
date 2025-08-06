import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CartItemType, ProductWithRating } from '@/utils/types'
import { currencyFormatter, slugify } from '@/utils/format'
import AddToCart from './AddToCart'
import { GlobalContext } from '@/utils/globalContext'
import Reviews from './Reviews'
import { useSelector } from 'react-redux'
import { useContext, useEffect, useState } from 'react'
import { MdOutlineAddShoppingCart } from 'react-icons/md'

interface ProductGridCardProp {
  product: ProductWithRating
}

const ProductGridCard = ({ product }: ProductGridCardProp) => {
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
              {' '}
              {product.name}{' '}
            </Link>
          </p>

          <p className="text-sm text-muted-foreground hover:text-accent-foreground text-ellipsis overflow-hidden line-clamp-1 w-full">
            <Link to={`/vendors/${product.vendor}`}>
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
            <Button
              variant="outline"
              size="sm"
              className="text-[10px] relative"
              disabled={!product.stock}
              onClick={() => setIsAddToCartDialogOpen(true)}
            >
              {numProductInCart >= 1 ? (
                <>
                  <ShoppingCart className="w-6 h-6" />
                  <p className="absolute -top-2 -right-2 text-xs font-bold bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center">
                    {numProductInCart}
                  </p>
                </>
              ) : (
                <MdOutlineAddShoppingCart className="w-6 h-6" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      <AddToCart product={product} />
    </>
  )
}

export default ProductGridCard
