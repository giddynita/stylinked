import { Link, NavLink } from 'react-router-dom'
import { Logo, ProfileImage } from '../global'
import { Button } from '../ui/button'
import ModeToggle from '../theme/mode-toggle'
import { SidebarTrigger } from '../ui/sidebar'
import { nonUserNavLinks } from '@/utils/data'
import { useEffect, useState } from 'react'
import Cart from './Cart'
import { useUser } from '@supabase/auth-helpers-react'
function AppHeader() {
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const user = useUser()
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 50 && currentScrollY > lastScrollY) {
        setShowHeader(false)
      } else {
        setShowHeader(true)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])
  return (
    <header
      className={`bg-navbarbg/80 backdrop-blur-md shadow-sm sticky w-full top-0 z-50 py-3 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Logo icon="w-5 h-5" text="text-sm" />
        <div className="hidden md:flex items-center gap-x-8">
          <nav className="hidden md:flex items-center space-x-1 font-medium text-sm px-2">
            {nonUserNavLinks.map((item, index) => (
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
          <div className="flex flex-row gap-x-2 items-center">
            <ModeToggle align="end" />
            <Cart />
            {user ? (
              <ProfileImage />
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link
                    to="/auth"
                    className="text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    Login
                  </Link>
                </Button>

                <Button size="sm">
                  <Link to="/auth/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="md:hidden flex flex-row gap-x-2 items-center">
          <ModeToggle align="end" />
          <Cart />
          <SidebarTrigger />
        </div>
      </div>
    </header>
  )
}
export default AppHeader
