import { useUser } from '@supabase/auth-helpers-react'
import { Card, CardContent } from '../ui/card'
import type { SingleProduct } from '@/utils/types'
import { addReviewAction } from '@/utils/action'
import { toast } from 'sonner'
import { ReviewForm } from '../formTypes'

interface GiveReviewProp {
  product: SingleProduct | undefined
}

function GiveReview({ product }: GiveReviewProp) {
  const user = useUser()
  const { mutate: addReview, isPending } = addReviewAction()
  const submitReview = (reviewData: any) => {
    addReview(reviewData, {
      onSuccess: () => {
        toast.success(
          'Review submitted successfully! Thank you for your feedback.'
        )
        window.location.reload()
      },
      onError: () => {
        toast.error('Uploading Review failed. Please try again.')
      },
    })
  }
  return (
    <>
      {user && (
        <section>
          <h2 className="text-xl font-bold mb-4">Write a Review</h2>
          <Card>
            <CardContent>
              <ReviewForm
                product={product}
                onSubmitting={isPending}
                onSubmit={submitReview}
              />
            </CardContent>
          </Card>
        </section>
      )}
    </>
  )
}
export default GiveReview
