import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RefreshCw, TrendingDown } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { Product } from '@/utils/types'
import { Link } from 'react-router-dom'

interface LowStockProducts {
  lowStockProducts: Product[] | undefined
}

function LowStock({ lowStockProducts }: LowStockProducts) {
  const getUrgencyLevel = (current: number) => {
    if (current <= 3)
      return {
        level: 'critical',
        className: 'bg-destructive text-white',
        label: 'Critical',
      }
    if (current <= 10)
      return {
        level: 'low',
        className: 'bg-warning text-white ',
        label: 'Low',
      }
    return {
      level: '',
      className: '',
      label: '',
    }
  }
  dayjs.extend(relativeTime)
  return (
    <div className="space-y-4">
      {lowStockProducts?.slice(0, 3).map((product) => {
        const urgency = getUrgencyLevel(product.stock)
        const lastUpdated = dayjs(product.updated_at).fromNow()

        return (
          <div
            key={product.id}
            className="p-4 bg-background/50 rounded-lg border border-border/50 hover:bg-background/80 transition-colors space-y-2 duration-200"
          >
            <div className="flex items-start justify-between">
              <p className="font-medium text-sm">{product.name}</p>

              <Badge className={urgency.className}>{urgency.label}</Badge>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">Stock:</span>
                <span
                  className={`font-medium ${
                    urgency.level === 'critical'
                      ? 'text-destructive'
                      : urgency.level === 'low'
                      ? 'text-warning'
                      : 'text-foreground'
                  }`}
                >
                  {product.stock}
                </span>
              </div>

              <Button asChild variant="outline" size="sm" className="text-xs">
                <Link to="/account/products">
                  <RefreshCw className="h-3 w-3" />
                  Restock
                </Link>
              </Button>
            </div>

            <div className=" flex items-center gap-2 text-xs text-muted-foreground">
              <span className="capitalize">Category: {product.category}</span>•
              <span>Updated: {lastUpdated}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default LowStock
