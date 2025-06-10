import { Link } from 'react-router-dom'
import Logo from './Logo'
import { nonUserFooterLinks } from '@/utils/data'

function AppFooter() {
  return (
    <footer className="bg-accent text-accent-foreground pt-12 pb-6">
      <div className=" container grid md:grid-cols-4 gap-8">
        <div>
          <Logo icon="w-5 h-5" text="text-sm" />
          <p className="text-muted-foreground text-xs font-medium mt-2 max-w-[12rem]">
            Connecting fashion enthusiasts with skilled artisans worldwide.
          </p>
        </div>
        {nonUserFooterLinks.map((group, index) => {
          return (
            <div key={index}>
              <h4 className="font-semibold text-sm mb-4">{group.heading}</h4>
              <ul>
                {group.links.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={link.url}
                        className="hover:text-primary text-sm  "
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
      <div className="border-t border-accent-foreground mt-8 pt-4 text-center">
        <p>&copy; 2025 Stylinked. All rights reserved.</p>
      </div>
    </footer>
  )
}
export default AppFooter
