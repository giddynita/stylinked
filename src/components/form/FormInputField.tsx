import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface FormInputFieldProp {
  name: string
  label: string
  value: string
  handleInputChange: (key: string, value: any) => void
  placeholder: string
  type: string
  min?: string
  required?: boolean
  disabled?: boolean
}

function FormInputField({
  name,
  label,
  value,
  handleInputChange,
  placeholder,
  type,
  min,
  required,
  disabled,
}: FormInputFieldProp) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        value={value}
        onChange={(e) => handleInputChange(name, e.target.value)}
        placeholder={placeholder}
        type={type}
        min={min}
        required={required}
        disabled={disabled}
      />
    </div>
  )
}
export default FormInputField
