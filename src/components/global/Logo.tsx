import { LinkIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

function Logo({ icon, text }: { icon: string; text: string }) {
  return (
    <Link to="/" className="flex items-center space-x-1 text-primary">
      <LinkIcon className={` ${icon} `} />
      <h1 className={`${text} font-bold`}>STYLINKED</h1>
    </Link>
  )
}
export default Logo
