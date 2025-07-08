import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Star, ShoppingCart, MessageCircle, Minus } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ProductDetailsHeader } from '@/components/headers/ProductDetailsHeader'
import {
  averageRating,
  currencyFormatter,
  formatCreatedAt,
} from '@/utils/format'
import { Cart, Ratings } from '@/components/marketplace'
import { getReviews, getSingleProduct } from '@/utils/loader'
import { useQuery } from '@tanstack/react-query'
import { useUserData } from '@/utils/hooks'
import { reviewSchema, validateWithZodSchema } from '@/utils/schema'
import { addReviewAction } from '@/utils/action'
import { toast } from 'sonner'
import {
  ExistingReviewsSkeleton,
  ProductInfoSkeleton,
} from '@/components/skeletons'

const ProductDetails = () => {
  const { productid } = useParams()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(5)

  // Mock product data
  /*  const product = {
    id: productId || '1',
    name: 'Custom Tailored Wedding Dress',
    price: 450,
    originalPrice: 550,
    images: [
      '/placeholder.svg?height=500&width=500',
      '/placeholder.svg?height=500&width=500',
      '/placeholder.svg?height=500&width=500',
    ],
    vendor: {
      name: 'Elegant Designs',
      id: 'vendor-1',
      rating: 4.8,
      location: 'New York, NY',
    },
    rating: 4.8,
    totalReviews: 124,
    category: 'Wedding Dresses',
    description:
      'Exquisite custom-tailored wedding dress crafted with premium silk and delicate lace details. Each dress is made to order with precise measurements and can be customized to match your vision perfectly.',
    features: [
      'Premium silk fabric',
      'Hand-sewn lace details',
      'Custom measurements',
      'Free alterations included',
      '30-day satisfaction guarantee',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom'],
    colors: ['Ivory', 'White', 'Champagne', 'Blush'],
    inStock: true,
    estimatedDelivery: '2-3 weeks',
    materials: '100% Silk, French Lace',
  } */

  //fetch single product
  const queryProduct = {
    queryKey: ['single product', productid],
    queryFn: () => getSingleProduct(productid),
  }
  const { data: product, isLoading: productInfoLoading } =
    useQuery(queryProduct)

  /* const reviews = [
    {
      id: 1,
      author: 'Sarah Johnson',
      rating: 5,
      date: '2 weeks ago',
      text: 'Absolutely gorgeous dress! The craftsmanship is exceptional and it fit perfectly. Worth every penny!',
      helpful: 12,
    },
    {
      id: 2,
      author: 'Emily Chen',
      rating: 5,
      date: '1 month ago',
      text: 'Amazing quality and beautiful design. The vendor was very responsive and accommodating.',
      helpful: 8,
    },
    {
      id: 3,
      author: 'Maria Rodriguez',
      rating: 4,
      date: '2 months ago',
      text: 'Love the dress but delivery took a bit longer than expected. Quality is excellent though!',
      helpful: 5,
    },
  
  ] */
  //fetch user data
  const { data: userData } = useUserData()

  //fetch reviews and calculate ratings
  const queryReviews = {
    queryKey: ['reviews'],
    queryFn: () => getReviews(productid),
  }
  const { data: reviews, isLoading: productReviewsLoading } =
    useQuery(queryReviews)

  const rating = averageRating(reviews)
  const totalReviews = reviews?.length

  // add reviews
  const {
    mutate: addReview,
    isError: addReviewError,
    isPending,
  } = addReviewAction()

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const name = `${userData?.firstname} ${userData?.lastname}`
    const reviewData = {
      productid,
      rating: reviewRating,
      comment: reviewText,
      name,
    }
    const validatedData = validateWithZodSchema(reviewSchema, reviewData)
    if (validatedData) {
      if (addReviewError) {
        return toast('Uploading Review failed. Please try again.')
      }
      addReview(validatedData)
    } else {
      return
    }

    toast('Review submitted successfully! Thank you for your feedback.')
    setReviewText('')
    setReviewRating(5)
  }

  return (
    <div className="min-h-screen relative container">
      {/*breadcrumbs */}
      <ProductDetailsHeader productName={product?.name} />
      {/* product details */}
      {productInfoLoading ? (
        <ProductInfoSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div>
            <div className="mb-4 bg-muted p-6  h-max">
              <img
                src={product?.images[0]}
                alt={product?.name}
                className="w-full max-w-xs mx-auto  object-cover rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              {product?.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product?.name} ${index + 1}`}
                  className="w-[25%] h-30 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Badge className="mb-2">{product?.category}</Badge>
              <h1 className="text-xl font-bold  mb-2">{product?.name}</h1>
              <Link to={`/vendor/${product?.vendorid}`} className="font-medium">
                Sold by{' '}
                <span className="text-primary hover:underline">
                  {' '}
                  {product?.vendor}{' '}
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4 mb-6">
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
                    <li className="text-sm text-gray-600 flex items-center">
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

            {/* Color Selection */}
            <div className="mb-6">
              <Label className="block mb-2">Choose a Color</Label>
              <div className="flex flex-wrap gap-2">
                {product?.variants.map(({ colors }) =>
                  colors.map(({ color }) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))
                )}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <Label htmlFor="quantity" className="block mb-2">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-20"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-6 mx-auto">
              <Button className="w-full" size="lg" disabled={!product?.stock}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart{' '}
                {quantity > 0 && (
                  <span className="flex items-center gap-1 ">
                    {' '}
                    <Minus className="text-white" />{' '}
                    {currencyFormatter(product?.price || 0 * quantity)}{' '}
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
        {productReviewsLoading ? (
          <ExistingReviewsSkeleton />
        ) : (
          reviews &&
          reviews.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-6">
                {`Customer Review ${reviews.length > 1 ? 's' : ''}`} (
                {reviews.length})
              </h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium">{review.name}</span>
                            <Ratings rating={review.rating} />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            on {formatCreatedAt(review.createdat)}
                          </p>
                        </div>
                      </div>
                      <p className="text-foreground mb-3">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        )}
        {/* Write a Review */}
        <div>
          <h2 className="text-xl font-bold mb-6">Write a Review</h2>
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
        </div>
      </div>
      {/* cart */}
      <div className="border bg-background shadow-xs hover:bg-accent group hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer fixed w-14 h-14 sm:h-18 sm:w-18 rounded-full flex items-center justify-center top-1/3 -translate-y-1/3 right-4">
        <Cart />
      </div>
    </div>
  )
}

export default ProductDetails
