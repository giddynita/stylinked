import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { padNumber } from '@/utils/format'
import { useVendorProducts, useVendorProductTrend } from '@/utils/hooks'
import { Package } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import Trend from './Trend'

function ActiveProductsCard() {
  const { data: products, isLoading: productsLoading } = useVendorProducts()
  const { data: productTrend, isLoading: trendLoading } =
    useVendorProductTrend()
  const activeProducts = products?.filter((product) => product.stock !== 0)
  const trend = productTrend?.map((d) => {
    return { value: d.products_added }
  })
  return (
    <Card className="space-y-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Active Products</CardTitle>
        <Package className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-2">
        {productsLoading ? (
          <Skeleton className="w-1/3 h-8" />
        ) : (
          <div className="text-2xl font-bold">
            {padNumber(activeProducts?.length) ?? 0}
          </div>
        )}
        <Trend trend={trend} isLoading={trendLoading} />
      </CardContent>
    </Card>
  )
}
export default ActiveProductsCard
