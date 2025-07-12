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
        {/* Promo Code */}
        {/* <div>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => onPromoCodeChange(e.target.value)}
            />
            <Button onClick={onApplyPromoCode} variant="outline">
              Apply
            </Button>
          </div>
          {appliedPromo && (
            <p className="text-sm text-green-600 mt-2">
              Promo code "{appliedPromo}" applied!
            </p>
          )}
        </div> */}

        {/* Price Breakdown */}
        <div className="space-y-2 pt-4 border-t">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{currencyFormatter(cartTotal)}</span>
          </div>

          {/* {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )} */}

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
        <Link to="/checkout" className="block">
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            Proceed to Checkout
          </Button>
        </Link>

        {/* {shipping > 0 && (
          <p className="text-sm text-gray-600 text-center">
            Add ${(200 - subtotal).toFixed(2)} more for free shipping
          </p>
        )} */}
      </CardContent>
    </Card>
  )
}
export default OrderSummary
