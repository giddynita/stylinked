import { Link } from 'react-router-dom'
import Logo from './Logo'
import { nonUserFooterLinks, userFooterLinks } from '@/utils/data'
import { useUserData } from '@/utils/hooks'
import { useUser } from '@supabase/auth-helpers-react'

function AppFooter() {
  const { data: userInfo } = useUserData()
  const role = userInfo?.userRole.role
  const authUsersLinks = userFooterLinks.map((section) => {
    if (section.heading === 'Your Account') {
      const filteredSection = {
        ...section,
        links: section.links.filter((link) =>
          role === 'buyer' ? link.label !== 'Manage Listings' : true
        ),
      }
      return filteredSection
    }
    return section
  })
  const user = useUser()
  const footerLinks = user ? authUsersLinks : nonUserFooterLinks

  return (
    <footer className="bg-navbarbg text-accent-foreground pt-12 pb-6">
      <div className=" container grid md:grid-cols-4 gap-8">
        <div>
          <Logo icon="w-5 h-5" text="text-sm" />
          <p className="text-muted-foreground text-xs font-medium mt-2 max-w-[12rem]">
            Connecting fashion enthusiasts with skilled artisans worldwide.
          </p>
        </div>
        {footerLinks.map((group, index) => {
          return (
            <div key={index}>
              <h3 className="font-semibold text-sm mb-4">{group.heading}</h3>
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
