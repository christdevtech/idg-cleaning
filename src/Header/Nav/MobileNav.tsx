'use client'

import React, { useState, useEffect } from 'react'
import { CMSLink } from '@/components/Link'
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import Link from 'next/link'

type NavItem = NonNullable<Header['navItems']>[number]

export const MobileNav: React.FC<{ navItems: Header['navItems'] }> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-foreground hover:text-primary transition-colors"
        aria-label="Open Menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm z-50 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-r border-white/20 shadow-2xl overflow-y-auto"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <Logo className="w-32" />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {navItems?.map((item, i) => (
                    <MobileMenuItem key={i} item={item} pathname={pathname} />
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-black/10 dark:border-white/10">
                  {/* Optional: Add contact info or social links here if desired for mobile */}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

const MobileMenuItem: React.FC<{ item: NavItem; pathname: string }> = ({ item, pathname }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { link, hasSubMenu, subMenuLinks } = item

  const isLinkActive = (l: NavItem['link']) => {
    if (!l) return false
    const { type, reference, url } = l
    const href =
      type === 'reference' && typeof reference?.value === 'object' && reference.value?.slug
        ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
        : url

    if (!href) return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const active = isLinkActive(link)

  if (hasSubMenu && subMenuLinks && subMenuLinks.length > 0) {
    return (
      <div className="flex flex-col border-b border-black/5 dark:border-white/5">
        <div className="flex items-center justify-between">
          <CMSLink
            {...link}
            appearance="inline"
            className={`flex-1 py-3 px-2 text-lg font-medium no-underline transition-colors ${active ? 'text-blue-500' : 'text-foreground hover:text-purple-500'}`}
          />
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsExpanded(!isExpanded)
            }}
            className="p-3 text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-black/5 dark:bg-white/5 rounded-lg my-1"
            >
              <div className="flex flex-col p-2 pl-4">
                {subMenuLinks.map((subItem, index) => {
                  const subActive = isLinkActive(subItem.link)
                  return (
                    <CMSLink
                      key={index}
                      {...subItem.link}
                      appearance="inline"
                      className={`py-2 text-base no-underline transition-colors ${subActive ? 'text-blue-500 font-medium' : 'text-muted-foreground hover:text-purple-500'}`}
                    />
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <CMSLink
      {...link}
      appearance="inline"
      className={`py-3 px-2 text-lg font-medium border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors no-underline ${active ? 'text-blue-500' : 'text-foreground hover:text-purple-500'}`}
    />
  )
}
