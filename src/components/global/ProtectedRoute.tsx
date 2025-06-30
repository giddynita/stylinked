import { getAuthUser } from '@/utils/action'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'

const ProtectedRoute = ({ children }: { children: any }) => {
  const user = getAuthUser()

  if (!user) {
    toast('You must be logged in to access this page.')
    return <Navigate to="/auth/login" />
  }
  return children
}
export default ProtectedRoute
