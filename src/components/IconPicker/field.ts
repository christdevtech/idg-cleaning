import { Field } from 'payload'

export const iconField: Field = {
  name: 'icon',
  type: 'text',
  admin: {
    components: {
      Field: '@/components/IconPicker/index#IconPicker',
    },
  },
}
