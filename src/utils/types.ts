import type { User } from '@supabase/supabase-js'
import type {
  BuyerFormSchema,
  EmptySchema,
  LogisticsFormSchema,
  VendorFormSchema,
} from './schema'

export type Options = {
  value: string
  label: string
}

export type AccountType = 'buyer' | 'vendor' | 'logistics'

export type InputProps = {
  form: any
  label?: string
  placeholder?: string
  type?: string
  name: string
}
export type VerificationPageDetails = {
  title: string
  desc: string
  link: string
}
export type SignUp = {
  email: string
  password: string
  confirmPassword: string
  setSubmitting: (value: boolean) => void
  navigate: (value: string) => void
}

export type ResetPassword = {
  password: string
  confirmPassword: string
  setSubmitting: (value: boolean) => void
  navigate: (value: string) => void
}
export type Login = {
  email: string
  password: string
  setSubmitting: (value: boolean) => void
}
export type Logout = (value: string) => void

export type ForgotPassword = {
  email: string
  setSubmitting: (value: boolean) => void
  navigate: (value: string) => void
}
export type Features = {
  icon: any
  title: string
  description: string
  link: string
}
export type Stat = {
  number: string
  label: string
}
export type Testimonials = {
  name: string
  role: string
  text: string
  rating: number
}

export type FooterLinkGroup = {
  heading: string
  links: { label: string; url: string }[]
}

export type ColorQuantity = { color: string; quantity: number }
export type Variant = { size: string; colors: ColorQuantity[] }

export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  material: string
  brand: string
  stock: number
  variants: Variant[]
  images: string[]
  vendorid: string
  createdat: string
  rating: number
  vendor: string
  updated_at: string
}

export type UpdateProduct = {
  id: string | undefined
  payload: Product
}

export type UserRole = {
  role: AccountType
}

export type UserDataType = {
  id: string
  firstname: string
  lastname: string
  phone: string
  vehicletype?: string
  coveragearea?: string[]
  businessname?: string
  description?: string
  city?: string
  state?: string
}

export type AppUser = {
  userData: UserDataType | null
  userRole: UserRole | null
  user: User | null
}

export type ProductFilter = {
  priceRange: number[]
  minRating: number
  inStockOnly: boolean
  selectedMaterials?: string[]
  selectedBrands?: string[]
  searchQuery?: string
}
export type GetProductsType = {
  currentPage: number
  itemsPerPage: number
  filters: ProductFilter
}

export interface AdvancedFiltersProps {
  onClose?: () => void
  priceRange: number[]
  selectedMaterials: string[]
  selectedBrands: string[]
  inStockOnly: boolean
  minRating: number
  searchQuery: string
  setPriceRange: (prices: number[]) => void
  setSelectedMaterials: (materials: string[]) => void
  setSelectedBrands: (brands: string[]) => void
  setInStockOnly: (stock: boolean) => void
  setMinRating: (price: number) => void
  setFilters: ({
    priceRange,
    selectedMaterials,
    selectedBrands,
    inStockOnly,
    minRating,
    searchQuery,
  }: ProductFilter) => void
  isLoading: boolean
  maxPrice: number | undefined
}

export type ReviewsForm = {
  productid: string | undefined
  rating: number
  comment: string
  name: string
  productname: string | undefined
  vendorname: string | undefined
  vendorid: string | undefined
  userid: string
}

export type Reviews = {
  rating: number
  productid: string
  name: string
  comment: string
  id: string
  createdat: string
  productname: string
  vendorname: string
  vendorid: string
  userid: string
}

export type CartItemType = {
  images: string[]
  name: string
  price: number
  color: string
  size: string
  availableVariants: Variant[]
  amount: number
  id: string
  vendor: string
  vendorid: string
}

export interface Cart {
  cartItems: CartItemType[]
  numItemsInCart: number
  cartTotal: number
  shipping: number
  orderTotal: number
  tax: number
}
export type CheckoutType = {
  shippingForm: {
    email: string
    firstname: string
    lastname: string
    address: string
    city: string
    state: string
    zipcode: string
    country: string
    phone: string
  }
  step: number
  paymentMethod: {
    id: string
    name: string
  }
}

