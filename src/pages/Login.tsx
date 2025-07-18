import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { loginFormSchema } from '@/utils/schema'
import type { LoginFormSchema } from '@/utils/schema'
import { FormInput, FormPassword, SubmitButton } from '@/components/form'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { AuthFormsHeading } from '@/components/headings'
import { useContext, useState } from 'react'
import { loginAction } from '@/utils/action'
import { AuthContainer } from '@/components/auth'
import { GlobalContext } from '@/utils/globalContext'
function Login() {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const navigate = useNavigate()
  const { pathname, setPathname } = useContext(GlobalContext)
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = async (data: LoginFormSchema) => {
    const request = { ...data, setSubmitting, navigate, pathname }
    loginAction(request)
    return setPathname('/')
  }

  return (
    <AuthContainer>
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
                submitting={submitting}
                text="Login"
                texting="Logging in"
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
    </AuthContainer>
  )
}

export default Login
