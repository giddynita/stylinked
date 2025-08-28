import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { updateOrderStatusAction } from '@/utils/action'
import { RefreshCcw } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface UpdateOrderDialogProp {
  trigger: string
  orderID: string
  newStatus: 'processing' | 'shipped'
  oldStatus: string | undefined
}

function UpdateOrderDialog({
  trigger,
  orderID,
  newStatus,
  oldStatus,
}: UpdateOrderDialogProp) {
  const [isUpdateOrderStatusDialogOpen, setIsUpdateOrderStatusDialogOpen] =
    useState(false)

  const { mutate: updateOrderStatus, isPending: updating } =
    updateOrderStatusAction()
  const handleStatusUpdate = (
    orderID: string,
    newStatus: 'processing' | 'shipped'
  ) => {
    setIsUpdateOrderStatusDialogOpen(true)
    updateOrderStatus(
      { order_id: orderID, newStatus },
      {
        onSuccess: () => {
          setIsUpdateOrderStatusDialogOpen(false)
          toast.success(
            `Order Updated - Order ${orderID} status has been changed to ${newStatus}`
          )
        },
        onError: () => {
          toast.error('Error updating order status. Try again.')
        },
      }
    )
  }

  return (
    <AlertDialog
      open={isUpdateOrderStatusDialogOpen}
      onOpenChange={setIsUpdateOrderStatusDialogOpen}
    >
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          disabled={newStatus == oldStatus}
          className="w-full capitalize"
        >
          {trigger}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Order Status</AlertDialogTitle>
          <AlertDialogDescription className="font-medium">
            Are you sure you want to update "Order {orderID}" status to{' '}
            {newStatus}? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={() => handleStatusUpdate(orderID, newStatus)}>
            <RefreshCcw className={`h-4 w-4s ${updating && 'animate-spin'}`} />
            {updating ? 'Updating' : 'Update Status'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default UpdateOrderDialog
