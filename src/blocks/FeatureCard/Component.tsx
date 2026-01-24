import React from 'react'
import type { FeatureCardBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

type Props = FeatureCardBlock & {
  className?: string
}

export const FeatureCard: React.FC<Props> = (props) => {
  const { eyebrow, title, description, bullets, image, imagePosition = 'left', links } = props

  const imageFirst = imagePosition === 'left'

  return (
    <section className="container my-12 md:my-20">
      <div className="rounded-3xl border border-border bg-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch overflow-hidden">
          <div
            className={
              imageFirst
                ? 'order-1 md:order-1'
                : 'order-1 md:order-2'
            }
          >
            {image && typeof image === 'object' && (
              <Media
                resource={image}
                imgClassName="object-cover w-full h-auto md:h-full"
                pictureClassName="block h-full"
              />
            )}
          </div>
          <div
            className={
              imageFirst
                ? 'order-2 md:order-2'
                : 'order-2 md:order-1'
            }
          >
            <div className="p-6 md:p-10">
              {eyebrow && (
                <div className="text-primary font-medium tracking-wide uppercase text-xs mb-3">
                  {eyebrow}
                </div>
              )}
              {title && <RichText data={title} enableGutter={false} />}
              {description && <RichText data={description} enableGutter={false} />}
              {Array.isArray(bullets) && bullets.length > 0 && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                  {bullets.map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                      <span>{b?.text}</span>
                    </div>
                  ))}
                </div>
              )}
              {Array.isArray(links) && links.length > 0 && (
                <div className="mt-6 flex gap-4 flex-wrap">
                  {links.map(({ link }, i) => (
                    <CMSLink key={i} {...link} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
