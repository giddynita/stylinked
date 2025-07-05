import { Outlet } from 'react-router-dom'

function MarketplaceLayout() {
  return (
    <main className="w-screen">
      <Outlet />
    </main>
  )
}
export default MarketplaceLayout
