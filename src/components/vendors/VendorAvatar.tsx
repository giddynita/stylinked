import { AvatarImage, Avatar, AvatarFallback } from '../ui/avatar'

function VendorAvatar({
  image,
  businessname,
}: {
  image: string | undefined
  businessname: string | undefined
}) {
  return (
    <Avatar className="w-full h-full">
      <AvatarImage src={image} alt={businessname} />
      <AvatarFallback className="uppercase font-bold bg-accent text-5xl  text-foreground">
        {businessname?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}
export default VendorAvatar
