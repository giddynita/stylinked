import FormPasswordField from '@/components/form/FormPasswordField'
import FormSubmitButton from '@/components/form/FormSubmitButton'
import { useState } from 'react'

function Security() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  return (
    <form className="space-y-6 max-w-xl">
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
        setSubmitting={setSubmitting}
      />
    </form>
  )
}
export default Security
