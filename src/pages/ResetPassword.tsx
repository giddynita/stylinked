import { AuthContainer, AuthLoading, InvalidToken } from '@/components/auth'
import { supabase } from '@/utils/supabaseClient'
import { formSuspense } from '@/utils/suspense'
import { lazy, useEffect, useState } from 'react'

const ResetPasswordForm = lazy(
  () => import('@/components/formTypes/ResetPasswordForm')
)

function ResetPassword() {
  const [loading, setLoading] = useState<boolean>(true)
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(true)

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
  return <AuthContainer>{formSuspense(<ResetPasswordForm />)}</AuthContainer>
}
export default ResetPassword
