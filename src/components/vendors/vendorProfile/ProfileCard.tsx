import { Card, CardContent } from '@/components/ui/card'
import type { VendorProfile } from '@/utils/types'
import VendorAvatar from '../VendorAvatar'
import { Calendar, MapPin, MessageCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ContactVendorDialog from './ContactSellerDialog'

function ProfileCard({
  vendorProfile,
}: {
  vendorProfile: VendorProfile | undefined
}) {
  const [contactSellerDialogOpen, setContactSellerDialogOpen] = useState(false)

  const handleDialogClose = () => {
    setContactSellerDialogOpen(false)
  }

  return (
    <>
      <Card className="p-0">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="w-32 h-32">
              <VendorAvatar
                image={vendorProfile?.image}
                businessname={vendorProfile?.businessname}
              />
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-6">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold text-foreground">
                    {vendorProfile?.businessname}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{`${vendorProfile?.city}, ${vendorProfile?.state}`}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Since {vendorProfile?.joinedDate}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    className="max-w-48"
                    onClick={() => setContactSellerDialogOpen(true)}
                  >
                    <MessageCircle className="w-4 h-4 " />
                    Contact Vendor
                  </Button>
                  <ContactVendorDialog
                    vendorProfile={vendorProfile}
                    contactSellerDialogOpen={contactSellerDialogOpen}
                    setContactSellerDialogOpen={handleDialogClose}
                  />
                </div>
              </div>
              <p className="text-foreground">{vendorProfile?.description}</p>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">
                    {vendorProfile?.rating}
                  </span>
                </div>
                {vendorProfile?.totalReviews && (
                  <span className="text-muted-foreground">
                    {`(${vendorProfile.totalReviews}  review${
                      vendorProfile.totalReviews > 1 ? 's' : ''
                    })`}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
export default ProfileCard
