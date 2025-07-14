import { MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import OrderSummary from './OrderSummary'
import { Button } from '../ui/button'
import ShippingAddress from './ShippingAddress'
import { useDispatch } from 'react-redux'
import { handleStepChange } from '@/features/checkout/checkoutSlice'

function OrderReview() {
  const dispatch = useDispatch()
  const handleStep = (step: number) => {
    dispatch(handleStepChange({ step }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>Review Your Order</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Shipping Address */}
          <ShippingAddress />

          {/* Order Summary */}
          <OrderSummary />

          <div className="flex space-x-3 mt-8">
            <Button
              variant="outline"
              onClick={() => handleStep(1)}
              className="flex-1"
            >
              Back to Shipping
            </Button>
            <Button
              type="submit"
              className="flex-1"
              onClick={() => handleStep(3)}
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default OrderReview
