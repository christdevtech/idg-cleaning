import React from 'react'
import RichText from '@/components/RichText'
import type { ContactInfoBlock as ContactInfoBlockProps } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, MapPin, Globe, Sparkles } from 'lucide-react'

export const ContactInfoBlock: React.FC<ContactInfoBlockProps> = ({
  title,
  introduction,
  phone,
  email,
  address,
  serviceAreas,
}) => {
  return (
    <div className="container my-16 relative z-10">
      {/* Decorative background blur element could go here if needed, but keeping it clean for now */}

      <div className="flex flex-col gap-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Get in Touch</span>
          </div>

          {title && (
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {title}
            </h2>
          )}

          {introduction && (
            <div className="text-lg text-muted-foreground leading-relaxed">
              <RichText data={introduction} enableGutter={false} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Details Card */}
          <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl h-full overflow-hidden group hover:shadow-xl transition-all duration-300 ring-1 ring-border/50">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-8 relative space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Phone className="w-5 h-5" />
                  </span>
                  Contact Us
                </h3>
                <p className="text-muted-foreground">Reach out to us directly.</p>
              </div>

              <div className="space-y-6">
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300 group/item"
                  >
                    <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                        Call Us
                      </p>
                      <span className="font-semibold text-md">{phone}</span>
                    </div>
                  </a>
                )}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300 group/item"
                  >
                    <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                        Email Us
                      </p>
                      <span className="font-semibold text-md no-wrap">{email}</span>
                    </div>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Address Card */}
          {address && (
            <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-xl h-full overflow-hidden group hover:shadow-xl transition-all duration-300 ring-1 ring-border/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 relative h-full flex flex-col">
                <div className="space-y-2 mb-8">
                  <h3 className="text-2xl font-semibold flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                      <MapPin className="w-5 h-5" />
                    </span>
                    Our Office
                  </h3>
                  <p className="text-muted-foreground">Visit us at our headquarters.</p>
                </div>

                <div className="flex-grow p-6 rounded-2xl bg-gradient-to-br from-background/80 to-background/40 border border-border/50 shadow-inner">
                  <div className="prose dark:prose-invert prose-lg max-w-none">
                    <RichText data={address} enableGutter={false} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Service Areas Card */}
          {serviceAreas && (
            <Card className="border-0 shadow-lg bg-primary/5 backdrop-blur-xl h-full overflow-hidden group hover:shadow-xl transition-all duration-300 ring-1 ring-border/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-100" />
              <CardContent className="p-8 relative h-full flex flex-col">
                <div className="space-y-2 mb-8">
                  <h3 className="text-2xl font-semibold flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-background/80 text-primary shadow-sm">
                      <Globe className="w-5 h-5" />
                    </span>
                    Service Areas
                  </h3>
                  <p className="text-muted-foreground">Areas we proudly serve.</p>
                </div>

                <div className="flex-grow p-6 rounded-2xl bg-background/40 border border-primary/10 shadow-sm backdrop-blur-md">
                  <div className="prose dark:prose-invert prose-lg max-w-none prose-li:marker:text-primary">
                    <RichText data={serviceAreas} enableGutter={false} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
