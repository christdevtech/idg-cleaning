import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

export const domesticHomeCleaning: (args: {
  blockImage: Media
  heroImage: Media
}) => RequiredDataFromCollectionSlug<'services'> = ({ heroImage, blockImage }) => {
  return {
    title: 'Domestic Home Cleaning',
    slug: 'domestic-home-cleaning',
    publishedAt: new Date().toISOString(),
    _status: 'published',
    meta: {
      title: 'Domestic Home Cleaning | IDG Cleaning Limited',
      description:
        'Keep your home consistently fresh without the hassle. Our professional cleaners can assist with weekly or fortnightly cleaning chores.',
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
                text: 'Domestic Home Cleaning',
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
                text: 'Keep your home consistently fresh without the hassle. Our professional cleaners can assist with weekly or fortnightly cleaning chores you simply don’t have time for.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'What we do',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
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
                text: "We handle the essential tasks to keep your home tidy, removing dust, mold spores, and allergens to improve your home's air quality.",
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
