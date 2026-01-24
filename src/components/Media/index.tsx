import { cn } from '@/utilities/ui'
import React, { Fragment } from 'react'

import type { Props } from './types'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'
import { Play } from 'lucide-react'

export const Media: React.FC<Props> = (props) => {
  const {
    className,
    htmlElement = 'div',
    resource,
    variant = 'default',
    showPlayOverlay,
    fill,
  } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const Tag = htmlElement || Fragment

  const content = isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />

  const wrapperStyle =
    variant === 'oval'
      ? {
          clipPath: 'ellipse(50% 42% at 50% 50%)',
        }
      : undefined

  return (
    <Tag {...(htmlElement !== null ? { className } : {})}>
      <div className={cn('relative', { 'h-full w-full': fill })} style={wrapperStyle}>
        {content}
        {showPlayOverlay && isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 text-primary rounded-full p-4 shadow">
              <Play className="w-6 h-6" />
            </div>
          </div>
        )}
      </div>
    </Tag>
  )
}
