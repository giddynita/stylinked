import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { categories } from '@/utils/data'
import { Badge } from '../ui/badge'
import type { CategoriesCarouselProps } from '@/utils/types'
import { Button } from '../ui/button'

function CategoriesCarousel({
  selectedCategory,
  setSelectedCategory,
}: CategoriesCarouselProps) {
  return (
    <div className="relative">
      <Carousel
        opts={{
          align: 'end',
        }}
        className="w-full px-6 mb-6"
      >
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/7"
            >
              <Badge
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`cursor-pointer capitalize w-full px-2 py-2 `}
                onClick={() => setSelectedCategory(category)}
              >
                <span className="block text-ellipsis overflow-hidden w-full text-center">
                  {category}
                </span>
              </Badge>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="ghost" className="-left-2 " />
        <CarouselNext variant="ghost" className="-right-2 " />
      </Carousel>
    </div>
  )
}
export default CategoriesCarousel
