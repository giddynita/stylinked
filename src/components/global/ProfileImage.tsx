import { User } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Link } from 'react-router-dom'
import type { UserDataType } from '@/utils/types'

interface ProfileImageProp {
  userData: UserDataType | null | undefined
  isLoading: boolean
}

function ProfileImage({ userData, isLoading }: ProfileImageProp) {
  return (
    <Avatar>
      <AvatarFallback className="uppercase font-bold bg-muted-foreground  text-muted">
        {isLoading ? (
          <User className="h-4 w-4" />
        ) : (
          <Link to="/account">
            <span className="sr-only">user initials</span>
            {userData?.firstname.charAt(0)}
            {userData?.lastname.charAt(0)}
          </Link>
        )}
      </AvatarFallback>
    </Avatar>
  )
}
export default ProfileImage
