import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CartItem, ProductCardProps } from '@/utils/types'
import { averageRating, currencyFormatter, slugify } from '@/utils/format'
import { getReviews } from '@/utils/loader'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '../ui/skeleton'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Carousel } from '../global'
import { Label } from '../ui/label'
import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '@/features/cart/cartSlice'

const ProductGridCard = ({ product }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const dispatch = useDispatch()
  const { cartItems, numItemsInCart } = useSelector(
    (state: any) => state.cartState
  )

  const [numProductInCart, setNumProductInCart] = useState<number>(0)

  const cartItem = {
    images: product.images,
    name: product.name,
    price: product.price,
    color: selectedColor,
    size: selectedSize,
    amount: quantity,
    id: product.id,
  }
  useEffect(() => {
    const numProductInCart: CartItem[] = cartItems.filter(
      (item: CartItem) => item.id === product.id
    )
    const numProductItemsInCart = numProductInCart.reduce(
      (acc, current) => acc + current.amount,
      0
    )

    setNumProductInCart(numProductItemsInCart)
  }, [numItemsInCart])

  const addItemToCart = (item: CartItem) => {
    if (!item.size) {
      return toast('Please select a size')
    }
    if (!item.color) {
      return toast('Please select a color')
    }
    if (!item.amount || item.amount < 1) {
      return toast('Quantity must be greater than or equal to 1')
    }

    dispatch(addItem({ product: item }))
    setSelectedColor('')
    setSelectedSize('')
    setQuantity(1)
    setIsAddDialogOpen(false)
  }

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
            reviews?.length >= 1 && (
              <>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{rating}</span>
                <span className="text-sm text-muted-foreground">
                  (
                  {totalReviews &&
                    `${totalReviews} review${totalReviews > 1 ? 's' : ''}`}
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
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-[10px] relative"
                disabled={!product.stock}
              >
                <ShoppingCart className="w-6 h-6" />
                {numProductInCart >= 1 && (
                  <p className="absolute -top-2 -right-2 text-xs font-bold bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center">
                    {numProductInCart}
                  </p>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] pt-10  overflow-y-auto">
              <Carousel carouselItems={product.images} />
              <div>
                <h1 className="text-base text-muted-foreground">
                  {product.name}
                </h1>
                <p className="text-primary text-xl font-medium my-2">
                  {currencyFormatter(product.price)}
                </p>
                <div className="space-y-2 my-3">
                  <Label>Size</Label>
                  <div className="flex flex-wrap gap-2">
                    {product?.variants.map(({ size }) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 my-3">
                  <Label>Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {product?.variants.map(({ colors }) =>
                      colors.map(({ color }) => (
                        <Button
                          key={color}
                          variant={
                            selectedColor === color ? 'default' : 'outline'
                          }
                          size="sm"
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </Button>
                      ))
                    )}
                  </div>
                </div>
                <div className="space-y-2 my-3">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="max-w-20"
                  />
                </div>
              </div>
              <Separator />
              <Button onClick={() => addItemToCart(cartItem)}>
                Add to Cart
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductGridCard
