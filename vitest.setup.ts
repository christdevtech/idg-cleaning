// Any setup scripts you might need go here

// Load .env files
import 'dotenv/config'
import { vi } from 'vitest'

vi.mock('payload', async () => {
  const actual = await vi.importActual<any>('payload')
  return {
    ...actual,
    slugField: (...args: any[]) => {
      if (typeof actual.slugField === 'function') {
        return actual.slugField(...args)
      }
      return {
        name: 'slug',
        type: 'text',
        admin: { position: 'sidebar' },
      }
    },
  }
})
