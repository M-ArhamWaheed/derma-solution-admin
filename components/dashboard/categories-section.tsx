import { getCategories } from "@/lib/supabase/queries"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

// Enhanced dummy services per category
const categoryServices: Record<string, any[]> = {
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

function ServiceCard({ service, index }: { service: any, index: number }) {
  const gradients = [
    "from-purple-500/10 to-pink-500/10",
    "from-blue-500/10 to-cyan-500/10",
    "from-green-500/10 to-emerald-500/10",
    "from-orange-500/10 to-amber-500/10",
  ]
  
  return (
    <div className="group relative bg-card rounded-xl border overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-50`} />
      
      {/* Content */}
      <div className="relative p-6">
        {/* Popular Badge */}
        {service.popular && (
          <Badge className="absolute top-6 right-6 bg-primary/20 text-primary border-primary/30">
            <Sparkles className="w-3 h-3 mr-1" />
            Popular
          </Badge>
        )}

        {/* Service Info */}
        <div className="mb-4">
          <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {service.name}
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {service.description}
          </p>
        </div>

        {/* Duration */}
        {service.duration && (
          <p className="text-xs text-muted-foreground mb-4">
            Duration: {service.duration}
          </p>
        )}

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="text-2xl font-bold text-primary">£{service.base_price}</p>
          </div>
          <Button size="sm" className="group-hover:bg-primary transition-colors">
            Book Now
            <ArrowRight className="w-4 h-4 ml-2" />
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
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
      <Sparkles className="w-8 h-8 text-white" />
    </div>
  )
}

export async function CategoriesSection() {
  const categories = await getCategories()
  
  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container space-y-20">
        {/* Header */}
        <div className="text-center space-y-4">
          <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">
            Our Treatments
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            Treatments at <span className="text-primary">Derma Solution</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
          <div className="space-y-16">
            {categories.map((category, catIndex) => (
              <div key={category.id} className="scroll-mt-20">
                {/* Category Header */}
                <div className="flex items-center gap-6 mb-8">
                  <CategoryIcon name={category.name} />
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-bold font-heading mb-2">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-muted-foreground">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" className="hidden md:flex items-center gap-2">
                    View all
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Category Image (if available) */}
                {category.image_url && (
                  <div className="mb-8 rounded-2xl overflow-hidden h-64 relative">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryServices.default.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={catIndex * 3 + index} />
                  ))}
                </div>

                {/* View All Button (Mobile) */}
                <div className="mt-6 md:hidden text-center">
                  <Button variant="outline" className="w-full">
                    View all {category.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center pt-8 border-t">
          <h3 className="text-2xl font-bold mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-muted-foreground mb-6">
            Contact us for a personalized consultation
          </p>
          <Button size="lg" className="font-semibold">
            Book Free Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}
