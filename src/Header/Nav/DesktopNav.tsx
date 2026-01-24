'use client'

import React from 'react'
import { CMSLink } from '@/components/Link'
import { ChevronDown } from 'lucide-react'
import type { Header } from '@/payload-types'
import { usePathname } from 'next/navigation'

type NavItem = NonNullable<Header['navItems']>[number]

export const DesktopNav: React.FC<{ navItems: Header['navItems'] }> = ({ navItems }) => {
  const pathname = usePathname()

  const isLinkActive = (link: NavItem['link']) => {
    if (!link) return false
    const { type, reference, url } = link
    const href =
      type === 'reference' && typeof reference?.value === 'object' && reference.value?.slug
        ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
        : url

    if (!href) return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav className="hidden lg:flex items-center gap-8">
      {navItems?.map((item, i) => {
        const { link, hasSubMenu, subMenuLinks } = item
        const active = isLinkActive(link)

        if (hasSubMenu && subMenuLinks && subMenuLinks.length > 0) {
          return (
            <div key={i} className="group relative py-4">
              <CMSLink
                {...link}
                appearance="inline"
                className={`flex items-center gap-1 font-medium transition-colors no-underline ${
                  active ? 'text-blue-500' : 'text-foreground hover:text-purple-500'
                }`}
              >
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 ml-1" />
              </CMSLink>

              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px] z-50">
                <div className="bg-white dark:bg-card border border-border shadow-lg rounded-lg p-2 flex flex-col gap-1">
                  {subMenuLinks.map((subItem, index) => {
                    const subActive = isLinkActive(subItem.link)
                    return (
                      <CMSLink
                        key={index}
                        {...subItem.link}
                        appearance="inline"
                        className={`px-4 py-2 rounded-md text-sm whitespace-nowrap block w-full no-underline transition-colors ${
                          subActive
                            ? 'text-blue-500 bg-muted'
                            : 'text-foreground hover:bg-muted hover:text-purple-500'
                        }`}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          )
        }

        return (
          <CMSLink
            key={i}
            {...link}
            appearance="inline"
            className={`font-medium transition-colors no-underline ${
              active ? 'text-blue-500' : 'text-foreground hover:text-purple-500'
            }`}
          />
        )
      })}
    </nav>
  )
}
