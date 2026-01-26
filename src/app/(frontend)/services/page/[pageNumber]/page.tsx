import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from '../../page.client'
import { notFound } from 'next/navigation'
import { ArchiveHero } from '@/heros/ArchiveHero'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const services = await payload.find({
    collection: 'services',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
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
    <div className="pt-24 pb-24">
      <PageClient />
      <ArchiveHero
        title={heroData?.title || 'Services'}
        subtitle={heroData?.subtitle || 'IDG Cleaning Services'}
        heroImage={heroData?.heroImage || ''}
      />

      <div className="container my-8">
        <PageRange
          collection="services"
          currentPage={services.page}
          limit={12}
          totalDocs={services.totalDocs}
        />
      </div>

      <CollectionArchive posts={services.docs} />

      <div className="container">
        {services.page && services.totalPages > 1 && (
          <Pagination collection="services" page={services.page} totalPages={services.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `IDG Cleaning Limited Services Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'services',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
