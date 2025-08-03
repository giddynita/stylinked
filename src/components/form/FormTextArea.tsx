import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

interface FormTextAreaProp {
  name: string
  label: string
  value: string
  handleInputChange: (key: string, value: any) => void
  placeholder: string
  rows: number
  required?: boolean
}

function FormTextArea({
  name,
  label,
  value,
  handleInputChange,
  placeholder,
  rows,
  required,
}: FormTextAreaProp) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        value={value}
        onChange={(e) => handleInputChange(name, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
      />
    </div>
  )
}
export default FormTextArea
