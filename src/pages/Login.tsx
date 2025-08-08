import { lazy, Suspense } from 'react'
import { AuthContainer } from '@/components/auth'
const LoginForm = lazy(() => import('../components/formTypes/LoginForm'))

function Login() {
  return (
    <AuthContainer>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthContainer>
  )
}

export default Login
