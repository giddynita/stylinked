import { useState, type ChangeEvent } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

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
  const [errors, setErrors] = useState<string[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])

    const accepted: File[] = []
    const rejected: string[] = []
    const maxFiles = 4
    if (files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images.`)
      e.target.value = ''
    } else {
      files.forEach((file) => {
        const isImage = file.type.startsWith('image/')
        const isUnderSize = file.size <= MAX_SIZE_MB * 1024 * 1024

        if (!isImage) {
          rejected.push(`${file.name} is not an image.`)
        } else if (!isUnderSize) {
          rejected.push(`${file.name} exceeds ${MAX_SIZE_MB}MB.`)
        } else {
          accepted.push(file)
        }
      })
    }

    setValidImages(accepted)
    setErrors(rejected)
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
        />
        {validImages && validImages.length > 0 ? (
          <>
            <p>{validImages.map((file) => `${file.name}`).join(', ')}</p>
            <p className="text-base text-center font-medium text-white bg-green-600 rounded-lg py-2 px-4 cursor-pointer hover:bg-green-700 mt-1 ">
              Edit Images
            </p>
          </>
        ) : (
          <>
            <p className="text-base text-center font-medium text-white bg-green-600 rounded-lg py-2 px-4 cursor-pointer hover:bg-green-700 ">
              + Add Images
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG only · Up to 4 Images, max 2MB each.
            </p>
          </>
        )}
      </Label>
      {errors.length > 0 && (
        <ul className="text-red-500 text-xs mb-2">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default ImageInput
