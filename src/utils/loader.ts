import { supabase } from './supabaseClient'
import type { Product, Reviews } from './types'

export const getAuthUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    console.error('No user found or error:', error?.message)
  }
  return user
}

export const getSingleProduct = async (productId: string | undefined) => {
  if (productId) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()

    if (error) throw new Error(error.message)

    return data as Product
  }
}

export const getReviews = async (productid: string | undefined) => {
  if (productid) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('productid', productid)

    if (error) throw new Error(error.message)

    return data as Reviews[]
  }
}
