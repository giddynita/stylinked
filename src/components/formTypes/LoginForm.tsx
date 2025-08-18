import { GlobalContext } from '@/utils/globalContext'
import { loginFormSchema, type LoginFormSchema } from '@/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { lazy, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Card, CardContent } from '../ui/card'
import { AuthFormsHeading } from '../headings'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { setUser } from '@/features/user/userSlice'
import { Form } from '../ui/form'
import { useForm } from 'react-hook-form'
import { formFieldSuspense } from '@/utils/suspense'
const FormInput = lazy(() => import('../form/FormInput'))
const FormPassword = lazy(() => import('../form/FormPassword'))
const SubmitButton = lazy(() => import('../form/SubmitButton'))

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isPending, setIsPending] = useState(false)
  const { pathname, setPathname } = useContext(GlobalContext)
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormSchema) => {
    const { login } = await import('@/utils/api')
    const user = await login(data)
    dispatch(
      setUser({
        user,
      })
    )
    toast.success("Welcome, you've logged in successfully!")
    navigate(pathname)
    setIsPending(false)
    return setPathname('/')
  }
  return (
    <Card>
      <AuthFormsHeading
        title="Login"
        desc="Enter your credentials to access your account"
      />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {formFieldSuspense(
              <FormInput
                form={form}
                label="Email"
                placeholder="Enter your email address"
                type="email"
                name="email"
              />
            )}
            {formFieldSuspense(
              <FormPassword
                form={form}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
            )}
            {formFieldSuspense(
              <SubmitButton
                submitting={isPending}
                text="Login"
                texting="Logging in"
                /* setSubmitting={setIsPending} */
              />
            )}
          </form>
        </Form>
        <p className="text-center pt-2  text-sm font-medium text-foreground ">
          Don't have an account?
          <Button asChild={true} variant="link">
            <Link to="/auth/sign-up" className="text-primary -ml-2">
              Sign up
            </Link>
          </Button>
        </p>
        <p className="text-center -mt-4  text-sm font-medium text-foreground ">
          Forgot password?
          <Button asChild={true} variant="link">
            <Link to="/auth/forgot-password" className="text-primary -ml-2">
              Reset password
            </Link>
          </Button>
        </p>
      </CardContent>
    </Card>
  )
}
export default LoginForm
