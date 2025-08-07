import { GlobalContext } from '@/utils/globalContext'
import { useContext, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }: { children: any }) => {
  const { user } = useSelector((state: any) => state.userState)
  const pathname = useLocation().pathname
  const { setPathname } = useContext(GlobalContext)

  useEffect(() => {
    if (!user) {
      setPathname(pathname)
    }
  }, [])

  if (!user) {
    toast.warning('You must be logged in to access this page.')
    return <Navigate to="/auth/login" />
  }
  return children
}
export default ProtectedRoute
