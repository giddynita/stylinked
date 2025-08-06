import { User } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { useUserData } from '@/utils/hooks'
import { Link } from 'react-router-dom'

function ProfileImage() {
  const { data: userInfo, isLoading } = useUserData()

  return (
    <Avatar>
      <AvatarFallback className="uppercase font-bold bg-muted-foreground  text-muted">
        {isLoading ? (
          <User className="h-4 w-4" />
        ) : (
          <Link to="/account">
            <span className="sr-only">user initials</span>
            {userInfo?.userData?.firstname.charAt(0)}
            {userInfo?.userData?.lastname.charAt(0)}
          </Link>
        )}
      </AvatarFallback>
    </Avatar>
  )
}
export default ProfileImage
