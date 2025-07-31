import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getStatusColor } from '@/utils/data'
import { currencyFormatter, formatCreatedAt } from '@/utils/format'
import type { OrderAndOrderItems } from '@/utils/types'
import { CheckCircle, Clock, Package, Truck, XCircle } from 'lucide-react'

import { useState } from 'react'
import CancelOrder from './CancelOrder'
import BuyerOrderDetailsDialog from '../../BuyerOrderDetailsDialog'

interface BuyerOrderCardProp {
  order: OrderAndOrderItems
}

function BuyerOrderCard({ order }: BuyerOrderCardProp) {
  const [showDetails, setShowDetails] = useState(false)
  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />
      case 'shipped':
        return <Truck className="w-4 h-4" />
      case 'processing':
        return <Package className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div>
      <Card className="shadow-sm border-border/50 hover:shadow-md transition-shadow">
        <CardHeader className="">
          <div className="flex flex-col sm:flex-row sm:items-start gap-2 justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <CardTitle className="text-lg">
                <span className="text-muted-foreground mr-1">Order ID:</span>
                {order.order_id}
              </CardTitle>
              <Badge
                variant="outline"
                className={`text-${getStatusColor(order.status)}`}
              >
                {getStatusIcon(order.status)}
                <span className="ml-1 capitalize">{order.status}</span>
              </Badge>
            </div>
            <div className="">
              <p className="flex  gap-1 text-sm text-muted-foreground">
                <span>{formatCreatedAt(order.created_at)} •</span>
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
                    from {item.vendor}
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
          <div className="flex justify-between gap-4 items-center flex-wrap">
            <BuyerOrderDetailsDialog
              open={showDetails}
              onOpenChange={setShowDetails}
              order={order}
              getStatusIcon={getStatusIcon}
            />
            <CancelOrder order_id={order.order_id} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default BuyerOrderCard
