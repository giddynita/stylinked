import { toast } from 'sonner'
import { bucket, supabase } from './supabaseClient'

import type {
  AccountType,
  ForgotPasswordAction,
  LoginAction,
  Order,
  OrderItem,
  Product,
  ResetPasswordAction,
  ReviewsForm,
  SignUpAction,
  UpdateProduct,
  UserDataType,
} from './types'
import { parseStringToArray } from './format'
import {
  useMutation,
  useQueryClient,
  type MutationFunction,
} from '@tanstack/react-query'
import { getAuthUser } from './loader'

export const signUpAction = async (props: SignUpAction) => {
  const { email, password, confirmPassword, setSubmitting, navigate } = props
  if (password !== confirmPassword) {
    toast.warning('Passwords do not match')
    return
  }
  setSubmitting(true)
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        'https://stylinked.netlify.app/auth/complete-registration',
    },
  })
  if (error) {
    toast.error('Failed to sign up')
    setSubmitting(false)
    return
  }
  toast.success(
    "We've sent a verification email to complete your account registration."
  )
  setSubmitting(false)
  return navigate('/auth/verification/signUp')
}

export const resetPasswordAction = async (props: ResetPasswordAction) => {
  const { password, confirmPassword, setSubmitting, navigate } = props
  if (password !== confirmPassword) {
    toast.warning('Passwords do not match')
    return
  }
  setSubmitting(true)
  const { error } = await supabase.auth.updateUser({
    password,
  })
  if (error) {
    toast.error('Password reset failed!')
    navigate('/auth/forgot-password')
  }
  toast.success(
    'Password reset successful! You can now log in with your new password'
  )
  return navigate('/auth/login')
}

export const loginAction = () => {
  const login = async (props: LoginAction) => {
    const { email, password } = props
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw new Error(error.message)
  }

  const queryClient = useQueryClient()

  const loginFunction = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] })
    },
  })

  return loginFunction
}

export const forgotPasswordAction = async (props: ForgotPasswordAction) => {
  const { email, setSubmitting, navigate } = props
  setSubmitting(true)
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://stylinked.netlify.app/auth/reset-password',
  })
  if (error) {
    toast.error('Failed')
    setSubmitting(false)
    return
  }
  toast.success(
    'If an account with this email exists, a password reset link has been sent.'
  )
  setSubmitting(false)
  return navigate('/auth/verification/reset')
}

export const completeRegistrationAction = async (props: any) => {
  const {
    role,
    firstname,
    lastname,
    phone,
    businessname,
    city,
    state,
    coveragearea,
    vehicletype,
    setSubmitting,
    navigate,
  } = props
  setSubmitting(true)
  const {
    data: { user },
  } = await supabase.auth.getUser()
  await supabase.from('users').insert({
    id: user && user.id,
    role,
  })
  if (role === 'buyer') {
    await supabase.from('buyers').insert({
      id: user && user.id,
      firstname,
      lastname,
      phone,
    })
  }
  if (role === 'vendor') {
    await supabase.from('vendors').insert({
      id: user && user.id,
      firstname,
      lastname,
      businessname,
      phone,
      city,
      state,
    })
  }
  if (role === 'logistics') {
    const coverageareaArray = parseStringToArray(coveragearea)
    await supabase.from('logistics').insert({
      id: user && user.id,
      firstname,
      lastname,
      businessname,
      phone,
      vehicletype,
      coveragearea: coverageareaArray,
    })
  }
  toast.success('Account created successfully!')
  navigate('/')
}

export const logoutAction = () => {
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
  }

  const queryClient = useQueryClient()
  const logoutFunction = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] })
    },
  })

  return logoutFunction
}

export const uploadImage = async (images: File[]) => {
  const timestamp = Date.now()
  try {
    const uploadedImageUrls: string[] = await Promise.all(
      images.map(async (file) => {
        const newFileName = `${timestamp}-${file.name}`
        const { error } = await supabase.storage
          .from(bucket)
          .upload(newFileName, file)
        if (error) {
          toast.error('Images upload failed!')
          return ''
        }
        const { data: publicUrlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(newFileName)
        return publicUrlData.publicUrl
      })
    )

    return uploadedImageUrls
  } catch (error) {
    toast.error('An error occured')
  }
}

export const deleteImage = (url: string) => {
  const imageName = url.split('/').pop()
  if (!imageName) throw new Error('Invalid URL')
  return supabase.storage.from(bucket).remove([imageName])
}

export const deleteProductAction = () => {
  const deleteProduct = async (productId: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)
    if (error) throw new Error(error.message)
  }
  const queryClient = useQueryClient()

  const deleteProductFunction = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['products-trend'] })
      queryClient.invalidateQueries({ queryKey: ['vendor-profile'] })
      queryClient.invalidateQueries({ queryKey: ['vendors-stat'] })
    },
  })

  return deleteProductFunction
}

