import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '../ui/separator'
import { toast } from 'sonner'
import type { ColorQuantity, ProductFormProps, Variant } from '@/utils/types'
import { productSchema, validateWithZodSchema } from '@/utils/schema'
import { useUserData } from '@/utils/hooks'
import { getAuthUser } from '@/utils/loader'
import { productCategories } from '@/utils/data'
import { ProductImages, ProductVariants } from '../account'
import FormInputField from '../form/FormInputField'
import FormTextArea from '../form/FormTextArea'
import FormSelectField from '../form/FormSelectField'
import ImageInput from '../form/ImageInput'

const ProductForm = ({
  product,
  onSubmit,
  onCancel,
  onSubmitting,
}: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    material: product?.material || '',
    brand: product?.brand || '',
  })
  //others
  const [variants, setVariants] = useState<Variant[]>(product?.variants || [])
  //images
  const [validImages, setValidImages] = useState<(string | undefined)[]>(
    product?.images || []
  )
  const [loadingImagesStatus, setLoadingImagesStatus] = useState<boolean>(false)
  console.log(variants)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const { data: userInfo } = useUserData()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validatedData = validateWithZodSchema(productSchema, formData)
    if (!validatedData) {
      return
    }
    if (!variants.length) {
      return toast.warning('Add size and color options for this product.')
    }
    if (!validImages.length) {
      return toast.warning('Please add at least one image of the product.')
    }

    const stockArray = variants.map((variant: Variant) =>
      variant.colors.map((color: ColorQuantity) => {
        return color.quantity
      })
    )
    const stockSummation = stockArray
      .flat()
      .reduce((a: number, b: number) => a + b, 0)

    const user = await getAuthUser()

    const allData = {
      ...validatedData,
      stock: stockSummation,
      variants,
      images: validImages,
      vendorid: user?.id,
      vendor: userInfo?.userData?.businessname,
    }
    onSubmit(allData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInputField
        name="name"
        label="Product Name"
        value={formData.name}
        handleInputChange={handleInputChange}
        placeholder="Cotton T-Shirt"
        type="text"
        required
      />
      <FormTextArea
        name="description"
        label="Description"
        value={formData.description}
        handleInputChange={handleInputChange}
        placeholder="Describe the product..."
        rows={3}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <FormInputField
          name="price"
          label="Price (&#8358;)"
          value={formData.price}
          handleInputChange={handleInputChange}
          placeholder="2000"
          type="number"
          min="1"
          required
        />
        <FormSelectField
          name="category"
          label="Category"
          value={formData.category}
          handleInputChange={handleInputChange}
          selectItems={productCategories}
          required
          placeholder="Select Category"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInputField
          name="material"
          label="Material"
          value={formData.material}
          handleInputChange={handleInputChange}
          placeholder="Cotton, Polyester"
          type="text"
        />
        <FormInputField
          name="brand"
          label="Brand"
          value={formData.brand}
          handleInputChange={handleInputChange}
          placeholder="e.g., Nike, Zara"
          type="text"
        />
      </div>

      <Separator className="mt-8" />

      <ProductVariants
        category={formData.category}
        variants={variants}
        setVariants={setVariants}
      />

      <Separator className="mt-8" />

      <ImageInput
        label="Product Image(s)"
        setValidImages={setValidImages}
        name="images"
        validImages={validImages}
        setLoadingImagesStatus={setLoadingImagesStatus}
      />
      <ProductImages
        setValidImages={setValidImages}
        validImages={validImages}
        loadingImagesStatus={loadingImagesStatus}
      />
      <div className="flex gap-2 pt-4">
        <Button type="submit">
          {product
            ? onSubmitting
              ? 'Updating product...'
              : 'Update Product'
            : onSubmitting
            ? 'Adding product...'
            : 'Add Product'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default ProductForm
