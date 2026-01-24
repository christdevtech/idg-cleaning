import React from 'react'
import type { SplitFeatureBlock } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

type Props = SplitFeatureBlock & {
  className?: string
}

export const SplitFeature: React.FC<Props> = (props) => {
  const {
    eyebrow,
    title,
    description,
    leftTop,
    leftBottom,
    centerMedia,
    highlight,
    bullets,
    mission,
  } = props

  const isCenterVideo =
    typeof centerMedia === 'object' && (centerMedia?.mimeType || '').includes('video')

  return (
    <section className="container my-12 md:my-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 flex flex-col gap-6">
            {leftTop && typeof leftTop === 'object' && (
              <Media
                resource={leftTop}
                imgClassName="rounded-2xl shadow-sm object-cover w-full h-auto"
                pictureClassName=""
              />
            )}
            {leftBottom && typeof leftBottom === 'object' && (
              <Media
                resource={leftBottom}
                imgClassName="rounded-2xl shadow-sm object-cover w-full h-auto"
                pictureClassName=""
              />
            )}
          </div>
          <div className="col-span-2 relative flex items-center justify-center">
            {centerMedia && typeof centerMedia === 'object' && (
              <Media
                resource={centerMedia}
                imgClassName="object-cover w-full h-auto"
                videoClassName="object-cover w-full h-auto"
                variant="oval"
                showPlayOverlay={isCenterVideo}
              />
            )}
          </div>
        </div>

        <div className="space-y-6">
          {eyebrow && (
            <div className="text-primary font-medium tracking-wide uppercase text-xs">
              {eyebrow}
            </div>
          )}
          {title && <RichText data={title} enableGutter={false} />}
          {description && <RichText data={description} enableGutter={false} />}

          {highlight && (
            <Card className="bg-white shadow-sm">
              <CardContent className="flex items-center gap-4">
                {typeof highlight.avatar === 'object' && (
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Media resource={highlight.avatar} imgClassName="object-cover w-12 h-12" />
                  </div>
                )}
                <div>
                  {highlight.title && <div className="font-semibold">{highlight.title}</div>}
                  {highlight.content && (
                    <div className="text-muted-foreground">
                      <RichText data={highlight.content} enableGutter={false} />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {Array.isArray(bullets) && bullets.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>{b?.text}</span>
                </div>
              ))}
            </div>
          )}

          {mission && (
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold">Our Mission & Vision</div>
                <RichText data={mission} enableGutter={false} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
