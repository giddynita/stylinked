import { defaultNavlinks, vendorNavlinks } from '@/utils/data'
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
    <nav className="hidden md:flex md:flex-1 items-center justify-center font-medium text-base ">
      {navlinks.map((item) => {
        return (
          <NavLink
            to={item.url}
            key={item.title}
            className={({ isActive }) =>
              isActive
                ? 'text-primary py-2 px-3  hover:bg-primary/10 rounded-lg'
                : 'text-muted-foreground py-2 px-3 hover:text-foreground hover:bg-secondary hover:bg-muted rounded-lg'
            }
          >
            {item.title}
          </NavLink>
        )
      })}
    </nav>
  )
}
export default Navbar
