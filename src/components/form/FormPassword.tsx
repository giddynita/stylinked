import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { useState } from 'react'
import { Button } from '../ui/button'
import { FaEyeSlash } from 'react-icons/fa6'
import { IoEyeSharp } from 'react-icons/io5'

function FormPassword({
  form,
  name,
  label,
  placeholder,
}: {
  form: any
  name: string
  label: string
  placeholder: string
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <div className="relative">
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
                type={`${showPassword ? 'text' : 'password'}`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        asChild={true}
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-[37%] w-10 h-10 p-2.5  right-3"
      >
        {showPassword ? (
          <IoEyeSharp
            onClick={() => setShowPassword(!showPassword)}
            className="w-4 h-4 text-foreground"
          />
        ) : (
          <FaEyeSlash
            onClick={() => setShowPassword(!showPassword)}
            className="h-6 w-6 text-foreground"
          />
        )}
      </Button>
    </div>
  )
}
export default FormPassword
