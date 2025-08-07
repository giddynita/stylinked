import { LinkIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Logo({ icon, text }: { icon: string; text: string }) {
  return (
    <Link to="/" className="flex items-center space-x-1.5 text-primary">
      <LinkIcon className={` ${icon} font-bold `} />
      <h1 className={`${text} font-bold mt-1`}>STYLINKED</h1>
    </Link>
  )
}
export default React.memo(Logo)
