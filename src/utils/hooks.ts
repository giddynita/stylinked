import { useQuery } from '@tanstack/react-query'
import { supabase } from './supabaseClient'
import type {
  getProductsType,
  Grouped,
  Order,
  OrderItem,
  OrdersByBuyer,
  OrdersTrendData,
  OrdersWithPendingOrderNo,
  Product,
  ProductTrendData,
  ProductWithRating,
  SingleProduct,
  UserDataType,
  UserRole,
  VendorCard,
  VendorFilter,
  VendorProfile,
} from './types'
import { getAuthUser } from './loader'
import type { PostgrestError } from '@supabase/supabase-js'

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

    return { userData, userRole }
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

    return data as Product[]
  }

  const queryData = useQuery({
    queryKey: ['products'],
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

    const productsWithRating: ProductWithRating[] = productsData.map((p) => {
      const productReviews = reviewsData.filter((r) => r.productid == p.id)
      const year = new Date(p.createdat).getFullYear().toString()
      const totalReviews = productReviews.length
      const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0)
      const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0
      return { ...p, created: year, averageRating, totalReviews }
    })
    const filteredbyRating = productsWithRating.filter(
      (p) => p.averageRating >= filters.minRating
    )

    return {
      products: filteredbyRating,
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

    if (vendorsError) {
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
    const vendorWithStats: VendorCard[] = vendorsData.map((vendor) => {
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
    queryKey: [currentPage, filters, 'vendors-stat'],
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
        const averageRating =
          totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0

        return { ...p, created: year, averageRating, totalReviews }
      })

      const year = new Date(userData?.created_at).getFullYear().toString()
      const totalReviews = reviewsData.length
      const totalRating = reviewsData.reduce((sum, r) => sum + r.rating, 0)
      const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0
      const sortedReviews = reviewsData.sort((a, b) => {
        const tsA = new Date(a.createdat).getTime()
        const tsB = new Date(b.createdat).getTime()
        return tsB - tsA
      })
      const vendorProfile: VendorProfile = {
        ...vendorData,
        joinedDate: year,
        vendorProducts: productsDataWithRating,
        vendorReviews: sortedReviews,
        totalProducts: productsData.length,
        totalReviews,
        rating: averageRating,
      }

      return vendorProfile
    }
  }

  const queryData = useQuery({
    queryKey: ['vendor-profile'],
    queryFn: getVendorProfile,
  })

  return queryData
}

export const useSingleProduct = (id: string) => {
  const getSingleProductWithRating = async () => {
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (productError) throw new Error(productError.message)

    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select('*')
      .eq('productid', id)

    if (reviewsError) throw new Error(reviewsError.message)
    const sortedReviews = reviews.sort((a, b) => {
      const tsA = new Date(a.createdat).getTime()
      const tsB = new Date(b.createdat).getTime()
      return tsB - tsA
    })

    const totalReviews = sortedReviews.length
    const totalRating = sortedReviews.reduce((sum, r) => sum + r.rating, 0)
    const averageRating =
      totalReviews > 0 ? parseInt((totalRating / totalReviews).toFixed(1)) : 0

    const singleProductWithRating: SingleProduct = {
      ...product,
      productReviews: sortedReviews,
      totalReviews,
      averageRating,
    }
    return singleProductWithRating
  }

  const queryData = useQuery({
    queryKey: ['single product'],
    queryFn: getSingleProductWithRating,
  })

  return queryData
}

export const useVendorProductTrend = () => {
  const getVendorProductTrend = async () => {
    const user = await getAuthUser()
    const { data: trendData, error } = await supabase.rpc(
      'get_daily_product_trend_for_vendor',
      {
        vendor_id: user?.id,
      }
    )

    if (error) throw new Error(error.message)

    return trendData as ProductTrendData[]
  }
  const queryData = useQuery({
    queryKey: ['products-trend'],
    queryFn: getVendorProductTrend,
  })
  return queryData
}

export const useVendorOrders = () => {
  const getVendorOrders = async () => {
    const user = await getAuthUser()

    const {
      data,
      error: ordersError,
    }: { data: OrderItem[] | null; error: PostgrestError | null } =
      await supabase.from('order_items').select('*').eq('vendor_id', user?.id)
    const pendingOrders = data?.filter((order) => order.status === 'pending')

    if (ordersError) throw new Error(ordersError.message)
    const grouped: Grouped | null =
      data &&
      data?.reduce((acc: Grouped, obj) => {
        ;(acc[obj.order_id] ??= []).push(obj)
        return acc
      }, {})
    const sortedGroupedOrders =
      grouped &&
      Object.entries(grouped).sort((a, b) => {
        const tsA = new Date(a[1][0].created_at).getTime()
        const tsB = new Date(b[1][0].created_at).getTime()
        return tsB - tsA
      })

    const ordersWithPendingOrderNo = {
      orders: data,
      pendingOrdersLength: pendingOrders?.length,
      sortedGroupedOrders,
    }

    return ordersWithPendingOrderNo as OrdersWithPendingOrderNo
  }
  const queryData = useQuery({
    queryKey: ['orders'],
    queryFn: getVendorOrders,
  })

  return queryData
}

export const useVendorOrdersTrend = () => {
  const getOrdersTrend = async () => {
    const user = await getAuthUser()
    const { data: trendData, error } = await supabase.rpc(
      'get_daily_orders_trend_by_vendor',
      {
        input_vendor_id: user?.id,
      }
    )

    if (error) throw new Error(error.message)

    return trendData as OrdersTrendData[]
  }

  const queryData = useQuery({
    queryKey: ['orders-trend'],
    queryFn: getOrdersTrend,
  })
  return queryData
}

export const useBuyerOrders = () => {
  const getBuyerOrders = async () => {
    const user = await getAuthUser()

    const {
      data: order,
      error: ordersError,
    }: { data: Order[] | null; error: PostgrestError | null } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user?.id)
    const orderIds = order?.map((o) => o.order_id)
    const {
      data: orderItems,
      error: orderItemsError,
    }: { data: OrderItem[] | null; error: PostgrestError | null } =
      await supabase
        .from('order_items')
        .select('*')
        .in('order_id', orderIds as string[])

    if (ordersError || orderItemsError)
      throw new Error(ordersError?.message || orderItemsError?.message)

    const pendingOrders = order?.filter((order) => order.status === 'pending')
    const completedOrders = order?.filter(
      (order) => order.status === 'delivered'
    )
    const sortedOrders = order?.sort((a, b) => {
      const tsA = new Date(a.created_at).getTime()
      const tsB = new Date(b.created_at).getTime()
      return tsB - tsA
    })

    const ordersByBuyer: OrdersByBuyer = {
      pendingOrdersLength: pendingOrders?.length,
      completedOrdersLength: completedOrders?.length,
      sortedOrders,
      orderItems,
    }

    return ordersByBuyer
  }
  const queryData = useQuery({
    queryKey: ['orders'],
    queryFn: getBuyerOrders,
  })

  return queryData
}
