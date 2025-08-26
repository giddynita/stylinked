import { useState } from 'react'
import FormPassword from '../form/FormPassword'
import SubmitButton from '../form/SubmitButton'
import { AuthFormsHeading } from '../headings'
import { Card, CardContent } from '../ui/card'
import { Form } from '../ui/form'
import { useNavigate } from 'react-router-dom'
import { resetPasswordSchema, type ResetPasswordSchema } from '@/utils/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

function ResetPasswordForm() {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const navigate = useNavigate()

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })
  const onSubmit = async (data: ResetPasswordSchema) => {
    const request = { ...data, setSubmitting, navigate }
    const { resetPassword } = await import('@/utils/action')
    resetPassword(request)
  }

  return (
    <Card>
      <AuthFormsHeading
        title="Reset Password"
        desc="Create a new password for your account."
      />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormPassword
              form={form}
              name="password"
              label="Password"
              placeholder="Create a new password"
            />
            <FormPassword
              form={form}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
            />
            <SubmitButton
              submitting={submitting}
              text="Set new password"
              texting="Resetting"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
export default ResetPasswordForm
