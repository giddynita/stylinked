import { Button } from '../ui/button'
import { Loader2Icon } from 'lucide-react'

interface SubmitButtonProp {
  submitting: boolean
  text: string
  texting: string
  setSubmitting: (value: boolean) => void
}

function FormSubmitButton({
  submitting,
  text,
  texting,
  setSubmitting,
}: SubmitButtonProp) {
  return (
    <div>
      {submitting ? (
        <Button disabled className="w-full">
          {texting} <Loader2Icon className="animate-spin " />
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full"
          onClick={() => setSubmitting(true)}
        >
          {text}
        </Button>
      )}
    </div>
  )
}
export default FormSubmitButton
