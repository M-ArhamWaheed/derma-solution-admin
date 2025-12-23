import { getCategories, getServicesByCategory } from "@/lib/supabase/queries"
import { ServiceCard } from "@/components/dashboard/service-card"

export async function CategoriesSection() {
  const categories = await getCategories()

  return (
    <section className="py-16">
      <div className="container space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading">
            Treatments at Derma Solution
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Browse our comprehensive range of professional aesthetic treatments
          </p>
        </div>

        {categories.map(async (category) => {
          const services = await getServicesByCategory(category.id)

          if (services.length === 0) return null

          return (
            <div
              key={category.id}
              id={`category-${category.id}`}
              className="space-y-6 scroll-mt-20"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold font-heading mb-2">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-muted-foreground">{category.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

