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
import { addProductAction } from '@/utils/action'
import type { Product } from '@/utils/types'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

function AddProductDialog() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { mutate: addProduct, isPending: adding } = addProductAction()
  const handleAddProduct = async (product: Product) => {
    addProduct(product, {
      onSuccess: () => {
        setIsAddDialogOpen(false)
        toast.success('Product added successfully!')
      },
      onError: () => {
        toast.error('Error adding product')
      },
    })
  }
  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className=" h-6 w-6" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Add a new item to your inventory
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setIsAddDialogOpen(false)}
          onSubmitting={adding}
        />
      </DialogContent>
    </Dialog>
  )
}
export default AddProductDialog
