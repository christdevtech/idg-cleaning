import type { Field, FieldHook } from 'payload'
import deepMerge from '@/utilities/deepMerge'

const formatSlug =
  (fallback = 'title'): FieldHook =>
  ({ value, data }) => {
    const source = (data?.[fallback] ?? value ?? '').toString()
    const slug = source
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    return slug
  }

export const slugField = (fallback = 'title', overrides: Partial<Field> = {}): Field => {
  const base: Field = {
    name: 'slug',
    type: 'text',
    index: true,
    admin: {
      position: 'sidebar',
    },
    hooks: {
      beforeValidate: [formatSlug(fallback)],
    },
  }

  return deepMerge(base, overrides)
}
