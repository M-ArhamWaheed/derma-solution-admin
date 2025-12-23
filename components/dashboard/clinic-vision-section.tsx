import Image from "next/image"
import { Sparkles, Heart, Shield, Award } from "lucide-react"

export function ClinicVisionSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">
            Our Vision
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Excellence in Aesthetic Care
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            At Derma Solution, we combine cutting-edge technology with personalized care 
            to help you achieve your aesthetic goals safely and effectively.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Clinic Interior */}
          <div className="relative h-80 rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
            <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
              <div className="text-center">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary" />
                <p className="text-lg font-semibold">Modern Facilities</p>
              </div>
            </div>
          </div>

          {/* Treatment Room */}
          <div className="relative h-80 rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
            <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
              <div className="text-center">
                <Heart className="w-16 h-16 mx-auto mb-4 text-primary" />
                <p className="text-lg font-semibold">Personalized Care</p>
              </div>
            </div>
          </div>

          {/* Equipment */}
          <div className="relative h-80 rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20" />
            <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
              <div className="text-center">
                <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
                <p className="text-lg font-semibold">Advanced Technology</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Experienced Team</h3>
            <p className="text-muted-foreground">
              Certified professionals with years of expertise in aesthetic treatments
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Safety First</h3>
            <p className="text-muted-foreground">
              We prioritize your safety with the highest standards of care and hygiene
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Personalized Plans</h3>
            <p className="text-muted-foreground">
              Customized treatment plans tailored to your unique needs and goals
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Premium Results</h3>
            <p className="text-muted-foreground">
              Natural-looking results that enhance your confidence and beauty
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

