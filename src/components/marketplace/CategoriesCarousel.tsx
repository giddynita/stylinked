import { useRef, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '../ui/carousel'
import { categories } from '@/utils/data'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

interface CategoriesCarousel {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

function CategoriesCarousel({
  selectedCategory,
  setSelectedCategory,
}: CategoriesCarousel) {
  const [slideInView, setSlideInView] = useState<number | undefined>(0)
  const carouselApi = useRef<CarouselApi | null>(null)

  const slideTerminal = (type: string) => {
    if (carouselApi.current) {
      const current = carouselApi.current.selectedScrollSnap()

      if (type == 'prev') {
        if (current == 0) {
          setSlideInView(current)
        }
      }

      if (type == 'next') {
        if (current == categories.length - 5) {
          setSlideInView(categories.length - 4)
        } else {
          setSlideInView(current)
        }
      }
    }
  }

  const handlePrev = () => {
    if (carouselApi.current) {
      const current = carouselApi.current.selectedScrollSnap()
      carouselApi.current.scrollTo(Math.max(current - 3, 0))
    }
  }

  const handleNext = () => {
    if (carouselApi.current) {
      const current = carouselApi.current.selectedScrollSnap()

      const max = carouselApi.current.scrollSnapList().length - 1
      carouselApi.current.scrollTo(Math.min(current + 3, max))
    }
  }

  return (
    <div className="relative">
      <Carousel
        opts={{
          align: 'end',
        }}
        className="w-full px-6 mb-6"
        setApi={(api) => (carouselApi.current = api)}
      >
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/7"
            >
              <Badge
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`cursor-pointer capitalize w-full py-2 ${
                  selectedCategory === category
                    ? 'bg-primary/90 hover:bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.replace('-', ' ')}
              </Badge>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Button
        asChild
        variant="ghost"
        size="sm"
        className={`${
          slideInView == 0 && 'text-muted-foreground/50'
        } top-0 p-0 -left-1 absolute`}
        onClick={() => {
          handlePrev()
          slideTerminal('prev')
        }}
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>
      <Button
        asChild
        variant="ghost"
        size="sm"
        className={`${
          slideInView == categories.length - 4 && 'text-muted-foreground/50'
        } top-0 p-0 -right-2 absolute`}
        onClick={() => {
          handleNext()
          slideTerminal('next')
        }}
      >
        <ChevronRight className="w-8 h-8" />
      </Button>
    </div>
  )
}
export default CategoriesCarousel
