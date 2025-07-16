import { CreditCard } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { paymentMethods } from '@/utils/data'
import PaymentMethod from './PaymentMethod'
import type { PaymentMethodOption } from '@/utils/types'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { handleStepChange } from '@/features/checkout/checkoutSlice'
import { useUserData } from '@/utils/hooks'
import { useUser } from '@supabase/auth-helpers-react'

function PaymentInformation() {
  const dispatch = useDispatch()
  const handleStep = (step: number) => {
    dispatch(handleStepChange({ step }))
  }
  const { paymentMethod } = useSelector((state: any) => state.checkoutState)
  const { orderTotal } = useSelector((state: any) => state.cartState)
  const { data: userData, isLoading } = useUserData()
  const user = useUser()
  const reference = Date.now.toString()
  const userName = `${userData?.firstname} ${userData?.lastname}`
  const orderData = {
    amount: {
      currency: 'NGN',
      total: orderTotal * 100,
    },
    cancelUrl: 'http://localhost:5173/cart/checkout',
    country: 'NG',
    evokeOpay: false,
    expireAt: 30,
    payMethod: paymentMethod.id,
    product: {
      description: `Payment for ${reference} order`,
      name: 'Order Payment',
    },
    reference,
    returnUrl: 'http://localhost:5173/account/orders',
    userInfo: {
      userEmail: user?.email ?? '',
      userId: userData?.id ?? '',
      userMobile: userData?.phone ?? '',
      userName,
    },
    displayName: userName,
  }
  /* const { data: response, isLoading: paymentLoading } =
    useOpayPayment(orderData) */
  const makePayment = () => {
    /*  if (paymentLoading) {
      toast.loading('Payment initiated')
    } */
    /* if (response?.code !== '00000') {
      return toast.error(response?.message)
    }
    window.location.href = response?.data?.cashierUrl */
  }

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
            <Button
              className="flex-1"
              onClick={makePayment}
              disabled={isLoading}
            >
              Pay via {paymentMethod.name}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
export default PaymentInformation
