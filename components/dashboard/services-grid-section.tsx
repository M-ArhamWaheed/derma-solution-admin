import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, TrendingUp } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Anti-Wrinkle Injections",
    description: "Reduce fine lines and wrinkles for a youthful, refreshed appearance",
    price: 189,
    duration: "30 min",
    popular: true,
    category: "Injectables",
    gradient: "from-purple-500/10 to-pink-500/10"
  },
  {
    id: 2,
    title: "Dermal Fillers",
    description: "Restore volume and enhance facial contours naturally",
    price: 245,
    duration: "45 min",
    popular: true,
    category: "Injectables",
    gradient: "from-blue-500/10 to-cyan-500/10"
  },
  {
    id: 3,
    title: "Laser Hair Removal",
    description: "Permanent hair reduction for smooth, hair-free skin",
    price: 129,
    duration: "60 min",
    popular: false,
    category: "Laser Treatments",
    gradient: "from-green-500/10 to-emerald-500/10"
  },
  {
    id: 4,
    title: "Chemical Peels",
    description: "Exfoliate and rejuvenate for brighter, smoother skin",
    price: 150,
    duration: "45 min",
    popular: false,
    category: "Skin Treatments",
    gradient: "from-orange-500/10 to-amber-500/10"
  },
  {
    id: 5,
    title: "Microneedling",
    description: "Stimulate collagen production for firmer, younger-looking skin",
    price: 195,
    duration: "60 min",
    popular: true,
    category: "Skin Treatments",
    gradient: "from-rose-500/10 to-red-500/10"
  },
  {
    id: 6,
    title: "Skin Tightening",
    description: "Non-surgical lifting and tightening for face and body",
    price: 299,
    duration: "90 min",
    popular: false,
    category: "Body Treatments",
    gradient: "from-indigo-500/10 to-purple-500/10"
  }
]

export function ServicesGridSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Transform Your Beauty Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our comprehensive range of aesthetic treatments designed to help you 
            look and feel your absolute best.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-card rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-50`} />
              
              {/* Content */}
              <div className="relative p-8">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {service.category}
                  </Badge>
                  {service.popular && (
                    <Badge className="text-xs bg-primary/20 text-primary border-primary/30">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>

                {/* Info Row */}
                <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Quick Results</span>
                  </div>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Starting from</p>
                    <p className="text-3xl font-bold text-primary">
                      £{service.price}
                    </p>
                  </div>
                  <Button className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="font-semibold">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  )
}

