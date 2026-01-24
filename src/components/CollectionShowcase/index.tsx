'use client'

import React from 'react'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { Media as MediaType } from '@/payload-types'

export interface CollectionShowcaseProps {
  title: string
  description: string
  highlights?: string[]
  callToAction?: {
    text: string
    link: string
  }
  media?: MediaType | string
  reverse?: boolean
  className?: string
}

export const CollectionShowcase: React.FC<CollectionShowcaseProps> = ({
  title,
  description,
  highlights = [],
  callToAction,
  media,
  reverse = false,
  className,
}) => {
  return (
    <section
      className={cn('relative w-full overflow-hidden', 'py-16 md:py-24 lg:py-32', className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center',
            reverse && 'lg:grid-flow-dense',
          )}
        >
          {/* Image Section */}
          <div
            className={cn(
              'relative group',
              'rounded-2xl overflow-hidden',
              'shadow-2xl',
              'transition-all duration-700 ease-out',
              'hover:shadow-3xl hover:scale-[1.02]',
              reverse && 'lg:col-start-2',
            )}
          >
            <div className="relative aspect-[4/3] w-full">
              {media && typeof media === 'object' ? (
                <Media
                  resource={media}
                  className="object-cover w-full h-full"
                  imgClassName="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
              ) : media && typeof media === 'string' ? (
                <img
                  src={media}
                  alt={title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center">
                  <div className="text-muted-foreground text-lg">No image available</div>
                </div>
              )}

              {/* Overlay gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
          </div>

          {/* Content Section */}
          <div
            className={cn(
              'flex flex-col justify-center space-y-6',
              reverse && 'lg:col-start-1 lg:row-start-1',
            )}
          >
            {/* Title */}
            <h2
              className={cn(
                'text-4xl sm:text-5xl lg:text-6xl font-bold',
                'bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent',
                'leading-tight tracking-tight',
                'animate-in fade-in slide-in-from-bottom-4 duration-700',
              )}
            >
              {title}
            </h2>

            {/* Description */}
            <div
              className={cn(
                'text-lg sm:text-xl text-muted-foreground',
                'leading-relaxed',
                'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100',
              )}
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {/* Highlights */}
            {highlights.length > 0 && (
              <ul
                className={cn(
                  'space-y-3',
                  'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200',
                )}
              >
                {highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 group/item"
                    style={{
                      animationDelay: `${300 + index * 100}ms`,
                    }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={cn(
                          'w-6 h-6 rounded-full',
                          'bg-gradient-to-br from-primary/20 to-accent/20',
                          'border-2 border-primary/40',
                          'flex items-center justify-center',
                          'transition-all duration-300',
                          'group-hover/item:scale-110 group-hover/item:border-primary',
                        )}
                      >
                        <svg
                          className="w-3 h-3 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <span className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Call to Action */}
            {callToAction && (
              <div
                className={cn(
                  'pt-4',
                  'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300',
                )}
              >
                <a
                  href={callToAction.link}
                  className={cn(
                    'inline-flex items-center gap-2',
                    'px-8 py-4 rounded-xl',
                    'bg-gradient-to-r from-primary to-primary/90',
                    'text-primary-foreground font-semibold text-lg',
                    'shadow-lg shadow-primary/25',
                    'transition-all duration-300',
                    'hover:shadow-xl hover:shadow-primary/40',
                    'hover:scale-105 hover:-translate-y-0.5',
                    'active:scale-100 active:translate-y-0',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                    'group/cta',
                  )}
                >
                  <span>{callToAction.text}</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover/cta:translate-x-1"
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
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </section>
  )
}
