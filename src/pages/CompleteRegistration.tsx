import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  clientFormSchema,
  designerFormSchema,
  emptySchema,
  logisticsFormSchema,
} from '@/utils/schema'
import type {
  ClientFormSchema,
  DesignerFormSchema,
  EmptySchema,
  LogisticsFormSchema,
} from '@/utils/schema'
import { FormRadio, SubmitButton } from '@/components/form'
import { Card, CardContent } from '@/components/ui/card'
import { CardHead } from '@/components/headings'
import { useEffect, useState } from 'react'
import {
  CustomerDetailsForm,
  LogisticsDetailsForm,
  VendorDetailsForm,
} from '@/components/formTypes'
import { type AccountType } from '@/utils/types'
import { supabase } from '@/utils/supabaseClient'
import { toast } from 'sonner'
import { AuthContainer, AuthLoading, InvalidToken } from '@/components/auth'
import { accountTypeOptions } from '@/utils/data'
import { completeRegistrationAction } from '@/utils/action'

const schemaMap = {
  client: clientFormSchema,
  designer: designerFormSchema,
  logistics: logisticsFormSchema,
}

function CompleteRegistration() {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [accountType, setAccountType] = useState<AccountType | ''>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(true)

  const schema = accountType ? schemaMap[accountType] : emptySchema
  const defaultValues = {
    client: {
      accountType: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
    designer: {
      accountType: '',
      businessName: '',
      phone: '',
    },
    logistics: {
      accountType: '',
      businessName: '',
      phone: '',
      vehicleType: '',
    },
  }
  const setDefaultValues = accountType
    ? defaultValues[accountType]
    : {
        accountType: '',
      }
  type schemaTypes =
    | ClientFormSchema
    | DesignerFormSchema
    | LogisticsFormSchema
    | EmptySchema

  const form = useForm<schemaTypes>({
    resolver: zodResolver(schema),
    defaultValues: setDefaultValues,
  })
  const onSubmit = (data: schemaTypes) => {
    const { accountType } = data
    if (!accountType) {
      return toast('You need to select an account type.')
    }
    const request = { ...data, setSubmitting }
    completeRegistrationAction(request)
  }
  const onError = (errors: any) => {
    console.log(errors)
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
        console.log(error)
      }
    }
    fetchUser()
  }, [])

  if (loading) <AuthLoading />
  if (!tokenIsValid)
    <InvalidToken desc="Couldn't complete registration." url="/sign-up" />

  return (
    <AuthContainer>
      <Card>
        <CardHead
          title="Complete Sign Up"
          desc="Just a few more details to complete your registration"
        />
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onError)}
              className="space-y-8"
            >
              <FormRadio
                form={form}
                label="Account Type"
                name="accountType"
                options={accountTypeOptions}
                setChange={setAccountType}
              />
              {accountType == 'client' && <CustomerDetailsForm form={form} />}
              {accountType == 'designer' && <VendorDetailsForm form={form} />}
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
