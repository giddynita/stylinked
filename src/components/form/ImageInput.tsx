import { type ChangeEvent } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'

interface ImageInputType {
  label: string
  name: string
  setValidImages: (files: File[]) => void
  validImages: File[]
}

const MAX_SIZE_MB = 2

const ImageInput = ({
  label,
  setValidImages,
  name,
  validImages,
}: ImageInputType) => {
  const maxFiles = 4
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])

    const accepted: File[] = [...validImages]

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
        if (
          !accepted.some(
            (file) => file.name === newFile.name && file.size === newFile.size
          )
        ) {
          accepted.push(newFile)
          e.target.value = ''
        } else {
          const fileExist: File[] = accepted.filter(
            (file) => file.name === newFile.name && file.size === newFile.size
          )
          const fileNames = fileExist.map((file) => file.name).join(', ')
          toast(`${fileNames} already added!`)
        }
      })
    }
    setValidImages(accepted)
  }

  return (
    <div>
      {label && <Label>{label}</Label>}
      <Label
        htmlFor={name}
        className={`border rounded-md mt-3 mb-2 flex flex-col gap-2 items-center justify-center py-4`}
      >
        <Input
          id={name}
          type="file"
          accept="image/png, image/jpeg"
          multiple
          onChange={handleChange}
          className="hidden"
          required
          disabled={validImages.length == maxFiles}
        />
        <p className="px-4">
          {validImages &&
            validImages.length > 0 &&
            validImages.map((file) => `${file.name}`).join(', ')}
        </p>
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
      {/* {errors.length > 0 && (
        <ul className="text-red-500 text-xs mb-2">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )} */}
    </div>
  )
}
export default ImageInput
