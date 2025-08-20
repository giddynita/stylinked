import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { emptySchema, registrationSchemaMap } from '@/utils/schema'

import { FormRadio, SubmitButton } from '@/components/form'
import { Card, CardContent } from '@/components/ui/card'
import { AuthFormsHeading } from '@/components/headings'
import { useEffect, useState } from 'react'
import {
  CustomerDetailsForm,
  LogisticsDetailsForm,
  VendorDetailsForm,
} from '@/components/formTypes'
import { type AccountType, type registrationSchemaTypes } from '@/utils/types'
import { supabase } from '@/utils/supabaseClient'
import { toast } from 'sonner'
import { AuthContainer, AuthLoading, InvalidToken } from '@/components/auth'
import { accountTypeOptions, defaultValues } from '@/utils/data'
import { completeRegistrationAction } from '@/utils/action'
import { useNavigate } from 'react-router-dom'

function CompleteRegistration() {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [accountType, setAccountType] = useState<AccountType | ''>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(true)
  const navigate = useNavigate()

  const schema = accountType ? registrationSchemaMap[accountType] : emptySchema

  const setDefaultValues = accountType
    ? defaultValues[accountType]
    : {
        role: '',
      }

  const form = useForm<registrationSchemaTypes>({
    resolver: zodResolver(schema),
    defaultValues: setDefaultValues,
  })
  const onSubmit = (data: registrationSchemaTypes) => {
    const { role } = data
    if (!role) {
      return toast.warning('You need to select an account type.')
    }
    const request = { ...data, setSubmitting, navigate }
    completeRegistrationAction(request)
  }

  useEffect(() => {
    const fetchUser = async () => {
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

      const { data } = await supabase.auth.getUser()
      try {
        if (data?.user && data.user.email_confirmed_at) {
          setLoading(false)
          setTokenIsValid(true)
        }
      } catch (error) {
        toast.error('An error occured')
      }
    }
    fetchUser()
  }, [])

  if (loading) {
    return <AuthLoading />
  }
  if (!tokenIsValid) {
    return (
      <InvalidToken
        desc="Couldn't complete registration."
        url="/auth/sign-up"
      />
    )
  }
  return (
    <AuthContainer>
      <Card>
        <AuthFormsHeading
          title="Complete Sign Up"
          desc="Just a few more details to complete your registration"
        />
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormRadio
                form={form}
                label="Account Type"
                name="role"
                options={accountTypeOptions}
                setChange={setAccountType}
              />
              {accountType == 'buyer' && <CustomerDetailsForm form={form} />}
              {accountType == 'vendor' && <VendorDetailsForm form={form} />}
              {accountType == 'logistics' && (
                <LogisticsDetailsForm form={form} />
              )}
              <SubmitButton
                submitting={submitting}
                text="Done"
                texting="Submitting"
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </AuthContainer>
  )
}

export default CompleteRegistration
