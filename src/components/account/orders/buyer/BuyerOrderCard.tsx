import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getStatusColor } from '@/utils/format'
import { currencyFormatter, formatCreatedAt, slugify } from '@/utils/format'
import type { OrderAndOrderItems } from '@/utils/types'
import BuyerOrderDetailsDialog from '@/components/account/BuyerOrderDetailsDialog'
import { Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BuyerOrderCardProp {
  order: OrderAndOrderItems
}

function BuyerOrderCard({ order }: BuyerOrderCardProp) {
  return (
    <div>
      <Card
        className={`shadow-sm border-border/50 hover:shadow-md transition-shadow border-0 border-l-4 border-${getStatusColor(
          order.status
        )}`}
      >
        <CardHeader className="">
          <div className="flex flex-col sm:flex-row sm:items-start gap-2 justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <CardTitle className="text-lg">
                <span className="text-muted-foreground mr-1">Order ID:</span>
                {order.order_id}
              </CardTitle>
              <Badge
                variant="outline"
                className={`text-${getStatusColor(order.status)} capitalize`}
              >
                {order.status}
              </Badge>
            </div>
            <div className="">
              <p className="flex  gap-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatCreatedAt(order.created_at)} •
                </span>
                <span>
                  {order?.orderItems && order?.orderItems.length} item
                  {order?.orderItems && order?.orderItems?.length > 1
                    ? 's'
                    : ''}
                </span>
              </p>
              <p className="text-lg font-semibold text-foreground sm:text-right">
                {currencyFormatter(order.order_total)}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {order?.orderItems?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between sm:items-center text-sm gap-x-4 gap-y-2 p-4 bg-accent/30 rounded-md"
              >
                <div>
                  <span className="text-foreground font-medium">
                    {item.amount}x {item.name}
                  </span>
                  <p className="text-xs text-muted-foreground ">
                    from
                    <Link
                      to={`/vendors/${slugify(item.vendor)}/${item.vendor_id}`}
                      className="hover:underline hover:text-primary ml-1"
                    >
                      {item.vendor}
                    </Link>
                  </p>
                </div>
                <span className="text-muted-foreground font-medium">
                  {currencyFormatter(item.price * item.amount)}
                </span>
              </div>
            ))}
          </div>
          {order?.tracking_number && (
            <div className="p-3 bg-accent/50 rounded-lg">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Tracking Number:</span>
                <span className="font-mono text-foreground">
                  {order?.tracking_number}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-muted-foreground">
                  Estimated Delivery:
                </span>
                <span className="text-foreground">
                  {order?.estimated_delivery}
                </span>
              </div>
            </div>
          )}
          <BuyerOrderDetailsDialog order={order} />
        </CardContent>
      </Card>
    </div>
  )
}
export default BuyerOrderCard
