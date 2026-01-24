import type { Service, ServicesSliderBlock as ServicesSliderBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { ServicesSliderClient } from './Component.client'

export const ServicesSliderBlock: React.FC<
  ServicesSliderBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, introContent, title, limit: limitFromProps, useSelection, selectedDocs } = props

  const limit = limitFromProps || 10

  let services: Service[] = []

  if (useSelection === 'all') {
    const payload = await getPayload({ config: configPromise })

    const fetchedServices = await payload.find({
      collection: 'services',
      depth: 1,
      limit,
    })

    services = fetchedServices.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedServices = selectedDocs.map((service) => {
        if (typeof service.value === 'object') return service.value
      }) as Service[]

      services = filteredSelectedServices
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      <div className="container mb-8">
        {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
        {introContent && (
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        )}
      </div>
      <ServicesSliderClient services={services} />
    </div>
  )
}
