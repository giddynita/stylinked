import { PageHeading } from '@/components/headings'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <PageHeading
        pageTitle="Page Not Found"
        pageDesc="Sorry, we couldn't find the page you're looking for."
      />
      <div className="text-center">
        <p className="text-9xl font-semibold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          page not found
        </h1>
        <p className="mt-6 text-lg leading-7">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button asChild className="mt-10">
          <Link to="/" className="uppercase">
            go back home
          </Link>
        </Button>
      </div>
    </main>
  )
}
export default Error
