import type { OrderItem } from '@/utils/types'
import { Badge } from '../../ui/badge'
import { Calendar, Package } from 'lucide-react'
import { currencyFormatter, formatCreatedAt } from '@/utils/format'

interface Orders {
  data: [string, OrderItem[]][] | null | undefined
}

function Orders({ data }: Orders) {
  return (
    <div className="space-y-4">
      {data?.slice(0, 3).map(([_, order_items], index) => {
        const total = order_items.reduce(
          (acc, item) => acc + item.price * item.amount,
          0
        )
        const quantity = order_items.reduce((acc, item) => acc + item.amount, 0)
        const { user_name, email, order_id, status, created_at } =
          order_items[0]
        return (
          <div
            key={index}
            className="bg-background/50 rounded-lg border border-border/50 hover:bg-background/80 transition-colors duration-200 p-4"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{user_name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{email}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Order #{order_id}
                  </p>
                </div>
                <div className="flex justify-start sm:justify-end">
                  <Badge
                    variant={
                      status == 'pending'
                        ? 'outline'
                        : status == 'cancelled'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className="capitalize"
                  >
                    {status}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm gap-4">
                <div className="flex items-center gap-x-4 gap-y-1 flex-wrap">
                  <p className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatCreatedAt(created_at)}</span>
                  </p>
                  <p className="flex items-center gap-1 text-muted-foreground">
                    <Package className="h-3 w-3" />
                    <span>
                      {quantity} product{quantity !== 1 ? 's' : ''}
                    </span>
                  </p>
                </div>
                <p className="flex items-center gap-1 font-semibold text-primary">
                  {currencyFormatter(total)}
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
