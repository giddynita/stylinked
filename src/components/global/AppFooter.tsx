import { Link } from 'react-router-dom'
import Logo from './Logo'
import { nonUserFooterLinks, userFooterLinks } from '@/utils/data'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { UserRole } from '@/utils/types'
import type { User } from '@supabase/supabase-js'

function AppFooter() {
  const { userRole, user }: { userRole: UserRole; user: User } = useSelector(
    (state: any) => state.userState
  )
  const footerLinks = useMemo(() => {
    if (!user) return nonUserFooterLinks

    return userFooterLinks.map((section) => {
      if (section.heading === 'Your Account') {
        return {
          ...section,
          links: section.links.filter((link) =>
            userRole?.role === 'buyer' ? link.label !== 'Manage Listings' : true
          ),
        }
      }
      return section
    })
  }, [user, userRole])

  return (
    <footer className="bg-navbarbg/70 pt-12 pb-6">
      <div className=" container grid md:grid-cols-4 gap-8">
        <div>
          <Logo icon="w-6 h-6" text="text-base" />
          <p className=" text-xs font-medium mt-2 max-w-[12rem]">
            Connecting fashion enthusiasts with skilled artisans nationwide.
          </p>
        </div>
        {footerLinks.map((group) => {
          return (
            <div key={group.heading}>
              <h2 className="font-semibold text-sm mb-4">{group.heading}</h2>
              <ul>
                {group.links.map((link) => {
                  return (
                    <li key={link.label}>
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
