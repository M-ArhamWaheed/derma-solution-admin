import { getPopularServices } from "@/lib/supabase/queries"
import { ServiceCard } from "@/components/dashboard/service-card"

export async function PopularServices() {
  const services = await getPopularServices()

  if (services.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-card">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              SALE NOW ON
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              Most Popular Offers
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} featured />
          ))}
        </div>
      </div>
    </section>
  )
}

