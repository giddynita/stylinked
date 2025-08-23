import { TabsContent } from '@/components/ui/tabs'
import { formSuspense } from '@/utils/suspense'
import { lazy } from 'react'

const BusinessSettingsForm = lazy(
  () => import('@/components/formTypes/BusinessSettingsForm')
)
const ProfileSettingsForm = lazy(
  () => import('@/components/formTypes/ProfileSettingsForm')
)
const SecuritySettingsForm = lazy(
  () => import('@/components/formTypes/SecuritySettingsForm')
)

function SettingsTabsContent({ tabsList }: { tabsList: string[] }) {
  const settingsFormComponents: Record<string, React.ComponentType> = {
    profile: ProfileSettingsForm,
    business: BusinessSettingsForm,
    security: SecuritySettingsForm,
  }

  return (
    <>
      {tabsList.map((status) => {
        const Component = settingsFormComponents[status]
        return (
          <TabsContent key={status} value={status} className="max-w-lg">
            <div className="py-4">{formSuspense(<Component />)}</div>
          </TabsContent>
        )
      })}
    </>
  )
}
export default SettingsTabsContent
