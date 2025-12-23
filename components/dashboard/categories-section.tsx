import { getCategories } from "@/lib/supabase/queries"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

interface DummyService {
  id: number
  name: string
  description: string
  base_price: number
  duration: string
  popular?: boolean
  is_popular?: boolean
  thumbnail?: string
}

// Enhanced dummy services per category
const categoryServices: Record<string, DummyService[]> = {
  "default": [
    {
      id: 1,
      name: "Premium Treatment",
      description: "Experience our signature treatment for radiant, youthful skin",
      base_price: 120,
      duration: "60 min",
      popular: true,
    },
    {
      id: 2,
      name: "Advanced Therapy",
      description: "State-of-the-art technology for visible results",
      base_price: 150,
      duration: "45 min",
      popular: false,
    },
    {
      id: 3,
      name: "Rejuvenation Package",
      description: "Complete care for a refreshed appearance",
      base_price: 99,
      duration: "90 min",
      popular: true,
    },
  ]
}

function ServiceCard({ service, index }: { service: DummyService, index: number }) {
  const gradients = [
    "from-purple-500/10 to-pink-500/10",
    "from-blue-500/10 to-cyan-500/10",
    "from-green-500/10 to-emerald-500/10",
    "from-orange-500/10 to-amber-500/10",
  ]
  
  return (
    <div className="group relative bg-card rounded-lg md:rounded-xl border overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-50`} />
      
      {/* Content */}
      <div className="relative p-4 md:p-6">
        {/* Popular Badge */}
        {service.popular && (
          <Badge className="absolute top-4 right-4 md:top-6 md:right-6 bg-primary/20 text-primary border-primary/30 text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            Popular
          </Badge>
        )}

        {/* Service Info */}
        <div className="mb-3 md:mb-4">
          <h4 className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors pr-20">
            {service.name}
          </h4>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
            {service.description}
          </p>
        </div>

        {/* Duration */}
        {service.duration && (
          <p className="text-xs text-muted-foreground mb-3 md:mb-4">
            Duration: {service.duration}
          </p>
        )}

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-3 md:pt-4 border-t gap-3">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="text-xl md:text-2xl font-bold text-primary">£{service.base_price}</p>
          </div>
          <Button size="sm" className="group-hover:bg-primary transition-colors shrink-0 text-xs md:text-sm">
            Book Now
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function CategoryIcon({ name }: { name: string }) {
  // Generate a consistent gradient based on category name
  const colors = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-amber-500",
    "from-rose-500 to-red-500",
    "from-indigo-500 to-purple-500",
  ]
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const gradient = colors[index % colors.length]
  
  return (
    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shrink-0`}>
      <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
    </div>
  )
}

export async function CategoriesSection() {
  const categories = await getCategories()
  
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container px-4 space-y-12 md:space-y-20">
        {/* Header */}
        <div className="text-center space-y-3 md:space-y-4">
          <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-xs md:text-sm">
            Our Treatments
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading px-4">
            Treatments at <span className="text-primary">Derma Solution</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Browse our comprehensive range of professional aesthetic treatments, 
            designed to enhance your natural beauty and boost your confidence.
          </p>
        </div>

        {/* Categories with Services */}
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No categories available yet.</p>
          </div>
        ) : (
          <div className="space-y-12 md:space-y-16">
            {categories.map((category, catIndex) => (
              <div key={category.id} className="scroll-mt-20">
                {/* Category Header */}
                <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                  <CategoryIcon name={category.name} />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading mb-1 md:mb-2 truncate">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2 shrink-0">
                    View all
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Category Image (if available) */}
                {category.image_url && (
                  <div className="mb-6 md:mb-8 rounded-xl md:rounded-2xl overflow-hidden h-48 md:h-64 relative">
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {categoryServices.default.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={catIndex * 3 + index} />
                  ))}
                </div>

                {/* View All Button (Mobile) */}
                <div className="mt-4 md:hidden text-center">
                  <Button variant="outline" size="sm" className="w-full">
                    View all {category.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center pt-8 border-t px-4">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
            Can&apos;t find what you&apos;re looking for?
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
            Contact us for a personalized consultation
          </p>
          <Button size="lg" className="font-semibold w-full sm:w-auto">
            Book Free Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}
