import { FormInput, SubmitButton } from '@/components/form'
import { CardHead } from '@/components/headings'
import { Card, CardContent } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { forgotPasswordSchema, type ForgotPasswordSchema } from '@/lib/schema'
import { supabase } from '@/lib/supabaseClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function ForgotPassword() {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const navigate = useNavigate()
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })
  const onSubmit = async (data: ForgotPasswordSchema) => {
    const { email } = data
    setSubmitting(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://localhost:5173/reset-password',
    })
    if (error) {
      toast(error.message)
      setSubmitting(false)
      return
    }
    toast('Password reset link sent successfully! Check your email')
    setSubmitting(false)
    return navigate('/verification/reset')
  }

  return (
    <Card className=" w-[90%] mx-auto max-w-lg mt-18 mb-16 pt-10 pb-6 border-none shadow-lg ">
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
  )
}
export default ForgotPassword
