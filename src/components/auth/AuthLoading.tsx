import { Loader2Icon } from 'lucide-react'
import { Button } from '../ui/button'

function AuthLoading() {
  return (
    <main className="min-h-screen pt-24">
      <Button
        variant="ghost"
        disabled
        className="w-full text-2xl font-bold items-center "
      >
        Verifying
        <Loader2Icon className="animate-spin mt-2" />
      </Button>
    </main>
  )
}
export default AuthLoading
