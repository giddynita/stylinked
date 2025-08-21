import FormPasswordField from '@/components/form/FormPasswordField'
import FormSubmitButton from '@/components/form/FormSubmitButton'
import { updatePassword } from '@/utils/action'
import { PasswordFormSchema, validateWithZodSchema } from '@/utils/schema'
import type { User } from '@supabase/supabase-js'
import { useState, type FormEvent } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

function SecuritySettingsForm() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const { user }: { user: User } = useSelector((state: any) => state.userState)
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error('New Passwords do not match')
      setSubmitting(false)
      return
    }
    const validatedData = validateWithZodSchema(PasswordFormSchema, {
      password: formData.newPassword,
    })
    if (!validatedData) {
      setSubmitting(false)
      return
    }
    const updatedUser = await updatePassword({
      email: user.email ?? '',
      oldPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    })
    if (!updatedUser) {
      setSubmitting(false)
      return
    }
    setSubmitting(false)
    toast.success('Password Updated successfully!')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormPasswordField
        name="currentPassword"
        label="Current Password"
        value={formData.currentPassword}
        handleInputChange={handleInputChange}
        placeholder="Enter Current Password"
        required
      />
      <FormPasswordField
        name="newPassword"
        label="New Password"
        value={formData.newPassword}
        handleInputChange={handleInputChange}
        placeholder="Enter New Password"
        required
      />
      <FormPasswordField
        name="confirmNewPassword"
        label="Confirm New Password"
        value={formData.confirmNewPassword}
        handleInputChange={handleInputChange}
        placeholder="Confirm New Password"
        required
      />
      <FormSubmitButton
        text="Update Password"
        texting="Updating"
        submitting={submitting}
      />
    </form>
  )
}
export default SecuritySettingsForm
