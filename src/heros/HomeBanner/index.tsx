'use client'
import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type HomeBannerExtras = {
  marqueeWords?: { text: string }[]
  marqueeSpeedSeconds?: number
  bandTitle?: string
  stats?: { value: string; label: string; sublabel?: string }[]
  bannerGradient?: 'blue' | 'purple' | 'green'
  curveOpacity?: number
  layoutSettings?: {
    imagePosition?: 'left' | 'right'
    showMarquee?: boolean
    showStats?: boolean
  }
  trustIndicators?: {
    ratings?: {
      show?: boolean
      value?: string
      logo?: { url?: string; alt?: string } | null
      starCount?: number
    }
    partners?: {
      show?: boolean
      value?: string
      label?: string
      avatars?: ({ url?: string; alt?: string } | null)[] | null
    }
  }
  decorItems?: {
    image: { url?: string; alt?: string } | null
    xPercent: number
    yPercent: number
    sizePx: number
    rotateDeg?: number
    animationType?: 'float' | 'bob' | 'sway' | 'spin' | 'pulse'
    speed?: 'slow' | 'normal' | 'fast'
    delayMs?: number
  }[]
}

const WordSlider: React.FC<{ words: string[]; speedSeconds: number }> = ({
  words,
  speedSeconds,
}) => {
  return (
    <div className="relative overflow-hidden rounded-full border border-white/60 bg-white/70 text-[0.65rem] md:text-xs uppercase tracking-[0.3em] text-slate-500 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80" />
      <div className="flex overflow-hidden">
        <div
          className="flex min-w-full items-center gap-8 animate-marquee"
          style={{ animationDuration: `${speedSeconds}s` }}
        >
          {words.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-[0.55rem] md:text-[0.65rem]">✧</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div
          className="flex min-w-full items-center gap-8 animate-marquee"
          aria-hidden
          style={{ animationDuration: `${speedSeconds}s` }}
        >
          {words.map((item, index) => (
            <div key={words.length + index} className="flex items-center gap-3">
              <span className="text-[0.55rem] md:text-[0.65rem]">✧</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const StatsSlider: React.FC<{ title: string; stats: HomeBannerExtras['stats'] }> = ({
  title,
  stats,
}) => {
  const items = Array.isArray(stats) ? stats : []
  return (
    <div className="relative rounded-3xl bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 text-white shadow-lg">
      <div className="absolute inset-y-0 right-0 w-40 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_60%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.25),transparent_55%)] opacity-90" />
      <div className="relative px-5 pt-5 pb-4 md:px-8 md:pt-6 md:pb-6">
        <div className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/70">
          {title}
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
          {items.map((item, index) => (
            <div
              key={index}
              className="min-w-[11rem] rounded-2xl border border-white/25 bg-white/10 px-4 py-4 text-left backdrop-blur-md md:min-w-0"
            >
              <div className="mb-1 flex items-baseline gap-1 text-2xl font-semibold md:text-3xl">
                <span>{item.value}</span>
              </div>
              <div className="mb-1 text-xs font-medium uppercase tracking-wide text-white/80">
                {item.label}
              </div>
              {item.sublabel && <div className="text-xs text-white/70">{item.sublabel}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const HomeBanner: React.FC<Page['hero'] & { extras?: HomeBannerExtras }> = ({
  links,
  media,
  richText,
  extras,
}) => {
  const words = extras?.marqueeWords?.map((w) => w.text).filter(Boolean) ?? [
    'Polishing',
    'Organizing',
    'Sanitizing',
    'Mopping',
    'Dusting',
    'Vacuuming',
  ]
  const speed = extras?.marqueeSpeedSeconds ?? 28
  const bandTitle = extras?.bandTitle ?? 'Trusted cleaning metrics'
  const stats = extras?.stats ?? [
    {
      value: '100+',
      label: 'Projects per month',
      sublabel: 'Busy homes and offices refreshed on repeat schedules.',
    },
    {
      value: '98%',
      label: 'Happy customers',
      sublabel: 'Five star feedback from returning local clients.',
    },
    {
      value: '12K+',
      label: 'Positive reviews',
      sublabel: 'Loved across rating platforms and neighborhood groups.',
    },
    {
      value: '35M',
      label: 'Square feet cleaned',
      sublabel: 'Floors, counters, windows, and hard to reach corners.',
    },
  ]

  const gradientClass =
    extras?.bannerGradient === 'purple'
      ? 'from-purple-50 via-purple-50/60 to-white dark:from-slate-900 dark:via-slate-900/60 dark:to-black'
      : extras?.bannerGradient === 'green'
        ? 'from-green-50 via-green-50/60 to-white dark:from-slate-900 dark:via-slate-900/60 dark:to-black'
        : 'from-blue-50 via-blue-50/60 to-white dark:from-slate-900 dark:via-slate-900/60 dark:to-black'
  const curveOpacity = typeof extras?.curveOpacity === 'number' ? extras?.curveOpacity / 100 : 0.3
  const {
    imagePosition = 'right',
    showMarquee = true,
    showStats = true,
  } = extras?.layoutSettings || {}
  const { ratings, partners } = extras?.trustIndicators || {}
  const ratingsVisible = ratings?.show !== false
  const partnersVisible = partners?.show !== false
  const starCount = Math.max(0, Math.min(5, ratings?.starCount ?? 5))
  const decorItems = Array.isArray(extras?.decorItems) ? extras!.decorItems! : []
  const getAnimClass = (
    type: 'float' | 'bob' | 'sway' | 'spin' | 'pulse' | undefined,
    speed: 'slow' | 'normal' | 'fast' | undefined,
  ) => {
    const t = type || 'float'
    const s = speed || 'normal'
    const map: Record<string, Record<string, string>> = {
      float: { slow: 'animate-float-slow', normal: 'animate-float', fast: 'animate-float-fast' },
      bob: { slow: 'animate-bob-slow', normal: 'animate-bob', fast: 'animate-bob-fast' },
      sway: { slow: 'animate-sway-slow', normal: 'animate-sway', fast: 'animate-sway-fast' },
      spin: { slow: 'animate-spin-slow', normal: 'animate-spin', fast: 'animate-spin' },
      pulse: {
        slow: 'animate-pulse-soft',
        normal: 'animate-pulse-soft',
        fast: 'animate-pulse-soft',
      },
    }
    return map[t][s]
  }

  return (
    <section className="relative -mt-[4rem] overflow-hidden min-h-[85vh] flex items-center">
      <div className={`absolute inset-0 bg-gradient-to-b ${gradientClass}`} />
      <div className="container relative pt-24 md:pt-32 pb-16 md:pb-24 space-y-12">
        {showMarquee && <WordSlider words={words} speedSeconds={speed} />}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className={imagePosition === 'left' ? 'order-2' : 'order-1'}>
            {richText && (
              <div className="mb-8">
                <RichText data={richText} enableGutter={false} />
              </div>
            )}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex gap-4 mb-8">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} appearance="default" />
                    </li>
                  )
                })}
              </ul>
            )}
            <div className="flex items-center gap-6 flex-wrap">
              {ratingsVisible && (
                <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm">
                  {ratings?.logo?.url ? (
                    <Image
                      src={getMediaUrl(ratings.logo.url)}
                      width={28}
                      height={28}
                      alt={ratings.logo.alt || 'Ratings'}
                    />
                  ) : (
                    <Image src="/favicon.svg" width={28} height={28} alt="Ratings" />
                  )}
                  <div className="flex items-center gap-1 text-warning">
                    {Array.from({ length: starCount }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {ratings?.value || '12k Ratings'}
                  </span>
                </div>
              )}
              {partnersVisible && (
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {Array.isArray(partners?.avatars) && partners.avatars?.length
                      ? partners.avatars
                          .filter(Boolean)
                          .slice(0, 6)
                          .map((avatar, idx) => (
                            <Image
                              key={idx}
                              src={getMediaUrl(avatar?.url || '') || '/media/image-post1.webp'}
                              alt={avatar?.alt || `Partner ${idx + 1}`}
                              width={36}
                              height={36}
                              className="rounded-full border-2 border-white"
                            />
                          ))
                      : [
                          <Image
                            key="p1"
                            src="/media/image-post1.webp"
                            alt="Partner 1"
                            width={36}
                            height={36}
                            className="rounded-full border-2 border-white"
                          />,
                          <Image
                            key="p2"
                            src="/media/image-post2.webp"
                            alt="Partner 2"
                            width={36}
                            height={36}
                            className="rounded-full border-2 border-white"
                          />,
                          <Image
                            key="p3"
                            src="/media/image-post3.webp"
                            alt="Partner 3"
                            width={36}
                            height={36}
                            className="rounded-full border-2 border-white"
                          />,
                        ]}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">{partners?.value || '200k+'}</div>
                    <div className="text-muted-foreground">
                      {partners?.label || 'Satisfied Partners'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={`relative ${imagePosition === 'left' ? 'order-1' : 'order-2'}`}>
            {media && typeof media === 'object' ? (
              <div className="relative">
                <Media
                  className="relative"
                  imgClassName="object-contain"
                  priority
                  resource={media}
                />
                {decorItems.map((item, idx) => {
                  const url = getMediaUrl(item?.image?.url || '')
                  if (!url) return null
                  const style: React.CSSProperties = {
                    left: `${item.xPercent}%`,
                    top: `${item.yPercent}%`,
                    width: item.sizePx,
                    height: item.sizePx,
                    transform: `translate(-50%,-50%) rotate(${item.rotateDeg ?? 0}deg)`,
                    transitionDelay: item.delayMs ? `${item.delayMs}ms` : undefined,
                  }
                  return (
                    <Image
                      key={idx}
                      src={url}
                      alt={item.image?.alt || `Decor ${idx + 1}`}
                      width={item.sizePx}
                      height={item.sizePx}
                      className={`absolute ${getAnimClass(item.animationType, item.speed)} drop-shadow-md`}
                      style={style}
                    />
                  )
                })}
              </div>
            ) : (
              <div className="relative">
                <Image
                  src="/media/image-hero1-1.webp"
                  alt="Cleaning hero"
                  width={640}
                  height={640}
                  className="w-full h-auto object-contain"
                  priority
                />
                {decorItems.map((item, idx) => {
                  const url = getMediaUrl(item?.image?.url || '')
                  if (!url) return null
                  const style: React.CSSProperties = {
                    left: `${item.xPercent}%`,
                    top: `${item.yPercent}%`,
                    width: item.sizePx,
                    height: item.sizePx,
                    transform: `translate(-50%,-50%) rotate(${item.rotateDeg ?? 0}deg)`,
                    transitionDelay: item.delayMs ? `${item.delayMs}ms` : undefined,
                  }
                  return (
                    <Image
                      key={idx}
                      src={url}
                      alt={item.image?.alt || `Decor ${idx + 1}`}
                      width={item.sizePx}
                      height={item.sizePx}
                      className={`absolute ${getAnimClass(item.animationType, item.speed)} drop-shadow-md`}
                      style={style}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
        {showStats && <StatsSlider title={bandTitle} stats={stats} />}
      </div>
      <div
        className="absolute left-1/2 bottom-8 -translate-x-1/2"
        style={{ opacity: curveOpacity }}
      >
        <svg width="280" height="80" viewBox="0 0 280 80">
          <path
            d="M0,40 C60,0 120,80 180,40 C220,10 260,10 280,40"
            stroke="#3b82f6"
            strokeWidth="2"
            fill="none"
            strokeDasharray="6 6"
          />
        </svg>
      </div>
    </section>
  )
}
