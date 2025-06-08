import type { Options } from '@/utils/types'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

function FormRadio({
  form,
  name,
  label,
  options,
  setChange,
}: {
  form: any
  name: string
  label: string
  options: Options[]
  setChange?: (value: any) => void
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value)
                setChange && setChange(value)
              }}
              defaultValue={field.value}
              className="flex flex-col"
              required
            >
              {options.map(({ value, label }, index) => {
                return (
                  <FormItem key={index} className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value={value} />
                    </FormControl>
                    <FormLabel className="font-normal">{label}</FormLabel>
                  </FormItem>
                )
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default FormRadio
