import type { VendorCard } from '@/utils/types'
import { Card, CardContent } from '../ui/card'
import { Calendar, MapPin, Star, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import VendorAvatar from './VendorAvatar'
import { slugify } from '@/utils/format'

function VendorGridCard({
  id,
  businessname,
  description,
  image,
  rating,
  totalReviews,
  city,
  state,
  joinedDate,
  totalProducts,
}: VendorCard) {
  return (
    <Card className="hover:shadow-lg transition-shadow p-0">
      <CardContent className="p-6 space-y-4">
        <div className="text-center space-y-2 ">
          <div className="w-max mx-auto">
            <figure className="w-20 h-20">
              <VendorAvatar businessname={businessname} image={image} />
            </figure>
          </div>
          <p className="text-lg font-semibold text-foreground">
            {businessname}
          </p>
          <div className="flex items-center justify-center space-x-1.5">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{rating}</span>
            <span className="text-sm text-muted-foreground">
              ({totalReviews})
            </span>
          </div>
        </div>

        <div className="space-y-2 text-sm text-foreground">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{`${city}, ${state}`}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>Since {joinedDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{`${totalProducts} product${
              totalProducts > 1 ? 's' : ''
            }`}</span>
          </div>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-3 h-16">
            {description}
          </p>
        )}

        <Button asChild className="w-full">
          <Link to={`${slugify(businessname)}/${id}`}>View Profile</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
export default VendorGridCard
