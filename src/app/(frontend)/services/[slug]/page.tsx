import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Service } from '@/payload-types'

import { ServiceHero } from '@/heros/ServiceHero'
import { ServiceSidebar } from '@/components/ServiceSidebar'
import { FadeIn } from '@/components/ui/FadeIn'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const services = await payload.find({
    collection: 'services',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = services.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Service({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/services/' + decodedSlug

  const [service, allServices] = await Promise.all([
    queryServiceBySlug({ slug: decodedSlug }),
    queryResults(),
  ])

  if (!service) return <PayloadRedirects url={url} />

  // Filter out the "current" service if needed, but for a nav list usually we keep it for context.
  // The sidebar expects simple { title, slug } objects.
  const sidebarServices = allServices?.docs.map((s) => ({ title: s.title, slug: s.slug })) || []

  return (
    <article className="pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <ServiceHero service={service} />

      <div className="container relative z-10 -mt-16 md:-mt-24 lg:-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sidebar Area */}
          <div className="lg:col-span-4 order-last lg:order-first">
            <div className="sticky top-24">
              <ServiceSidebar services={sidebarServices as any} currentSlug={decodedSlug} />
            </div>
          </div>

          {/* Main Content Area */}
          <FadeIn className="lg:col-span-8 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20">
            <RichText
              className="max-w-none text-foreground/90"
              data={service.content}
              enableGutter={false}
            />

            {service.relatedServices && service.relatedServices.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/10">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Related Services</h3>
                <RelatedPosts
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  docs={service.relatedServices.filter((service) => typeof service === 'object')}
                />
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const service = await queryServiceBySlug({ slug: decodedSlug })

  return generateMeta({ doc: service })
}

const queryServiceBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    draft,
    limit: 1,
    depth: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const queryResults = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    draft,
    overrideAccess: draft,
    pagination: false,
    select: {
      slug: true,
      title: true,
      heroImage: true,
      meta: {
        image: true,
        description: true,
      },
    },
  })

  return result
})
