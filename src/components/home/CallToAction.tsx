import { Link } from 'react-router-dom'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'

function CallToAction() {
  return (
    <section className="container py-20">
      <Card className="bg-primary border-0 text-primary-foreground">
        <CardContent className="p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Fashion Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust STYLINKED for their fashion needs.
            Start your fashion journey with secure transactions, verified
            sellers, and fast delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/sign-up">
              <Button
                size="lg"
                className=" px-8 py-3 bg-background text-foreground hover:text-secondary-foreground hover:bg-secondary  cursor-pointer"
              >
                Create Account
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button
                size="lg"
                className=" bg-background text-foreground hover:text-secondary-foreground hover:bg-secondary  cursor-pointer px-8 py-3"
              >
                Browse Products
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
export default CallToAction
