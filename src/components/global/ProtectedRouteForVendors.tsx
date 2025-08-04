import { useUserData } from '@/utils/hooks'
import LoadingIcon from './LoadingIcon'
import { Navigate } from 'react-router-dom'

function ProtectedRouteForVendors({ children }: { children: any }) {
  const { data: userInfo, isLoading: userRoleLoading } = useUserData()

  if (userRoleLoading) {
    return <LoadingIcon />
  }

  if (userInfo?.userRole.role == 'vendor') {
    return <Navigate to="/restricted_access" />
  }
  return children
}
export default ProtectedRouteForVendors
