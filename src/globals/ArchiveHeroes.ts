import { GlobalConfig } from 'payload'

export const ArchiveHeroes: GlobalConfig = {
  slug: 'archive-heroes',
  label: 'Archive Heroes',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'postsHero',
      label: 'Posts Archive Hero',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          defaultValue: 'IDG Cleaning Services',
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'servicesHero',
      label: 'Services Archive Hero',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          defaultValue: 'IDG Cleaning Services',
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
