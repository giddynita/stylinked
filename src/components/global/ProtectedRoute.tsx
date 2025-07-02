import { useUser } from '@supabase/auth-helpers-react'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'

const ProtectedRoute = ({ children }: { children: any }) => {
  const user = useUser()

  if (!user) {
    toast('You must be logged in to access this page.')
    return <Navigate to="/auth/login" />
  }
  return children
}
export default ProtectedRoute
