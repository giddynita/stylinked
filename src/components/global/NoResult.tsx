import { AlertTriangle } from 'lucide-react'
import { Button } from '../ui/button'

interface NoResultProp {
  text: string
  icon: any
  isError: boolean
  errorText: string
}

function NoResult({ text, icon, isError, errorText }: NoResultProp) {
  const Icon = icon
  return (
    <>
      <div className="text-center text-muted-foreground my-8 mx-auto py-12">
        <Icon className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p className="text-sm">{text}</p>
      </div>
      {isError && (
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-xl font-medium">Unable to load {errorText}.</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      )}
    </>
  )
}
export default NoResult
