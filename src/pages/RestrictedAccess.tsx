import { Ban } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import { PageHeading } from '@/components/headings'

function RestrictedAccess() {
  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <PageHeading
        pageTitle="Access Restricted"
        pageDesc="Sorry, you don't have the necessary authorization to view this page."
      />
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl flex gap-2 items-center justify-center">
          Access restricted{' '}
          <Ban className="text-destructive w-6 h-6 sm:h-10 sm:w-10" />
        </h1>
        <p className="mt-6 text-lg leading-7 text-muted-foreground">
          Sorry, you don't have the necessary authorization to view this page.
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
export default RestrictedAccess
