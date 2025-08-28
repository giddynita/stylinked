import { Separator } from '@/components/ui/separator'
import { TabsContent } from '@/components/ui/tabs'
import { formSuspense } from '@/utils/suspense'
import { Briefcase, Share2, Shield, User } from 'lucide-react'
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
const ShareStore = lazy(() => import('./ShareStore'))

function SettingsTabsContent({ tabsList }: { tabsList: string[] }) {
  const settingsFormComponents: Record<
    string,
    {
      component: React.ComponentType
      title: string
      icon: any
      description: string
    }
  > = {
    profile: {
      component: ProfileSettingsForm,
      title: 'Personal Information',
      icon: User,
      description: 'Update your contact information',
    },
    business: {
      component: BusinessSettingsForm,
      title: 'Business Information',
      icon: Briefcase,
      description: 'Manage your business details',
    },
    security: {
      component: SecuritySettingsForm,
      title: 'Business Information',
      icon: Shield,
      description: 'Manage your account security',
    },
    share: {
      component: ShareStore,
      title: 'Share Your Store',
      icon: Share2,
      description: 'Share your store link with customers and on social media',
    },
  }

  return (
    <>
      {tabsList.map((status) => {
        const Component = settingsFormComponents[status].component
        const title = settingsFormComponents[status].title
        const desc = settingsFormComponents[status].description
        const Icon = settingsFormComponents[status].icon

        return (
          <TabsContent key={status} value={status} className="max-w-lg">
            <div className="space-y-2 py-2">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Icon className="h-5 w-5 text-muted-foreground" />
                {title}
              </h2>
              <p className="text-sm text-muted-foreground font-medium">
                {desc}
              </p>
            </div>
            <Separator className="mt-2" />
            <div className="py-4">{formSuspense(<Component />)}</div>
          </TabsContent>
        )
      })}
    </>
  )
}
export default SettingsTabsContent
