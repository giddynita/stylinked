import { Truck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ShippingInformationForm } from '../formTypes'

function ShippingInformation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Truck className="w-5 h-5" />
          <span>Shipping Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ShippingInformationForm />
      </CardContent>
    </Card>
  )
}
export default ShippingInformation
