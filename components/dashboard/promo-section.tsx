import { Button } from "@/components/ui/button"

export function PromoSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading">
                Our Clinic & Vision
              </h2>
              <p className="text-lg text-muted-foreground">
                Derma Solution is a boutique aesthetic clinic offering well-known
                cosmetic treatments using the safest and newest medical grade
                technology and products available on the market.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                It was established to provide a medically sound and comprehensive
                non-invasive aesthetic care in the heart of central Copenhagen
                within a comfortable and private environment.
              </p>
              <p className="text-muted-foreground">
                We are determined to use the most advanced state of the art
                equipment, as well as the latest in medical technology, to provide
                a comprehensive range of customised non-invasive therapeutic
                treatments for all of our patients.
              </p>
              <p className="text-muted-foreground">
                Under the expert and safe supervision of our qualified team
                including the experience of Plastic Surgeons, nurses and
                practitioners we aim to provide and deliver solutions to unlock
                our patients&apos; true beauty inside out.
              </p>
            </div>

            <Button size="lg" className="font-semibold">
              BOOK AN APPOINTMENT NOW
            </Button>
          </div>

          {/* Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground">Clinic Image</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

