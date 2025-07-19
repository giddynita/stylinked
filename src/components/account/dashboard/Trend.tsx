import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp, TrendingDown, Minus, TrendingUpDown } from 'lucide-react'

interface Trend {
  trend: { value: number }[] | undefined
  isLoading: boolean
}

function Trend({ trend, isLoading }: Trend) {
  const trendDiff = () => {
    if (trend) {
      if (trend.length < 2)
        return {
          icon: <Minus className="text-muted-foreground" />,
          diff: '',
          color: 'text-muted-foreground',
        }

      const latest = trend[trend.length - 1]
      const previous = trend[trend.length - 2]

      const diff = latest.value - previous.value

      if (diff > 0)
        return {
          icon: <TrendingUp className="text-green-600" />,
          diff: `+${diff}`,
          color: 'text-green-600',
        }
      if (diff < 0)
        return {
          icon: <TrendingDown className="text-red-600" />,
          diff,
          color: 'text-red-600',
        }
    }
    return {
      icon: <Minus className="text-muted-foreground" />,
      diff: '',
      color: 'text-muted-foreground',
    }
  }

  const { icon, diff, color } = trendDiff()

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-2/3 h-4" />
      ) : (
        <div className="text-sm flex items-center gap-1">
          Daily trend
          <TrendingUpDown className="w-4 h-4 text-muted-foreground" />:{icon}
          <span className={` font-medium  ${color} `}>{diff}</span>
        </div>
      )}
    </>
  )
}
export default Trend
