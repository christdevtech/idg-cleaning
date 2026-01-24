import React from 'react'
import { CollectionShowcase } from '@/components/CollectionShowcase'
import { CollectionGrid } from '@/components/CollectionGrid'

export default function ShowcasePage() {
  const services = [
    {
      id: '1',
      title: 'Showroom Cleaning',
      description:
        'Keep your showroom pristine with our specialized cleaning services. We ensure every vehicle and surface sparkles to impress your customers.',
      badge: 'Popular',
      link: '#showroom',
    },
    {
      id: '2',
      title: 'Office Deep Cleaning',
      description:
        'Comprehensive deep cleaning for offices and customer areas. We maintain the highest standards for your workspace.',
      link: '#office',
    },
    {
      id: '3',
      title: 'Workshop Maintenance',
      description:
        'Professional cleaning services for workshops and staff areas. Keep your team working in a clean, safe environment.',
      link: '#workshop',
    },
    {
      id: '4',
      title: 'Emergency Services',
      description:
        '24/7 emergency cleaning available. We respond quickly to ensure your business stays presentable at all times.',
      badge: 'Available 24/7',
      link: '#emergency',
    },
    {
      id: '5',
      title: 'Eco-Friendly Solutions',
      description:
        'Environmentally conscious cleaning using green products. Protect your space and the planet.',
      badge: 'Eco',
      link: '#eco',
    },
    {
      id: '6',
      title: 'Custom Packages',
      description:
        'Tailored cleaning plans to meet your specific needs and budget. Flexible scheduling to suit your business.',
      link: '#custom',
    },
  ]

  return (
    <main className="min-h-screen">
      {/* First Showcase - Cleaning Services */}
      <CollectionShowcase
        title="Perfection is the ultimate goal"
        description={`
          <p class="mb-4">
            <strong class="text-primary">North Kent Cleaning Services</strong> provide a range of Car showroom cleaning services to companies of all sizes in Kent and Medway
          </p>
          <p>
            At North Kent Cleaning Services, we realise that you want to give your customers a sparkling first impression as they enter your showroom. The cleanliness your premises must be as good as your product. Spotless toilets and waiting rooms are a must and perfection is the ultimate goal. Our high standards for your sales floor, offices, customer areas, workshops and staff areas will impress customers and give staff pride in the place they work.
          </p>
        `}
        highlights={[
          'We can provide cleaning out of hours, in the mornings or evenings to suit your needs.',
          'Contact us today for a quote',
        ]}
        callToAction={{
          text: 'Get a Quote',
          link: '#contact',
        }}
        media="/api/media/file/showroom.jpg"
      />

      {/* Services Grid */}
      <CollectionGrid
        title="Our Services"
        subtitle="Comprehensive cleaning solutions tailored to your business needs"
        items={services}
        columns={3}
        className="bg-muted/30"
      />

      {/* Second Showcase - Reversed Layout */}
      <CollectionShowcase
        title="Premium Service Excellence"
        description={`
          <p class="mb-4">
            Our dedicated team ensures every corner of your facility meets the highest standards of cleanliness and presentation.
          </p>
          <p>
            With years of experience in commercial cleaning, we understand the unique needs of showrooms and customer-facing businesses. We deliver consistent, reliable service that keeps your space looking immaculate.
          </p>
        `}
        highlights={[
          'Flexible scheduling to minimize disruption',
          'Eco-friendly cleaning products',
          'Fully trained and insured staff',
          'Customized cleaning plans',
        ]}
        callToAction={{
          text: 'Learn More',
          link: '#services',
        }}
        reverse={true}
      />

      {/* Third Showcase - Another Section */}
      <CollectionShowcase
        title="Trusted by Leading Brands"
        description={`
          <p class="mb-4">
            We work with some of the most prestigious automotive showrooms and commercial spaces across Kent and Medway.
          </p>
          <p>
            Our commitment to excellence has made us the preferred choice for businesses that demand nothing but the best. From daily maintenance to deep cleaning services, we've got you covered.
          </p>
        `}
        highlights={[
          'Available 24/7 for emergency cleaning',
          'Competitive pricing with no hidden fees',
          'Quality guaranteed on every service',
        ]}
        callToAction={{
          text: 'View Our Work',
          link: '#portfolio',
        }}
        className="bg-muted/30"
      />
    </main>
  )
}

export const metadata = {
  title: 'Showcase - Collection Layout',
  description: 'Premium collection showcase layout with responsive design',
}
