import { TabsContent } from '@/components/ui/tabs'
import { buyerSettingsTabsList, vendorSettingsTabsList } from '@/utils/data'
import type { AccountType } from '@/utils/types'
import { useSelector } from 'react-redux'
import BusinessSettingsForm from '../../formTypes/BusinessSettingsForm'
import ProfileSettingsForm from '../../formTypes/ProfileSettingsForm'
import SecuritySettingsForm from '../../formTypes/SecuritySettingsForm'

function SettingsTabsContent() {
  const { userRole }: { userRole: { role: AccountType } } = useSelector(
    (state: any) => state.userState
  )
  const tabsList =
    userRole.role === 'vendor' ? vendorSettingsTabsList : buyerSettingsTabsList
  return (
    <>
      {tabsList.map((status) => (
        <TabsContent key={status} value={status} className="max-w-lg">
          <div className="py-4">
            {status === 'profile' && <ProfileSettingsForm />}
            {status === 'business' && <BusinessSettingsForm />}
            {status === 'security' && <SecuritySettingsForm />}
          </div>
        </TabsContent>
      ))}
    </>
  )
}
export default SettingsTabsContent
