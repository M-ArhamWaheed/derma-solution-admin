import { notFound } from "next/navigation";
import { services } from "@/components/dashboard/services-gallery";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import ServiceDateSelector from "@/components/services/ServiceDateSelector";


export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  // Await params as required by Next.js dynamic routes
  const { slug } = await Promise.resolve(params);
  const service = services.find(
    (s) => s.title.toLowerCase().replace(/ /g, "-") === slug
  );
  if (!service) return notFound();
  return (
    <>
      <Navbar user={null} />
      <main className="container mx-auto py-8">
        {/* Book Consultation Heading Section */}
        <section className="max-w-3xl mx-auto mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Book consultation</h1>
        </section>
        {/* Service Card Section */}
        <section className="max-w-3xl mx-auto mb-8">
          <div className="bg-muted rounded-xl shadow p-6">
            <div className="text-2xl font-semibold mb-6">Service</div>
            <div className="flex items-center gap-4">
              <Image
                src={service.image}
                alt={service.title}
                width={72}
                height={72}
                className="rounded-lg object-cover"
              />
              <div>
                <div className="text-lg font-medium">
                  {service.title} {service.subtitle}
                </div>
                <div className="text-muted-foreground text-base">20 min duration</div>
              </div>
            </div>
          </div>
        </section>
        {/* Package Selection Section */}
        <section className="max-w-2xl mx-auto mb-8">
          <div className="bg-muted rounded-xl shadow p-4">
            <div className="flex items-center justify-between ">
              <div className="text-xl font-semibold">Select package</div>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition">
                <span className="text-2xl font-bold">×</span>
              </button>
            </div>
            <div className="text-muted-foreground text-base mb-4">Full Body (excluding face)</div>
            <div className="flex flex-col gap-2">
                
              <div className="border rounded-xl p-4 flex items-center justify-between hover:shadow-md hover:bg-white hover:text-black transition cursor-pointer">
                <div>
                  <div className="text-lg font-semibold">1 session</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">£249.95</div>
                  <div className="text-muted-foreground text-xs">per session</div>
                </div>
              </div>

              <div className="border rounded-xl p-4 flex items-center justify-between hover:shadow-md hover:bg-white hover:text-black transition cursor-pointer">
                <div>
                  <div className="text-lg font-semibold">3 sessions</div>
                  <div className="text-red-500 text-xs font-semibold">SAVE 30%</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">£174.95</div>
                  <div className="text-muted-foreground text-xs">per session</div>
                </div>
              </div>

              <div className="border rounded-xl p-4 flex items-center justify-between hover:shadow-md hover:bg-white hover:text-black transition cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="text-lg font-semibold">6 sessions</div>
                  <span className="bg-[#7B61FF] text-white text-xs font-semibold px-2 py-1 rounded-full">Popular</span>
                  <div className="text-red-500 text-xs font-semibold ml-2">SAVE 44%</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">£139.95</div>
                  <div className="text-muted-foreground text-xs">per session</div>
                </div>
              </div>

              <div className="border rounded-xl p-4 flex items-center justify-between hover:shadow-md hover:bg-white hover:text-black transition cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="text-lg font-semibold">10 sessions</div>
                  <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Best value</span>
                  <div className="text-red-500 text-xs font-semibold ml-2">SAVE 52%</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">£119.95</div>
                  <div className="text-muted-foreground text-xs">per session</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Date Selection Section */}
        <ServiceDateSelector />
        {/* Book Treatment Button Section */}
        <div className="flex justify-center items-center my-8">
          <Button className="bg-[#333] text-white text-lg font-semibold rounded-full px-10 py-4 shadow-md hover:bg-[#222] transition-all" style={{ minWidth: 320 }}>
            Book Treatment
          </Button>
        </div>
      </main>
    </>
  );
}
