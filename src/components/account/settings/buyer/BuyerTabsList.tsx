import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { buyerSettingsTabsList } from '@/utils/data'

function BuyerTabsList() {
  return (
    <TabsList>
      {buyerSettingsTabsList.map((tabs) => {
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
export default BuyerTabsList
