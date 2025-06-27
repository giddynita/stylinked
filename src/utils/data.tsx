import {
  ShoppingCart,
  Store,
  Truck,
  Shield,
  Home,
  StoreIcon,
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
    link: '/auth',
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
