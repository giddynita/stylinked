import { FormInput } from '@/components/form'

function BuyerDetailsForm({ form }: { form: any }) {
  return (
    <>
      <FormInput
        form={form}
        label="First Name"
        placeholder="First Name"
        type="text"
        name="firstname"
      />
      <FormInput
        form={form}
        label="Last Name"
        placeholder="Last Name"
        type="text"
        name="lastname"
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
export default BuyerDetailsForm
