import { Grid3X3, List } from 'lucide-react'
import { Button } from '../ui/button'

interface ViewModeToggleProp {
  viewMode: string
  handleViewMode: (mode: 'grid' | 'list') => void
}

function ViewModeToggle({ viewMode, handleViewMode }: ViewModeToggleProp) {
  return (
    <div className="flex ml-auto h-12 border rounded-md">
      <Button
        variant={viewMode === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleViewMode('grid')}
        className="rounded-r-none h-full w-12"
      >
        <Grid3X3 className="w-4 h-4" />
      </Button>
      <Button
        variant={viewMode === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleViewMode('list')}
        className="rounded-l-none h-full w-12"
      >
        <List className="w-4 h-4" />
      </Button>
    </div>
  )
}
export default ViewModeToggle
