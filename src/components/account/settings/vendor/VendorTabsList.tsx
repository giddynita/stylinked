import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { vendorSettingsTabsList } from '@/utils/data'

function VendorTabsList() {
  return (
    <TabsList>
      {vendorSettingsTabsList.map((tabs) => {
        return (
          <TabsTrigger
            key={tabs}
            value={tabs}
            className="text-[10px] sm:text-xs px-4 sm:px-6  cursor-pointer capitalize"
          >
            {tabs}
          </TabsTrigger>
        )
      })}
    </TabsList>
  )
}
export default VendorTabsList
