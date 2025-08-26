import type { SingleProduct } from '@/utils/types'
import { useState } from 'react'

interface ProductImagesProp {
  product: SingleProduct | undefined
}
function ProductImages({ product }: ProductImagesProp) {
  const [selectedImage, setSelectedImage] = useState(0)
  return (
    <div>
      <div className="mb-4 p-6  h-max">
        <img
          src={product?.images[selectedImage]}
          alt={product?.name}
          className="w-full max-w-xs mx-auto  object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        {product?.images.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            alt={`${product?.name} ${index + 1}`}
            className={`w-[25%] h-30 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity ${
              index === selectedImage && 'border border-primary border-2'
            }`}
            loading="lazy"
            onClick={() => setSelectedImage(index)}
          />
        ))}
      </div>
    </div>
  )
}
export default ProductImages
