import { toast } from 'sonner'
import { supabase } from './supabaseClient'
import { redirect } from 'react-router-dom'
import type {
  ForgotPasswordAction,
  LoginAction,
  ResetPasswordAction,
  SignUpAction,
} from './types'

export const signUpAction = async (props: SignUpAction) => {
  const { email, password, confirmPassword, setSubmitting } = props
  if (password !== confirmPassword) {
    toast('Passwords do not match')
    return
  }
  setSubmitting(true)
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'https://localhost:5173/complete-registration',
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
  redirect('/verification/signUp')
}

export const resetPasswordAction = async (props: ResetPasswordAction) => {
  const { password, confirmPassword, setSubmitting } = props
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
    redirect('/forgot-password')
    console.log(error.message)
  }
  toast('Password reset successful! You can now log in with your new password')
  return redirect('/login')
}

export const loginAction = async (props: LoginAction) => {
  const { email, password, setSubmitting } = props
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
  return redirect('/')
}

export const forgotPasswordAction = async (props: ForgotPasswordAction) => {
  const { email, setSubmitting } = props
  setSubmitting(true)
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://localhost:5173/reset-password',
  })
  if (error) {
    toast(error.message)
    setSubmitting(false)
    return
  }
  toast('Password reset link sent successfully! Check your email')
  setSubmitting(false)
  return redirect('/verification/reset')
}

export const completeRegistrationAction = async (props: any) => {}
