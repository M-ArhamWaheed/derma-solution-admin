import { CheckCircle2, Clock, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhyChooseUsSection() {
  const benefits = [
    {
      icon: CheckCircle2,
      title: "Proven Results",
      description: "Thousands of satisfied clients with visible, long-lasting results",
      stat: "98% Satisfaction Rate"
    },
    {
      icon: Clock,
      title: "Quick & Convenient",
      description: "Minimal downtime treatments that fit into your busy schedule",
      stat: "30-60 Min Sessions"
    },
    {
      icon: TrendingUp,
      title: "Latest Technology",
      description: "State-of-the-art equipment for safe and effective treatments",
      stat: "FDA Approved"
    },
    {
      icon: Users,
      title: "Expert Practitioners",
      description: "Highly trained and certified aesthetic professionals",
      stat: "15+ Years Experience"
    }
  ]

  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-xs md:text-sm">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Your Trusted Partner in Aesthetic Care
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8">
              We're committed to providing exceptional aesthetic treatments in a safe, 
              comfortable, and professional environment. Your satisfaction and wellbeing 
              are our top priorities.
            </p>

            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-1">{benefit.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-1">{benefit.description}</p>
                    <p className="text-xs md:text-sm font-semibold text-primary">{benefit.stat}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" className="font-semibold w-full sm:w-auto">
                Book Consultation
              </Button>
              <Button size="lg" variant="outline" className="font-semibold w-full sm:w-auto">
                View Our Work
              </Button>
            </div>
          </div>

          {/* Right Side - Stats Cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8 lg:mt-0">
            <div className="bg-card p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg border">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 md:mb-2">10K+</div>
              <p className="text-xs md:text-sm lg:text-base text-muted-foreground">Happy Clients</p>
            </div>
            <div className="bg-card p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg border mt-4 md:mt-8">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 md:mb-2">50+</div>
              <p className="text-xs md:text-sm lg:text-base text-muted-foreground">Treatments Offered</p>
            </div>
            <div className="bg-card p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg border">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 md:mb-2">15+</div>
              <p className="text-xs md:text-sm lg:text-base text-muted-foreground">Years Experience</p>
            </div>
            <div className="bg-card p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg border mt-4 md:mt-8">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 md:mb-2">98%</div>
              <p className="text-xs md:text-sm lg:text-base text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

