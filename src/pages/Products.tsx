import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { Edit, Trash2, Package, Eye, Plus } from 'lucide-react'
import { ProductForm } from '@/components/formTypes'
import { AccountPagesHeading } from '@/components/headings'
import type { Variant, Product } from '@/utils/types'
import { toast } from 'sonner'
import { currencyFormatter } from '@/utils/format'
import { ProductListSkeleton } from '@/components/skeletons'
import { useVendorProducts } from '@/utils/hooks'
import {
  addProductAction,
  deleteImage,
  deleteProductAction,
  updateProductAction,
} from '@/utils/action'

const Products = () => {
  //states
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  //hooks
  const { data: products, isLoading } = useVendorProducts()
  const {
    mutate: deleteProduct,
    isError: deleteError,
    isPending: deleting,
  } = deleteProductAction()
  const {
    mutate: addProduct,
    isError: addError,
    isPending: adding,
  } = addProductAction()
  const {
    mutate: updateProduct,
    isError: updateError,
    isPending: updating,
  } = updateProductAction()

  const filteredProducts =
    products?.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

  const getStatusBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    }
    if (stock < 5) {
      return <Badge variant="outline">Low Stock</Badge>
    }
    return (
      <Badge variant="default" className="bg-green-500">
        Active
      </Badge>
    )
  }

  const handleAddProduct = async (product: Product) => {
    if (addError) {
      return toast('Error adding product')
    }
    addProduct(product)

    setIsAddDialogOpen(false)
    toast('Product added successfully!')
  }

  const handleEditProduct = (product: Product) => {
    if (updateError) {
      return toast('Error updating product')
    }
    updateProduct({
      id: selectedProduct?.id,
      payload: product,
    })

    setIsEditDialogOpen(false)
    setSelectedProduct(null)
    toast('Product updated successfully!')
  }

  const handleDeleteProduct = async (productId: string, images: string[]) => {
    if (deleteError) {
      return toast('Error deleting product')
    }
    deleteProduct(productId)

    for (let i = 0; i < images?.length; i++) {
      const file = images[i]
      await deleteImage(file)
    }
    toast('Product deleted successfully!')
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsViewDialogOpen(true)
  }

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6 bg-background ">
      <div className="flex items-start gap-6 justify-between ">
        <AccountPagesHeading
          pageTitle="Products"
          pageDesc="Manage your clothing inventory and listings"
        />
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className=" h-6 w-6" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add a new clothing item to your inventory
              </DialogDescription>
            </DialogHeader>
            <ProductForm
              onSubmit={handleAddProduct}
              onCancel={() => setIsAddDialogOpen(false)}
              onSubmitting={adding}
            />
          </DialogContent>
        </Dialog>
      </div>
      {navigator.onLine ? (
        <Card className="py-4">
          <CardHeader className="px-4">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Clothing Inventory
            </CardTitle>
            <CardDescription>
              A comprehensive view of all your clothing products
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4">
            <div className="flex items-center space-x-2 mb-4">
              <Input
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
                type="search"
              />
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader className="text-xs">
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Status
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Category
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Brand
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                {isLoading ? (
                  <ProductListSkeleton />
                ) : (
                  <TableBody className="text-xs">
                    {filteredProducts.length > 0 ? (
                      filteredProducts?.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium  max-w-40">
                            <div>
                              <div className="font-semibold ">
                                {product.name}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold max-w-24">
                            {currencyFormatter(product.price)}
                          </TableCell>
                          <TableCell className="max-w-24">
                            <span
                              className={
                                product.stock == 0
                                  ? 'text-orange-600 font-medium'
                                  : ''
                              }
                            >
                              {product.stock}
                            </span>
                          </TableCell>
                          <TableCell className=" hidden lg:table-cell ">
                            {getStatusBadge(product.stock)}
                          </TableCell>
                          <TableCell className="text-muted-foreground hidden lg:table-cell">
                            {product.category}
                          </TableCell>
                          <TableCell className="text-muted-foreground hidden lg:table-cell max-w-24   ">
                            {product.brand}
                          </TableCell>
                          <TableCell className="text-right  ">
                            <div className="flex justify-end gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className=" w-6 h-6"
                                onClick={() => handleViewProduct(product)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className=" w-6 h-6"
                                onClick={() => handleEditClick(product)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className=" w-6 h-6"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Product
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "
                                      {product.name}
                                      "? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteProduct(
                                          product.id,
                                          product.images
                                        )
                                      }
                                    >
                                      {deleting ? 'Deleting...' : 'Delete'}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="font-bold text-2xl text-center py-8"
                        >
                          {searchTerm ? (
                            'No results'
                          ) : (
                            <>
                              <div className="space-y-6">
                                <p>You have not added any product.</p>
                                <Button
                                  onClick={() => setIsAddDialogOpen(true)}
                                  size="lg"
                                >
                                  <Plus /> Add Product
                                </Button>
                              </div>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                )}
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <h4 className="text-center font-bold text-2xl my-20">
          Check your internet connection and reload.
        </h4>
      )}

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product information.
            </DialogDescription>
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

      {/* View Product Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>View product information.</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">
                  Product Name
                </h4>
                <p>{selectedProduct.name}</p>
              </div>

              {selectedProduct.description && (
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">
                    Description
                  </h4>
                  <p>{selectedProduct.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">
                    Price
                  </h4>
                  <p className="text-base">
                    {currencyFormatter(selectedProduct.price)}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">
                    Category
                  </h4>
                  <p>{selectedProduct.category}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">
                    Brand
                  </h4>
                  <p>{selectedProduct.brand}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">
                    Material
                  </h4>
                  <p>{selectedProduct.material}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">
                    Stock
                  </h4>
                  <p>
                    {selectedProduct.stock} unit
                    {selectedProduct.stock > 1 && 's'}
                  </p>
                </div>
              </div>
              {selectedProduct.variants && (
                <div className="space-y-4 grid sm:grid-cols-2">
                  {selectedProduct.variants.map((variant: Variant) => (
                    <div key={variant.size}>
                      <div className="flex gap-1 text-sm items-center">
                        <h4 className="font-semibold  text-muted-foreground">
                          Size:
                        </h4>
                        <p>{variant.size} </p>
                      </div>

                      <ul className="space-y-2">
                        {variant.colors.map((c) => (
                          <li key={c.color} className="space-x-4 pl-2 flex">
                            <span className="flex gap-1 text-sm items-center">
                              <h4 className="font-semibold text-muted-foreground">
                                Color:
                              </h4>
                              {c.color}
                            </span>
                            <span className="flex gap-1 text-sm items-center">
                              <h4 className="font-semibold  text-muted-foreground">
                                Quantity:
                              </h4>{' '}
                              {c.quantity}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              <div className="mb-6">
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                  Product Image{selectedProduct.images.length > 1 && 's'}
                </h4>
                <div className=" flex items-center flex-wrap justify-center sm:justify-start place-items-center sm:place-items-start gap-8">
                  {selectedProduct.images.map((image, index) => {
                    return (
                      <figure
                        key={index}
                        className="w-[200px] h-[200px] shadow-lg p-4 "
                      >
                        <img
                          src={image}
                          alt={selectedProduct.name}
                          className="w-full object-contain h-full"
                          loading="lazy"
                        />
                      </figure>
                    )
                  })}
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-muted-foreground">
                  Status
                </h4>
                {getStatusBadge(selectedProduct.stock)}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Products
