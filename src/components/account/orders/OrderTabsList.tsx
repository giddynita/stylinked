import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { CustomerOrder, Order } from '@/utils/types'

interface OrderTabsListProp {
  orders: CustomerOrder[] | Order[] | undefined
}

function OrderTabsList({ orders }: OrderTabsListProp) {
  const getOrderCounts = () => {
    return {
      all: orders?.length,
      pending: orders?.filter((o) => o.status === 'pending').length,
      processing: orders?.filter((o) => o.status === 'processing').length,
      shipped: orders?.filter((o) => o.status === 'shipped').length,
      delivered: orders?.filter((o) => o.status === 'delivered').length,
    }
  }
  const counts = getOrderCounts()
  return (
    <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 gap-2 h-full ">
      <TabsTrigger
        value="all"
        className="text-[10px] py-3 sm:text-xs cursor-pointer"
      >
        All ({counts.all})
      </TabsTrigger>
      <TabsTrigger
        value="pending"
        className="text-[10px] py-3 sm:text-xs cursor-pointer "
      >
        Pending ({counts.pending})
      </TabsTrigger>
      <TabsTrigger
        value="processing"
        className="text-[10px] py-3 sm:text-xs cursor-pointer"
      >
        Processing ({counts.processing})
      </TabsTrigger>
      <TabsTrigger
        value="shipped"
        className="text-[10px] py-3 sm:text-xs cursor-pointer"
      >
        Shipped ({counts.shipped})
      </TabsTrigger>
      <TabsTrigger
        value="delivered"
        className="text-[10px] py-3 sm:text-xs cursor-pointer"
      >
        Delivered ({counts.delivered})
      </TabsTrigger>
    </TabsList>
  )
}

export default OrderTabsList
