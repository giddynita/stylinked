import { useQuery } from '@tanstack/react-query'
import { supabase } from './supabaseClient'
import type { UserDataType, UserRole } from './types'
import { getAuthUser } from './loader'

export const useUserData = () => {
  const getAuthUserDetails = async () => {
    const user = await getAuthUser()
    const { data: userRole, error: userError } = await supabase
      .from('users')
      .select<'role', UserRole>('role')
      .eq('id', user?.id)
      .single()
    if (userError) throw new Error(userError.message)

    const userRoleTable =
      userRole?.role == 'buyer'
        ? 'buyers'
        : userRole?.role == 'vendor'
        ? 'vendors'
        : 'logistics'
    const { data: userData, error: dataError } = await supabase
      .from(userRoleTable)
      .select<'*', UserDataType>('*')
      .eq('id', user?.id)
      .single()
    if (dataError) throw new Error(dataError.message)

    return userData
  }
  const queryData = useQuery({
    queryKey: ['userData'],
    queryFn: getAuthUserDetails,
  })

  return queryData
}

export const useVendorProducts = () => {
  const getVendorProducts = async () => {
    const user = await getAuthUser()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('vendorid', user?.id)

    if (error) throw new Error(error.message)

    return data
  }
  const queryData = useQuery({
    queryKey: ['vendorProducts'],
    queryFn: getVendorProducts,
  })

  return queryData
}
