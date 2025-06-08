import { AuthContainer } from '@/components/auth'
import { FormInput, SubmitButton } from '@/components/form'
import { CardHead } from '@/components/headings'
import { Card, CardContent } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { forgotPasswordAction } from '@/utils/action'
import { forgotPasswordSchema, type ForgotPasswordSchema } from '@/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function ForgotPassword() {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })
  const onSubmit = async (data: ForgotPasswordSchema) => {
    const request = { ...data, setSubmitting }
    forgotPasswordAction(request)
  }

  return (
    <AuthContainer>
      <Card>
        <CardHead
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
    </AuthContainer>
  )
}
export default ForgotPassword
