import FormSelect from '../form/FormSelect'
import FormInput from '../form/FormInput'
import { vehicleTypeSelect } from '@/utils/data'

function LogisticsDetailsForm({ form }: { form: any }) {
  return (
    <>
      <FormInput
        form={form}
        label="Business Name"
        placeholder="Business Name"
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
      <FormSelect
        form={form}
        label="Vehicle Type"
        placeholder="Select your mode of transport"
        name="vehicleType"
        options={vehicleTypeSelect}
      />
    </>
  )
}
export default LogisticsDetailsForm
