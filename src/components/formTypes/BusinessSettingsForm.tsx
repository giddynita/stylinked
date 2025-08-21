import {
  FormTextArea,
  FormInputField,
  FormSubmitButton,
} from '@/components/form'
import { Label } from '@/components/ui/label'
import { setUserData } from '@/features/user/userSlice'
import { updateSettings } from '@/utils/action'
import { validateWithZodSchema, VendorBusinessFormSchema } from '@/utils/schema'
import type { UserDataType, UserRole } from '@/utils/types'
import type { User } from '@supabase/supabase-js'
import { useState, type FormEvent } from 'react'
import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'
import { toast } from 'sonner'

function BusinessSettingsForm() {
  const {
    user,
    userData,
    userRole,
  }: { user: User; userData: UserDataType; userRole: UserRole } = useSelector(
    (state: any) => state.userState
  )
  const [formData, setFormData] = useState({
    businessname: userData.businessname || '',
    description: userData.description || '',
    city: userData.city || '',
    state: userData.state || '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const dispatch = useDispatch()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const validatedData = validateWithZodSchema(
      VendorBusinessFormSchema,
      formData
    )
    if (!validatedData) {
      setSubmitting(false)
      return
    }
    await updateSettings({
      role: userRole.role,
      newData: validatedData,
      uid: user.id,
    })

    dispatch(
      setUserData({
        userData: { ...userData, formData },
      })
    )
    setSubmitting(false)
    toast.success('Updated successfully!')
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInputField
        name="businessname"
        label="Business Name"
        value={formData.businessname}
        handleInputChange={handleInputChange}
        placeholder="Business Name"
        type="text"
        required
      />
      <FormTextArea
        name="description"
        label="Business Description"
        value={formData.description}
        handleInputChange={handleInputChange}
        placeholder="Describe your business..."
        rows={3}
      />
      <div className="space-y-4">
        <Label>Business Location</Label>
        <div className="flex gap-4 flex-wrap">
          <FormInputField
            name="city"
            label="City"
            value={formData.city}
            handleInputChange={handleInputChange}
            placeholder="City"
            type="text"
            required
          />
          <FormInputField
            name="state"
            label="State"
            value={formData.state}
            handleInputChange={handleInputChange}
            placeholder="State"
            type="text"
            required
          />
        </div>
      </div>
      <FormSubmitButton
        text="Update Business"
        texting="Updating"
        submitting={submitting}
      />
    </form>
  )
}
export default BusinessSettingsForm
