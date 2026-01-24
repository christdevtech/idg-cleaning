'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []

  return (
    <div className="flex gap-4 items-center">
      <DesktopNav navItems={navItems} />
      <MobileNav navItems={navItems} />

      <div className="hidden lg:block w-px h-6 bg-border mx-2" />

      <Link
        href="/search"
        aria-label="Search"
        className="text-foreground hover:text-primary transition-colors"
      >
        <SearchIcon className="w-5 h-5" />
      </Link>
      <Button
        asChild
        className="hidden sm:inline-flex bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5"
      >
        <Link href="/contact">Book Schedule</Link>
      </Button>
    </div>
  )
}
