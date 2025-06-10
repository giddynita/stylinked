import { Star, type LucideProps } from 'lucide-react'
function TestimonialCarousel({
  carouselItems,
}: {
  carouselItems: {
    id: string
    rating: number
    text: string
    name: string
    role: string
    indicator: React.ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >
  }[]
}) {
  return (
    <>
      <div className="carousel w-full md:grid md:grid-cols-3 gap-8 ">
        {carouselItems.map(({ id, rating, text, name, role }, index) => {
          return (
            <div
              key={index}
              id={id}
              className="carousel-item w-full bg-primary/10 border-none"
            >
              <div className="p-6 w-full">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{text}"</p>
                <div>
                  <p className="text-primary font-semibold ">{name}</p>
                  <p className="text-sm text-muted-foreground">{role}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="md:hidden flex items-center w-full justify-center gap-2 py-2">
        {carouselItems.map(({ id, ...item }, index) => {
          const url = `#${id}`
          return (
            <a
              href={url}
              key={index}
              className={`  mt-6 hover:vbg-muted p-2 rounded-full`}
            >
              <item.indicator className="w-4 h-4 hover:text-muted-foreground" />
            </a>
          )
        })}
      </div>
    </>
  )
}
export default TestimonialCarousel
