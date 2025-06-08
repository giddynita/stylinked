import React, { forwardRef } from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '@/components/ui/input'

interface Props extends React.ComponentProps<typeof Input> {
  form: any
  label?: string
  placeholder: string
  type: string
  name: string
}

const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ form, label, placeholder, type, name, ...inputProps }, ref) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                {...inputProps}
                type={type}
                required
                value={field.value ?? ''}
                ref={ref}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }
)
export default FormInput
