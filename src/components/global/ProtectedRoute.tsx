import { GlobalContext } from '@/utils/globalContext'
import { useUser } from '@supabase/auth-helpers-react'
import { useContext, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'

const ProtectedRoute = ({ children }: { children: any }) => {
  const user = useUser()
  const location = useLocation().pathname
  const { setPathname } = useContext(GlobalContext)
  useEffect(() => {
    if (!user) {
      setPathname(location)
    }
  }, [])

  if (!user) {
    toast('You must be logged in to access this page.')

    return <Navigate to="/auth/login" />
  }
  return children
}
export default ProtectedRoute
