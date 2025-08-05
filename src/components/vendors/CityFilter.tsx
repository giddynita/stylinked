import { southwestStates } from '@/utils/data'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Filter } from 'lucide-react'

interface CityFilterProp {
  selectedState: string
  selectedCity: string
  handleCityChange: (city: string) => void
}

function CityFilter({
  selectedState,
  handleCityChange,
  selectedCity,
}: CityFilterProp) {
  return (
    <Select
      value={selectedCity}
      onValueChange={(value) => handleCityChange(value)}
      disabled={!selectedState || selectedState == 'all'}
    >
      <SelectTrigger className="w-full">
        <Filter className="w-4 h-4 mr-2" />
        <SelectValue placeholder="Select City" />
      </SelectTrigger>
      <SelectContent>
        {selectedState &&
          selectedState !== 'all' &&
          southwestStates[selectedState as keyof typeof southwestStates].map(
            (state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            )
          )}
      </SelectContent>
    </Select>
  )
}
export default CityFilter
