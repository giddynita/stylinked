import { Check } from 'lucide-react'
import { Card } from '../ui/card'
import type { PaymentMethodOption } from '@/utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { handlePaymentMethod } from '@/features/checkout/checkoutSlice'
import { Badge } from '../ui/badge'
import { paymentMethods } from '@/utils/data'

function PaymentMethod() {
  const { paymentMethod } = useSelector((state: any) => state.checkoutState)
  const dispatch = useDispatch()
  const handleMethod = (id: string, name: string) => {
    dispatch(handlePaymentMethod({ id, name }))
  }

  return (
    <div className="grid gap-4">
      {paymentMethods.map((method: PaymentMethodOption | any) => {
        const { id, title, description, icon, popular } = method
        const Icon = icon
        return (
          <Card
            key={id}
            className={`
        relative cursor-pointer transition-all duration-200 
        hover:shadow-md
        ${
          paymentMethod.id === id
            ? 'bg-accent border-green-600 shadow-md'
            : 'bg-muted/80 hover:bg-muted'
        }
      `}
            onClick={() => handleMethod(id, title)}
          >
            <div className="flex items-center p-6">
              <div
                className={`
            'grid place-content-center place-items-center w-12 h-12 rounded-lg mr-4 text-foreground  transition-colors 
            ${
              paymentMethod.id === id
                ? 'text-white bg-green-600 '
                : 'bg-background'
            }
          `}
              >
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  {popular && (
                    <Badge className="text-xs font-medium ">Popular</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>

              <div
                className={`
            'grid place-items-center place-content-center w-6 h-6 rounded-full border-2 transition-all duration-200 
            ${
              paymentMethod.id === id
                ? 'bg-green-600 text-white'
                : 'border-accent bg-background'
            }
          `}
              >
                {paymentMethod.id === id && <Check className="w-4 h-4" />}
              </div>
            </div>
          </Card>
        )
      })}{' '}
    </div>
  )
}
export default PaymentMethod
