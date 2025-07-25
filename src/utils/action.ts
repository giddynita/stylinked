import { toast } from 'sonner'
import { bucket, supabase } from './supabaseClient'

import type {
  ForgotPasswordAction,
  LoginAction,
  LogoutAction,
  Order,
  OrderItem,
  Product,
  ResetPasswordAction,
  ReviewsForm,
  SignUpAction,
  UpdateProduct,
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
    console.log(error.message)
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
    console.log(error.message)
  }
  toast.success(
    'Password reset successful! You can now log in with your new password'
  )
  return navigate('/auth/login')
}

export const loginAction = async (props: LoginAction) => {
  const { email, password, setSubmitting, navigate, pathname } = props
  setSubmitting(true)
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    toast.error('Failed to login')
    console.log(error.message)
    setSubmitting(false)
    return
  }
  toast.success("Welcome! You're logged in.")
  setSubmitting(false)

  return navigate(pathname)
}

export const forgotPasswordAction = async (props: ForgotPasswordAction) => {
  const { email, setSubmitting, navigate } = props
  setSubmitting(true)
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://stylinked.netlify.app/auth/reset-password',
  })
  if (error) {
    toast.error('Failed')
    console.log(error.message)
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
    location,
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
      location,
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

export const logoutAction = async (props: LogoutAction) => {
  const { setLogout, navigate } = props
  setLogout(true)
  navigate('/')
  const { error } = await supabase.auth.signOut()
  if (error) {
    toast.error('Failed to logout')
    setLogout(false)
    return
  }
  toast.success("You're logged out successfully.")
  setLogout(false)
  return
}

export const uploadImage = async (images: File[]) => {
  const timestamp = Date.now()
  const uploadedImageUrls = []
  try {
    for (let i = 0; i < images.length; i++) {
      const file = images[i]
      const newFileName = `${timestamp}-${file.name}`

      const { error } = await supabase.storage
        .from(bucket)
        .upload(newFileName, file)

      if (error) {
        console.log(`Upload error: ${error.message}`)
        toast.error('Images upload failed!')
        return
      }
      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(newFileName)

      uploadedImageUrls.push(publicUrlData.publicUrl)
    }

    return uploadedImageUrls
  } catch (error) {
    console.log(error)
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
    orderData: Order
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
