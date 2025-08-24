import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { updateOrderStatusAction } from '@/utils/action'
import type { CustomerOrder } from '@/utils/types'
import { RefreshCcw } from 'lucide-react'
import { toast } from 'sonner'

interface OrderStatusProp {
  order: CustomerOrder
}

const orderStatus = ['processing', 'shipped']

function OrderStatus({ order }: OrderStatusProp) {
  const { mutate: updateOrderStatus, isPending: updating } =
    updateOrderStatusAction()

  const handleStatusUpdate = (
    orderId: string,
    newStatus: 'processing' | 'shipped'
  ) => {
    updateOrderStatus(
      { order_id: orderId, newStatus },
      {
        onSuccess: () => {
          toast.success(
            `Order Updated - Order ${orderId} status changed to ${newStatus}`
          )
        },
        onError: () => {
          toast.error('Error updating order status')
        },
      }
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="h-8">
          <RefreshCcw
            className={`h-4 w-4 mr-1 ${updating && 'animate-spin'}`}
          />
          Update Status
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-2 w-34">
        {orderStatus.map((status, index) => {
          return (
            <DropdownMenuItem asChild key={index}>
              <Button
                size="sm"
                variant="outline"
                className="text-xs w-full capitalize cursor-pointer"
                disabled={status == order.status}
                onClick={() =>
                  handleStatusUpdate(
                    order.order_id,
                    order.status === 'pending' ? 'processing' : 'shipped'
                  )
                }
              >
                {status}{' '}
              </Button>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default OrderStatus
