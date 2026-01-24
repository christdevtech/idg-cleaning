import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ServicesSlider: Block = {
  slug: 'servicesSlider',
  interfaceName: 'ServicesSliderBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'useSelection',
      type: 'select',
      defaultValue: 'all',
      options: [
        {
          label: 'Show All Services',
          value: 'all',
        },
        {
          label: 'Select Services',
          value: 'selected',
        },
      ],
      label: 'Selection Mode',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.useSelection === 'all',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.useSelection === 'selected',
      },
      hasMany: true,
      label: 'Selected Services',
      relationTo: ['services'],
    },
  ],
  labels: {
    plural: 'Services Sliders',
    singular: 'Services Slider',
  },
}
