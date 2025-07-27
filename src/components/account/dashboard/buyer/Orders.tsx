import type { Order } from '@/utils/types'
import { Badge } from '../../../ui/badge'
import { currencyFormatter } from '@/utils/format'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Orders {
  sortedOrders: Order[] | undefined
}

function Orders({ sortedOrders }: Orders) {
  dayjs.extend(relativeTime)
  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'delivered':
        return 'success'
      case 'shipped':
        return 'primary'
      case 'processing':
        return 'warning'
      default:
        return 'secondary'
    }
  }
  return (
    <div className="space-y-4">
      {sortedOrders?.slice(0, 3).map((order) => {
        const { order_id, order_total, status, created_at } = order
        const order_items = sortedOrders?.filter(
          (order) => order.order_id === order_id
        )
        const created_order = dayjs(created_at).fromNow()
        return (
          <div
            key={order_id}
            className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className=" flex items-center gap-1 text-muted-foreground font-medium">
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
                {order_items.length} item{order_items.length > 1 && 's'} •{' '}
                {created_order}
              </p>
            </div>
            <div className="text-right space-y-2">
              <p className="font-semibold text-foreground">
                {currencyFormatter(order_total)}
              </p>
              <Button asChild variant="ghost" size="sm">
                <Link to="/account/orders">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default Orders
