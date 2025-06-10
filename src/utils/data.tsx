import {
  ShoppingCart,
  Store,
  Truck,
  Shield,
  Home,
  StoreIcon,
  Circle,
} from 'lucide-react'

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
    label: 'Client',
    value: 'client',
  },
  {
    label: 'Fashion Designer',
    value: 'designer',
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
    link: '/auth',
  },
]

export const stats = [
  { number: '10K+', label: 'Active Users' },
  { number: '500+', label: 'Verified Vendors' },
  { number: '50K+', label: 'Products Sold' },
  { number: '4.9', label: 'Average Rating' },
]
export const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Fashion Enthusiast',
    text: 'Found the perfect wedding dress through TailorHub. The quality and service exceeded all expectations!',
    rating: 5,
    id: 'testimonial1',
    indicator: Circle,
  },
  {
    name: 'Michael Chen',
    role: 'Tailor & Vendor',
    text: 'TailorHub helped me grow my business from local to nationwide. Amazing platform for artisans!',
    rating: 5,
    id: 'testimonial2',
    indicator: Circle,
  },
  {
    name: 'Emma Davis',
    role: 'Delivery Partner',
    text: 'Flexible schedule and great earnings. Love being part of the TailorHub logistics network.',
    rating: 5,
    id: 'testimonial3',
    indicator: Circle,
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
]
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
        url: '/auth',
      },
      {
        label: 'Create Account',
        url: '/auth/sign-up',
      },
      {
        label: 'Dashboard',
        url: '/',
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
