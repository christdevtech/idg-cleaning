import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

export const deepCleaning: (args: {
  blockImage: Media
  heroImage: Media
}) => RequiredDataFromCollectionSlug<'services'> = ({ heroImage, blockImage }) => {
  return {
    title: 'Deep Cleaning',
    slug: 'deep-cleaning',
    publishedAt: new Date().toISOString(),
    _status: 'published',
    meta: {
      title: 'Deep Cleaning | IDG Cleaning Limited',
      description:
        'Perfect for spring cleaning or post-festive cleanup. Targets hidden grime and neglected areas.',
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
                text: 'Deep Cleaning',
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
                text: 'Perfect for spring cleaning or post-festive cleanup. Unlike regular cleaning, which focuses on visible maintenance, our deep cleaning service targets hidden grime and neglected areas.',
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
                text: 'Health Benefits',
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
                text: 'This service removes hidden germs from high-touch areas, eliminates crumbs that attract pests, and improves overall hygiene.',
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
                text: 'Scope',
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
                text: 'We tackle built-up dirt, ensuring a fresh start for your home.',
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
