import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Post, Media } from '@/payload-types'

export const post2: (args: {
  author: any
  blockImage: Media
  heroImage: Media
}) => RequiredDataFromCollectionSlug<'posts'> = ({ heroImage, blockImage, author }) => {
  return {
    slug: 'health-benefits-deep-cleaning',
    _status: 'published',
    authors: [author],
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
                text: 'Breathe Easier with Deep Cleaning',
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
                text: 'Regular dusting is important, but it often misses the hidden allergens lurking in carpets, curtains, and high corners. Deep cleaning is vital for maintaining good air quality in your home.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
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
                text: 'Our specialized deep cleaning service targets mold spores, dust mites, and other triggers that can exacerbate asthma and respiratory issues. By thoroughly cleaning high-touch areas and neglected spots, we help create a safer, healthier environment for you and your family.',
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
              blockName: 'Image',
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
    heroImage: heroImage.id,
    meta: {
      description: 'Learn how deep cleaning removes allergens and improves indoor air quality.',
      image: heroImage.id,
      title: 'The Hidden Health Benefits of Deep Cleaning',
    },
    title: 'The Hidden Health Benefits of Deep Cleaning',
  }
}
