export function HeroSection() {
  return (
    <section className="relative py-8 md:py-20 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground leading-tight">
            Treatments at{" "}
            <span className="text-primary">Derma Solution</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            With our high level of professionalism, we offer treatments for all
            your wishes. Our competent therapists have the industry&apos;s longest
            experience, and we continuously improve our skills.
          </p>
        </div>
      </div>
    </section>
  )
}

