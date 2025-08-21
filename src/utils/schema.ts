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
    required_error: 'You need to select an account type',
  }),
  firstname: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters',
    })
    .max(20, {
      message: 'name must be less than 20 characters',
    }),
  lastname: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters',
    })
    .max(20, {
      message: 'name must be less than 20 characters',
    }),
  businessname: z
    .string()
    .min(2, {
      message: 'Business name must be at least 2 characters',
    })
    .max(30, {
      message: 'name must be less than 30 characters',
    }),
  phone: z
    .string()
    .trim()
    .startsWith('0', { message: 'Phone number must start with 0' })
    .length(11, {
      message: 'Please enter a valid 11-digit phone number',
    }),
  vehicletype: z.string({
    required_error: 'Please select a vehicle type',
  }),
  coveragearea: z.string().min(3),
})

export type LogisticsFormSchema = z.infer<typeof logisticsFormSchema>

export const vendorFormSchema = z.object({
  role: z.enum(['buyer', 'vendor', 'logistics'], {
    required_error: 'You need to select an account type',
  }),
  firstname: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters',
    })
    .max(20, {
      message: 'name must be less than 20 characters',
    }),
  lastname: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters',
    })
    .max(20, {
      message: 'name must be less than 20 characters',
    }),
  businessname: z
    .string()
    .min(2, {
      message: 'Business name must be at least 2 characters.',
    })
    .max(30, {
      message: 'name must be less than 30 characters.',
    }),
  phone: z
    .string()
    .trim()
    .startsWith('0', { message: 'Phone number must start with 0.' })
    .length(11, {
      message: 'Please enter a valid 11-digit phone number.',
    }),
  city: z.string().trim().min(3, { message: 'Please enter a valid city' }),
  state: z.string().trim().min(3, { message: 'Please enter a valid state' }),
})
export type VendorFormSchema = z.infer<typeof vendorFormSchema>

export const buyerFormSchema = z.object({
  role: z.enum(['buyer', 'vendor', 'logistics'], {
    required_error: 'You need to select an account type',
  }),
  firstname: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters',
    })
    .max(20, {
      message: 'name must be less than 20 characters',
    }),
  lastname: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters',
    })
    .max(20, {
      message: 'name must be less than 20 characters',
    }),
  phone: z
    .string()
    .trim()
    .startsWith('0', { message: 'Phone number must start with 0' })
    .length(11, {
      message: 'Please enter a valid 11-digit phone number',
    }),
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
    .min(6, { message: 'Password must contain at least 6 character(s)' })
    .max(50),
  confirmPassword: z
    .string()
    .min(6, { message: 'Password must contain at least 6 character(s)' })
    .max(50),
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>

export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message)
    toast.error(errors.join(', '))
    return
  }
  return result.data
}

export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters',
    })
    .max(50, {
      message: 'name must be less than 50 characters',
    }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length
      return wordCount >= 10 && wordCount <= 100
    },
    {
      message: 'Description must be between 10 and 100 words',
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
  category: z.string().min(1, {
    message: 'Please select a category',
  }),
  material: z.string(),
})

export const reviewSchema = z.object({
  rating: z.number().int().min(1, {
    message: 'Please give a rating',
  }),
  comment: z.string().refine(
    (reviewText) => {
      const wordCount = reviewText.split(' ').length
      return wordCount <= 100
    },
    {
      message: 'Comment must not be greater than between 100 words',
    }
  ),
  name: z.string(),
  productid: z.string(),
  productname: z.string(),
})

export const shippingInfoSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  firstname: z
    .string()
    .trim()
    .min(2, { message: 'Please enter a valid first name' }),
  lastname: z.string().trim().min(2, { message: 'Please enter a last name.' }),
  address: z.string().refine(
    (address) => {
      const wordCount = address.split(' ').length
      return wordCount >= 4
    },
    {
      message: 'Please enter a valid address',
    }
  ),
  zipcode: z
    .string()
    .length(6, { message: 'Please enter a valid zip or postal code' }),
  city: z.string().trim().min(3, { message: 'Please enter valid city' }),
  state: z.string().trim().min(3, { message: 'Please enter valid state' }),
  country: z.string(),
  phone: z
    .string()
    .trim()
    .startsWith('0', { message: 'Phone number must start with 0' })
    .length(11, {
      message: 'Please enter a valid 11-digit phone number',
    }),
})

export const registrationSchemaMap = {
  buyer: buyerFormSchema,
  vendor: vendorFormSchema,
  logistics: logisticsFormSchema,
}

export const VendorBusinessFormSchema = z.object({
  businessname: z
    .string()
    .min(2, {
      message: 'Business name must be at least 2 characters.',
    })
    .max(30, {
      message: 'name must be less than 30 characters.',
    }),
  description: z.string().refine(
    (description) => {
      if (!description || description.trim() === '') return true
      const wordCount = description.trim().split(/\s+/).length
      return wordCount >= 10 && wordCount <= 200
    },
    {
      message: 'Description must be between 10 and 200 words',
    }
  ),
  city: z.string().trim().min(3, { message: 'Please enter a valid city' }),
  state: z.string().trim().min(3, { message: 'Please enter a valid state' }),
})

export const ProfileFormSchema = z.object({
  phone: z
    .string()
    .trim()
    .startsWith('0', { message: 'Phone number must start with 0' })
    .length(11, {
      message: 'Please enter a valid 11-digit phone number',
    }),
})

export const PasswordFormSchema = z.object({
  password: z.string().min(6).max(50),
})
