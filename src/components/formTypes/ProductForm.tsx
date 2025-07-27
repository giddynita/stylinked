import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Loader2Icon, Trash2, X } from 'lucide-react'
import { Separator } from '../ui/separator'
import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import type { ColorQuantity, ProductFormProps, Variant } from '@/utils/types'
import { productSchema, validateWithZodSchema } from '@/utils/schema'
import ImageInput from '../form/ImageInput'
import { deleteImage } from '@/utils/action'
import { useUserData } from '@/utils/hooks'
import { getAuthUser } from '@/utils/loader'

const sizesList = ['S', 'M', 'L', 'XL']
const colorsList = ['Red', 'Blue', 'Black', 'White']

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
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [colorQuantities, setColorQuantities] = useState<
    Record<string, number>
  >({})
  const [variants, setVariants] = useState<Variant[]>(product?.variants || [])
  //images
  const [validImages, setValidImages] = useState<string[]>(
    product?.images || []
  )
  const [loadingImagesStatus, setLoadingImagesStatus] = useState<boolean>(false)
  const [displayedProductImage, setDisplayedProductImage] = useState(0)
  const selectedImage: string = validImages[displayedProductImage]

  const handleAddVariant = () => {
    if (!selectedSize || selectedColors.length === 0) {
      toast.warning('Please select a size and at least one color.')
      return
    }
    const newColors: ColorQuantity[] = selectedColors.map((color) => ({
      color,
      quantity: colorQuantities[color] || 1,
    }))

    const updatedVariants = [...variants]
    const existingVariantIndex = updatedVariants.findIndex(
      (v) => v.size === selectedSize
    )

    if (existingVariantIndex !== -1) {
      // Merge into existing variant
      const existingVariant = updatedVariants[existingVariantIndex]
      const colorMap: Record<string, number> = {}

      // Map existing colors
      existingVariant.colors.forEach(({ color, quantity }) => {
        colorMap[color] = quantity
      })

      // Add or merge incoming colors
      newColors.forEach(({ color, quantity }) => {
        if (colorMap[color]) {
          colorMap[color] += quantity
        } else {
          colorMap[color] = quantity
        }
      })

      // Update variant
      updatedVariants[existingVariantIndex] = {
        size: selectedSize,
        colors: Object.entries(colorMap).map(([color, quantity]) => ({
          color,
          quantity,
        })),
      }
    } else {
      // Add new variant
      updatedVariants.push({ size: selectedSize, colors: newColors })
    }

    setVariants(updatedVariants)
    setSelectedSize('')
    setSelectedColors([])
    setColorQuantities({})
  }

  const handleDeleteVariant = (size: string, color: string) => {
    const updated = variants
      .map((variant) => {
        if (variant.size !== size) return variant
        return {
          ...variant,
          colors: variant.colors.filter((c) => c.color !== color),
        }
      })
      .filter((variant) => variant.colors.length > 0) // remove size if no colors left
    setVariants(updated)
  }
  const handleInputChange = (field: string | number, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const handleImageDelete = async (url: string, index: number) => {
    await deleteImage(url)
    const removedImage = validImages.filter((fileUrl) => fileUrl !== url)
    if (index > 0 && index == displayedProductImage) {
      setDisplayedProductImage(displayedProductImage - 1)
    }

    setValidImages(removedImage)
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
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="e.g., Cotton T-Shirt"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe the product..."
          rows={3}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">
            Price <span>(&#8358;) </span>
          </Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            placeholder="e.g. 2000"
            required
            min="1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleInputChange('category', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shirts">Shirts</SelectItem>
              <SelectItem value="pants">Pants</SelectItem>
              <SelectItem value="dresses">Dresses</SelectItem>
              <SelectItem value="shoes">Shoes</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="outerwear">Outerwear</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="material">Material</Label>
          <Input
            id="material"
            value={formData.material}
            onChange={(e) => handleInputChange('material', e.target.value)}
            placeholder="e.g., Cotton, Polyester"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            value={formData.brand}
            onChange={(e) => handleInputChange('brand', e.target.value)}
            placeholder="e.g., Nike, Zara"
          />
        </div>
      </div>
      <Separator className="mt-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Size</Label>
          <Select
            value={selectedSize}
            onValueChange={(value) => setSelectedSize(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
              {sizesList.map((size, index) => {
                return (
                  <SelectItem key={index} value={size}>
                    {size}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Color</Label>
          <Select
            value={selectedColors[0] || ''}
            onValueChange={(value) => setSelectedColors(Array.of(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Color" />
            </SelectTrigger>
            <SelectContent>
              {colorsList.map((color, index) => {
                return (
                  <SelectItem key={index} value={color}>
                    {color}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      {selectedColors.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {selectedColors.map((color) => (
            <div key={color} className="space-y-2">
              <Label>Quantity for {color} </Label>
              <Input
                id="color"
                type="number"
                min="1"
                value={colorQuantities[color] || ''}
                onChange={(e) =>
                  setColorQuantities({
                    ...colorQuantities,
                    [color]: Number(e.target.value),
                  })
                }
                className="px-4"
              />
            </div>
          ))}
        </div>
      )}
      <Button
        type="button"
        onClick={handleAddVariant}
        className="bg-green-500 hover:bg-green-600 text-white"
      >
        Add Variant
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-lg">
            {variants.length < 1
              ? 'No variant added'
              : variants.length > 1
              ? 'Variants Added'
              : 'Variant Added'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {variants.map((variant) => (
            <div
              key={variant.size}
              className="font-medium border py-4 px-2 rounded-lg mb-4  "
            >
              <strong>Size:</strong> {variant.size}
              <ul className="space-y-4">
                {variant.colors.map((c, index) => (
                  <li key={c.color}>
                    <span className="flex flex-row items-start justify-between gap-4 pl-2">
                      <span className="flex flex-col md:flex-row gap-1 md:gap-4">
                        <span>
                          <strong>Color:</strong> {c.color}
                        </span>
                        <span>
                          <strong>Quantity:</strong> {c.quantity}
                        </span>
                      </span>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          handleDeleteVariant(variant.size, c.color)
                        }
                        className="text-red-600 hover:text-red-600"
                      >
                        <Trash2 className="w-6 h-6" />
                      </Button>
                    </span>
                    {index < variant.colors.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
      <Separator className="mt-8" />
      <ImageInput
        label="Product Image(s)"
        setValidImages={setValidImages}
        name="images"
        validImages={validImages}
        setLoadingImagesStatus={setLoadingImagesStatus}
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-lg">
            {validImages.length < 1
              ? 'No product image added'
              : validImages.length > 1
              ? 'Preview Product Images'
              : 'Preview Product Image'}
          </CardTitle>
          <CardDescription>
            {validImages.length > 0 &&
              'Default product picture is the first image uploaded. To change order, delete, and add images in desired sequence.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingImagesStatus ? (
            <Loader2Icon className="animate-spin my-6 mx-auto" />
          ) : (
            validImages.length > 0 &&
            selectedImage && (
              <figure className=" max-w-48 grid place-items-center shadow rounded-md p-4 mx-auto mb-8 mt-4 ">
                <img
                  src={selectedImage}
                  alt="preview"
                  className="w-full object-fit"
                  loading="lazy"
                />
              </figure>
            )
          )}
          <div className=" flex flex-row items-center flex-wrap justify-center gap-6">
            {loadingImagesStatus ||
              validImages.map((item, index) => {
                return (
                  item && (
                    <div key={index} className="relative">
                      <figure
                        className={`w-18 h-18  grid place-items-center  shadow-md rounded-lg relative ${
                          index == displayedProductImage &&
                          'border border-primary'
                        }`}
                        onClick={() => setDisplayedProductImage(index)}
                      >
                        <img
                          src={item}
                          alt={`preview-${item}`}
                          className="w-12 h-12 object-contain rounded-lg"
                          loading="lazy"
                        />
                      </figure>
                      <Button
                        type="button"
                        variant="destructive"
                        className="absolute -top-3 -right-3 rounded-full w-6 h-6 "
                        onClick={() => handleImageDelete(item, index)}
                      >
                        <X className="text-white font-bold w-6 h-6" />
                      </Button>
                    </div>
                  )
                )
              })}
          </div>
        </CardContent>
      </Card>
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
