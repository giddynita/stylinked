import { Link } from 'react-router-dom'
import { CardHead } from '../headings'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import AuthContainer from './AuthContainer'

function InvalidToken({ desc, url }: { desc: string; url: string }) {
  return (
    <AuthContainer>
      <Card>
        <CardHead title="Verification failed!" desc={desc} />
        <CardContent>
          <Button asChild={true} className="w-full">
            <Link to={url}>Try again.</Link>
          </Button>
        </CardContent>
      </Card>
    </AuthContainer>
  )
}
export default InvalidToken