export type PaymentMethod = 'card' | 'bank' | 'bank_transfer' | 'ussd'

export interface PaymentMethodOption {
  id: PaymentMethod
  title: string
  description: string
  icon: any
  popular?: boolean
}

export interface VendorCard {
  rating: number
  totalReviews: number
  joinedDate: string
  totalProducts: number
  id: string
  firstname: string
  lastname: string
  businessname: string
  phone: string
  city: string
  state: string
  description: string
  image: string
}
export type VendorFilter = {
  selectedState?: string
  selectedCity?: string
  searchQuery?: string
}
export type getVendorsType = {
  currentPage: number
  itemsPerPage: number
  filters: VendorFilter
}

export type Vendor = {
  id: string
  firstname: string
  lastname: string
  businessname: string
  phone: string
  city: string
  state: string
  description: string
  image: string
}

export type ProductWithRating = Product & {
  created: string
  averageRating: number
  totalReviews: number
}
export type VendorProfile = VendorCard & {
  vendorProducts: ProductWithRating[]
  vendorReviews: Reviews[]
}
export type Order = {
  shipping_method: string
  created_at: string
  updates_at?: string
  shipping_fee: number
  order_total: number
  payment_method: string
  status?: string
  user_id: string | undefined
  order_id: string
  shipping_info: {
    email: string
    firstname: string
    lastname: string
    address: string
    zipcode: string
    city: string
    state: string
    country: string
    phone: string
  }
  id?: string
  reference: string
}

export type OrderItem = {
  id?: string
  order_id: string
  product_id: string
  images: string[]
  name: string
  price: number
  color: string
  size: string
  amount: number
  vendor: string
  vendor_id: string
  status?: string
  created_at: string
  user_name: string
  email: string
  reference: string
  shipping_address: string
  phone: string
}
export type Grouped = Record<string, OrderItem[]>
export type ProductTrendData = {
  day: string
  products_added: number
}

export type OrdersWithPendingOrderNo = {
  orders: OrderItem[]
  pendingOrdersLength: number | undefined
  sortedGroupedOrders: [string, OrderItem[]][] | null
}
export type OrdersTrendData = {
  day: string
  order_items_added: number
  order_amount_added: number
}
export type PaystackRef = {
  reference: string
  trans: string
  status: string
  message: string
  transaction: string
  trxref: string
  redirecturl: string
}

export type CustomerOrder = {
  order_id: string
  order_items: OrderItem[]
  customer_email: string
  customer_name: string
  date: string | undefined
  order_amount: number
  status: string | undefined
  /* shipping_method: string */
  shipping_address: string
  tracking_number: string
  phone: string
}

export type SingleProduct = Product & {
  productReviews: Reviews[]
  totalReviews: number
  averageRating: number
}
export type OrdersByBuyer = {
  pendingOrdersLength: number | undefined
  completedOrdersLength: number | undefined
  sortedOrders: Order[] | undefined
  orderItems: OrderItem[] | null
}

export type OrderAndOrderItems = {
  shipping_method: string
  created_at: string
  updates_at?: string
  shipping_fee: number
  order_total: number
  payment_method: string
  status?: string
  user_id: string | undefined
  order_id: string
  shipping_info: {
    email: string
    firstname: string
    lastname: string
    address: string
    zipcode: string
    city: string
    state: string
    country: string
    phone: string
  }
  id?: string
  reference: string
  orderItems: OrderItem[] | undefined
  tracking_number?: string
  estimated_delivery?: string
}

export type SelectItems = {
  value: string
  label: string
}

export type registrationSchemaTypes =
  | BuyerFormSchema
  | VendorFormSchema
  | LogisticsFormSchema
  | EmptySchema

export type settingsSchemaTypes =
  | BuyerFormSchema
  | VendorFormSchema
  | LogisticsFormSchema
