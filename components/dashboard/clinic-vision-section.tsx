import { Sparkles, Heart, Shield, Award } from "lucide-react"

export function ClinicVisionSection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-xs md:text-sm">
            Our Vision
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-4">
            Excellence in Aesthetic Care
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            At Derma Solution, we combine cutting-edge technology with personalized care 
            to help you achieve your aesthetic goals safely and effectively.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16 px-4">
          {/* Clinic Interior */}
          <div className="relative h-64 md:h-80 rounded-xl md:rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
            <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
              <div className="text-center p-4">
                <Sparkles className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-primary" />
                <p className="text-base md:text-lg font-semibold">Modern Facilities</p>
              </div>
            </div>
          </div>

          {/* Treatment Room */}
          <div className="relative h-64 md:h-80 rounded-xl md:rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
            <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
              <div className="text-center p-4">
                <Heart className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-primary" />
                <p className="text-base md:text-lg font-semibold">Personalized Care</p>
              </div>
            </div>
          </div>

          {/* Equipment */}
          <div className="relative h-64 md:h-80 rounded-xl md:rounded-2xl overflow-hidden group sm:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20" />
            <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
              <div className="text-center p-4">
                <Shield className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-primary" />
                <p className="text-base md:text-lg font-semibold">Advanced Technology</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4">
          <div className="text-center p-4">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="w-7 h-7 md:w-8 md:h-8 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Experienced Team</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Certified professionals with years of expertise in aesthetic treatments
            </p>
          </div>

          <div className="text-center p-4">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-7 h-7 md:w-8 md:h-8 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Safety First</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              We prioritize your safety with the highest standards of care and hygiene
            </p>
          </div>

          <div className="text-center p-4">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-7 h-7 md:w-8 md:h-8 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Personalized Plans</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Customized treatment plans tailored to your unique needs and goals
            </p>
          </div>

          <div className="text-center p-4">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Premium Results</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Natural-looking results that enhance your confidence and beauty
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

