import { AccountPagesHeading } from '@/components/headings'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs } from '@/components/ui/tabs'
import { type UserRole } from '@/utils/types'
import { useSelector } from 'react-redux'

import { buyerSettingsTabsList, vendorSettingsTabsList } from '@/utils/data'
import SettingsTabsList from '@/components/account/settings/SettingsTabsList'
import SettingsTabsContent from '@/components/account/settings/SettingsTabsContent'

function Settings() {
  const { userRole }: { userRole: UserRole } = useSelector(
    (state: any) => state.userState
  )
  const roleTabsList: Record<string, string[]> = {
    buyer: buyerSettingsTabsList,
    vendor: vendorSettingsTabsList,
  }
  const tabsList = roleTabsList[userRole.role]

  return (
    <>
      <AccountPagesHeading
        pageTitle="Settings"
        pageDesc="Manage your account preferences"
      />
      <div className="my-6 max-w-xl">
        <Card>
          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              <SettingsTabsList tabsList={tabsList} />
              <SettingsTabsContent tabsList={tabsList} />
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
export default Settings
