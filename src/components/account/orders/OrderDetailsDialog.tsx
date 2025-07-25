import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { currencyFormatter } from '@/utils/format'
import type { CustomerOrder } from '@/utils/types'
import { Calendar, MapPin, Package, Truck } from 'lucide-react'

interface OrderDetailsDialogProps {
  order: CustomerOrder
  open: boolean
  onOpenChange: (open: boolean) => void
  getStatusBadge: (status: string | undefined) => any
}

function OrderDetailsDialog({
  order,
  open,
  onOpenChange,
  getStatusBadge,
}: OrderDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Order Details - {order.order_id}
          </DialogTitle>
          <DialogDescription className="capitalize">
            {getStatusBadge(order?.status)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info */}
          <section className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">
                {order.customer_name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {order.customer_email}
              </p>
              <p className="text-sm text-muted-foreground">{order.phone}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <Calendar className="h-4 w-4 mr-1" />
                {order.date}
              </div>
              {/* shipping method */}
              {/* <div className="flex items-center text-sm text-muted-foreground">
                <Truck className="h-4 w-4 mr-1" />
                {order.shipping_method}
              </div> */}
            </div>
          </section>

          {/* Order Items */}
          <section>
            <h3 className="font-semibold text-foreground mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Items ({order.order_items.length})
            </h3>
            <div className="space-y-3">
              {order.order_items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 border rounded-lg"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover bg-muted"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <h5 className="font-medium text-foreground">{item.name}</h5>
                    <p className="text-sm text-muted-foreground">
                      Color: {item.color} | Size: {item.size}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.amount}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      {currencyFormatter(item.price * item.amount)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currencyFormatter(item.price)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Shipping Address */}
          <section>
            <h2 className="font-semibold text-foreground mb-3 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Shipping Address
            </h2>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-foreground">{order.shipping_address}</p>
            </div>
          </section>

          {/* Tracking */}
          {order.tracking_number && (
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Tracking Information
              </h4>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-foreground font-mono">
                  {order.tracking_number}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default OrderDetailsDialog
