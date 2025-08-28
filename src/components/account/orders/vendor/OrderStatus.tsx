import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { CustomerOrder } from '@/utils/types'
import { RefreshCcw } from 'lucide-react'
import UpdateOrderDialog from './UpdateOrderDialog'

interface OrderStatusProp {
  order: CustomerOrder
}
type OrderStatus = ['processing', 'shipped']
const orderStatus: OrderStatus = ['processing', 'shipped']

function OrderStatus({ order }: OrderStatusProp) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="h-8">
          <RefreshCcw className={`h-4 w-4 mr-1`} />
          Update Status
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-2 w-34">
        {orderStatus.map((status, index) => {
          return (
            <DropdownMenuItem asChild key={index}>
              <UpdateOrderDialog
                newStatus={status}
                trigger={status}
                orderID={order.order_id}
                oldStatus={order?.status}
              />
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default OrderStatus
