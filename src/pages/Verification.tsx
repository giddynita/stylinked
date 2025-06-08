import { CardHead } from '@/components/headings'
import { Card, CardContent } from '@/components/ui/card'
import { Link, useParams } from 'react-router-dom'
type Verify = {
  title: string
  desc: string
  link: string
}

function Verification() {
  const { type } = useParams()
  const signUp: Verify = {
    title: 'Verify your email address',
    desc: "We've sent a verification email. Please check your inbox and follow the instructions to complete your registration.",
    link: '/sign-up',
  }
  const reset: Verify = {
    title: 'Password reset link sent.',
    desc: "We've sent a password reset link to your email. Please check your inbox and follow the instructions.",
    link: '/reset-password',
  }
  const details = type == 'signUp' ? signUp : type == 'reset' ? reset : null
  const { title, desc, link } = details ?? { title: '', desc: '', link: '' }
  return (
    <Card className=" w-[90%] mx-auto max-w-lg mt-18 mb-16 pt-10 pb-6 border-none shadow-lg ">
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
  )
}
export default Verification
