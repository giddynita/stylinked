import { toast } from 'sonner'
import { z, ZodSchema } from 'zod'

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
  role: z.enum(['buyer', 'vendor', 'logistics'], {
    required_error: 'You need to select an account type.',
  }),
  firstname: z.string().min(2).max(20),
  lastname: z.string().min(2).max(20),
  businessname: z.string().min(2).max(30),
  phone: z.string(),
  vehicletype: z.string({
    required_error: 'Please select an option',
  }),
  coveragearea: z.string().min(1),
})

export type LogisticsFormSchema = z.infer<typeof logisticsFormSchema>

export const vendorFormSchema = z.object({
  role: z.enum(['buyer', 'vendor', 'logistics'], {
    required_error: 'You need to select an account type.',
  }),
  firstname: z.string().min(2).max(20),
  lastname: z.string().min(2).max(20),
  businessname: z.string().min(2).max(30),
  phone: z.string(),
  location: z.string().max(10),
})
export type VendorFormSchema = z.infer<typeof vendorFormSchema>

export const buyerFormSchema = z.object({
  role: z.enum(['buyer', 'vendor', 'logistics'], {
    required_error: 'You need to select an account type.',
  }),
  firstname: z.string().min(2).max(20),
  lastname: z.string().min(2).max(20),
  phone: z.string(),
})

export type BuyerFormSchema = z.infer<typeof buyerFormSchema>

export const emptySchema = z.object({
  role: z.string(),
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

export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message)
    toast(errors.join(', '))
    return
  }
  return result.data
}

export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(100, {
      message: 'name must be less than 100 characters.',
    }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length
      return wordCount >= 10 && wordCount <= 1000
    },
    {
      message: 'Description must be between 10 and 1000 words',
    }
  ),
  price: z.coerce
    .number({
      message: 'Price must be only numbers',
    })
    .int()
    .min(1, {
      message: 'Price must be greater than 0',
    }),
  brand: z.string(),
  category: z.string().min(2, {
    message: 'Please select a category',
  }),
  material: z.string(),
  rating: z.number(),
})

export const reviewSchema = z.object({
  rating: z.number(),
  text: z.string().refine(
    (reviewText) => {
      const wordCount = reviewText.split(' ').length
      return wordCount >= 5 && wordCount <= 100
    },
    {
      message: 'Description must be between 5 and 100 words.',
    }
  ),
  name: z.string(),
  productId: z.string(),
})
