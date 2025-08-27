import { RedirectPathContext } from '@/components/redirectPath/redirectPathProvider'
import { useContext, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }: { children: any }) => {
  const { user } = useSelector((state: any) => state.userState)
  const pathname = useLocation().pathname
  const { setPathname } = useContext(RedirectPathContext)

  useEffect(() => {
    if (!user) {
      setPathname(pathname)
    }
  }, [])

  if (!user) {
    return <Navigate to="/auth/login" />
  }
  return children
}
export default ProtectedRoute
