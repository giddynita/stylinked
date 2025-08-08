import { GlobalContext } from '@/utils/globalContext'
import { loginFormSchema, type LoginFormSchema } from '@/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Card, CardContent } from '../ui/card'
import { AuthFormsHeading } from '../headings'
import FormInput from '../form/FormInput'
import FormPassword from '../form/FormPassword'
import SubmitButton from '../form/SubmitButton'
import { Button } from '../ui/button'
import { login } from '@/utils/api'
import { useDispatch } from 'react-redux'
import { setUser } from '@/features/user/userSlice'

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
    const user = await login(data)
    dispatch(
      setUser({
        user,
        userData: null,
        userRole: null,
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
            <FormInput
              form={form}
              label="Email"
              placeholder="Enter your email address"
              type="email"
              name="email"
            />
            <FormPassword
              form={form}
              name="password"
              label="Password"
              placeholder="Enter your password"
            />
            <SubmitButton
              submitting={isPending}
              text="Login"
              texting="Logging in"
              setSubmitting={setIsPending}
            />
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
