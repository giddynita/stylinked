import { useBuyerOrders } from '@/utils/hooks'
import DashboardStats from './DashboardStats'
import RecentOrdersCard from './RecentOrdersCard'

function BuyerDashboard() {
  const { data: ordersData, isLoading: ordersDataLoading } = useBuyerOrders()
  return (
    <div className="space-y-6 my-6">
      <DashboardStats
        ordersData={ordersData}
        ordersDataLoading={ordersDataLoading}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <RecentOrdersCard
          ordersData={ordersData}
          ordersDataLoading={ordersDataLoading}
        />
      </div>
    </div>
  )
}
export default BuyerDashboard
