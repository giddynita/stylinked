import { AuthContainer, AuthLoading, InvalidToken } from '@/components/auth'
import { FormPassword, SubmitButton } from '@/components/form'
import { CardHead } from '@/components/headings'
import { Card, CardContent } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { resetPasswordAction } from '@/utils/action'
import { resetPasswordSchema, type ResetPasswordSchema } from '@/utils/schema'
import { supabase } from '@/utils/supabaseClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function ResetPassword() {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(true)
  const navigate = useNavigate()

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })
  const onSubmit = (data: ResetPasswordSchema) => {
    const request = { ...data, setSubmitting, navigate }
    resetPasswordAction(request)
  }

  useEffect(() => {
    const resetUserPassword = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')

      if (!accessToken || !refreshToken) {
        setLoading(false)
        setTokenIsValid(false)
        return
      }
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })

      if (sessionError) {
        setLoading(false)
        setTokenIsValid(false)
        return
      }
      setLoading(false)
      setTokenIsValid(true)
    }
    resetUserPassword()
  }, [])

  if (loading) return <AuthLoading />

  if (!tokenIsValid) {
    return (
      <InvalidToken
        desc="Couldn't reset your password."
        url="/auth/forgot-password"
      />
    )
  }
  return (
    <AuthContainer>
      <Card>
        <CardHead
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
    </AuthContainer>
  )
}
export default ResetPassword
