
// Dummy data for now
const popularServices = [
  {
    id: 1,
    title: "3 Area Package",
    subtitle: "Anti-Wrinkle Injections",
    price: 189,
    label: "New Client Offer!",
    image: "/popular1.jpg",
    button: "Book now",
    tag: null,
  },
  {
    id: 2,
    title: "Full Body (excluding face)",
    subtitle: "Laser Hair Removal",
    price: 129.95,
    label: null,
    image: "/popular2.jpg",
    button: "Buy now",
    tag: "Laser Hair Removal",
  },
  {
    id: 3,
    title: "For Radiant Skin",
    subtitle: "Polynucleotides",
    price: 195,
    label: "Popular!",
    image: "/popular3.jpg",
    button: "Buy now",
    tag: null,
  },
]

interface ServiceType {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  label: string | null;
  image: string;
  button: string;
  tag: string | null;
}

function ServiceCard({ service }: { service: ServiceType }) {
  return (
    <div className="relative w-full max-w-[340px] h-[380px] sm:h-[420px] md:h-[440px] rounded-lg overflow-hidden shadow-lg bg-background flex flex-col justify-end mx-auto" style={{ backgroundImage: `url(${service.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/30 z-0" />
      <div className="relative z-10 p-5 md:p-6 flex flex-col h-full justify-end">
        {service.label && <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">{service.label}</span>}
        {service.tag && <span className="absolute top-4 left-4 bg-white/80 text-xs font-semibold text-black px-3 py-1 rounded border border-black/10">{service.tag}</span>}
        <div className="mt-auto">
          <div className="text-base sm:text-lg text-white/90 font-medium mb-1">{service.subtitle}</div>
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-2">{service.title}</div>
          <div className="text-xs text-white/80 mb-1">FROM</div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-4">£{service.price}<span className="text-lg sm:text-xl align-top">{service.price % 1 !== 0 ? service.price.toFixed(2).split('.')[1] : '.00'}</span></div>
          <button className="bg-[#333333] text-white font-semibold px-6 py-2 rounded-full text-sm shadow hover:bg-[#42E0CF] transition-all duration-300 w-full sm:w-auto">{service.button}</button>
        </div>
      </div>
    </div>
  )
}

export function PopularServices() {
  return (
    <section className="w-full py-6 md:py-8 overflow-hidden">
      <div className="container px-4">
        <div className="flex items-center justify-between w-full mb-3">
          <div className="uppercase text-xs sm:text-sm text-[#42E0CF] font-semibold tracking-wider">Sale now on</div>
          <a href="#" className="text-[#42E0CF] font-semibold text-xs sm:text-sm hover:underline">View all</a>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-foreground leading-tight text-center mb-6 md:mb-8 w-full">
          Most Popular Offers
        </h2>
        
        {/* Grid layout for all screen sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {popularServices.map((service) => (
            <div key={service.id} className="w-full">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
