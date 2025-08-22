import { MessageCircle, Star } from 'lucide-react'
import { Label } from '../ui/label'
import { useState, type FormEvent } from 'react'
import { reviewSchema, validateWithZodSchema } from '@/utils/schema'
import type { SingleProduct, UserDataType } from '@/utils/types'
import FormTextArea from '../form/FormTextArea'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import type { User } from '@supabase/supabase-js'

interface ReviewFormProp {
  onSubmit: (data: any) => void
  product: SingleProduct | undefined
  onSubmitting: boolean
}

function ReviewForm({ onSubmit, product, onSubmitting }: ReviewFormProp) {
  const [formData, setFormData] = useState({
    rating: 5,
    text: '',
  })
  const { user, userData }: { user: User; userData: UserDataType } =
    useSelector((state: any) => state.userState)

  const handleReviewChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = `${userData?.firstname} ${userData?.lastname}`
    const reviewData = {
      productid: product?.id,
      rating: formData.rating,
      comment: formData.text,
      name,
      productname: product?.name,
      vendorname: product?.vendor,
      vendorid: product?.vendorid,
      userid: user?.id,
    }
    const validatedData = validateWithZodSchema(reviewSchema, reviewData)
    if (!validatedData) {
      return
    }
    onSubmit(reviewData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <Label className="block mb-2">Rating</Label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer ${
                star <= formData.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground/50'
              }`}
              onClick={() => handleReviewChange('rating', star)}
            />
          ))}
        </div>
      </div>
      <FormTextArea
        label="Your Review"
        name="text"
        value={formData.text}
        handleInputChange={handleReviewChange}
        rows={8}
        placeholder="Share your experience with this product..."
        required
      />
      <Button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700"
        disabled={onSubmitting}
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        {onSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  )
}
export default ReviewForm
