import { Skeleton } from '../ui/skeleton'
import { TableBody, TableCell, TableRow } from '../ui/table'

function ProductListSkeleton() {
  return (
    <TableBody>
      {Array(3)
        .fill(null)
        .map((_, index) => {
          return (
            <TableRow key={index} className="h-12 bg-muted mb-2">
              <TableCell className="font-medium  max-w-40">
                <Skeleton className="bg-background h-6" />
              </TableCell>
              <TableCell className="font-semibold max-w-24">
                <Skeleton className="bg-background h-6" />
              </TableCell>
              <TableCell className="max-w-24">
                <Skeleton className="bg-background h-6" />
              </TableCell>
              <TableCell className=" hidden lg:table-cell ">
                <Skeleton className="bg-background h-6" />
              </TableCell>
              <TableCell className="text-muted-foreground hidden lg:table-cell">
                <Skeleton className="bg-background h-6" />
              </TableCell>
              <TableCell className="text-muted-foreground hidden lg:table-cell max-w-24   ">
                <Skeleton className="bg-background h-6" />
              </TableCell>
              <TableCell className="flex items-center justify-end gap-2">
                <Skeleton className="h-6 w-6 bg-background" />
                <Skeleton className="h-6 w-6 bg-background" />
                <Skeleton className="h-6 w-6 bg-background" />
              </TableCell>
            </TableRow>
          )
        })}
    </TableBody>
  )
}
export default ProductListSkeleton
