import { AuthContainer } from '@/components/auth'
import { nullSuspense } from '@/utils/suspense'
import { lazy } from 'react'
const LoginForm = lazy(() => import('../components/formTypes/LoginForm'))

function Login() {
  return <AuthContainer>{nullSuspense(<LoginForm />)}</AuthContainer>
}

export default Login
