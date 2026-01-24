'use client'
import React, { useState } from 'react'

import type { ServicesShowcaseBlock } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { Trophy } from 'lucide-react'

type Props = ServicesShowcaseBlock & {
  className?: string
}

export const ServicesShowcase: React.FC<Props> = (props) => {
  const { eyebrow, title, intro, leftTop, leftFront, badge, items } = props
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-blue-50/60 to-white dark:from-slate-900 dark:via-slate-900/60 dark:to-black" />
      <div className="container relative py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                {leftTop && typeof leftTop === 'object' && (
                  <Media resource={leftTop} imgClassName="rounded-2xl shadow-sm object-cover" />
                )}
              </div>
              <div className="col-span-2 md:col-span-1 relative">
                <div className="absolute -left-6 -top-6 right-6 bottom-6 rounded-3xl border-2 border-dashed border-primary/40" />
                {leftFront && typeof leftFront === 'object' && (
                  <Media
                    resource={leftFront}
                    imgClassName="rounded-3xl shadow-lg object-cover"
                    variant="oval"
                  />
                )}
                {badge?.label && (
                  <div className="absolute -bottom-6 left-6 bg-primary text-primary-foreground rounded-full px-5 py-3 flex items-center gap-3 shadow-lg">
                    <Trophy className="w-5 h-5" />
                    <div className="text-sm">
                      <div className="font-semibold">{badge.label}</div>
                      {badge.subLabel && <div className="opacity-90">{badge.subLabel}</div>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            {eyebrow && (
              <div className="text-primary font-medium tracking-wide uppercase text-xs">
                {eyebrow}
              </div>
            )}
            {title && <RichText data={title} enableGutter={false} />}
            {intro && <RichText data={intro} enableGutter={false} />}

            <div className="mt-6">
              {Array.isArray(items) &&
                items.map((item, i) => (
                  <div
                    key={i}
                    className="group relative py-4 border-t border-border flex gap-6"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="min-w-[3rem] text-muted-foreground">
                      {String(i + 1).padStart(2, '0')}/
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1">{item?.title}</div>
                      {item?.description && (
                        <RichText data={item.description} enableGutter={false} />
                      )}
                    </div>

                    {item?.hoverMedia && typeof item.hoverMedia === 'object' && (
                      <div
                        aria-hidden
                        className="absolute top-1/2 -translate-y-1/2 h-24 w-40 pointer-events-none"
                        style={{
                          left: 'calc(3rem + 1.5rem)',
                          transform:
                            hoveredIndex === i
                              ? 'translate(-50%, -50%) translateX(120%)'
                              : 'translate(-50%, -50%) translateX(-100%)',
                          opacity: hoveredIndex === i ? 1 : 0,
                          transition:
                            'transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease-out',
                        }}
                      >
                        <div className="rounded-xl overflow-hidden shadow-lg bg-white/90 dark:bg-black/60 backdrop-blur">
                          <Media resource={item.hoverMedia} imgClassName="object-cover w-40 h-24" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
