'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import type { TestimonialsBlock } from '@/payload-types' // This type might not exist yet, but will be generated
import { Media } from '@/components/Media'
import { formatTimeAgo } from '@/utilities/formatTimeAgo'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

type Props = TestimonialsBlock

export const TestimonialsClient: React.FC<Props> = (props) => {
  const { reviews } = props

  if (!reviews || reviews.length === 0) return null

  return (
    <div className="container overflow-visible">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        className="testimonials-slider pb-12 overflow-visible"
        style={{ overflow: 'visible' }} // Ensure overflow is visible for shadows/etc
      >
        {reviews.map((review, index) => {
          // Handle potential string vs object mismatch for avatar
          const avatar = review.avatar

          return (
            <SwiperSlide key={index} className="w-[300px] md:w-[350px] lg:w-[400px] h-auto">
              {/* Fixed width for slides to allow "auto" slidesPerView to show partial slides */}
              <div className="h-full flex flex-col p-6 rounded-2xl bg-white dark:bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                {/* Header: Avatar + Name + Date */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-muted">
                    {avatar &&
                      (typeof avatar === 'string' ? (
                        // If we only have ID, we might need to fetch or just show placeholder if not hydrated.
                        // For safety in blocks, usually payload expands depth.
                        <div className="w-full h-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                          {review.author?.charAt(0) || 'U'}
                        </div>
                      ) : (
                        <Media resource={avatar} fill imgClassName="object-cover" />
                      ))}
                    {!avatar && (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {review.author?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-foreground">{review.author}</span>
                    {review.date && (
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(review.date)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center mb-3 text-yellow-500 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={i < (review.rating || 5) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 mr-0.5"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-6">
                  {review.content}
                </p>

                {/* Google Logo / Brand indicator (Optional, to mimic Google Reviews style) */}
                <div className="mt-auto pt-4 flex items-center opacity-50">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                    alt="Google"
                    className="h-4"
                  />
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
