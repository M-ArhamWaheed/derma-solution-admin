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
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">
              Why Choose Us
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Trusted Partner in Aesthetic Care
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We're committed to providing exceptional aesthetic treatments in a safe, 
              comfortable, and professional environment. Your satisfaction and wellbeing 
              are our top priorities.
            </p>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground mb-1">{benefit.description}</p>
                    <p className="text-sm font-semibold text-primary">{benefit.stat}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="font-semibold">
                Book Consultation
              </Button>
              <Button size="lg" variant="outline" className="font-semibold">
                View Our Work
              </Button>
            </div>
          </div>

          {/* Right Side - Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-card p-8 rounded-2xl shadow-lg border">
              <div className="text-5xl font-bold text-primary mb-2">10K+</div>
              <p className="text-muted-foreground">Happy Clients</p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-lg border mt-8">
              <div className="text-5xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Treatments Offered</p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-lg border">
              <div className="text-5xl font-bold text-primary mb-2">15+</div>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-lg border mt-8">
              <div className="text-5xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

