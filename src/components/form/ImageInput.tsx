import { type ChangeEvent } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import { uploadImage } from '@/utils/action'

interface ImageInputProp {
  label: string
  name: string
  setValidImages: (files: (string | undefined)[]) => void
  validImages: (string | undefined)[]
  setLoadingImagesStatus: (status: boolean) => void
}

const MAX_SIZE_MB = 2

const ImageInput = ({
  label,
  setValidImages,
  name,
  validImages,
  setLoadingImagesStatus,
}: ImageInputProp) => {
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
      toast.warning(`You can only upload up to ${maxFiles} images.`)
      return
    } else {
      files.forEach((newFile) => {
        const isImage = newFile.type.startsWith('image/')
        const isUnderSize = newFile.size <= MAX_SIZE_MB * 1024 * 1024

        if (!isImage) {
          toast.warning(`${newFile.name} is not an image.`)
          return
        }
        if (!isUnderSize) {
          toast.warning(`${newFile.name} exceeds ${MAX_SIZE_MB}MB.`)
          return
        }

        accepted.push(newFile)
      })
    }

    if (!navigator.onLine) {
      toast.error('Image Upload failed! Check your internet connection.')
      return
    }
    setLoadingImagesStatus(true)

    const uploadedFiles = await uploadImage(accepted)
    if (uploadedFiles) {
      const allImages = [...validImages, ...uploadedFiles]
      setValidImages(allImages)
      setLoadingImagesStatus(false)
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
        />
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
