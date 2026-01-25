import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { ArchiveHero } from '@/heros/ArchiveHero'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'services',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  const archiveHeroes = await payload.findGlobal({
    slug: 'archive-heroes',
  })

  const heroData = archiveHeroes?.servicesHero

  return (
    <div className="pb-24">
      <PageClient />

      <ArchiveHero
        title={heroData?.title || 'Services'}
        subtitle={heroData?.subtitle || 'IDG Cleaning Services'}
        heroImage={heroData?.heroImage!}
      />

      <div className="container mb-8">
        <PageRange
          collection="services"
          currentPage={services.page}
          limit={12}
          totalDocs={services.totalDocs}
        />
      </div>

      <CollectionArchive relationTo="services" posts={services.docs} />

      <div className="container">
        {services.totalPages > 1 && services.page && (
          <Pagination collection="services" page={services.page} totalPages={services.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `IDG Cleaning Limited Services`,
  }
}
