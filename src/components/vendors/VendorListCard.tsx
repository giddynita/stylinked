import type { VendorCard } from '@/utils/types'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Star, Users } from 'lucide-react'
import VendorAvatar from './VendorAvatar'
import { slugify } from '@/utils/format'

function VendorListCard({
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
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <figure className="w-20 h-20">
            <VendorAvatar businessname={businessname} image={image} />
          </figure>
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {businessname}
                </h3>
                <div className="flex sm:flex-row flex-col gap-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-muted-foreground " />
                    <span>{`${city}, ${state}`}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Since {joinedDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{`${totalProducts} product${
                      totalProducts > 1 ? 's' : ''
                    }`}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({totalReviews})
                </span>
              </div>
            </div>

            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
            )}
            <Button asChild className="w-full">
              <Link to={`${slugify(businessname)}/${id}`}>View Profile</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default VendorListCard
