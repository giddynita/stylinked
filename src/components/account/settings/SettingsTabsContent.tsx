import { TabsContent } from '@/components/ui/tabs'
import BusinessSettingsForm from '../../formTypes/BusinessSettingsForm'
import ProfileSettingsForm from '../../formTypes/ProfileSettingsForm'
import SecuritySettingsForm from '../../formTypes/SecuritySettingsForm'
import LazyLoad from 'react-lazyload'

function SettingsTabsContent({ tabsList }: { tabsList: string[] }) {
  return (
    <>
      {tabsList.map((status) => (
        <TabsContent key={status} value={status} className="max-w-lg">
          <div className="py-4">
            <LazyLoad>
              {status === 'profile' && <ProfileSettingsForm />}
            </LazyLoad>
            <LazyLoad>
              {status === 'business' && <BusinessSettingsForm />}
            </LazyLoad>
            <LazyLoad>
              {status === 'security' && <SecuritySettingsForm />}
            </LazyLoad>
          </div>
        </TabsContent>
      ))}
    </>
  )
}
export default SettingsTabsContent
