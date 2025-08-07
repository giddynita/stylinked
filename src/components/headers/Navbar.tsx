import { defaultNavlinks, vendorNavlinks } from '@/utils/data'
import { Button } from '../ui/button'
import { NavLink } from 'react-router-dom'
import { useMemo } from 'react'

interface NavbarProp {
  role: string | undefined
}

function Navbar({ role }: NavbarProp) {
  const navlinks = useMemo(() => {
    if (role == 'vendor') {
      return vendorNavlinks
    }
    return defaultNavlinks
  }, [role])

  return (
    <nav className="hidden md:flex md:flex-1 items-center justify-center space-x-1 font-medium text-sm px-2">
      {navlinks.map((item, index) => (
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
      ))}
    </nav>
  )
}
export default Navbar
