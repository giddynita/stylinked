export type Options = {
  value: string
  label: string
}

export type AccountType = 'client' | 'designer' | 'logistics'

export type InputProps = {
  form: any
  label?: string
  placeholder?: string
  type?: string
  name: string
}
export type VerificationPageDetails = {
  title: string
  desc: string
  link: string
}
export type SignUpAction = {
  email: string
  password: string
  confirmPassword: string
  setSubmitting: (value: boolean) => void
  navigate: (value: string) => void
}

export type ResetPasswordAction = {
  password: string
  confirmPassword: string
  setSubmitting: (value: boolean) => void
  navigate: (value: string) => void
}
export type LoginAction = {
  email: string
  password: string
  setSubmitting: (value: boolean) => void
  navigate: (value: string) => void
}
export type ForgotPasswordAction = {
  email: string
  setSubmitting: (value: boolean) => void
  navigate: (value: string) => void
}
