import { Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import type { UserRole } from '@/utils/types'

function ProtectedRouteForVendors({ children }: { children: any }) {
  const { userRole }: { userRole: UserRole } = useSelector(
    (state: any) => state.userState
  )

  if (userRole?.role == 'vendor') {
    return <Navigate to="/restricted_access" />
  }
  return children
}
export default ProtectedRouteForVendors
