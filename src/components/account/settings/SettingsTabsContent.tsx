import { TabsContent } from '@/components/ui/tabs'
import { buyerSettingsTabsList, vendorSettingsTabsList } from '@/utils/data'
import Profile from './Profile'
import type { AccountType } from '@/utils/types'
import { useSelector } from 'react-redux'
import Business from './Business'
import Security from './Security'

function SettingsTabsContent() {
  const { userRole }: { userRole: { role: AccountType } } = useSelector(
    (state: any) => state.userState
  )
  const tabsList =
    userRole.role === 'vendor' ? vendorSettingsTabsList : buyerSettingsTabsList
  return (
    <>
      {tabsList.map((status) => (
        <TabsContent key={status} value={status}>
          <div className="py-4">
            {status === 'profile' && <Profile />}
            {status === 'business' && <Business />}
            {status === 'security' && <Security />}
          </div>
        </TabsContent>
      ))}
    </>
  )
}
export default SettingsTabsContent
