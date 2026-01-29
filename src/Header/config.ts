import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Header Navigation',
          fields: [
            {
              name: 'navItems',
              type: 'array',
              fields: [
                link({
                  appearances: false,
                }),
                {
                  name: 'hasSubMenu',
                  type: 'checkbox',
                  label: 'Has Sub-menu',
                  defaultValue: false,
                },
                {
                  name: 'subMenuLinks',
                  type: 'array',
                  label: 'Sub-menu Links',
                  admin: {
                    condition: (_, siblingData) => siblingData?.hasSubMenu,
                  },
                  fields: [
                    link({
                      appearances: false,
                    }),
                  ],
                },
              ],
              maxRows: 12,
            },
          ],
        },
        {
          label: 'Top Bar & Socials',
          fields: [
            {
              name: 'topBar',
              type: 'group',
              label: 'Top Bar',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Enable Top Bar',
                  defaultValue: true,
                },
                {
                  name: 'contactDetails',
                  type: 'array',
                  label: 'Contact Details',
                  fields: [
                    {
                      name: 'icon',
                      type: 'select',
                      options: [
                        { label: 'Map Pin', value: 'mapPin' },
                        { label: 'Phone', value: 'phone' },
                        { label: 'Email', value: 'mail' },
                        { label: 'Clock', value: 'clock' },
                      ],
                      required: true,
                    },
                    {
                      name: 'text',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'link', // Optional link for the contact item
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'socialLinks',
                  type: 'array',
                  label: 'Social Links',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      options: [
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'Twitter', value: 'twitter' },
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'LinkedIn', value: 'linkedin' },
                        { label: 'YouTube', value: 'youtube' },
                      ],
                      required: true,
                    },
                    {
                      name: 'url',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
