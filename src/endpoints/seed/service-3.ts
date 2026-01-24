import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

export const airbnbCleaning: (args: {
  blockImage: Media
  heroImage: Media
}) => RequiredDataFromCollectionSlug<'services'> = ({ heroImage, blockImage }) => {
  return {
    title: 'Airbnb Turnover Packages',
    slug: 'airbnb-cleaning',
    publishedAt: new Date().toISOString(),
    _status: 'published',
    meta: {
      title: 'Airbnb Turnover Packages | IDG Cleaning Limited',
      description: '5-star quality turnover cleaning team. Same-day turnaround guarantee.',
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
                text: 'Airbnb Turnover Packages',
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
                text: 'Attention Hosts: We provide a 5-star quality turnover cleaning team so you can focus on bookings and growing your rental business. We offer a same-day turnaround guarantee to ensure you never miss a booking.',
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
                text: 'Our Package Includes',
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
            type: 'list',
            children: [
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Full cleaning of the property.',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
                value: 1,
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Linen washing and restocking.',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
                value: 2,
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Consumable replenishment (toilet paper, coffee, trash bags, etc.).',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
                value: 3,
              },
              {
                type: 'listitem',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Damage and photo reporting for your peace of mind.',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
                value: 4,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'ul',
            listType: 'bullet',
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
