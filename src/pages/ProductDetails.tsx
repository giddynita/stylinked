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
import { currencyFormatter } from '@/utils/format'
import { Cart } from '@/components/marketplace'

const ProductDetails = () => {
  const { productId } = useParams()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(5)

  // Mock product data
  const product = {
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
  }

  const reviews = [
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
  ]

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Review submitted:', { rating: reviewRating, text: reviewText })
    setReviewText('')
    setReviewRating(5)
  }

  return (
    <div className="min-h-screen relative container">
      {/*breadcrumbs */}
      <ProductDetailsHeader />
      {/* product details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Product Images */}
        <div>
          <div className="mb-4 bg-muted p-6  h-max">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full max-w-xs mx-auto  object-cover rounded-lg"
              loading="lazy"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-30 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <Badge className="mb-2">{product.category}</Badge>
            <h1 className="text-xl font-bold  mb-2">{product.name}</h1>
            <Link
              to={`/vendor/${product.vendor.id}`}
              className="text-primary hover:underline"
            >
              Sold by {product.vendor.name}
            </Link>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="font-medium ml-2">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">
              ({product.totalReviews} reviews)
            </span>
          </div>

          <p className="mb-6 text-primary font-bold text-xl">
            {currencyFormatter(product.price)}
          </p>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          {/* Features */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="space-y-1">
              <li className="text-sm text-muted-foreground flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Made from {/* material */}
              </li>
              <li className="text-sm text-gray-600 flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Designed by {/* brand */}
              </li>
            </ul>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <Label className=" mb-2">Choose a Size</Label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
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
              {product.colors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Button>
              ))}
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
            <Button className="w-full" size="lg" disabled={!product.inStock}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart{' '}
              {quantity > 0 && (
                <span className="flex items-center gap-1 ">
                  {' '}
                  <Minus className="text-white" />{' '}
                  {currencyFormatter(product.price * quantity)}{' '}
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

      {/* Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Existing Reviews */}
        <div>
          <h2 className="text-xl font-bold mb-6">
            Customer Reviews ({reviews.length})
          </h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{review.author}</span>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-foreground mb-3">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

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
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Submit Review
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
