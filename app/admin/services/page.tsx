
import { getCategories } from "@/lib/supabase/queries"
import ClientServicesSection from "./_client-services-section"

export default async function ServicesPage() {
  const categories = await getCategories()
  return (
    <div className="min-h-screen w-full flex flex-col gap-10 px-12 py-10 bg-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-heading mb-2">Services</h1>
        <p className="text-muted-foreground text-lg">Manage your treatment services</p>
      </div>
      <ClientServicesSection categories={categories} />
    </div>
  )
}

