
import { getCategories } from "@/lib/supabase/queries"
import ClientCategoriesSection from "./_client-categories-section"

export default async function CategoriesPage() {
  const categories = await getCategories()
  return (
    <div className="min-h-screen w-full flex flex-col gap-10 px-12 py-10 bg-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-heading mb-2">Categories</h1>
        <p className="text-muted-foreground text-lg">Manage service categories</p>
      </div>
      <ClientCategoriesSection initialCategories={categories} />
    </div>
  )
}

