import { Link } from 'react-router-dom'
import { Logo } from '../global'
import { Button } from '../ui/button'
import ModeToggle from '../theme/mode-toggle'
import { SidebarTrigger } from '../ui/sidebar'
import { lazy, Suspense, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import { User } from 'lucide-react'
const Cart = lazy(() => import('./Cart'))
const ProfileImage = lazy(() => import('../global/ProfileImage'))

function AppHeader() {
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { userRole, userData, user } = useSelector(
    (state: any) => state.userState
  )
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          setShowHeader(currentScrollY <= 50 || currentScrollY < lastScrollY)
          setLastScrollY(currentScrollY)
          ticking = false
        })

        ticking = true
      }
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
      <div className="container flex items-center justify-between gap-10">
        <Logo icon="w-5 h-5" text="text-sm" />
        <div className="hidden md:flex md:flex-1 items-center gap-x-8">
          <Navbar role={userRole} />
          <div className="flex flex-row gap-x-2 items-center">
            <ModeToggle align="end" />
            <Suspense fallback={null}>
              {userRole === 'buyer' && <Cart />}
            </Suspense>
            <Suspense fallback={<User className="h-4 w-4" />}>
              {user && <ProfileImage userData={userData} />}
            </Suspense>
            {!user && (
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
          <Suspense fallback={null}>
            {userRole === 'buyer' && <Cart />}
          </Suspense>
          <SidebarTrigger />
        </div>
      </div>
    </header>
  )
}
export default AppHeader
