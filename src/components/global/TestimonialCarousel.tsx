import type { Testimonials } from '@/utils/types'
import { Star } from 'lucide-react'

interface TestimonialCarouselProp {
  testimonials: Testimonials[]
}

function TestimonialCarousel({ testimonials }: TestimonialCarouselProp) {
  return (
    <>
      <div className="carousel w-full carousel-center rounded-box md:grid md:grid-cols-3 gap-8  ">
        {testimonials.map(({ rating, text, name, role }, index) => {
          return (
            <div
              key={index}
              className="carousel-item  bg-primary/10 border-none mt-12 rounded-md"
            >
              <div className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-foreground mb-4 max-w-[12rem] h-32 line-clamp-6">
                  "{text}"
                </p>
                <div>
                  <p className="text-primary font-semibold ">{name}</p>
                  <p className="text-sm text-muted-foreground">{role}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default TestimonialCarousel
