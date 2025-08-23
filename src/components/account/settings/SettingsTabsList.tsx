import { TabsList, TabsTrigger } from '@/components/ui/tabs'

function SettingsTabsList({ tabsList }: { tabsList: string[] }) {
  return (
    <TabsList>
      {tabsList.map((tabs) => {
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
export default SettingsTabsList
