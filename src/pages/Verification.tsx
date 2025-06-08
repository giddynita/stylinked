import { CardHead } from '@/components/headings'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'

function Verification() {
  const email = localStorage.getItem('email')
  return (
    <Card className=" w-[90%] mx-auto max-w-lg mt-18 mb-16 pt-10 pb-6 border-none shadow-lg ">
      <CardHead
        title="Verify your email address"
        desc={`We've sent a verification email to ${email}. Please check your inbox and follow the instructions to complete your registration.`}
      />
      <CardContent>
        <p className="text-center py-2 text-sm font-medium text-foreground">
          Didn't receive the verification email?
        </p>
        <p className="text-center py-2 text-sm font-medium text-foreground">
          Check your spam folder or {''}
          <Link
            to="/sign-up"
            className="text-primary"
            onClick={() => localStorage.removeItem('email')}
          >
            Try again.
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
export default Verification
