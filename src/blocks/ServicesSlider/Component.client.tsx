'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import type { Service } from '@/payload-types'
import { Card } from '@/components/Card'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

type Props = {
  services: Service[]
}

export const ServicesSliderClient: React.FC<Props> = ({ services }) => {
  return (
    <div className="container">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="services-slider pb-12 overflow-visible"
      >
        {services.map((service, index) => (
          <SwiperSlide key={index} className="h-auto">
            <Card className="h-full" doc={service} relationTo="services" showCategories />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
