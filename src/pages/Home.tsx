import { TestimonialCarousel } from '@/components/global'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { features, stats, testimonials } from '@/utils/data'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="container py-20">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Where Fashion Meets
            <span className="text-primary block">Craftsmanship</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Connect with skilled fashion designers, discover unique custom
            pieces, and experience the future of personalized fashion
            marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace">
              <Button size="lg" className="px-8 py-3 text-lg cursor-pointer">
                Explore Marketplace
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 text-lg cursor-pointer  "
              >
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20 ">
        <div className=" text-center mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Why Choose STYLINKED?
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of fashion enthusiasts, designers, and delivery
            partners in our thriving ecosystem.
          </p>
        </div>
        <div className=" grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={index}
                className="group shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-background/20 backdrop-blur-sm"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                    <IconComponent className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className=" mb-4">
                    {feature.description}
                  </CardDescription>
                  <Link to={feature.link}>
                    <Button
                      variant="outline"
                      className="group-hover:border-primary hover:bg-primary hover:text-primary-foreground cursor-pointer  group-hover:text-primary"
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Testimonials Section */}

      <section className=" bg-background/50 py-16">
        <div className="container text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            What Our Community Says
          </h3>
          <p className="text-xl text-muted-foreground">
            Real stories from real users
          </p>
        </div>

        <div className="container ">
          <TestimonialCarousel carouselItems={testimonials} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <Card className="bg-primary border-0 text-primary-foreground">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your Fashion Journey?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust STYLINKED for their fashion
              needs. Sign up today and discover endless possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/sign-up">
                <Button
                  size="lg"
                  className=" px-8 py-3 bg-background text-foreground hover:text-primary hover:bg-background cursor-pointer"
                >
                  Create Account
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button
                  size="lg"
                  className=" bg-background text-foreground hover:text-primary hover:bg-background cursor-pointer px-8 py-3"
                >
                  Browse Products
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  )
}

export default Home
