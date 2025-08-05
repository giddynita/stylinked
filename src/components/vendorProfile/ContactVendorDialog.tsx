import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import VendorAvatar from '../vendors/VendorAvatar'
import { MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { VendorProfile } from '@/utils/types'
import { DialogDescription } from '@radix-ui/react-dialog'

interface ContactVendorDialogProp {
  vendorProfile: VendorProfile | undefined
  contactSellerDialogOpen: boolean
  setContactSellerDialogOpen: () => void
}

function ContactVendorDialog({
  vendorProfile,
  contactSellerDialogOpen,
  setContactSellerDialogOpen,
}: ContactVendorDialogProp) {
  const handlePhoneClick = () => {
    window.location.href = `tel:${vendorProfile?.phone}`
  }

  return (
    <Dialog
      open={contactSellerDialogOpen}
      onOpenChange={setContactSellerDialogOpen}
    >
      <DialogContent className="sm:max-w-md  shadow-lg space-y-4 pt-10">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-foreground">
              Contact Vendor
            </DialogTitle>
            <DialogDescription className="sr-only">
              Reach out to Vendor via phone call
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="space-y-6">
          {/* Vendor Profile */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-32 h-32 rounded-full">
              <VendorAvatar
                image={vendorProfile?.image}
                businessname={vendorProfile?.businessname}
              />
            </div>

            <h3 className="text-xl font-semibold text-foreground">
              {vendorProfile?.businessname}
            </h3>
          </div>
          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">
                  {`${vendorProfile?.city}, ${vendorProfile?.state}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-medium text-foreground">
                  {vendorProfile?.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={handlePhoneClick}
            className="w-full hover:scale-[1.02]"
          >
            <Phone size={20} />
            Call Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default ContactVendorDialog
