import { FormInputField } from '@/components/form'
import FormSubmitButton from '@/components/form/FormSubmitButton'
import type { UserDataType } from '@/utils/types'
import type { User } from '@supabase/supabase-js'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const { user, userData }: { user: User; userData: UserDataType } =
    useSelector((state: any) => state.userState)
  const [formData, setFormData] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    phone: userData.phone,
    email: user.email || '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form className="space-y-6 max-w-xl">
      <FormInputField
        name="firstname"
        label="First Name"
        value={formData.firstname}
        handleInputChange={handleInputChange}
        placeholder="First Name"
        type="text"
        required
        disabled={true}
      />
      <FormInputField
        name="lastname"
        label="Last Name"
        value={formData.lastname}
        handleInputChange={handleInputChange}
        placeholder="Last Name"
        type="text"
        required
        disabled={true}
      />
      <FormInputField
        name="email"
        label="Email"
        value={formData.email}
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
        setSubmitting={setSubmitting}
      />
    </form>
  )
}
export default Profile
