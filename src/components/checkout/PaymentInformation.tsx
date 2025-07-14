import { CreditCard } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { paymentMethods } from '@/utils/data'
import PaymentMethod from './PaymentMethod'
import type { PaymentMethodOption } from '@/utils/types'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { handleStepChange } from '@/features/checkout/checkoutSlice'

function PaymentInformation() {
  const dispatch = useDispatch()
  const handleStep = (step: number) => {
    dispatch(handleStepChange({ step }))
  }
  const { paymentMethod } = useSelector((state: any) => state.checkoutState)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5" />
          <span>Choose Payment Method</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {paymentMethods.map((paymentMethod: PaymentMethodOption | any) => {
            return (
              <PaymentMethod key={paymentMethod.id} method={paymentMethod} />
            )
          })}
        </div>
        <div className="flex space-x-3 mt-8">
          <Button
            variant="outline"
            onClick={() => handleStep(2)}
            className="flex-1"
          >
            Back to Review
          </Button>
          {paymentMethod.name && (
            <Button className="flex-1">Pay via {paymentMethod.name}</Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
export default PaymentInformation
