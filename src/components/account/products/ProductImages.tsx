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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import type { DropResult } from 'react-beautiful-dnd'

interface ProductImagesProp {
  setValidImages: (files: string[]) => void
  validImages: string[]
  loadingImagesStatus: boolean
}

function ProductImages({
  validImages,
  loadingImagesStatus,
  setValidImages,
}: ProductImagesProp) {
  const [displayedProductImage, setDisplayedProductImage] = useState(0)
  const selectedImage: string = validImages[displayedProductImage]
  const handleImageDelete = async (url: string, index: number) => {
    await deleteImage(url)
    const removedImage = validImages.filter((fileUrl) => fileUrl !== url)
    if (index > 0 && index == displayedProductImage) {
      setDisplayedProductImage(displayedProductImage - 1)
    }
    setValidImages(removedImage)
  }
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const reordered = Array.from(validImages)
    const [movedItem] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, movedItem)

    setValidImages(reordered)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-center text-lg">
          {validImages.length == 0
            ? 'No product image added'
            : validImages.length > 1
            ? 'Preview Product Images'
            : 'Preview Product Image'}
        </CardTitle>
        <CardDescription className="text-center">
          {validImages.length > 0 &&
            'Default product picture is the first image. To change order, drag the images horizontally (left to right) to your desired sequence.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loadingImagesStatus ? (
          <Loader2Icon className="animate-spin my-6 mx-auto" />
        ) : (
          validImages.length > 0 && (
            <>
              <figure className=" max-w-48 grid place-items-center shadow rounded-md p-4 mx-auto mb-8 mt-4 ">
                <img
                  src={selectedImage}
                  alt="preview"
                  className="w-full object-fit"
                  loading="lazy"
                />
              </figure>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="images" direction="horizontal">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex flex-row gap-4 flex-wrap justify-center"
                    >
                      {validImages.map((file, index) => (
                        <Draggable
                          key={file + index}
                          draggableId={file + index}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`border-2 rounded-lg p-2 relative ${
                                index == displayedProductImage &&
                                'border-primary'
                              }`}
                              style={{
                                userSelect: 'none',
                                ...provided.draggableProps.style,
                              }}
                              onClick={() => setDisplayedProductImage(index)}
                            >
                              <img
                                src={file}
                                alt="uploaded"
                                className="w-[80px] h-[80px] object-center object-contain"
                                width={80}
                                height={80}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                className="absolute -top-3 -right-3 rounded-full w-6 h-6"
                                onClick={() => handleImageDelete(file, index)}
                              >
                                <X className="text-white font-bold w-6 h-6" />
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </>
          )
        )}
      </CardContent>
    </Card>
  )
}
export default ProductImages
