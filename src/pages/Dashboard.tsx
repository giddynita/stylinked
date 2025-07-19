import { AccountPagesHeading } from '@/components/headings'
import { DashboardStats, RecentOrdersCard } from '@/components/account'
import LowStockCard from '@/components/account/dashboard/LowStockCard'

const Dashboard = () => {
  return (
    <section className="space-y-6">
      <AccountPagesHeading
        pageTitle="Dashboard"
        pageDesc="Your business metrics at a glance"
      />
      {/* Stats Grid */}
      <DashboardStats />
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Orders */}
        <RecentOrdersCard />
        {/* Low Stock Alert */}
        <LowStockCard />
      </div>
    </section>
  )
}

export default Dashboard
