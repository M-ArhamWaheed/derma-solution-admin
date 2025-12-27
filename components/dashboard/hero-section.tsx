export function HeroSection() {
  return (
    <section className="relative py-8 md:py-10 lg:py-10 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-foreground leading-tight px-2">
            Treatments at{" "}
            <span className="text-primary block sm:inline">Derma Solution</span>
          </h1>
        </div>
      </div>
    </section>
  )
}
