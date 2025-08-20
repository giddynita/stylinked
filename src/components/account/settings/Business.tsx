import { FormInputField } from '@/components/form'
import FormSubmitButton from '@/components/form/FormSubmitButton'
import { Label } from '@/components/ui/label'
import type { UserDataType } from '@/utils/types'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function Business() {
  const { userData }: { userData: UserDataType } = useSelector(
    (state: any) => state.userState
  )
  const [formData, setFormData] = useState({
    businessname: userData.businessname || '',
    city: userData.city || '',
    state: userData.state || '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  return (
    <form className="space-y-6 max-w-xl">
      <FormInputField
        name="businessname"
        label="Business Name"
        value={formData.businessname}
        handleInputChange={handleInputChange}
        placeholder="Business Name"
        type="text"
        required
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
        setSubmitting={setSubmitting}
      />
    </form>
  )
}
export default Business
