import { AvatarImage, Avatar, AvatarFallback } from '../ui/avatar'

interface VendorAvatarProp {
  image: string | undefined
  businessname: string | undefined
}

function VendorAvatar({ image, businessname }: VendorAvatarProp) {
  return (
    <Avatar className="w-full h-full">
      <AvatarImage src={image} alt={businessname} />
      <AvatarFallback className="uppercase font-bold bg-muted-foreground text-5xl text-muted">
        {businessname?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}
export default VendorAvatar
