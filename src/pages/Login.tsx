import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { loginFormSchema } from '@/lib/schema'
import type { LoginFormSchema } from '@/lib/schema'
import { FormPassword, SubmitButton } from '@/components/form'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { CardHead } from '@/components/headings'
import { useState } from 'react'
import FormInput from '@/components/form/FormInput'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'sonner'
function Login() {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const navigate = useNavigate()
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = async (data: LoginFormSchema) => {
    const { email, password } = data
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

  return (
    <Card className=" w-[90%] mx-auto max-w-lg mt-18 mb-16 pt-10 pb-6 border-none shadow-lg ">
      <CardHead
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
            <Link to="/sign-up" className="text-primary -ml-2">
              Sign up
            </Link>
          </Button>
        </p>
        <p className="text-center -mt-4  text-sm font-medium text-foreground ">
          Forgot password?
          <Button asChild={true} variant="link">
            <Link to="/" className="text-primary -ml-2">
              Reset
            </Link>
          </Button>
        </p>
      </CardContent>
    </Card>
  )
}

export default Login
