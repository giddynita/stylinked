import { supabase } from './supabaseClient'
import type { getProductsType, Product, Reviews } from './types'

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

export const getProducts = async ({
  currentPage,
  itemsPerPage,
  filters,
}: getProductsType) => {
  const fromIndex = (currentPage - 1) * itemsPerPage
  const toIndex = fromIndex + itemsPerPage - 1

  let query = supabase.from('products').select('*', { count: 'exact' })

  if (filters.searchQuery) {
    query = query.ilike('name', `%${filters.searchQuery}%`)
  }

  if (filters.priceRange) {
    query = query
      .gte('price', filters.priceRange[0])
      .lte('price', filters.priceRange[1])
  }

  if (filters.selectedBrands?.length) {
    query = query.in('brand', filters.selectedBrands)
  }

  if (filters.selectedMaterials?.length) {
    query = query.in('material', filters.selectedMaterials)
  }

  if (filters.minRating !== 0) {
    query = query.gte('rating', filters.minRating)
  }

  if (filters.inStockOnly) {
    query = query.gt('stock', 0)
  }

  const { data, error, count } = await query.range(fromIndex, toIndex)

  if (error) throw new Error(error.message)

  return { products: data as Product[], total: count ?? 0 }
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