export const addProductAction = () => {
  const addProduct = async (product: Product) => {
    const user = await getAuthUser()
    const { error } = await supabase.from('products').insert([
      {
        ...product,
        vendorid: user?.id,
      },
    ])
    if (error) throw new Error(error.message)
  }
  const queryClient = useQueryClient()

  const addProductFunction = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['products-trend'] })
      queryClient.invalidateQueries({ queryKey: ['vendor-profile'] })
      queryClient.invalidateQueries({ queryKey: ['vendors-stat'] })
    },
  })

  return addProductFunction
}

export const updateProductAction = () => {
  const updateProduct: MutationFunction<{ data: any }, UpdateProduct> = async ({
    id,
    payload,
  }) => {
    const { data, error } = await supabase
      .from('products')
      .update(payload)
      .eq('id', id)
    if (error) {
      throw new Error(error.message)
    }
    return { data }
  }
  const queryClient = useQueryClient()
  const updateProductFunction = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['single-product'] })
      queryClient.invalidateQueries({ queryKey: ['products-trend'] })
      queryClient.invalidateQueries({ queryKey: ['vendor-profile'] })
      queryClient.invalidateQueries({ queryKey: ['vendors-stat'] })
    },
  })
  return updateProductFunction
}

export const addReviewAction = () => {
  const addReview = async (review: ReviewsForm) => {
    const { error } = await supabase.from('reviews').insert([review])
    if (error) throw new Error(error.message)
  }

  const queryClient = useQueryClient()

  const addReviewFunction = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['single product'] })
      queryClient.invalidateQueries({ queryKey: ['vendor-profile'] })
      queryClient.invalidateQueries({ queryKey: ['vendors-stat'] })
    },
  })

  return addReviewFunction
}
export const addOrdersAction = () => {
  const addOrder = async ({
    orderData,
    orderItems,
  }: {
    orderData: Omit<Order, 'created_at'>
    orderItems: Omit<OrderItem, 'created_at'>[]
  }) => {
    const { error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
    if (orderError) throw new Error(orderError.message)
    const { error: orderItemsError } = await supabase
      .from('order_items')
      .insert(orderItems)
    if (orderItemsError) throw new Error(orderItemsError.message)
  }

  const queryClient = useQueryClient()

  const addOrderFunction = useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['orders-trend'] })
    },
  })

  return addOrderFunction
}

export const updateSettings = async ({
  role,
  newData,
  uid,
}: {
  role: AccountType
  newData: any
  uid: string
}) => {
  const userTable = role !== 'logistics' ? `${role}s` : 'logistics'
  const { data, error } = await supabase
    .from(userTable)
    .update(newData)
    .eq('id', uid)
    .select('*')
    .single()

  if (error) {
    throw new Error(error.message)
  }
  return data as UserDataType
}

export const updatePassword = async ({
  email,
  oldPassword,
  newPassword,
}: {
  email: string
  oldPassword: string
  newPassword: string
}) => {
  const { error: oldPasswordError } = await supabase.auth.signInWithPassword({
    email,
    password: oldPassword,
  })
  if (oldPasswordError) {
    toast.error('Incorrect current password')
    return null
  }

  const { data, error: newPasswordError } = await supabase.auth.updateUser({
    password: newPassword,
  })
  if (newPasswordError) {
    toast.error('Password update failed!')
    return null
  }

  return data.user
}

export const updateOrderStatusAction = () => {
  const updateOrderStatus = async ({
    uid,
    newStatus,
  }: {
    uid: string
    newStatus: 'processing' | 'shipped'
  }) => {
    const { data, error } = await supabase
      .from('order_items')
      .update({ status: newStatus })
      .eq('vendor_id', uid)

    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  const queryClient = useQueryClient()

  const updateOrderStatusFunction = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
  return updateOrderStatusFunction
}
