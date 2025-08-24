import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { currencyFormatter } from '@/utils/format'
import type { CustomerOrder } from '@/utils/types'
import VendorOrderDetailsDialog from '@/components/account/VendorOrderDetailsDialog'
import OrderStatus from './OrderStatus'
import { getStatusColor } from '@/utils/data'
import { Calendar, Package } from 'lucide-react'

interface OrderCardProp {
  order: CustomerOrder
}

function VendorOrderCard({ order }: OrderCardProp) {
  const totalItems = order.order_items.reduce(
    (sum, item) => sum + item.amount,
    0
  )

  return (
    <div>
      <Card
        className={`hover:shadow-md transition-shadow border-0 border-l-4 border-${getStatusColor(
          order?.status
        )}`}
      >
        <CardContent className="p-6 space-y-4">
          <section className="space-y-4">
            <div className="flex justify-between items-start gap-x-4 gap-y-2 flex-wrap">
              <div>
                <h2 className="font-semibold text-foreground">
                  {order.customer_name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {order.customer_email}
                </p>
                <p className="text-sm text-muted-foreground">{order?.phone}</p>
              </div>
              <div>
                <p className="font-medium text-foregrounds">
                  <span className="text-muted-foreground mr-1">Order ID:</span>
                  {order.order_id}
                </p>
                <p className="flex items-center gap-1 text-sm text-muted-foreground w-max sm:ml-auto">
                  <Calendar className="w-4 h-4" />
                  {order.date}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center gap-4 flex-wrap">
              <div className="flex items-center space-x-4 capitalize">
                <Badge
                  variant="outline"
                  className={`text-${getStatusColor(order?.status)} capitalize`}
                >
                  {order?.status}
                </Badge>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>
                    {totalItems} unit{totalItems !== 1 ? 's' : ''}
                  </span>
                </p>
                {/* shipping method */}
                {/* <span className="text-sm text-muted-foreground">
                  {order.shipping_method} shipping
                </span> */}
              </div>
              <p className="text-2xl font-bold text-foreground text-right">
                {currencyFormatter(order.order_amount)}
              </p>
            </div>
          </section>

          <Separator className="my-4" />
          <section className="space-y-3 mb-4">
            <h2 className="font-medium text-foreground">
              Items ({order.order_items.length})
            </h2>
            <div className="grid gap-3">
              {order.order_items.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg flex-wrap gap-y-2"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-12 h-12 rounded-md object-cover bg-muted"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.color} • {item.size} • Qty: {item.amount}
                    </p>
                  </div>
                  <p className="font-medium text-foreground ml-auto">
                    {currencyFormatter(item.price * item.amount)}
                  </p>
                </div>
              ))}
              {order.order_items.length > 2 && (
                <p className="text-sm text-muted-foreground text-center py-2">
                  +{order.order_items.length - 2} more item
                  {order.order_items.length > 3 ? 's' : ''}
                </p>
              )}
            </div>
          </section>
          <Separator className="my-4" />
          <div className="flex justify-between gap-4 items-center flex-wrap">
            <VendorOrderDetailsDialog order={order} />
            {(order.status === 'pending' || order.status === 'processing') && (
              <OrderStatus order={order} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default VendorOrderCard

{
  /* {order.status === 'Delivered' && (
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="h-4 w-4 mr-1" />
                  Invoice
                </Button>
              )} */
}
