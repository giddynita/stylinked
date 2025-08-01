import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { getStatusColor } from '@/utils/data'
import { currencyFormatter, formatCreatedAt } from '@/utils/format'
import type { OrderAndOrderItems } from '@/utils/types'
import { Eye } from 'lucide-react'

interface BuyerOrderDetailsDialogProps {
  order: OrderAndOrderItems
  open: boolean
  onOpenChange: (open: boolean) => void
}

function BuyerOrderDetailsDialog({
  order,
  open,
  onOpenChange,
}: BuyerOrderDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order ID - {order.order_id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium">{formatCreatedAt(order.created_at)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge
                variant="outline"
                className={`text-${getStatusColor(order.status)}`}
              >
                {order.status}
                <span className="ml-1 capitalize">{order.status}</span>
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="font-medium text-lg">
                {currencyFormatter(order.order_total)}
              </p>
            </div>
            {order.tracking_number && (
              <div>
                <p className="text-sm text-muted-foreground">Tracking Number</p>
                <p className="font-mono">{order.tracking_number}</p>
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Items Ordered</p>
            <div className="space-y-2">
              {order?.orderItems?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-y-2 gap-x-4 justify-between sm:items-center p-3 bg-accent/30 rounded-md"
                >
                  <div>
                    <p className="font-medium">
                      {item.amount}x {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Vendor: {item.vendor}
                    </p>
                  </div>
                  <p className="font-medium text-muted-foreground">
                    {currencyFormatter(item.price * item.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {order.estimated_delivery && (
            <div>
              <p className="text-sm text-muted-foreground">
                Estimated Delivery
              </p>
              <p className="font-medium">{order.estimated_delivery}</p>
            </div>
          )}

          {/* {order.status === 'cancelled' && (order as any).cancelReason && (
            <div>
              <p className="text-sm text-muted-foreground">
                Cancellation Reason
              </p>
              <p className="text-destructive">{(order as any).cancelReason}</p>
            </div>
          )} */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default BuyerOrderDetailsDialog
