import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../form/FormInput'
import FormPassword from '../form/FormPassword'
import SubmitButton from '../form/SubmitButton'
import { AuthFormsHeading } from '../headings'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Form } from '../ui/form'
import { useForm } from 'react-hook-form'
import { signupFormSchema, type SignupFormSchema } from '@/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

function SignUpForm() {
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
    const request = { ...data, setSubmitting, navigate }
    const { signUp } = await import('@/utils/action')
    signUp(request)
  }
  return (
    <Card>
      <AuthFormsHeading
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
            <Link to="/auth/login" className="text-primary -ml-2">
              Login
            </Link>
          </Button>
        </p>
      </CardContent>
    </Card>
  )
}
export default SignUpForm
