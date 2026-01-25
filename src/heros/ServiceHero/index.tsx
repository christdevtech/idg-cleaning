import React from 'react'
import type { Service } from '@/payload-types'
import { Media } from '@/components/Media'
import { FadeIn } from '@/components/ui/FadeIn'

export const ServiceHero: React.FC<{
  service: Service
}> = ({ service }) => {
  const { heroImage, title, meta } = service

  return (
    <div className="relative -mt-[10.4rem] flex items-end justify-center h-[60vh] min-h-[40rem] text-white">
      <div className="container z-10 relative pb-12 flex flex-col items-center mb-24 md:mb-28 lg:mb-32">
        <FadeIn className="bg-black/30 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl max-w-4xl text-center">
          <h5 className="text-sm font-semibold text-white/80 tracking-widest uppercase mb-4">
            IDG Cleaning Services
          </h5>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            {title}
          </h1>
        </FadeIn>
      </div>

      <div className="absolute inset-0 select-none">
        <Media
          fill
          priority
          imgClassName="object-cover"
          className="h-full w-full"
          resource={heroImage}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-transparent h-[250px]" />
      </div>
    </div>
  )
}
