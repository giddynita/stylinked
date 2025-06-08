import { Loader2Icon } from 'lucide-react'
import { Button } from '../ui/button'

function AuthLoading() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Button variant="ghost" disabled className="w-full text-2xl font-bold">
        Verifying
        <Loader2Icon className="animate-spin " />
      </Button>
    </main>
  )
}
export default AuthLoading
