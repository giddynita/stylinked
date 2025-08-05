import type { SelectItems } from '@/utils/types'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { ArrowUpDown } from 'lucide-react'

interface SortingProp {
  sortBy: string
  setSortBy: (value: string) => void
  options: SelectItems[]
}

function Sorting({ sortBy, setSortBy, options }: SortingProp) {
  return (
    <div className="flex items-center space-x-2">
      <Label className="text-muted-foreground">Sort by:</Label>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="max-w-35 sm:max-w-full">
          <ArrowUpDown />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value, label }, index) => {
            return (
              <SelectItem key={index} value={value}>
                {label}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
export default Sorting
