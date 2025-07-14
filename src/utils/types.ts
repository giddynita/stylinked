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
export type SignUpAction = {
  email: string
  password: string
  confirmPassword: string
  setSubmitting: (value: boolean) => void
  navigate: (value: string) => void
}

export type ResetPasswordAction = {
  password: string
  confirmPassword: string
  setSubmitting: (value: boolean) => void
  navigate: (value: string) => void
}
export type LoginAction = {
  email: string
  password: string
  setSubmitting: (value: boolean) => void
  navigate: (value: string) => void
  pathname: string
}
export type LogoutAction = {
  setLogout: (value: boolean) => void
  navigate: (value: string) => void
}
export type ForgotPasswordAction = {
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

export interface ProductFormProps {
  product?: any
  onSubmit: (data: any) => void
  onCancel: () => void
  onSubmitting: boolean
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
}

export type UpdateProduct = {
  id: string | undefined
  payload: Product
}

export type UserRole = {
  role: string
}

export type UserDataType = {
  id: string
  firstname: string
  lastname: string
  phone: string
  vehicletype?: string
  coveragearea?: string[]
  businessname?: string
  location?: string
}

export interface ProductCardProps {
  product: Product
}

export interface SmartPaginationProps {
  totalPages: number
  currentPage: number
  handlePageChange: (page: number) => void
}

export interface CategoriesCarouselProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export type ProductFilter = {
  priceRange: number[]
  minRating: number
  inStockOnly: boolean
  selectedMaterials?: string[]
  selectedBrands?: string[]
  searchQuery?: string
}
export type getProductsType = {
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
  name: string
  comment: string
  rating: number
  productid: string
}

export type Reviews = {
  rating: number
  productid: string
  name: string
  comment: string
  id: string
  createdat: string
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
}

export interface Cart {
  cartItems: CartItemType[]
  numItemsInCart: number
  cartTotal: number
  shipping: number
  orderTotal: number
  tax: number
}
export interface CheckoutType {
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

export type PaymentMethod =
  | 'BankAccount'
  | 'BankTransfer'
  | 'BankCard'
  | 'BankUssd'

export interface PaymentMethodOption {
  id: PaymentMethod
  title: string
  description: string
  icon: any
  popular?: boolean
}
