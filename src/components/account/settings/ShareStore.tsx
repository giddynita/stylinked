import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { User } from '@supabase/supabase-js'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

function ShareStore() {
  const { user }: { user: User } = useSelector((state: any) => state.userState)
  const [copied, setCopied] = useState(false)
  const storeLink = `https://stylinked.netlify.app/vendors/${user?.id}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(storeLink)
      setCopied(true)
      toast.success('Store link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }
  return (
    <div className="space-y-4">
      <Label htmlFor="storeLink" className="text-base">
        Store Link
      </Label>
      <div className="flex items-center gap-2">
        <Input id="storeLink" value={storeLink} readOnly className="flex-1" />
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          className="shrink-0"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Click the copy button to copy your store link to share with customers.
      </p>
    </div>
  )
}
export default ShareStore
