import { FormPassword, SubmitButton } from '@/components/form'
import { CardHead } from '@/components/headings'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { resetPasswordSchema, type ResetPasswordSchema } from '@/lib/schema'
import { supabase } from '@/lib/supabaseClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

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
  const onSubmit = async (data: ResetPasswordSchema) => {
    const { password, confirmPassword } = data
    if (password !== confirmPassword) {
      toast('Passwords do not match')
      return
    }
    setSubmitting(true)
    const { error } = await supabase.auth.updateUser({
      password,
    })
    if (error) {
      toast('Password reset failed!')
      console.log(error.message)
    }
    toast(
      'Password reset successful! You can now log in with your new password'
    )
    return navigate('/login')
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button variant="ghost" disabled className="w-full text-2xl font-bold">
          Verifying
          <Loader2Icon className="animate-spin " />
        </Button>
      </div>
    )
  /*  if (!tokenIsValid) {
    return (
      <Card className=" w-[90%] mx-auto max-w-lg mt-18 mb-16 pt-10 pb-6 border-none shadow-lg ">
        <CardHead
          title="Verification failed!"
          desc={`Couldn't reset your password.`}
        />
        <CardContent>
          <Button asChild={true} className="w-full">
            <Link to="/forgot-password">Try again.</Link>
          </Button>
        </CardContent>
      </Card>
    )
  } */

  return (
    <Card className=" w-[90%] mx-auto max-w-lg mt-18 mb-16 pt-10 pb-6 border-none shadow-lg ">
      <CardHead
        title="Reset Password"
        desc="Enter a new password for your account."
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
export default ResetPassword
