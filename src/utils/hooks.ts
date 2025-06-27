import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAuthUser } from './action'
import { supabase } from './supabaseClient'

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
