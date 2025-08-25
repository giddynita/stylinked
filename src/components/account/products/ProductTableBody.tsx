import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { getUrgencyLevel } from '@/utils/data'
import { currencyFormatter } from '@/utils/format'
import { nullSuspense } from '@/utils/suspense'
import type { Product } from '@/utils/types'
import { lazy, useState } from 'react'

const ViewProductDialog = lazy(() => import('./ViewProductDialog'))
const EditProductDialog = lazy(() => import('./EditProductDialog'))
const DeleteProductDialog = lazy(() => import('./DeleteProductDialog'))

interface ProductTableBodyProp {
  filteredProducts: Product[] | undefined
}

function ProductTableBody({ filteredProducts }: ProductTableBodyProp) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <>
      {filteredProducts?.map((product, index) => {
        const urgency = getUrgencyLevel(product.stock)
        return (
          <TableRow key={index}>
            <TableCell className="max-w-40">{product.name}</TableCell>
            <TableCell className="max-w-24">
              {currencyFormatter(product.price)}
            </TableCell>
            <TableCell
              className={`max-w-24
                  ${
                    product.stock <= 3
                      ? 'text-destructive'
                      : product.stock <= 10
                      ? 'text-warning'
                      : 'text-foreground'
                  }
                `}
            >
              {product.stock}
            </TableCell>
            <TableCell className=" hidden lg:table-cell ">
              <Badge className={urgency.className}>{urgency.label}</Badge>
            </TableCell>
            <TableCell className="text-muted-foreground hidden lg:table-cell">
              {product.category}
            </TableCell>
            <TableCell className="text-muted-foreground hidden lg:table-cell max-w-24   ">
              {product.brand}
            </TableCell>
            <TableCell className="text-right  ">
              <div className="flex justify-end gap-1">
                {nullSuspense(
                  <>
                    <ViewProductDialog
                      setSelectedProduct={setSelectedProduct}
                      product={product}
                      selectedProduct={selectedProduct}
                    />
                    <EditProductDialog
                      setSelectedProduct={setSelectedProduct}
                      product={product}
                      selectedProduct={selectedProduct}
                    />
                    <DeleteProductDialog product={product} />
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}
export default ProductTableBody
