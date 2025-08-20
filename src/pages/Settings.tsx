import BuyerTabsList from '@/components/account/settings/buyer/BuyerTabsList'
import SettingsTabsContent from '@/components/account/settings/SettingsTabsContent'
import VendorTabsList from '@/components/account/settings/vendor/VendorTabsList'
import { AccountPagesHeading } from '@/components/headings'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs } from '@/components/ui/tabs'
import { type AccountType } from '@/utils/types'
import { useSelector } from 'react-redux'

function Settings() {
  const { userRole }: { userRole: { role: AccountType } } = useSelector(
    (state: any) => state.userState
  )
  const tabsList =
    userRole.role === 'vendor' ? <VendorTabsList /> : <BuyerTabsList />

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
              {tabsList}
              <SettingsTabsContent />
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
export default Settings
