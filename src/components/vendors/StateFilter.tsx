import { Filter } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { southwestStates } from '@/utils/data'

function StateFilter({
  selectedState,
  handleStateChange,
}: {
  selectedState: string
  handleStateChange: (state: string) => void
}) {
  return (
    <Select
      value={selectedState}
      onValueChange={(value) => handleStateChange(value)}
    >
      <SelectTrigger className="w-full">
        <Filter className="w-4 h-4 mr-2" />
        <SelectValue placeholder="Select State" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Any state</SelectItem>
        {Object.keys(southwestStates).map((state) => (
          <SelectItem key={state} value={state}>
            {state}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
export default StateFilter
