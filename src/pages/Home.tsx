import { Logo } from '@/components/global'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { features, stats, testimonials } from '@/utils/data'
import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-accent/50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Why Choose STYLINKED?
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of fashion enthusiasts, designers, and delivery
            partners in our thriving ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      <section className="bg-background/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              What Our Community Says
            </h3>
            <p className="text-xl text-muted-foreground">
              Real stories from real users
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-primary/10 border-none">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-foreground mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="text-primary font-semibold ">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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

      {/* Footer */}
      <footer className="bg-accent text-accent-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo icon="w-6 h-6" text="text-xl" />
              <p className="text-muted-foreground text-sm font-medium mt-2">
                Connecting fashion enthusiasts with skilled artisans worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Marketplace</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link to="/marketplace" className="hover:text-primary  ">
                    Browse Products
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:text-primary">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/vendors" className="hover:text-primary">
                    Top Vendors
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link to="/auth" className="hover:text-primary">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-primary">
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link to="/consumer-dashboard" className="hover:text-primary">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-accent-foreground mt-8 pt-8 text-center">
            <p>&copy; 2025 Stylinked. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
