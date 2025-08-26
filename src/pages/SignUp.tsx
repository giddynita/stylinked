import { lazy } from 'react'
import { AuthContainer } from '@/components/auth'
import { formSuspense } from '@/utils/suspense'

const SignUpForm = lazy(() => import('@/components/formTypes/SignUpForm'))

function SignUp() {
  return <AuthContainer>{formSuspense(<SignUpForm />)}</AuthContainer>
}

export default SignUp
