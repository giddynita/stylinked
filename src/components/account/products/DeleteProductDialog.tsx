import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { deleteImage, deleteProductAction } from '@/utils/action'
import type { Product } from '@/utils/types'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface DeleteProductProp {
  product: Product
}

function DeleteProductDialog({ product }: DeleteProductProp) {
  const {
    mutate: deleteProduct,
    isError: deleteError,
    isPending: deleting,
  } = deleteProductAction()

  const handleDeleteProduct = (productId: string, images: string[]) => {
    if (deleteError) {
      return
    }
    deleteProduct(productId, {
      onSuccess: async () => {
        for (let i = 0; i < images?.length; i++) {
          const file = images[i]
          await deleteImage(file)
        }
        toast.success('Product deleted successfully!')
      },
      onError: () => {
        toast.error('Error deleting product')
      },
    })
  }
  return (
    <AlertDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className=" w-6 h-6">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={-4}>
          Delete
        </TooltipContent>
      </Tooltip>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Product</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{product.name}
            "? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteProduct(product.id, product.images)}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default DeleteProductDialog
