import type { OrderItem } from '@/utils/types'
import { Badge } from '../../../ui/badge'
import { Calendar, Package } from 'lucide-react'
import { currencyFormatter, formatCreatedAt } from '@/utils/format'
import { getStatusColor } from '@/utils/data'
import VendorOrderDetailsDialog from '../../VendorOrderDetailsDialog'

interface Orders {
  data: [string, OrderItem[]][] | null | undefined
}

function Orders({ data }: Orders) {
  const ordersDetails = data?.map(([order_id, order_items]) => {
    const amount = order_items.reduce((acc, item) => {
      const sum = acc + item.price * item.amount
      return sum
    }, 0)
    return {
      order_id,
      order_items,
      customer_email: order_items[0].email,
      customer_name: order_items[0].user_name,
      date: formatCreatedAt(order_items[0].created_at),
      order_amount: amount,
      status: order_items[0].status,
      shipping_address: order_items[0].shipping_address,
      phone: order_items[0].phone,
      tracking_number: '',
    }
  })

  return (
    <div className="space-y-4">
      {ordersDetails?.slice(0, 3).map((order, index) => {
        const {
          customer_name,
          customer_email,
          order_id,
          status,
          date,
          order_items,
          order_amount,
        } = order
        const quantity = order_items.reduce((acc, item) => acc + item.amount, 0)

        return (
          <div
            key={index}
            className="bg-background/50 rounded-lg border border-border/50 hover:bg-background/80 transition-colors duration-200 p-4"
          >
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-x-4 gap-y-2 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{customer_name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {customer_email}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Order #{order_id}
                  </p>
                </div>
                <div className="flex flex-col gap-1 ">
                  <Badge
                    variant="outline"
                    className={`text-${getStatusColor(
                      status
                    )} capitalize sm:ml-auto`}
                  >
                    {status}
                  </Badge>
                  <VendorOrderDetailsDialog order={order} />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm gap-4">
                <div className="flex items-center gap-x-4 gap-y-1 flex-wrap">
                  <p className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{date}</span>
                  </p>
                  <p className="flex items-center gap-1 text-muted-foreground">
                    <Package className="h-3 w-3" />
                    <span>
                      {quantity} unit{quantity !== 1 ? 's' : ''}
                    </span>
                  </p>
                </div>
                <p className="flex items-center gap-1 font-semibold text-primary">
                  {currencyFormatter(order_amount)}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default Orders
