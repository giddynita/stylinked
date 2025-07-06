import {
  useMutation,
  useQuery,
  useQueryClient,
  type MutationFunction,
} from '@tanstack/react-query'
import { supabase } from './supabaseClient'
import type { Product, UpdateProduct, UserDataType, UserRole } from './types'
import { getAuthUser } from './loader'

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

export const useUserData = () =>
  useQuery({
    queryKey: ['userData'],
    queryFn: getAuthUserDetails,
  })

const getVendorProducts = async () => {
  const user = await getAuthUser()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('vendorid', user?.id)

  if (error) throw new Error(error.message)

  return data
}

export const useVendorProducts = () =>
  useQuery({
    queryKey: ['vendorProducts'],
    queryFn: getVendorProducts,
  })

const deleteProduct = async (productId: string) => {
  const { error } = await supabase.from('products').delete().eq('id', productId)
  if (error) throw new Error(error.message)
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendorProducts'] })
    },
  })
}

const addProduct = async (product: Product) => {
  const user = await getAuthUser()
  const { error } = await supabase.from('products').insert([
    {
      ...product,
      vendorid: user?.id,
    },
  ])
  if (error) throw new Error(error.message)
}

export const useAddProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendorProducts'] })
    },
  })
}

const updateProduct: MutationFunction<{ data: any }, UpdateProduct> = async ({
  id,
  payload,
}) => {
  const { data, error } = await supabase
    .from('products')
    .update(payload)
    .eq('id', id)
  if (error) {
    throw new Error(error.message)
  }
  return { data }
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendorProducts'] })
    },
  })
}
