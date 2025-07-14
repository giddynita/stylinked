import { progress } from '@/utils/data'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

function ProgressIndicator() {
  const { step } = useSelector((state: any) => state.checkoutState)

  return (
    <div className="flex items-center justify-center space-x-8">
      {progress.map(({ number, name }, index) => {
        return (
          <div className="flex items-center gap-8 " key={index}>
            <div
              className={`flex items-center space-x-2 ${
                step >= number ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Badge
                variant={step >= number ? 'default' : 'secondary'}
                className={`w-8 h-8 rounded-full`}
              >
                {number}
              </Badge>
              <span className="font-medium capitalize">{name}</span>
            </div>
            <div
              className={`w-16 h-1 ${
                step >= number + 1 ? 'bg-primary' : 'bg-muted-foreground'
              } ${index == progress.length - 1 && 'hidden'} `}
            ></div>
          </div>
        )
      })}
    </div>
  )
}
export default ProgressIndicator
