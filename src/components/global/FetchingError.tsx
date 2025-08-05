import { Button } from '../ui/button'

interface FetchingErrorProp {
  isError: boolean
  text: string
}

function FetchingError({ isError, text }: FetchingErrorProp) {
  return (
    <>
      {isError && (
        <div className="text-center py-12">
          <p className="text-xl font-medium">Unable to load {text}.</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      )}
    </>
  )
}
export default FetchingError
