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

  const posts = await payload.find({
    collection: 'posts',
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

  const heroData = archiveHeroes?.postsHero

  return (
    <div className="pb-24">
      <PageClient />

      <ArchiveHero
        title={heroData?.title || 'Posts'}
        subtitle={heroData?.subtitle || 'IDG Cleaning Services'}
        heroImage={heroData?.heroImage || ''}
      />

      <div className="container my-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive relationTo="posts" posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination collection="posts" page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `IDG Cleaning Limited Posts`,
  }
}
