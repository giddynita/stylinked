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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { updateProductAction } from '@/utils/action'
import type { Product } from '@/utils/types'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface EditProductDialogProp {
  setSelectedProduct: (value: Product | null) => void
  product: Product
  selectedProduct: Product | null
}

function EditProductDialog({
  setSelectedProduct,
  product,
  selectedProduct,
}: EditProductDialogProp) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { mutate: updateProduct, isPending: updating } = updateProductAction()

  const handleEditProduct = (product: Product) => {
    updateProduct(
      {
        id: selectedProduct?.id,
        payload: product,
      },
      {
        onSuccess: () => {
          setIsEditDialogOpen(false)
          setSelectedProduct(null)
          toast.success('Product updated successfully!')
        },
        onError: () => {
          toast.error('Error updating product')
        },
      }
    )
  }
  const handleEditClick = (product: Product) => {
    setSelectedProduct(product)
    setIsEditDialogOpen(true)
  }
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className=" w-6 h-6"
              onClick={() => handleEditClick(product)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={-4}>
          Edit
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update the product information.</DialogDescription>
        </DialogHeader>
        {selectedProduct && (
          <ProductForm
            product={selectedProduct}
            onSubmit={handleEditProduct}
            onCancel={() => {
              setIsEditDialogOpen(false)
              setSelectedProduct(null)
            }}
            onSubmitting={updating}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
export default EditProductDialog
