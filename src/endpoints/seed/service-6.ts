import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

export const educationalCleaning: (args: {
  blockImage: Media
  heroImage: Media
}) => RequiredDataFromCollectionSlug<'services'> = ({ heroImage, blockImage }) => {
  return {
    title: 'Educational Establishments',
    slug: 'educational-cleaning',
    publishedAt: new Date().toISOString(),
    _status: 'published',
    meta: {
      title: 'Educational Establishments | IDG Cleaning Limited',
      description: 'Specialized cleaning for schools and educational facilities.',
      image: heroImage.id,
    },
    heroImage: heroImage.id,
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Educational Establishments',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'We provide specialized cleaning for schools and educational facilities. Deep cleaning in schools is vital to eliminate accumulated dirt and germs that build up over time, ensuring a safe learning environment.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
          {
            type: 'block',
            fields: {
              blockName: 'Service Highlight',
              blockType: 'mediaBlock',
              media: blockImage.id,
              position: 'default',
            },
            format: '',
            version: 2,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  }
}
