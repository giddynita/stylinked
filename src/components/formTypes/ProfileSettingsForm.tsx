import { FormInputField, FormSubmitButton } from '@/components/form'
import { setUserData } from '@/features/user/userSlice'
import { ProfileFormSchema, validateWithZodSchema } from '@/utils/schema'
import type { UserDataType, UserRole } from '@/utils/types'
import type { User } from '@supabase/supabase-js'
import { useState, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

function ProfileSettingsForm() {
  const {
    user,
    userData,
    userRole,
  }: { user: User; userData: UserDataType; userRole: UserRole } = useSelector(
    (state: any) => state.userState
  )
  const [formData, setFormData] = useState({
    phone: userData.phone,
  })
  const [submitting, setSubmitting] = useState(false)
  const dispatch = useDispatch()
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const validatedData = validateWithZodSchema(ProfileFormSchema, formData)
    if (!validatedData) {
      setSubmitting(false)
      return
    }
    const { updateSettings } = await import('@/utils/action')
    const newUserData = await updateSettings({
      role: userRole.role,
      newData: validatedData,
      uid: user.id,
    })

    dispatch(
      setUserData({
        userData: newUserData,
      })
    )
    setSubmitting(false)
    toast.success('Updated successfully!')
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInputField
        name="firstname"
        label="First Name"
        value={userData.firstname}
        handleInputChange={handleInputChange}
        placeholder="First Name"
        type="text"
        required
        disabled={true}
      />
      <FormInputField
        name="lastname"
        label="Last Name"
        value={userData.lastname}
        handleInputChange={handleInputChange}
        placeholder="Last Name"
        type="text"
        required
        disabled={true}
      />
      <FormInputField
        name="email"
        label="Email"
        value={user.email ?? ''}
        handleInputChange={handleInputChange}
        placeholder="Last Name"
        type="email"
        required
        disabled={true}
      />
      <FormInputField
        name="phone"
        label="Phone Number"
        value={formData.phone}
        handleInputChange={handleInputChange}
        placeholder="Phone Number"
        type="text"
        required
      />
      <FormSubmitButton
        text="Update Profile"
        texting="Updating"
        submitting={submitting}
      />
    </form>
  )
}
export default ProfileSettingsForm
