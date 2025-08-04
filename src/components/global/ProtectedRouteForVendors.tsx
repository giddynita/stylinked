import { useUserData } from '@/utils/hooks'
import LoadingIcon from './LoadingIcon'
import { Navigate } from 'react-router-dom'
import { useUser } from '@supabase/auth-helpers-react'

function ProtectedRouteForVendors({ children }: { children: any }) {
  const { data: userInfo, isLoading } = useUserData()
  const user = useUser()

  if (user && isLoading) {
    return <LoadingIcon />
  }

  if (userInfo?.userRole.role == 'vendor') {
    return <Navigate to="/restricted_access" />
  }
  return children
}
export default ProtectedRouteForVendors
