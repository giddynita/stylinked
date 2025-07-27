import { StockAlertSkeleton } from '@/components/skeletons'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'
import LowStock from './LowStock'
import { NoResult } from '@/components/global'
import type { Product } from '@/utils/types'

interface LowStockProp {
  products: Product[] | undefined
  productsLoading: boolean
}

function LowStockCard({ products, productsLoading }: LowStockProp) {
  const lowStockProducts = products?.filter((p) => p.stock <= 10)
  const criticalProducts = products?.filter((p) => p.stock <= 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <div className=" p-2 bg-warning/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            Low Stock Alerts
          </div>
          {criticalProducts && criticalProducts.length >= 1 && (
            <Badge variant="destructive" className="animate-pulse">
              {criticalProducts.length} Critical
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {productsLoading ? (
          <StockAlertSkeleton />
        ) : (
          <>
            <>
              <LowStock lowStockProducts={lowStockProducts} />
              <NoResult
                length={lowStockProducts?.length}
                text={`${
                  products && products.length > 0
                    ? 'All products are well stocked'
                    : 'You have no product'
                }`}
                icon={AlertTriangle}
              />
            </>
          </>
        )}
      </CardContent>
    </Card>
  )
}
export default LowStockCard
