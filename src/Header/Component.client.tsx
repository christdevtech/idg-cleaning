'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from 'lucide-react'

const getContactIcon = (iconName: string | null | undefined) => {
  switch (iconName) {
    case 'mapPin':
      return MapPin
    case 'phone':
      return Phone
    case 'mail':
      return Mail
    case 'clock':
      return Clock
    default:
      return null
  }
}

const getSocialIcon = (platform: string | null | undefined) => {
  switch (platform) {
    case 'facebook':
      return Facebook
    case 'twitter':
      return Twitter
    case 'instagram':
      return Instagram
    case 'linkedin':
      return Linkedin
    case 'youtube':
      return Youtube
    default:
      return null
  }
}

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const topBar = header?.topBar
  const showTopBar = topBar?.enabled

  return (
    <header className="relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      {showTopBar && (
        <div className="w-full bg-blue-600 text-white">
          <div className="container py-2 flex items-center justify-between text-sm flex-wrap gap-2">
            <div className="flex items-center gap-4 md:gap-6 flex-wrap">
              {topBar?.contactDetails?.map((item, i) => {
                const Icon = getContactIcon(item.icon)
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 ${i > 0 ? 'hidden sm:flex' : ''}`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {item.link ? (
                      <a href={item.link} className="hover:underline">
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <span className="hidden md:inline text-white/80">Follow Us</span>
              {topBar?.socialLinks?.map((item, i) => {
                const Icon = getSocialIcon(item.platform)
                return (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label={item.platform}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      )}
      <div className="container py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="invert-100 dark:invert-0" />
          <div className="hidden md:flex flex-col">
            <span className="font-semibold text-primary">IDG Cleaning Limited</span>
            <span className="text-xs text-primary">Professional & Reliable</span>
          </div>
        </Link>
        <HeaderNav header={header} />
      </div>
    </header>
  )
}
