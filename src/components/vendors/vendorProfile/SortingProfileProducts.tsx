import { ArrowUpDown } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import type { Dispatch, SetStateAction } from 'react'
import { Label } from '../../ui/label'

function SortingProfileProducts({
  sortBy,
  setSortBy,
}: {
  sortBy: string
  setSortBy: Dispatch<SetStateAction<string>>
}) {
  return (
    <div className="flex flex-row gap-2">
      <Label className="text-muted-foreground w-full">Sort by:</Label>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="max-w-35 sm:max-w-full">
          <ArrowUpDown />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rating">Rating</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
export default SortingProfileProducts
