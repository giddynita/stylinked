import { CreditCard } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import PaymentMethod from './PaymentMethod'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { handleStepChange } from '@/features/checkout/checkoutSlice'
import PaystackPaymentButton from './PaystackPaymentButton'

function PaymentInformation() {
  const dispatch = useDispatch()
  const handleStep = (step: number) => {
    dispatch(handleStepChange({ step }))
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5" />
          <span>Choose a Payment Method</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <PaymentMethod />
        <div className="flex space-x-3 mt-8">
          <Button
            variant="outline"
            onClick={() => handleStep(2)}
            className="flex-1"
          >
            Back to Review
          </Button>
          <PaystackPaymentButton />
        </div>
      </CardContent>
    </Card>
  )
}
export default PaymentInformation
