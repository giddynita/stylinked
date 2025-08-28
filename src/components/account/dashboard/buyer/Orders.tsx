import type { OrderAndOrderItems } from '@/utils/types'
import { Badge } from '@/components/ui/badge'
import { currencyFormatter } from '@/utils/format'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getStatusColor } from '@/utils/format'
import BuyerOrderDetailsDialog from '@/components/account/BuyerOrderDetailsDialog'
interface Orders {
  sortedOrders: OrderAndOrderItems[] | undefined
}

function Orders({ sortedOrders }: Orders) {
  dayjs.extend(relativeTime)

  return (
    <div className="space-y-4">
      {sortedOrders?.slice(0, 3).map((order) => {
        const { order_id, order_total, status, created_at } = order
        const created_order = dayjs(created_at).fromNow()
        return (
          <div
            key={order_id}
            className="flex flex-col md:flex-row  justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className=" flex items-center gap-1 text-muted-foreground font-medium text-sm">
                  Order ID:
                  <span className=" text-foreground">{order_id}</span>
                </p>
                <Badge
                  variant="outline"
                  className={`text-${getStatusColor(status)} capitalize`}
                >
                  {status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {order.orderItems && order?.orderItems.length} item
                {order.orderItems && order.orderItems.length > 1 && 's'} •{' '}
                {created_order}
              </p>
            </div>
            <div className="text-right space-y-1">
              <p className="font-semibold text-foreground text-sm">
                {currencyFormatter(order_total)}
              </p>
              {/* <Button asChild variant="outline" size="sm">
                <Link to="/account/orders">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  View Details
                </Link>
              </Button> */}
              <BuyerOrderDetailsDialog order={order} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default Orders
