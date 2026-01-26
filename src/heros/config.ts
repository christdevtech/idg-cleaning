import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Dynamic',
          value: 'dynamic',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
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
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'dynamic'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'layoutSettings',
      type: 'group',
      label: 'Layout & Visibility',
      admin: {
        condition: (_, { type } = {}) => type === 'dynamic',
        description: 'Control the layout and visibility of banner elements.',
      },
      fields: [
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'right',
          options: [
            { label: 'Right', value: 'right' },
            { label: 'Left', value: 'left' },
          ],
          label: 'Hero Image Position',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'showMarquee',
              type: 'checkbox',
              label: 'Show Marquee Slider',
              defaultValue: true,
            },
            {
              name: 'showStats',
              type: 'checkbox',
              label: 'Show Stats Strip',
              defaultValue: true,
            },
          ],
        },
      ],
    },
    {
      name: 'marqueeWords',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => type === 'dynamic',
      },
      labels: { singular: 'Word', plural: 'Words' },
      fields: [{ name: 'text', type: 'text', required: true }],
      defaultValue: [
        { text: 'Polishing' },
        { text: 'Organizing' },
        { text: 'Sanitizing' },
        { text: 'Mopping' },
        { text: 'Dusting' },
        { text: 'Vacuuming' },
        { text: 'Waxing' },
        { text: 'Washing' },
        { text: 'Wiping' },
      ],
    },
    {
      name: 'marqueeSpeedSeconds',
      type: 'number',
      defaultValue: 12,
      admin: {
        condition: (_, { type } = {}) => type === 'dynamic',
        description: 'Scroll speed for the marquee words (in seconds).',
      },
    },
    {
      name: 'bandTitle',
      type: 'text',
      defaultValue: 'Trusted cleaning metrics',
      admin: {
        condition: (_, { type } = {}) => type === 'dynamic',
      },
    },
    {
      name: 'stats',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => type === 'dynamic',
      },
      labels: { singular: 'Stat', plural: 'Stats' },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'sublabel', type: 'text' },
      ],
      defaultValue: [
        {
          value: '100+',
          label: 'Projects per month',
          sublabel: 'Busy homes and offices refreshed on repeat schedules.',
        },
        {
          value: '98%',
          label: 'Happy customers',
          sublabel: 'Five star feedback from returning local clients.',
        },
        {
          value: '12K+',
          label: 'Positive reviews',
          sublabel: 'Loved across rating platforms and neighborhood groups.',
        },
        {
          value: '35M',
          label: 'Square feet cleaned',
          sublabel: 'Floors, counters, windows, and hard to reach corners.',
        },
      ],
    },
    {
      name: 'trustIndicators',
      type: 'group',
      label: 'Trust Indicators',
      admin: {
        condition: (_, { type } = {}) => type === 'dynamic',
      },
      fields: [
        {
          name: 'ratings',
          type: 'group',
          label: 'Ratings Badge',
          fields: [
            {
              name: 'show',
              type: 'checkbox',
              label: 'Show Ratings',
              defaultValue: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Platform Logo',
                },
                {
                  name: 'starCount',
                  type: 'number',
                  label: 'Stars',
                  min: 0,
                  max: 5,
                  defaultValue: 5,
                },
              ],
            },
            {
              type: 'row',
              fields: [{ name: 'value', type: 'text', defaultValue: '12k Ratings' }],
            },
          ],
        },
        {
          name: 'partners',
          type: 'group',
          label: 'Partners Badge',
          fields: [
            {
              name: 'show',
              type: 'checkbox',
              label: 'Show Partners',
              defaultValue: true,
            },
            {
              name: 'avatars',
              type: 'array',
              labels: { singular: 'Avatar', plural: 'Avatars' },
              admin: {
                description: 'Upload partner avatars shown as a stacked group.',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Avatar Image',
                  required: true,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'value', type: 'text', defaultValue: '200k+' },
                { name: 'label', type: 'text', defaultValue: 'Satisfied Partners' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'decorItems',
      type: 'array',
      labels: { singular: 'Decor Item', plural: 'Decor Items' },
      admin: {
        condition: (_, { type } = {}) => type === 'dynamic',
        description:
          'Animated items placed around the hero image. Position is relative to the image container.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Item Image',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'xPercent',
              type: 'number',
              label: 'X Position (%)',
              min: 0,
              max: 100,
              defaultValue: 80,
            },
            {
              name: 'yPercent',
              type: 'number',
              label: 'Y Position (%)',
              min: 0,
              max: 100,
              defaultValue: 25,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'sizePx',
              type: 'number',
              label: 'Size (px)',
              min: 24,
              max: 240,
              defaultValue: 72,
            },
            {
              name: 'rotateDeg',
              type: 'number',
              label: 'Rotate (deg)',
              min: -180,
              max: 180,
              defaultValue: 0,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'animationType',
              type: 'select',
              label: 'Animation',
              defaultValue: 'float',
              options: [
                { label: 'Float', value: 'float' },
                { label: 'Bob', value: 'bob' },
                { label: 'Sway', value: 'sway' },
                { label: 'Spin', value: 'spin' },
                { label: 'Pulse', value: 'pulse' },
              ],
            },
            {
              name: 'speed',
              type: 'select',
              label: 'Speed',
              defaultValue: 'normal',
              options: [
                { label: 'Slow', value: 'slow' },
                { label: 'Normal', value: 'normal' },
                { label: 'Fast', value: 'fast' },
              ],
            },
            {
              name: 'delayMs',
              type: 'number',
              label: 'Delay (ms)',
              defaultValue: 0,
            },
          ],
        },
      ],
    },
    {
      name: 'bannerGradient',
      type: 'select',
      defaultValue: 'blue',
      admin: {
        condition: (_, { type } = {}) => type === 'dynamic',
      },
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Purple', value: 'purple' },
        { label: 'Green', value: 'green' },
      ],
    },
    {
      name: 'curveOpacity',
      type: 'number',
      defaultValue: 30,
      min: 0,
      max: 100,
      admin: {
        condition: (_, { type } = {}) => type === 'dynamic',
      },
    },
  ],
  label: false,
}
