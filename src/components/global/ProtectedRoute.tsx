import { GlobalContext } from '@/utils/globalContext'
import { useContext, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { useSessionContext, useUser } from '@supabase/auth-helpers-react'
import LoadingIcon from './LoadingIcon'

const ProtectedRoute = ({ children }: { children: any }) => {
  const { isLoading } = useSessionContext()
  const user = useUser()
  const pathname = useLocation().pathname
  const { setPathname } = useContext(GlobalContext)

  useEffect(() => {
    if (!isLoading && !user) {
      setPathname(pathname)
    }
  }, [])

  if (isLoading) {
    return <LoadingIcon />
  }

  if (!user) {
    toast.warning('You must be logged in to access this page.')
    return <Navigate to="/auth/login" />
  }
  return children
}
export default ProtectedRoute
