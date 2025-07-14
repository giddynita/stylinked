import { useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

function ShippingAddress() {
  const { shippingForm } = useSelector((state: any) => state.checkoutState)
  const { firstname, lastname, address, city, state, zipcode, country } =
    shippingForm
  return (
    <Card className="bg-muted border-0">
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <p>
            {firstname} {lastname}
          </p>
          <p>{address},</p>
          <p>
            {city}, {state}, {zipcode},
          </p>
          <p>{country}.</p>
        </div>
      </CardContent>
    </Card>
  )
}
export default ShippingAddress
