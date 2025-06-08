import FormInput from '@/components/form/FormInput'

function VendorDetailsForm({ form }: { form: any }) {
  return (
    <>
      <FormInput
        form={form}
        label="Business Name"
        placeholder="Business name"
        type="text"
        name="businessName"
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
export default VendorDetailsForm
