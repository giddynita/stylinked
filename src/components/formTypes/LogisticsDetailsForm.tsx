import type { Options } from '@/lib/types'
import FormInput from '@/components/form/FormInput'
import FormSelect from '../form/FormSelect'

const vehicleTypeSelect: Options[] = [
  {
    label: 'Car',
    value: 'car',
  },
  {
    label: 'Motorcycle',
    value: 'motorcycle',
  },
  {
    label: 'Bus',
    value: 'bus',
  },
]

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
