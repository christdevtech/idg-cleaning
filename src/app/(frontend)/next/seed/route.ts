import { createLocalReq, getPayload } from 'payload'
import { seed } from '@/endpoints/seed'
import config from '@payload-config'
import { headers } from 'next/headers'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  const secretHeader = requestHeaders.get('x-seed-secret') || undefined
  const hasSecret =
    Boolean(secretHeader) &&
    Boolean(process.env.PAYLOAD_SECRET) &&
    secretHeader === process.env.PAYLOAD_SECRET

  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user && !hasSecret) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    const payloadReq = await createLocalReq(hasSecret ? {} : { user: user as any }, payload)

    await seed({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch (e) {
    const err = e as Error
    payload.logger.error({ err, message: 'Error seeding data' })
    return Response.json(
      { success: false, error: err.message ?? 'Error seeding data.' },
      { status: 500 },
    )
  }
}
