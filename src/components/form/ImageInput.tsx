import { type ChangeEvent } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import { uploadImage } from '@/utils/action'

interface ImageInputType {
  label: string
  name: string
  setValidImages: (files: string[]) => void
  validImages: string[]
}

const MAX_SIZE_MB = 2

const ImageInput = ({
  label,
  setValidImages,
  name,
  validImages,
}: ImageInputType) => {
  const maxFiles = 4
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files || []
    const files = Array.from(selectedFiles)

    const accepted: File[] = []

    if (files.length === 0) return
    if (
      files.length > maxFiles ||
      files.length + validImages.length > maxFiles
    ) {
      toast(`You can only upload up to ${maxFiles} images.`)
      return
    } else {
      files.forEach((newFile) => {
        const isImage = newFile.type.startsWith('image/')
        const isUnderSize = newFile.size <= MAX_SIZE_MB * 1024 * 1024

        if (!isImage) {
          toast(`${newFile.name} is not an image.`)
          return
        }
        if (!isUnderSize) {
          toast(`${newFile.name} exceeds ${MAX_SIZE_MB}MB.`)
          return
        }

        accepted.push(newFile)
      })
    }

    const uploadedFiles = await uploadImage(accepted)

    if (uploadedFiles) {
      const allImages = [...validImages, ...uploadedFiles]
      setValidImages(allImages)
    } else {
      toast('Image Upload failed! Check your internet connection.')
    }
  }

  return (
    <div>
      {label && <Label>{label}</Label>}
      <Label
        htmlFor={name}
        className={`border rounded-md mt-3 mb-2 flex flex-col gap-2 items-center justify-center py-4 ${
          validImages.length == maxFiles && 'hidden'
        }`}
      >
        <Input
          id={name}
          type="file"
          accept="image/png, image/jpeg"
          multiple
          onChange={handleChange}
          className="hidden"
          required
        />
        {/* <p className="px-4">
          {validImages &&
            validImages.length > 0 &&
            validImages.map((file) => `${file.name}`).join(', ')}
        </p> */}
        <p
          className={`text-base text-center font-medium text-white bg-green-600 rounded-lg py-2 px-4 cursor-pointer hover:bg-green-700 mt-2 ${
            validImages && validImages.length == maxFiles && 'hidden'
          } `}
        >
          + Add Images
        </p>
        <p
          className={`text-xs text-muted-foreground mt-1 ${
            validImages && validImages.length == maxFiles && 'hidden'
          }`}
        >
          JPG, PNG only · Up to 4 Images, max 2MB each.
        </p>
      </Label>
    </div>
  )
}
export default ImageInput
