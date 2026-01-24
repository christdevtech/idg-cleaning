import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { FadeIn } from '@/components/ui/FadeIn'
import type { Service } from '@/payload-types'

type Props = {
  services: Pick<Service, 'title' | 'slug'>[]
  currentSlug: string
}

export const ServiceSidebar: React.FC<Props> = ({ services, currentSlug }) => {
  return (
    <FadeIn className="sticky top-24 p-6 bg-white/30 dark:bg-black/30 backdrop-blur-lg border border-primary/50 rounded-xl shadow-lg">
      <h3 className="mb-4 text-lg font-bold">Our Services</h3>
      <nav className="flex flex-col space-y-1">
        {services.map((service) => {
          const isActive = service.slug === currentSlug

          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={cn(
                'px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-primary',
                isActive
                  ? 'bg-primary/90 text-primary-foreground shadow-md backdrop-blur-sm'
                  : 'hover:bg-foreground/50 hover:text-background text-foreground/80 hover:shadow-sm',
              )}
            >
              {service.title}
            </Link>
          )
        })}
      </nav>
    </FadeIn>
  )
}
