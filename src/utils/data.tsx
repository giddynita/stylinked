import {
  ShoppingCart,
  Store,
  Truck,
  Shield,
  Home,
  StoreIcon,
  Users,
  CreditCard,
  Building2,
  ArrowLeftRight,
  Hash,
  LayoutDashboardIcon,
  PackageIcon,
  User,
  ShoppingBag,
} from 'lucide-react'
import type { Testimonials } from './types'

export const signUp = {
  title: 'Verify your email address',
  desc: "We've sent a verification email. Please check your inbox and follow the instructions to complete your registration.",
  link: '/auth/sign-up',
}
export const reset = {
  title: 'Password reset link sent.',
  desc: "We've sent a password reset link to your email. Please check your inbox and follow the instructions.",
  link: '/auth/forgot-password',
}

export const accountTypeOptions = [
  {
    label: 'Buyer',
    value: 'buyer',
  },
  {
    label: 'Vendor',
    value: 'vendor',
  },
  {
    label: 'Logistics Partner',
    value: 'logistics',
  },
]

export const vehicleTypeSelect = [
  {
    label: 'Car',
    value: 'car',
  },
  {
    label: 'Motorcycle',
    value: 'motorcycle',
  },
  {
    label: 'Bus',
    value: 'bus',
  },
]

export const features = [
  {
    icon: ShoppingCart,
    title: 'Shop Fashion',
    description:
      'Discover unique, custom-tailored fashion items from skilled artisans',
    link: '/marketplace',
  },
  {
    icon: Store,
    title: 'Sell Your Creations',
    description: 'Join our vendor community and showcase your fashion designs',
    link: '/signup',
  },
  {
    icon: Truck,
    title: 'Deliver Orders',
    description: 'Partner with us for reliable fashion item delivery services',
    link: '/signup',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Safe transactions and quality assurance for all users',
    link: '/auth/login',
  },
]

export const stats = [
  { number: '10K+', label: 'Active Users' },
  { number: '500+', label: 'Verified Vendors' },
  { number: '50K+', label: 'Products Sold' },
  { number: '4.9', label: 'Average Rating' },
]
export const testimonials: Testimonials[] = [
  {
    name: 'Sarah Johnson',
    role: 'Fashion Enthusiast',
    text: 'Found the perfect wedding dress through TailorHub. The quality and service exceeded all expectations!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Tailor & Vendor',
    text: 'TailorHub helped me grow my business from local to nationwide. Amazing platform for artisans!',
    rating: 5,
  },
  {
    name: 'Emma Davis',
    role: 'Delivery Partner',
    text: 'Flexible schedule and great earnings. Love being part of the TailorHub logistics network.',
    rating: 5,
  },
]

export const nonUserNavLinks = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Marketplace',
    url: '/marketplace',
  },
  {
    title: 'Vendors',
    url: '/vendors',
  },
]
/* export const userNavLinks = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Marketplace',
    url: '/marketplace',
  },
  {
    title: 'Find Vendors',
    url: '/vendors',
  },
  {
    title: 'Orders',
    url: '/orders',
  },
] */
export const nonUserSidebarNavLinks = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Marketplace',
    url: '/marketplace',
    icon: StoreIcon,
  },
  {
    title: 'Find Vendors',
    url: '/vendors',
    icon: Users,
  },
]
export const nonUserFooterLinks = [
  {
    heading: 'Marketplace',
    links: [
      {
        label: 'Browse Products',
        url: '/',
      },
      {
        label: 'Categories',
        url: '/',
      },
      {
        label: 'Vendors',
        url: '/',
      },
    ],
  },
  {
    heading: 'Account',
    links: [
      {
        label: 'Login',
        url: '/auth/login',
      },
      {
        label: 'Create Account',
        url: '/auth/sign-up',
      },
      {
        label: 'Dashboard',
        url: '/account/dashboard',
      },
    ],
  },
  {
    heading: 'Support',
    links: [
      {
        label: 'Help Center',
        url: '/',
      },
      {
        label: 'Contact Us',
        url: '/',
      },
      {
        label: 'Terms of Service',
        url: '/',
      },
    ],
  },
]

export const categories = [
  'all',
  'dresses',
  'suits',
  'shirts',
  'pants',
  'accessories',
  'formal wear',
  'casual wear',
]

export const progress = [
  {
    number: 1,
    name: 'shipping',
  },
  {
    number: 2,
    name: 'review',
  },
  {
    number: 3,
    name: 'payment',
  },
]
export const paymentMethods = [
  {
    id: 'card',
    title: 'Bank Card',
    description: 'Pay instantly with your debit or credit card',
    icon: CreditCard,
    popular: true,
  },
  {
    id: 'bank',
    title: 'Bank Account',
    description: 'Direct payment from your bank account',
    icon: Building2,
  },
  {
    id: 'bank_transfer',
    title: 'Bank Transfer',
    description: 'Transfer funds directly between banks',
    icon: ArrowLeftRight,
  },
  {
    id: 'ussd',
    title: 'Bank USSD',
    description: 'Pay using USSD codes from your mobile device',
    icon: Hash,
  },
]

