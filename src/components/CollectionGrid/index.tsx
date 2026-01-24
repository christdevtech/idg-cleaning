'use client'

import React from 'react'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { Media as MediaType } from '@/payload-types'

export interface CollectionItem {
  id: string
  title: string
  description: string
  media?: MediaType | string
  link?: string
  badge?: string
}

export interface CollectionGridProps {
  items: CollectionItem[]
  columns?: 1 | 2 | 3 | 4
  className?: string
  title?: string
  subtitle?: string
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({
  items,
  columns = 3,
  className,
  title,
  subtitle,
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className={cn('py-16 md:py-24 lg:py-32', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12 md:mb-16 space-y-4">
            {title && (
              <h2
                className={cn(
                  'text-4xl sm:text-5xl lg:text-6xl font-bold',
                  'bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent',
                  'leading-tight tracking-tight',
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className={cn('grid gap-6 md:gap-8 lg:gap-10', gridCols[columns])}>
          {items.map((item, index) => (
            <CollectionCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface CollectionCardProps {
  item: CollectionItem
  index: number
}

const CollectionCard: React.FC<CollectionCardProps> = ({ item, index }) => {
  const CardWrapper = item.link ? 'a' : 'div'
  const cardProps = item.link ? { href: item.link } : {}

  return (
    <CardWrapper
      {...cardProps}
      className={cn(
        'group relative',
        'bg-card rounded-2xl overflow-hidden',
        'border border-border/50',
        'shadow-lg hover:shadow-2xl',
        'transition-all duration-500 ease-out',
        'hover:scale-[1.02] hover:-translate-y-1',
        'animate-in fade-in slide-in-from-bottom-4',
        item.link && 'cursor-pointer',
      )}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {item.media && typeof item.media === 'object' ? (
          <Media
            resource={item.media}
            className="object-cover w-full h-full"
            imgClassName="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />
        ) : item.media && typeof item.media === 'string' ? (
          <img
            src={item.media}
            alt={item.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center">
            <div className="text-muted-foreground">No image</div>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-4 right-4 z-10">
            <span
              className={cn(
                'inline-block px-4 py-2 rounded-full',
                'bg-primary/90 backdrop-blur-sm',
                'text-primary-foreground text-sm font-semibold',
                'shadow-lg',
                'transform transition-transform duration-300',
                'group-hover:scale-110',
              )}
            >
              {item.badge}
            </span>
          </div>
        )}

        {/* Link Icon */}
        {item.link && (
          <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3
          className={cn(
            'text-xl sm:text-2xl font-bold',
            'text-foreground',
            'transition-colors duration-300',
            'group-hover:text-primary',
          )}
        >
          {item.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed line-clamp-3">{item.description}</p>
      </div>

      {/* Decorative gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl" />
      </div>
    </CardWrapper>
  )
}
