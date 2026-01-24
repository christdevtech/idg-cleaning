import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Post, Media } from '@/payload-types'

export const post3: (args: {
  author: any
  blockImage: Media
  heroImage: Media
}) => RequiredDataFromCollectionSlug<'posts'> = ({ heroImage, blockImage, author }) => {
  return {
    slug: 'tips-for-airbnb-hosts-kent',
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
                text: 'Secure 5-Star Reviews Every Time',
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
                text: 'Managing a short-term rental can be demanding. One of the biggest factors in securing a 5-star review is cleanliness. Guests expect a hotel-standard finish when they arrive.',
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
                text: 'Our Airbnb Turnover Packages are designed to take the stress out of hosting. We handle linen changes, restocking essentials, and provide a thorough clean between guests. With our same-day turnaround guarantee, you can maximize your occupancy rates without worrying about the mess.',
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
      description:
        'Maximize your rental income and guest satisfaction with professional turnover cleaning.',
      image: heroImage.id,
      title: 'Top Tips for Airbnb Hosts in Kent',
    },
    title: 'Top Tips for Airbnb Hosts in Kent',
  }
}
