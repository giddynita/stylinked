import { Button } from '../ui/button'
import { Loader2Icon } from 'lucide-react'
function SubmitButton({
  submitting,
  text,
  texting,
}: {
  submitting: boolean
  text: string
  texting: string
}) {
  return (
    <div>
      {submitting ? (
        <Button disabled className="w-full">
          <Loader2Icon className="animate-spin " /> {texting}
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          {text}
        </Button>
      )}
    </div>
  )
}
export default SubmitButton
