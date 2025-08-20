import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { IoEyeSharp } from 'react-icons/io5'
import { FaEyeSlash } from 'react-icons/fa6'

interface FormPasswordFieldProp {
  name: string
  label: string
  value: string
  handleInputChange: (key: string, value: any) => void
  placeholder: string
  required?: boolean
}

function FormPasswordField({
  name,
  label,
  value,
  handleInputChange,
  placeholder,
  required,
}: FormPasswordFieldProp) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <Input
          id={name}
          value={value}
          onChange={(e) => handleInputChange(name, e.target.value)}
          placeholder={placeholder}
          type={`${showPassword ? 'text' : 'password'}`}
          required={required}
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
export default FormPasswordField
