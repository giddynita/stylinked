import { useQuery } from '@tanstack/react-query'
import { supabase } from './supabaseClient'
import type {
  getProductsType,
  ProductWithRating,
  UserDataType,
  UserRole,
  VendorCardProp,
  VendorFilter,
  VendorProfile,
} from './types'
import { getAuthUser } from './loader'
import axios from 'axios'

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

export const useAllProducts = ({
  currentPage,
  itemsPerPage,
  filters,
}: getProductsType) => {
  const getProducts = async () => {
    const fromIndex = (currentPage - 1) * itemsPerPage
    const toIndex = fromIndex + itemsPerPage - 1

    let query = supabase.from('products').select('*', { count: 'exact' })

    if (filters.searchQuery) {
      query = query.ilike('name', `%${filters.searchQuery.trim()}%`)
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

    if (typeof filters.minRating === 'number') {
      query = query.gte('rating', filters.minRating)
    }

    if (filters.inStockOnly) {
      query = query.gte('stock', 1)
    }

    const {
      data: productsData,
      error: productsError,
      count,
    } = await query.range(fromIndex, toIndex)

    if (productsError) throw new Error(productsError.message)

    const { data: reviewsData, error: reviewsError } = await supabase
      .from('reviews')
      .select('id, productid, rating')

    if (reviewsError) throw new Error(reviewsError.message)

    const productsWithRating = productsData.map((p) => {
      const productReviews = reviewsData.filter((r) => r.productid == p.id)
      const year = new Date(p.createdat).getFullYear().toString()
      const totalReviews = productReviews.length
      const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0)
      const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0
      return { ...p, created: year, averageRating, totalReviews }
    })
    return {
      products: productsWithRating as ProductWithRating[],
      total: count ?? 0,
    }
  }
  const queryData = useQuery({
    queryKey: ['products', currentPage, filters],
    queryFn: getProducts,
  })

  return queryData
}

export const useVendorsWithStats = (
  currentPage: number,
  itemsPerPage: number,
  filters: VendorFilter
) => {
  const getVendorsWithStats = async () => {
    const { selectedCity, selectedState, searchQuery } = filters
    const fromIndex = (currentPage - 1) * itemsPerPage
    const toIndex = fromIndex + itemsPerPage - 1

    let query = supabase.from('vendors').select('*', { count: 'exact' })

    if (selectedCity) query = query.eq('city', selectedCity)
    if (selectedState) query = query.eq('state', selectedState)
    if (searchQuery) {
      query = query.ilike('businessname', `%${searchQuery}%`)
    }

    const {
      data: vendorsData,
      count,
      error: vendorsError,
    } = await query.range(fromIndex, toIndex)

    if (vendorsError || !vendorsData) {
      throw new Error(vendorsError.message)
    }
    const vendorIds = vendorsData.map((v) => v.id)

    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('id, created_at')
      .in('id', vendorIds)

    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('id, vendorid')
    const { data: reviewsData, error: reviewsError } = await supabase
      .from('reviews')
      .select('id, productid, rating')

    if (usersError || productsError || reviewsError) {
      throw new Error(
        usersError?.message || productsError?.message || reviewsError?.message
      )
    }
    const vendorWithStats: VendorCardProp[] = vendorsData.map((vendor) => {
      const user = usersData.find((u) => u.id === vendor.id)
      const vendorProducts = productsData.filter(
        (p) => p.vendorid === vendor.id
      )
      const productIds = vendorProducts.map((p) => p.id)
      const vendorReviews = reviewsData.filter((r) =>
        productIds.includes(r.productid)
      )
      const year = new Date(user?.created_at).getFullYear().toString()
      const totalReviews = vendorReviews.length
      const totalRating = vendorReviews.reduce((sum, r) => sum + r.rating, 0)
      const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0

      return {
        ...vendor,
        joinedDate: year || '',
        totalProducts: vendorProducts.length,
        totalReviews,
        rating: averageRating,
      }
    })

    return { vendors: vendorWithStats, totalCount: count || 0 }
  }

  const queryData = useQuery({
    queryKey: ['vendors', currentPage, filters],
    queryFn: getVendorsWithStats,
  })

  return queryData
}

export const useVendorProfile = (vendorId: string | undefined) => {
  const getVendorProfile = async () => {
    if (vendorId) {
      const { data: vendorData, error: vendorError } = await supabase
        .from('vendors')
        .select('*')
        .eq('id', vendorId)
        .single()

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, created_at')
        .eq('id', vendorId)
        .single()

      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('vendorid', vendorId)

      if (productsError || !productsData) {
        throw new Error(productsError?.message)
      }

      const productsIds = productsData.map((p) => p.id)

      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .in('productid', productsIds)

      if (userError || vendorError || reviewsError) {
        throw new Error(
          userError?.message || vendorError?.message || reviewsError?.message
        )
      }
      const productsDataWithRating = productsData.map((p) => {
        const productReviews = reviewsData.filter((r) => r.productid == p.id)
        const year = new Date(p.createdat).getFullYear().toString()
        const totalReviews = productReviews.length
        const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0)
        const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0

        return { ...p, created: year, averageRating, totalReviews }
      })

      const year = new Date(userData?.created_at).getFullYear().toString()
      const totalReviews = reviewsData.length
      const totalRating = reviewsData.reduce((sum, r) => sum + r.rating, 0)
      const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0
      const vendorProfile: VendorProfile = {
        ...vendorData,
        joinedDate: year,
        vendorProducts: productsDataWithRating,
        vendorReviews: reviewsData,
        totalProducts: productsData.length,
        totalReviews,
        rating: averageRating,
      }

      return vendorProfile
    }
  }

  const queryData = useQuery({
    queryKey: ['vendors', vendorId],
    queryFn: getVendorProfile,
  })

  return queryData
}

interface OpayAmount {
  currency: string
  total: number
}

interface OpayProduct {
  name: string
  description: string
}

interface OpayUserInfo {
  userEmail: string
  userId: string
  userMobile: string
  userName: string
}

export interface OpayPaymentData {
  amount: OpayAmount
  callbackUrl?: string
  cancelUrl: string
  country: string
  customerVisitSource?: string
  evokeOpay: boolean
  expireAt: number
  sn?: string
  payMethod: string
  product: OpayProduct
  reference: string
  returnUrl: string
  userInfo: OpayUserInfo
  displayName: string
}

export const useOpayPayment = (data: OpayPaymentData) => {
  const initiatePayment = async () => {
    try {
      const res = await axios.post(
        'https://testapi.opaycheckout.com/api/v1/international/cashier/create',
        data,
        {
          headers: {
            Authorization: import.meta.env.VITE_PUBLIC_KEY,
            MerchantId: import.meta.env.VITE_MERCHANT_ID,
            'Content-Type': 'application/json',
          },
        }
      )
      return res.data
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Request failed')
      } else {
        throw new Error(error.message)
      }
    }
  }
  const queryData = useQuery({
    queryKey: ['payment'],
    queryFn: initiatePayment,
  })

  return queryData
}
