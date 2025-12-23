import React from "react"

const dummyCategories = [
  { id: "1", name: "Acne & Scars (Acne Peeling)" },
  { id: "2", name: "Pigmentation" },
  { id: "3", name: "Volume & Sculpturering" },
  { id: "4", name: "Skin Boost" },
  { id: "5", name: "Facial Treatments" },
  { id: "6", name: "Wrinkle Treatments" },
  { id: "7", name: "Face & Body Sculpting" },
  { id: "8", name: "Health & Well being" },
  { id: "9", name: "Lasers" },
  { id: "10", name: "Mesoestetics" },
  { id: "11", name: "Eyes & Brows" },
  { id: "12", name: "Vascular Bursts & Redness" },
]

const dummyServices = [
  {
    id: 1,
    name: "Service 1",
    description: "Short description for Service 1.",
    base_price: 120,
    thumbnail: "/popular1.jpg",
    category: { name: "" },
  },
  {
    id: 2,
    name: "Service 2",
    description: "Short description for Service 2.",
    base_price: 150,
    thumbnail: "/popular2.jpg",
    category: { name: "" },
  },
  {
    id: 3,
    name: "Service 3",
    description: "Short description for Service 3.",
    base_price: 99,
    thumbnail: "/popular3.jpg",
    category: { name: "" },
  },
]

function ServiceCard({ service }: { service: typeof dummyServices[0] }) {
  return (
    <div className="rounded-lg overflow-hidden shadow bg-white flex flex-col">
      <img src={service.thumbnail} alt={service.name} className="h-40 w-full object-cover" />
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-bold text-lg mb-1">{service.name}</h4>
        <p className="text-sm text-muted-foreground mb-2 flex-1">{service.description}</p>
        <div className="font-semibold text-primary mb-2">£{service.base_price}</div>
        <button className="bg-primary text-white rounded px-4 py-2 mt-auto">Book now</button>
      </div>
    </div>
  )
}

export function CategoriesSection() {
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
        {dummyCategories.map((category) => (
          <div key={category.id} className="space-y-4 scroll-mt-20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl md:text-3xl font-bold font-heading">
                {category.name}
              </h3>
              <a href="#" className="text-primary font-semibold text-sm hover:underline">View all</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

