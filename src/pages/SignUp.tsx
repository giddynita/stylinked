import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { signupFormSchema } from '@/utils/schema'
import type { SignupFormSchema } from '@/utils/schema'
import { FormInput, FormPassword, SubmitButton } from '@/components/form'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { CardHead } from '@/components/headings'
import { useState } from 'react'
import { signUpAction } from '@/utils/action'
import { AuthContainer } from '@/components/auth'

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
  const onSubmit = (data: SignupFormSchema) => {
    const request = { ...data, setSubmitting, navigate }
    signUpAction(request)
  }

  return (
    <AuthContainer>
      <Card>
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
    </AuthContainer>
  )
}

export default SignUp
