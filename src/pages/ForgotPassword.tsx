import { AuthContainer } from '@/components/auth'
import { formSuspense } from '@/utils/suspense'
import { lazy } from 'react'

const ForgotPasswordForm = lazy(
  () => import('@/components/formTypes/ForgotPasswordForm')
)

function ForgotPassword() {
  return <AuthContainer>{formSuspense(<ForgotPasswordForm />)}</AuthContainer>
}
export default ForgotPassword
