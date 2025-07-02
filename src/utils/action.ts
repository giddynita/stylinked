import { toast } from 'sonner'
import { bucket, supabase } from './supabaseClient'

import type {
  ForgotPasswordAction,
  LoginAction,
  LogoutAction,
  ResetPasswordAction,
  SignUpAction,
} from './types'
import { parseStringToArray } from './format'

export const signUpAction = async (props: SignUpAction) => {
  const { email, password, confirmPassword, setSubmitting, navigate } = props
  if (password !== confirmPassword) {
    toast('Passwords do not match')
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
    toast(error.message)
    setSubmitting(false)
    return
  }
  toast(
    "We've sent a verification email to complete your account registration."
  )
  setSubmitting(false)
  return navigate('/auth/verification/signUp')
}

export const resetPasswordAction = async (props: ResetPasswordAction) => {
  const { password, confirmPassword, setSubmitting, navigate } = props
  if (password !== confirmPassword) {
    toast('Passwords do not match')
    return
  }
  setSubmitting(true)
  const { error } = await supabase.auth.updateUser({
    password,
  })
  if (error) {
    toast('Password reset failed!')
    navigate('/auth/forgot-password')
    console.log(error.message)
  }
  toast('Password reset successful! You can now log in with your new password')
  return navigate('/auth/login')
}

export const loginAction = async (props: LoginAction) => {
  const { email, password, setSubmitting, navigate } = props
  setSubmitting(true)
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    toast(error.message)
    setSubmitting(false)
    return
  }
  toast("Welcome! You're logged in.")
  setSubmitting(false)
  return navigate('/')
}

export const forgotPasswordAction = async (props: ForgotPasswordAction) => {
  const { email, setSubmitting, navigate } = props
  setSubmitting(true)
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://stylinked.netlify.app/auth/reset-password',
  })
  if (error) {
    toast(error.message)
    setSubmitting(false)
    return
  }
  toast(
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
  toast('Account created successfully!')
  navigate('/')
}

export const logoutAction = async (props: LogoutAction) => {
  const { setLogout, navigate } = props
  setLogout(true)
  const { error } = await supabase.auth.signOut()
  if (error) {
    toast(error.message)
    setLogout(false)
    return
  }
  toast("You're logged out successfully.")
  setLogout(false)
  return navigate('/')
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
        toast('Images upload failed!')
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

export const getAuthUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    console.error('No user found or error:', error?.message)
  }
  return user
}

export const deleteImage = (url: string) => {
  const imageName = url.split('/').pop()
  if (!imageName) throw new Error('Invalid URL')
  return supabase.storage.from(bucket).remove([imageName])
}
