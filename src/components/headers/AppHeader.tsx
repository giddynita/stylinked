import { Link } from 'react-router-dom'
import { Logo } from '../global'
import { SidebarTrigger } from '../ui/sidebar'
import { lazy, Suspense, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import { User } from 'lucide-react'
const Cart = lazy(() => import('./Cart'))
const ProfileImage = lazy(() => import('../global/ProfileImage'))
const ModeToggle = lazy(() => import('../theme/mode-toggle'))

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
        <div className="hidden md:flex md:flex-1 justify-between gap-x-4">
          <Navbar role={userRole} />
          <div className="flex flex-row gap-x-2 items-center">
            <Suspense fallback={null}>
              <ModeToggle align="end" />
            </Suspense>
            <Suspense fallback={null}>
              {userRole !== 'buyer' && <Cart />}
            </Suspense>
            <Suspense fallback={<User className="h-4 w-4" />}>
              {user && <ProfileImage userData={userData} />}
            </Suspense>
            {!user && (
              <>
                <Link
                  to="/auth"
                  className="text-muted-foreground hover:text-primary bg-secondary py-2 px-4 text-base font-medium rounded-lg border"
                >
                  Login
                </Link>
                <Link
                  to="/auth/sign-up"
                  className="bg-primary py-2 px-4 text-base font-medium rounded-lg hover:bg-primary/80"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="md:hidden flex flex-row gap-x-2 items-center justify-b">
          <Suspense fallback={<div className="w-[32px] h-[32px]" />}>
            <ModeToggle align="end" />
          </Suspense>
          <Suspense fallback={<div className="w-[32px] h-[32px]" />}>
            {userRole !== 'buyer' && <Cart />}
          </Suspense>
          <SidebarTrigger />
        </div>
      </div>
    </header>
  )
}
export default AppHeader
