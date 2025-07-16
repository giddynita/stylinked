import { Grid3X3, List } from 'lucide-react'
import { Button } from '../ui/button'

function ViewModeToggle({
  viewMode,
  handleViewMode,
}: {
  viewMode: string
  handleViewMode: (mode: 'grid' | 'list') => void
}) {
  return (
    <div className="flex border rounded-md">
      <Button
        variant={viewMode === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleViewMode('grid')}
        className="rounded-r-none"
      >
        <Grid3X3 className="w-4 h-4" />
      </Button>
      <Button
        variant={viewMode === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleViewMode('list')}
        className="rounded-l-none"
      >
        <List className="w-4 h-4" />
      </Button>
    </div>
  )
}
export default ViewModeToggle
