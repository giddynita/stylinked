import type { SelectItems } from '@/utils/types'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface FormSelectFieldProp {
  name: string
  label: string
  value: string
  handleInputChange: (key: string, value: any) => void
  placeholder: string
  required?: boolean
  selectItems: SelectItems[]
}

function FormSelectField({
  name,
  label,
  value,
  handleInputChange,
  placeholder,
  selectItems,
  required,
}: FormSelectFieldProp) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Select
        value={value}
        onValueChange={(value) => handleInputChange('category', value)}
        required={required}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {selectItems.map(({ value, label }, index) => (
            <SelectItem key={index} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
export default FormSelectField
