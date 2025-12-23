import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus } from "lucide-react"
import { getCategories } from "@/lib/supabase/queries"
import { CategoriesTable } from "@/components/admin/categories-table"

async function CategoriesList() {
  const categories = await getCategories()
  return <CategoriesTable categories={categories} />
}

export default function CategoriesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">Categories</h1>
          <p className="text-muted-foreground">
            Manage service categories
          </p>
        </div>
        <Button size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            }
          >
            <CategoriesList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