export const southwestStates = {
  Lagos: ['Ikeja', 'Badagry', 'Epe', 'Ikorodu', 'Surulere'],
  Ogun: ['Abeokuta', 'Ijebu-Ode', 'Sagamu', 'Ota', 'Ilaro'],
  Oyo: ['Ibadan', 'Ogbomoso', 'Oyo', 'Iseyin', 'Eruwa'],
  Osun: ['Osogbo', 'Ilesa', 'Ife', 'Ikirun', 'Ejigbo'],
  Ondo: ['Akure', 'Owo', 'Ondo', 'Okitipupa', 'Ikare'],
  Ekiti: ['Ado-Ekiti', 'Ikere', 'Ise', 'Oye', 'Ijero'],
}

export const vendorNavigation = [
  { title: 'Dashboard', url: 'dashboard', icon: LayoutDashboardIcon },
  { title: 'Products', url: 'products', icon: PackageIcon },
  { title: 'Orders', url: 'orders', icon: ShoppingBag },
  { title: 'Settings', url: 'settings', icon: User },
]
export const buyerNavigation = [
  { title: 'Dashboard', url: 'dashboard', icon: LayoutDashboardIcon },
  { title: 'Orders', url: 'orders', icon: ShoppingBag },
  { title: 'Settings', url: 'settings', icon: User },
]

export const getStatusColor = (status: string | undefined) => {
  switch (status) {
    case 'delivered':
      return 'success'
    case 'shipped':
      return 'primary'
    case 'processing':
      return 'warning'
    case 'cancelled':
      return 'destructive'
    default:
      return 'secondary'
  }
}

export const getUrgencyLevel = (current: number) => {
  if (current == 0)
    return {
      level: 'out of stock',
      className: 'bg-destructive text-white',
      label: 'Out of Stock',
    }
  if (current <= 3)
    return {
      level: 'critical',
      className: 'bg-destructive text-white',
      label: 'Critical',
    }
  if (current <= 10)
    return {
      level: 'low',
      className: 'bg-warning text-white ',
      label: 'Low',
    }
  return {
    level: 'active',
    className: 'bg-success text-white',
    label: 'Active',
  }
}

export const productCategories = [
  {
    value: 'dresses',
    label: 'Dresses',
  },
  {
    value: 'suits',
    label: 'Suits',
  },
  {
    value: 'shirts',
    label: 'Shirts',
  },
  {
    value: 'pants',
    label: 'Pants',
  },
  {
    value: 'accessories',
    label: 'Accessories',
  },
  {
    value: 'sneakers',
    label: 'Sneakers',
  },
]

export const productSizesList = {
  dresses: [
    {
      value: 'S',
      label: 'S',
    },
    {
      value: 'M',
      label: 'M',
    },
    {
      value: 'L',
      label: 'L',
    },
    {
      value: 'XL',
      label: 'XL',
    },
  ],
  suits: [
    {
      value: 'S',
      label: 'S',
    },
    {
      value: 'M',
      label: 'M',
    },
    {
      value: 'L',
      label: 'L',
    },
    {
      value: 'XL',
      label: 'XL',
    },
  ],
  shirts: [
    {
      value: 'S',
      label: 'S',
    },
    {
      value: 'M',
      label: 'M',
    },
    {
      value: 'L',
      label: 'L',
    },
    {
      value: 'XL',
      label: 'XL',
    },
  ],
  pants: [
    {
      value: 'S',
      label: 'S',
    },
    {
      value: 'M',
      label: 'M',
    },
    {
      value: 'L',
      label: 'L',
    },
    {
      value: 'XL',
      label: 'XL',
    },
  ],
  accessories: [
    {
      value: 'N/A',
      label: 'Not applicable',
    },
    {
      value: 'S',
      label: 'S',
    },
    {
      value: 'M',
      label: 'M',
    },
    {
      value: 'L',
      label: 'L',
    },
    {
      value: 'XL',
      label: 'XL',
    },
  ],
  sneakers: [
    {
      value: '36',
      label: '36',
    },
    {
      value: '37',
      label: '37',
    },
    {
      value: '38',
      label: '38',
    },
    {
      value: '39',
      label: '39',
    },
    {
      value: '40',
      label: '40',
    },
    {
      value: '41',
      label: '41',
    },
    {
      value: '42',
      label: '42',
    },
  ],
}

export const colorsList = [
  {
    value: 'red',
    label: 'Red',
  },
  {
    value: 'blue',
    label: 'Blue',
  },
  {
    value: 'black',
    label: 'Black',
  },
  {
    value: 'white',
    label: 'White',
  },
  {
    value: 'multicolor',
    label: 'Multicolor',
  },
]
