import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

function SearchBar({
  searchQuery,
  setSearchQuery,
  handleSearchQuery,
  placeholder,
}: {
  placeholder: string
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
  handleSearchQuery: (searchQuery: string) => void
}) {
  return (
    <div className="flex flex-1 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 outline-none focus-visible:outline-none focus-visible:ring-0 border-r-0 focus:border-r-0 rounded-r-none"
      />
      <Button
        size="lg"
        className=" h-12 rounded-l-none sm:px-8 border border-l-none border-primary w-1/3"
        onClick={() => handleSearchQuery(searchQuery)}
      >
        Search
      </Button>
    </div>
  )
}
export default SearchBar
