import { useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { currencyFormatter } from '@/utils/format'
import type { CartItemType } from '@/utils/types'

function OrderSummary() {
  const { cartTotal, shipping, tax, orderTotal, cartItems } = useSelector(
    (state: any) => state.cartState
  )

  return (
    <Card className="bg-muted border-0">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-4">
          {cartItems.map((item: CartItemType, index: number) => (
            <div key={index} className="flex justify-between items-start">
              <div className="flex-1 space-y-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  Sold by {item.vendor}
                </p>
                <div className="flex items-center gap-4">
                  <p className="text-xs text-muted-foreground">
                    Size: {item.size}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Color: {item.color}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.amount}
                </p>
              </div>
              <p className="font-medium">
                {currencyFormatter(item.price * item.amount)}
              </p>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 pt-4 border-t">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{currencyFormatter(cartTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{currencyFormatter(shipping)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>{currencyFormatter(tax)}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total</span>
            <span>{currencyFormatter(orderTotal)}</span>
          </div>
        </div>

        {/* Security Badge */}
        {/* <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            <span className="text-sm font-medium">Secure Checkout</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Your payment information is encrypted and secure
          </p>
        </div> */}
      </CardContent>
    </Card>
  )
}
export default OrderSummary
