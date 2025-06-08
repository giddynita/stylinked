import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { signupFormSchema } from '@/lib/schema'
import type { SignupFormSchema } from '@/lib/schema'
import { FormPassword, SubmitButton } from '@/components/form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { CardHead } from '@/components/headings'
import { useState } from 'react'
import FormInput from '@/components/form/FormInput'
import { supabase } from '@/lib/supabaseClient'

function SignUp() {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const navigate = useNavigate()
  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const onSubmit = async (data: SignupFormSchema) => {
    const { email, password, confirmPassword } = data
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
    localStorage.setItem('email', email)
    toast(
      "We've sent a verification email to complete your account registration."
    )
    setSubmitting(false)
    return navigate('/verification/signUp')
  }

  return (
    <Card className=" w-[90%] mx-auto max-w-lg mt-18 mb-16 pt-10 pb-6 border-none shadow-lg ">
      <CardHead
        title="Create Account"
        desc="Sign up to start your fashion journey"
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
              placeholder="Create a password"
            />
            <FormPassword
              form={form}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
            />
            <SubmitButton
              submitting={submitting}
              text="Create Account"
              texting="Creating"
            />
          </form>
        </Form>
        <p className="text-center py-2 text-sm font-medium text-foreground">
          Already have an account?
          <Button asChild={true} variant="link">
            <Link to="/login" className="text-primary -ml-2">
              Login
            </Link>
          </Button>
        </p>
      </CardContent>
    </Card>
  )
}

export default SignUp
