import { Ratings } from '@/components/global'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCreatedAt } from '@/utils/format'
import type { Reviews } from '@/utils/types'

function VendorReviews({ reviews }: { reviews: Reviews[] | undefined }) {
  return (
    <div>
      {reviews?.map(({ rating, comment, id, createdat, productname, name }) => (
        <Card
          key={id}
          className="shadow-sm border-border/50 hover:shadow-md transition-shadow"
        >
          <CardHeader>
            <div className="flex flex-1 flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <div>
                  <CardTitle className="text-lg">{productname}</CardTitle>
                  <p className="text-sm text-muted-foreground">{name}</p>
                </div>
                <Ratings rating={rating} />
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {formatCreatedAt(createdat)}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
export default VendorReviews
