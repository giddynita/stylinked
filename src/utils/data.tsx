import type { Options, VerificationPageDetails } from './types'

export const signUp: VerificationPageDetails = {
  title: 'Verify your email address',
  desc: "We've sent a verification email. Please check your inbox and follow the instructions to complete your registration.",
  link: '/sign-up',
}
export const reset: VerificationPageDetails = {
  title: 'Password reset link sent.',
  desc: "We've sent a password reset link to your email. Please check your inbox and follow the instructions.",
  link: '/reset-password',
}

export const accountTypeOptions: Options[] = [
  {
    label: 'Client',
    value: 'client',
  },
  {
    label: 'Fashion Designer',
    value: 'designer',
  },
  {
    label: 'Logistics',
    value: 'logistics',
  },
]

export const vehicleTypeSelect: Options[] = [
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
