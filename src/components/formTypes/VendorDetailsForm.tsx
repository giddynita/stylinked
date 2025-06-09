import { FormInput } from '@/components/form'

function VendorDetailsForm({ form }: { form: any }) {
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
        label="Business Name"
        placeholder="Business Name"
        type="text"
        name="businessname"
      />
      <FormInput
        form={form}
        label="Phone Number"
        placeholder="Phone Number"
        type="tel"
        name="phone"
      />
      <FormInput
        form={form}
        label="Your Location"
        placeholder="Enter City"
        type="text"
        name="location"
      />
    </>
  )
}
export default VendorDetailsForm
