import { Logo } from '@/components/global'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className="scrollable">
      <header className="w-max mx-auto mt-10 -mb-10">
        <Logo icon="w-10 h-10" text="text-3xl" />
      </header>
      <Outlet />
    </div>
  )
}
export default AuthLayout
