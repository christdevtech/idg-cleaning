'use client'
import { motion } from 'framer-motion'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post, Service } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post | Service, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts' | 'services'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo || 'posts'}/${slug}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'group relative flex flex-col rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out',
        'bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-foreground/20',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full overflow-hidden">
        {!metaImage && (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            resource={metaImage}
            size="33vw"
            imgClassName="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between relative z-10">
        <div>
          {showCategories && hasCategories && (
            <div className="uppercase text-xs font-semibold tracking-wider text-primary-foreground/90 mb-3 bg-primary/20 backdrop-blur-md w-fit px-2 py-1 rounded-md">
              {categories?.map((category, index) => {
                if (typeof category === 'object') {
                  const { title: titleFromCategory } = category
                  const categoryTitle = titleFromCategory || 'Untitled category'
                  const isLast = index === categories.length - 1

                  return (
                    <Fragment key={index}>
                      {categoryTitle}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }
                return null
              })}
            </div>
          )}
          {titleToUse && (
            <h3 className="text-xl font-bold mb-3 leading-tight text-foreground group-hover:text-primary transition-colors drop-shadow-sm">
              <Link className="not-prose focus:outline-none" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4 group-hover:text-foreground transition-colors">
              {sanitizedDescription}
            </p>
          )}
        </div>
        <div className="pt-2">
          <Link className="not-prose focus:outline-none" href={href} ref={link.ref}>
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all rounded-full bg-secondary/10 dark:bg-white/10 backdrop-blur-md border border-border/50 dark:border-white/20 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
              Read more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
