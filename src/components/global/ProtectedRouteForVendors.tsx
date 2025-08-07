import { Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

function ProtectedRouteForVendors({ children }: { children: any }) {
  const { userRole } = useSelector((state: any) => state.userState)

  if (userRole == 'vendor') {
    return <Navigate to="/restricted_access" />
  }
  return children
}
export default ProtectedRouteForVendors
