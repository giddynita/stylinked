import { features } from '@/utils/data'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

function Features() {
  return (
    <section className="container py-20 ">
      <div className=" text-center mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Why Choose STYLINKED?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience the future of online fashion shopping with our innovative
          three-way platform connecting buyers, sellers, and delivery partners.
        </p>
      </div>
      <div className=" grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(
          ({ icon, title, description, link, link_text }, index) => {
            const IconComponent = icon
            return (
              <Card
                key={index}
                className="group shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-background/20 backdrop-blur-sm"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                    <IconComponent className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl h-15 line-clamp-2 ">
                    {title}
                  </CardTitle>
                  <CardDescription className="mb-4 h-32 line-clamp-6">
                    {description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button
                    asChild
                    variant="outline"
                    className="group-hover:border-primary hover:bg-primary hover:text-primary-foreground cursor-pointer  group-hover:text-primary"
                  >
                    <Link to={link}>{link_text}</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          }
        )}
      </div>
    </section>
  )
}
export default Features
