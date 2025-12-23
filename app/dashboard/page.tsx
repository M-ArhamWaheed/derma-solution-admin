import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/dashboard/hero-section"
import { CategoryButtons } from "@/components/dashboard/category-buttons"
import { PopularServices } from "@/components/dashboard/popular-services"
import { CategoriesSection } from "@/components/dashboard/categories-section"
import { PromoSection } from "@/components/dashboard/promo-section"
import { ReviewsSection } from "@/components/dashboard/reviews-section"
import { Skeleton } from "@/components/ui/skeleton"
import { getCategories } from "@/lib/supabase/queries"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/signin")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle()

  if (profile?.role === "admin") {
    redirect("/admin")
  }

  const categories = await getCategories()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        user={profile}
        action={
          <Button size="lg" className="font-semibold">
            Book An Appointment
          </Button>
        }
      />

      <main className="flex-1">
        <HeroSection />

        <Suspense
          fallback={
            <div className="container py-8">
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-10 w-40" />
                ))}
              </div>
            </div>
          }
        >
          <CategoryButtons categories={categories} />
        </Suspense>

        <Suspense
          fallback={
            <div className="bg-background py-16">
              <div className="container">
                <Skeleton className="h-10 w-64 mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-96" />
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <PopularServices />
        </Suspense>

        <Suspense
          fallback={
            <div className="container py-16">
              <Skeleton className="h-96" />
            </div>
          }
        >
          <CategoriesSection />
        </Suspense>

        <PromoSection />

        <Suspense
          fallback={
            <div className="bg-muted py-16">
              <div className="container">
                <Skeleton className="h-10 w-64 mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-48" />
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <ReviewsSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

