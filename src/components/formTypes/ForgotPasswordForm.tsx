import { useState } from 'react'
import FormInput from '../form/FormInput'
import SubmitButton from '../form/SubmitButton'
import { AuthFormsHeading } from '../headings'
import { Card, CardContent } from '../ui/card'
import { Form } from '../ui/form'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, type ForgotPasswordSchema } from '@/utils/schema'

function ForgotPasswordForm() {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const navigate = useNavigate()
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })
  const onSubmit = async (data: ForgotPasswordSchema) => {
    const request = { ...data, setSubmitting, navigate }
    const { forgotPassword } = await import('@/utils/action')
    forgotPassword(request)
  }

  return (
    <Card>
      <AuthFormsHeading
        title="Forgot Password"
        desc="Enter your email address to receive a password reset link."
      />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormInput
              form={form}
              placeholder="Enter your email address"
              type="email"
              name="email"
            />
            <SubmitButton
              submitting={submitting}
              text="Send"
              texting="Sending"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
export default ForgotPasswordForm
