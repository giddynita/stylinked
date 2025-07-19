import ActiveProductsCard from './ActiveProductsCard'
import PendingOrdersCard from './PendingOrdersCard'
import TotalRevenueCard from './TotalRevenueCard'

function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
      <TotalRevenueCard />
      <ActiveProductsCard />
      <PendingOrdersCard />
    </div>
  )
}
export default DashboardStats
