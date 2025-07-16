import { ArrowUpDown } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import type { Dispatch, SetStateAction } from 'react'
import { Label } from '../ui/label'

function Sorting({
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
        <SelectTrigger className="w-full">
          <ArrowUpDown />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rating">Highest Rated</SelectItem>
          <SelectItem value="reviews">Most Reviews</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="products">Most Products</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
export default Sorting
