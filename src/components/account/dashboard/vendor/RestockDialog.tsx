import { ProductForm } from '@/components/formTypes'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { updateProductAction } from '@/utils/action'
import type { Product } from '@/utils/types'
import { RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface RestockDialogProp {
  setSelectedProduct: (value: Product | null) => void
  product: Product
  selectedProduct: Product | null
}

function RestockDialog({
  setSelectedProduct,
  product,
  selectedProduct,
}: RestockDialogProp) {
  const [isRestockDialogOpen, setIsRestockDialogOpen] = useState(false)
  const { mutate: updateProduct, isPending: updating } = updateProductAction()

  const handleRestock = (product: Product) => {
    updateProduct(
      {
        id: selectedProduct?.id,
        payload: product,
      },
      {
        onSuccess: () => {
          setIsRestockDialogOpen(false)
          setSelectedProduct(null)
          toast.success('Product updated successfully!')
        },
        onError: () => {
          toast.error('Error updating product')
        },
      }
    )
  }
  const handleRestockClick = (product: Product) => {
    setSelectedProduct(product)
    setIsRestockDialogOpen(true)
  }

  return (
    <Dialog open={isRestockDialogOpen} onOpenChange={setIsRestockDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-xs cursor-pointer"
          onClick={() => handleRestockClick(product)}
        >
          <RefreshCw className="h-3 w-3" />
          Restock
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Restock Product</DialogTitle>
          <DialogDescription>Update the product quantity.</DialogDescription>
        </DialogHeader>
        {selectedProduct && (
          <ProductForm
            product={selectedProduct}
            onSubmit={handleRestock}
            onCancel={() => {
              setIsRestockDialogOpen(false)
              setSelectedProduct(null)
            }}
            onSubmitting={updating}
            restock
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
export default RestockDialog
