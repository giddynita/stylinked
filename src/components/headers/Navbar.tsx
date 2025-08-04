import { defaultNavlinks, vendorNavlinks } from '@/utils/data'
import { useUserData } from '@/utils/hooks'
import { Button } from '../ui/button'
import { NavLink } from 'react-router-dom'
import { Skeleton } from '../ui/skeleton'

function Navbar() {
  const { data: userInfo, isLoading } = useUserData()

  const navlinks =
    userInfo?.userRole?.role == 'vendor' ? vendorNavlinks : defaultNavlinks
  return (
    <nav className="hidden md:flex md:flex-1 items-center justify-center space-x-1 font-medium text-sm px-2">
      {isLoading ? (
        <Skeleton className="w-40 h-6" />
      ) : (
        navlinks.map((item, index) => (
          <Button variant="ghost" size="sm" key={index}>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'text-primary' : 'text-muted-foreground'
              }
              to={item.url}
            >
              {item.title}
            </NavLink>
          </Button>
        ))
      )}
    </nav>
  )
}
export default Navbar
