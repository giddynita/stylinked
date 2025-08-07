import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

function Hero() {
  return (
    <section className="container py-20">
      <div className="text-center">
        <h2 className="text-3xl md:text-6xl font-bold text-foreground mb-6">
          Discover Fashion from
          <span className="text-primary block">Vendors Nationwide</span>
        </h2>
        <p className="text-xl text-muted-foreground w-full sm:max-w-lg mx-auto mb-8">
          The ultimate marketplace where fashion buyers discover unique items,
          sellers showcase their collections, and logistics partners ensure
          seamless delivery.
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
  )
}
export default Hero
