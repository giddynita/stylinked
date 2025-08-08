import { Button } from '../ui/button'
import { Loader2Icon } from 'lucide-react'

interface SubmitButtonProp {
  submitting: boolean
  text: string
  texting: string
  /* setSubmitting?: (value: boolean) => voi */
}

function SubmitButton({ submitting, text, texting }: SubmitButtonProp) {
  return (
    <div>
      {submitting ? (
        <Button disabled className="w-full">
          <Loader2Icon className="animate-spin " /> {texting}
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full" /* onClick={() => setSubmitting(true)} */
        >
          {text}
        </Button>
      )}
    </div>
  )
}
export default SubmitButton
