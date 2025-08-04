import { testimonials } from '@/utils/data'
import { TestimonialCarousel } from '../global'

function Testimonials() {
  return (
    <section className=" bg-background/50 py-16">
      <div className="container text-center">
        <h3 className="text-3xl font-bold text-foreground mb-4">
          Success Stories from Our Community
        </h3>
        <p className="text-xl text-muted-foreground">
          Real experiences from buyers, sellers, and logistics partners
        </p>
      </div>
      <div className="container ">
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  )
}
export default Testimonials
