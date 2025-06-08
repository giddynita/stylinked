import { AuthContainer } from '@/components/auth'
import { CardHead } from '@/components/headings'
import { Card, CardContent } from '@/components/ui/card'
import { reset, signUp } from '@/utils/data'
import { Link, useParams } from 'react-router-dom'

function Verification() {
  const { type } = useParams()

  const details = type == 'signUp' ? signUp : type == 'reset' ? reset : null
  const { title, desc, link } = details ?? { title: '', desc: '', link: '' }
  return (
    <AuthContainer>
      <Card>
        <CardHead title={title} desc={desc} />
        <CardContent>
          <p className="text-center py-2 text-sm font-medium text-foreground">
            Didn't receive the email?
          </p>
          <p className="text-center py-2 text-sm font-medium text-foreground">
            Check your spam folder or {''}
            <Link to={link} className="text-primary">
              Try again.
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthContainer>
  )
}
export default Verification
