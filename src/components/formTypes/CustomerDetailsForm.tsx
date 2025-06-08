import { FormInput } from '@/components/form'

function CustomerDetailsForm({ form }: { form: any }) {
  return (
    <>
      <FormInput
        form={form}
        label="First Name"
        placeholder="First name"
        type="text"
        name="firstName"
      />
      <FormInput
        form={form}
        label="Last Name"
        placeholder="Last name"
        type="text"
        name="lastName"
      />
      <FormInput
        form={form}
        label="Phone Number"
        placeholder="Phone Number"
        type="tel"
        name="phone"
      />
    </>
  )
}
export default CustomerDetailsForm
