import { toast } from 'sonner'
import { supabase } from './supabaseClient'

import type {
  ForgotPasswordAction,
  LoginAction,
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
      emailRedirectTo: 'https://localhost:5173/auth/complete-registration',
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
  return navigate('/auth')
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
    redirectTo: 'https://localhost:5173/auth/reset-password',
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
  if (role === 'client') {
    await supabase.from('clients').insert({
      id: user && user.id,
      firstname,
      lastname,
      phone,
    })
  }
  if (role === 'designer') {
    await supabase.from('designers').insert({
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
