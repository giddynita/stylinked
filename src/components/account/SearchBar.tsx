import { Search } from 'lucide-react'
import { Input } from '../ui/input'

interface SearchBarProp {
  searchQuery: string
  setSearchQuery: (query: string) => void
  placeholder: string
}

function SearchBar({
  searchQuery,
  setSearchQuery,
  placeholder,
}: SearchBarProp) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 text-xs sm:text-sm"
        type="search"
      />
    </div>
  )
}
export default SearchBar
