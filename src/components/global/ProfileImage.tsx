import { Avatar, AvatarFallback } from '../ui/avatar'
import { Link } from 'react-router-dom'
import type { UserDataType } from '@/utils/types'

interface ProfileImageProp {
  userData: UserDataType | null | undefined
}

function ProfileImage({ userData }: ProfileImageProp) {
  return (
    <Avatar>
      <AvatarFallback className="uppercase font-bold bg-muted-foreground  text-muted">
        <Link to="/account">
          <span className="sr-only">user initials</span>
          {userData?.firstname.charAt(0)}
          {userData?.lastname.charAt(0)}
        </Link>
      </AvatarFallback>
    </Avatar>
  )
}
export default ProfileImage
