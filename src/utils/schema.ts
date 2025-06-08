import { z } from 'zod'

export const signupFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must contain at least 6 character(s).' })
    .max(50),
  confirmPassword: z
    .string()
    .min(6, { message: 'Password must contain at least 6 character(s).' })
    .max(50),
})

export type SignupFormSchema = z.infer<typeof signupFormSchema>

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>

export const logisticsFormSchema = z.object({
  accountType: z.enum(['client', 'designer', 'logistics']),
  businessName: z.string().min(2).max(20),
  phone: z.string(),
  vehicleType: z.string({
    required_error: 'Please select an option',
  }),
})

export type LogisticsFormSchema = z.infer<typeof logisticsFormSchema>

export const designerFormSchema = z.object({
  accountType: z.enum(['client', 'designer', 'logistics'], {
    required_error: 'You need to select an account type.',
  }),
  businessName: z.string().min(2).max(20),
  phone: z.string(),
})
export type DesignerFormSchema = z.infer<typeof designerFormSchema>

export const clientFormSchema = z.object({
  accountType: z.enum(['client', 'designer', 'logistics'], {
    required_error: 'You need to select an account type.',
  }),
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  phone: z.string(),
})

export type ClientFormSchema = z.infer<typeof clientFormSchema>

export const emptySchema = z.object({
  accountType: z.string(),
})

export type EmptySchema = z.infer<typeof emptySchema>

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'Password must contain at least 6 character(s).' })
    .max(50),
  confirmPassword: z
    .string()
    .min(6, { message: 'Password must contain at least 6 character(s).' })
    .max(50),
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
