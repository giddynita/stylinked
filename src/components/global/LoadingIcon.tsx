import { LinkIcon } from 'lucide-react'

function LoadingIcon() {
  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <LinkIcon className="w-12 h-12 animate-pulse text-primary" />
    </div>
  )
}
export default LoadingIcon
