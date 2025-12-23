import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const dummyReviews = [
  {
    id: 1,
    customer: {
      first_name: "Emily",
      last_name: "Smith",
      avatar_url: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    rating: 5,
    text: "Absolutely amazing experience! The staff was so friendly and professional. My skin has never looked better.",
  },
  {
    id: 2,
    customer: {
      first_name: "John",
      last_name: "Doe",
      avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    rating: 4,
    text: "Great service and very knowledgeable therapists. Highly recommend for anyone looking for quality treatments.",
  },
  {
    id: 3,
    customer: {
      first_name: "Sophia",
      last_name: "Lee",
      avatar_url: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    rating: 5,
    text: "I felt so comfortable and cared for. The results were fantastic and I will definitely be coming back!",
  },
]

export function ReviewsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading">
            Customer Reviews
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our clients say about us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.customer.avatar_url} />
                    <AvatarFallback>
                      {review.customer.first_name[0]}
                      {review.customer.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">
                      {review.customer.first_name} {review.customer.last_name}
                    </p>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-primary text-primary"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {review.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

