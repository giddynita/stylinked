import { AccountPagesHeading } from '@/components/headings'
import {
  DashboardStats,
  LowStockCard,
  RecentOrdersCard,
} from '@/components/account'

const Dashboard = () => {
  return (
    <>
      <AccountPagesHeading
        pageTitle="Dashboard"
        pageDesc="Your business metrics at a glance"
      />
      <div className="space-y-6 my-6">
        {/* Stats Grid */}
        <DashboardStats />
        <div className="grid gap-4 md:grid-cols-2">
          {/* Recent Orders */}
          <RecentOrdersCard />
          {/* Low Stock Alert */}
          <LowStockCard />
        </div>
      </div>
    </>
  )
}

export default Dashboard
