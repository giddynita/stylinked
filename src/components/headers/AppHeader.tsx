import { Link, NavLink } from 'react-router-dom'
import { Logo } from '../global'
import { Button } from '../ui/button'
import ModeToggle from '../theme/mode-toggle'
import { SidebarTrigger } from '../ui/sidebar'
import { nonUserNavLinks } from '@/utils/data'
function AppHeader() {
  return (
    <header className="bg-navbarbg/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between">
          <Logo icon="w-5 h-5" text="text-sm" />
          <div className="hidden md:flex items-center gap-x-8">
            <nav className="hidden md:flex items-center space-x-1 font-medium text-sm px-2">
              {nonUserNavLinks.map((item) => (
                <Button variant="ghost" size="sm">
                  <NavLink
                    key={item.title}
                    className={({ isActive }) =>
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }
                    to={item.url}
                  >
                    {item.title}
                  </NavLink>
                </Button>
              ))}
            </nav>
            <div className="flex flex-row gap-x-2 items-center">
              <ModeToggle />

              <Button variant="outline" size="sm" asChild>
                <Link
                  to="/auth"
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Login
                </Link>
              </Button>

              <Button size="sm">
                <Link to="/auth/sign-up">Get Started</Link>
              </Button>
            </div>
          </div>
          <div className="md:hidden flex flex-row gap-x-6 items-center">
            <ModeToggle />
            <SidebarTrigger />
          </div>
        </div>
      </div>
    </header>
  )
}
export default AppHeader
