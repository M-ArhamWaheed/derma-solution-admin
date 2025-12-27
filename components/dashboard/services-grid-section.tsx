import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, ArrowRight } from "lucide-react"
import Image from "next/image"

import { useEffect, useState } from "react"

interface Service {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  base_price: number;
  duration_minutes?: number;
  is_popular?: boolean;
  rating?: number;
}

export function ServicesGridSection() {
  const [services, setServices] = useState<Service[]>([]);
  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data || []));
  }, []);

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 space-y-3 md:space-y-4">
          <Badge variant="outline" className="mb-2 md:mb-3 text-xs md:text-sm">
            Our Treatments
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Treatments at Derma Solution
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Discover our comprehensive range of professional aesthetic treatments designed to enhance your natural beauty
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-xl border bg-card hover:shadow-2xl transition-all duration-300"
            >
              {/* Popular Badge */}
              {service.is_popular && (
                <div className="absolute top-3 md:top-4 right-3 md:right-4 z-10">
                  <Badge className="bg-primary text-primary-foreground text-xs">
                    Popular
                  </Badge>
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                <Image
                  src={service.thumbnail || "/services/placeholder.jpg"}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 md:h-4 md:w-4" />
                    <span>{service.duration_minutes ? `${service.duration_minutes} min` : ""}</span>
                  </div>
                  {service.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                      <span>{service.rating}</span>
                    </div>
                  )}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-3 md:pt-4 border-t">
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">Starting from</p>
                    <p className="text-xl md:text-2xl font-bold text-primary">
                      ${service.base_price}
                    </p>
                  </div>
                  <Button size="sm" className="group/btn">
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-8 md:mt-12">
          <Button size="lg" variant="outline" className="font-semibold">
            View All Treatments
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

