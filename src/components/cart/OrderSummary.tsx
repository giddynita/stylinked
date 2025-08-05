import { useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { currencyFormatter } from '@/utils/format'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

function OrderSummary() {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state: any) => state.cartState
  )

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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

        {/* Checkout Button */}
        <Link to="checkout" className="block">
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            Proceed to Checkout
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
export default OrderSummary
