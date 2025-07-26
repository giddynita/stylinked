import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Star,
  ShoppingCart,
  MessageCircle,
  Minus,
  Ban,
  Plus,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { currencyFormatter } from '@/utils/format'
import { Cart } from '@/components/marketplace'
import { useSingleProduct, useUserData } from '@/utils/hooks'
import { reviewSchema, validateWithZodSchema } from '@/utils/schema'
import { addReviewAction } from '@/utils/action'
import { toast } from 'sonner'
import { ProductInfoSkeleton } from '@/components/skeletons'
import type { CartItemType } from '@/utils/types'
import { addItem } from '@/features/cart/cartSlice'
import { useDispatch } from 'react-redux'
import SubPagesHeader from '@/components/headers/SubPagesHeader'
import { ProductReviews, Ratings } from '@/components/global'
import { useUser } from '@supabase/auth-helpers-react'

const ProductDetails = () => {
  const { productid } = useParams()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [selectedImage, setSelectedImage] = useState(0)

  //fech single product
  const { data: product, isLoading: productLoading } =
    useSingleProduct(productid)

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
  //fetch user data
  const { data: userData } = useUserData()
  const user = useUser()
  //fetch reviews and calculate ratings

  const rating = product?.averageRating
  const totalReviews = product?.totalReviews

  //add to cart
  const dispatch = useDispatch()
  const addItemToCart = (item: CartItemType | undefined) => {
    if (item && !item.size) {
      return toast.warning('Please select a size')
    }
    if (item && !item.color) {
      return toast.warning('Please select a color')
    }
    if (item) {
      if (!item.amount || item.amount < 1) {
        return toast.warning('Quantity must be greater than or equal to 1')
      }
    }

    dispatch(addItem({ product: item }))
    setSelectedColor('')
    setSelectedSize('')
    setQuantity(1)
  }

  // add reviews
  const { mutate: addReview, isPending } = addReviewAction()

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const name = `${userData?.firstname} ${userData?.lastname}`
    const reviewData = {
      productid,
      rating: reviewRating,
      comment: reviewText,
      name,
      productname: product?.name,
    }
    const validatedData = validateWithZodSchema(reviewSchema, reviewData)
    if (validatedData) {
      addReview(validatedData, {
        onSuccess: () => {
          setReviewText('')
          setReviewRating(5)
          toast.success(
            'Review submitted successfully! Thank you for your feedback.'
          )
        },
        onError: () => {
          toast.error('Uploading Review failed. Please try again.')
        },
      })
    } else {
      return
    }
  }

  return (
    <div className="min-h-screen relative container">
      {/*breadcrumbs */}
      <SubPagesHeader currentPage={product?.name} previousPage="marketplace" />
      {/* product details */}
      {productLoading ? (
        <ProductInfoSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div>
            <div className="mb-4 p-6  h-max">
              <img
                src={product?.images[selectedImage]}
                alt={product?.name}
                className="w-full max-w-xs mx-auto  object-cover rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              {product?.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product?.name} ${index + 1}`}
                  className={`w-[25%] h-30 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity ${
                    index === selectedImage && 'border border-primary border-2'
                  }`}
                  loading="lazy"
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
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
              <p className="text-muted-foreground mb-6">
                {product?.description}
              </p>
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
                        variant={
                          selectedColor === color ? 'default' : 'outline'
                        }
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
                  disabled={quantity == colorCheck?.quantity}
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
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Existing Reviews */}
        <section>
          <ProductReviews reviews={product?.productReviews} />
        </section>

        {/* Write a Review */}
        {user && (
          <section>
            <h2 className="text-xl font-bold mb-4">Write a Review</h2>
            <Card>
              <CardContent>
                <form onSubmit={handleReviewSubmit} className="space-y-8">
                  <div>
                    <Label className="block mb-2">Rating</Label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 cursor-pointer ${
                            star <= reviewRating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground/50'
                          }`}
                          onClick={() => setReviewRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="review">Your Review</Label>
                    <Textarea
                      id="review"
                      placeholder="Share your experience with this product..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows={8}
                      className="resize-none p-6"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isPending}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {isPending ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
      {/* cart */}
      <div className="border bg-background shadow-xs hover:bg-accent group hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer fixed w-14 h-14 sm:h-18 sm:w-18 rounded-full flex items-center justify-center top-1/3 -translate-y-1/3 right-4">
        <Cart />
      </div>
    </div>
  )
}

export default ProductDetails
