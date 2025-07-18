import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp, TrendingDown, Minus, TrendingUpDown } from 'lucide-react'

function RevenueTrend({
  trend,
  isLoading,
}: {
  trend: { value: number }[] | undefined
  isLoading: boolean
}) {
  const trendDiff = () => {
    if (trend) {
      if (trend.length < 2)
        return {
          icon: <Minus className="text-muted-foreground" />,
          text: '',
          color: 'text-muted-foreground',
        }

      const latest = trend[trend.length - 1].value
      const previous = trend[trend.length - 2].value
      const diff = latest - previous
      const pct = (diff / previous) * 100
      if (diff > 0)
        return {
          icon: <TrendingUp className="text-green-600" />,
          text: `+${pct.toFixed(1)}%`,
          color: 'text-green-600',
        }
      if (diff < 0)
        return {
          icon: <TrendingDown className="text-red-600" />,
          text: `${pct.toFixed(1)}%`,
          color: 'text-red-600',
        }
    }
    return {
      icon: <TrendingUpDown className="text-muted-foreground" />,
      text: '',
      color: 'text-muted-foreground',
    }
  }

  const { icon, text, color } = trendDiff()

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-2/3 h-4" />
      ) : (
        <div className="text-sm flex items-center gap-1">
          Daily trend
          <TrendingUpDown className="w-4 h-4 text-muted-foreground" />:{icon}
          <span className={`font-medium ${color} `}>{text}</span>
        </div>
      )}
    </>
  )
}
export default RevenueTrend
