import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useState } from 'react'
import { Button } from '../ui/button'
import { FaEyeSlash } from 'react-icons/fa6'
import { IoEyeSharp } from 'react-icons/io5'
import type { InputProps } from '@/utils/types'
import { Label } from '../ui/label'

function FormPassword({ form, name, label, placeholder }: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(true)
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative">
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={placeholder}
                  {...field}
                  type={`${showPassword ? 'password' : 'text'}`}
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
          className="absolute top-1/2 -translate-y-1/2 w-10 h-10 p-2.5  right-0 hover:bg-transparent"
        >
          {showPassword ? (
            <IoEyeSharp
              onClick={() => setShowPassword(!showPassword)}
              className="w-4 h-4 text-muted-foreground hover:text-foreground"
            />
          ) : (
            <FaEyeSlash
              onClick={() => setShowPassword(!showPassword)}
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
            />
          )}
        </Button>
      </div>
    </div>
  )
}
export default FormPassword
