import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/dashboard/hero-section"
import { CategoryButtons } from "@/components/dashboard/category-buttons"
import { PopularServices } from "@/components/dashboard/popular-services"
import { ServicesGridSection } from "@/components/dashboard/services-grid-section"
import { ClinicVisionSection } from "@/components/dashboard/clinic-vision-section"
import { WhyChooseUsSection } from "@/components/dashboard/why-choose-us-section"
import { PromoSection } from "@/components/dashboard/promo-section"
import { ReviewsSection } from "@/components/dashboard/reviews-section"
import { Skeleton } from "@/components/ui/skeleton"
// import { getCategories } from "@/lib/supabase/queries"

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

  // Dummy categories for UI testing
  const now = new Date().toISOString();
  const categories = [
    { id: "1", name: "Facials", display_order: 1, is_active: true, created_at: now, updated_at: now },
    { id: "2", name: "Laser Hair Removal", display_order: 2, is_active: true, created_at: now, updated_at: now },
    { id: "3", name: "Botox", display_order: 3, is_active: true, created_at: now, updated_at: now },
    { id: "4", name: "Fillers", display_order: 4, is_active: true, created_at: now, updated_at: now },
    { id: "5", name: "Peels", display_order: 5, is_active: true, created_at: now, updated_at: now },
    { id: "6", name: "Acne Treatment", display_order: 6, is_active: true, created_at: now, updated_at: now },
    { id: "7", name: "Facials", display_order: 7, is_active: true, created_at: now, updated_at: now },
    { id: "8", name: "Laser Hair Removal", display_order: 8, is_active: true, created_at: now, updated_at: now },
    { id: "9", name: "Botox", display_order: 9, is_active: true, created_at: now, updated_at: now },
    { id: "10", name: "Fillers", display_order: 10, is_active: true, created_at: now, updated_at: now },
    { id: "11", name: "Peels", display_order: 11, is_active: true, created_at: now, updated_at: now },
    { id: "12", name: "Acne Treatment", display_order: 12, is_active: true, created_at: now, updated_at: now },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar
        user={profile}
      />

      <main className="flex-1 w-full overflow-x-hidden">
        <HeroSection />

        {/* Category Buttons directly under hero text */}
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

        {/* New: Clinic Vision Section */}
        <ClinicVisionSection />

        {/* New: Modern Services Grid */}
        <ServicesGridSection />

        {/* New: Why Choose Us Section */}
        <WhyChooseUsSection />

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

