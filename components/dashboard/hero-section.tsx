export function HeroSection() {
  return (
    <section className="relative py-8 md:py-12 lg:py-20 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-5">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground leading-tight px-2">
            Treatments at{" "}
            <span className="text-primary block sm:inline">Derma Solution</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            With our high level of professionalism, we offer treatments for all
            your wishes. Our competent therapists have the industry&apos;s longest
            experience, and we continuously improve our skills.
          </p>
        </div>
      </div>
    </section>
  )
}
