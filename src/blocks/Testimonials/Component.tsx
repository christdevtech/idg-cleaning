import React from 'react'
import type { TestimonialsBlock } from '@/payload-types'
import { TestimonialsClient } from './Component.client'
import RichText from '@/components/RichText'

type Props = TestimonialsBlock & {}

export const TestimonialsComponent: React.FC<Props> = (props) => {
  const { title, introContent, reviews } = props

  return (
    <div className="py-16 my-16">
      <div className="container mb-8">
        {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
        {introContent && <RichText data={introContent} enableGutter={false} />}
      </div>
      <TestimonialsClient {...props} />
    </div>
  )
}
