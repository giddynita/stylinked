import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { deleteImage } from '@/utils/action'
import { Loader2Icon, X } from 'lucide-react'
import { useState } from 'react'

interface ProductImagesProp {
  setValidImages: (files: (string | undefined)[]) => void
  validImages: (string | undefined)[]
  loadingImagesStatus: boolean
}

function ProductImages({
  validImages,
  loadingImagesStatus,
  setValidImages,
}: ProductImagesProp) {
  const [displayedProductImage, setDisplayedProductImage] = useState(0)
  const selectedImage: string | undefined = validImages[displayedProductImage]
  const handleImageDelete = async (url: string, index: number) => {
    await deleteImage(url)
    const removedImage = validImages.filter((fileUrl) => fileUrl !== url)
    if (index > 0 && index == displayedProductImage) {
      setDisplayedProductImage(displayedProductImage - 1)
    }

    setValidImages(removedImage)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-lg">
          {validImages.length == 0
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
  )
}
export default ProductImages
