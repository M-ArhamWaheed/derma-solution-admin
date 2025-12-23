import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, ArrowRight } from "lucide-react"
import Image from "next/image"

const featuredServices = [
  {
    id: 1,
    title: "Skin Rejuvenation",
    description: "Advanced laser treatment for youthful, radiant skin",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&h=400&fit=crop",
    price: 150,
    duration: "60 min",
    rating: 4.9,
    popular: true,
  },
  {
    id: 2,
    title: "Anti-Aging Treatment",
    description: "Comprehensive solution for fine lines and wrinkles",
    image: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=500&h=400&fit=crop",
    price: 200,
    duration: "90 min",
    rating: 4.8,
    popular: true,
  },
  {
    id: 3,
    title: "Acne Treatment",
    description: "Effective solution for clear, healthy skin",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&h=400&fit=crop",
    price: 120,
    duration: "45 min",
    rating: 4.7,
    popular: false,
  },
  {
    id: 4,
    title: "Hydrafacial",
    description: "Deep cleansing and hydration for glowing skin",
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=500&h=400&fit=crop",
    price: 180,
    duration: "60 min",
    rating: 4.9,
    popular: true,
  },
  {
    id: 5,
    title: "Chemical Peel",
    description: "Reveal smoother, brighter skin with professional peels",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=400&fit=crop",
    price: 130,
    duration: "45 min",
    rating: 4.6,
    popular: false,
  },
  {
    id: 6,
    title: "Microneedling",
    description: "Collagen induction therapy for improved skin texture",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&h=400&fit=crop",
    price: 220,
    duration: "75 min",
    rating: 4.8,
    popular: true,
  },
]

export function ServicesGridSection() {
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
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-xl border bg-card hover:shadow-2xl transition-all duration-300"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-3 md:top-4 right-3 md:right-4 z-10">
                  <Badge className="bg-primary text-primary-foreground text-xs">
                    Popular
                  </Badge>
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 md:h-4 md:w-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                    <span>{service.rating}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-3 md:pt-4 border-t">
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">Starting from</p>
                    <p className="text-xl md:text-2xl font-bold text-primary">
                      ${service.price}
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

