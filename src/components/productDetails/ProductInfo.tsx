import type { CartItemType, SingleProduct } from '@/utils/types'
import { Badge } from '../ui/badge'
import { Link } from 'react-router-dom'
import { Ratings } from '../global'
import { currencyFormatter } from '@/utils/format'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Ban, Minus, Plus, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { addItem } from '@/features/cart/cartSlice'

interface ProductInfoProp {
  product: SingleProduct | undefined
}

function ProductInfo({ product }: ProductInfoProp) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  const rating = product?.averageRating
  const totalReviews = product?.totalReviews
  const cartItem = product && {
    images: product.images,
    name: product.name,
    price: product.price,
    color: selectedColor,
    size: selectedSize,
    amount: quantity,
    id: product.id,
    vendor: product.vendor,
    availableVariants: product.variants,
    vendorid: product.vendorid,
  }
  const sizeCheck = product?.variants.find((p) => p.size === selectedSize)
  const colorsOfSizeSelected = sizeCheck?.colors.map((p) => p.color)
  const colorCheck = sizeCheck?.colors.find((p) => p.color === selectedColor)
  const addItemToCart = (item: CartItemType | undefined) => {
    if (item && !item.size) {
      return toast.warning('Please select a size')
    }
    if (item && !item.color) {
      return toast.warning('Please select a color')
    }

    dispatch(addItem({ product: item }))
    setSelectedColor('')
    setSelectedSize('')
    setQuantity(1)
  }
  return (
    <section>
      <div className="mb-4">
        <Badge className="mb-2 capitalize">{product?.category}</Badge>
        <h1 className="text-xl font-bold  mb-2">{product?.name}</h1>
        <Link
          to={`/vendors/${product?.vendor}/${product?.vendorid}`}
          className="font-medium"
        >
          Sold by{' '}
          <span className="text-primary hover:underline">
            {' '}
            {product?.vendor}{' '}
          </span>
        </Link>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <Ratings rating={rating} />
        {!rating || <span className="text-sm font-medium">{rating}</span>}
        <span className="text-muted-foreground">
          (
          {totalReviews
            ? `${totalReviews} review${totalReviews > 1 ? 's' : ''}`
            : 'No reviews yet'}
          )
        </span>
      </div>
      <p className="mb-6 text-primary font-bold text-xl">
        {currencyFormatter(product?.price || 0)}
      </p>
      <div>
        <Label className="block mb-2">About This Product</Label>
        <p className="text-muted-foreground mb-6">{product?.description}</p>
      </div>

      {/* Features */}
      {(product?.brand || product?.material) && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Features:</h3>
          <ul className="space-y-1">
            {!product?.material || (
              <li className="text-sm text-muted-foreground flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Made from {product?.material}
              </li>
            )}
            {!product?.brand || (
              <li className="text-sm text-muted-foreground flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Designed by {product?.brand}
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Size Selection */}
      <div className="mb-6">
        <Label className=" mb-2">Choose a Size</Label>
        <div className="flex flex-wrap gap-2">
          {product?.variants.map(({ size }: { size: string }) => (
            <Button
              key={size}
              variant={selectedSize === size ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSelectedSize(size)
                setSelectedColor('')
              }}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="mb-6">
        <Label className="block mb-2">Choose a Color</Label>
        <div className="flex flex-wrap gap-3">
          {product?.variants.map(({ colors }) =>
            colors.map(({ color, quantity }) => {
              const colorCheck =
                !colorsOfSizeSelected?.includes(color) || quantity === 0

              return (
                <Button
                  key={color}
                  variant={selectedColor === color ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedColor(color)}
                  disabled={colorCheck}
                  className="relative"
                >
                  {color}
                  {quantity === 0 && (
                    <Ban className="w-4 h-4 absolute -top-2 -right-2 text-destructive font-bold bg-destructive/30 rounded-full " />
                  )}
                </Button>
              )
            })
          )}
        </div>
      </div>

      {/* Quantity */}
      <div className="mb-6">
        <Label htmlFor="quantity" className="block mb-2">
          Quantity
        </Label>
        <div className="flex items-center border rounded-md w-max">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity <= 1}
            className="h-8 w-8 p-0 rounded-r-none hover:bg-muted"
          >
            <Minus className="w-3 h-3" />
          </Button>
          <div className="h-8 w-12 flex items-center justify-center border-x text-sm font-medium">
            {quantity}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
            disabled={
              quantity == colorCheck?.quantity ||
              !selectedSize ||
              !selectedColor
            }
            className="h-8 w-8 p-0 rounded-l-none hover:bg-muted"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 mb-6 mx-auto">
        <Button
          className="w-full"
          size="lg"
          disabled={!product?.stock}
          onClick={() => addItemToCart(cartItem)}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart{' '}
          {quantity > 0 && (
            <span className="flex items-center gap-1 ">
              {' '}
              <Minus className="text-white" />{' '}
              {currencyFormatter((product?.price || 0) * quantity)}{' '}
            </span>
          )}
        </Button>

        {/* <div className="flex space-x-3">
           <Button variant="outline" className="flex-1">
             <Heart className="w-4 h-4 mr-2" />
             Save for Later
           </Button>
           <Button variant="outline" className="flex-1">
             <Share2 className="w-4 h-4 mr-2" />
             Share
           </Button>
         </div> */}
      </div>
    </section>
  )
}
export default ProductInfo
