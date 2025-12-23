import { getFeaturedReviews } from "@/lib/supabase/queries"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export async function ReviewsSection() {
  const reviews = await getFeaturedReviews()

  if (reviews.length === 0) {
    return null
  }

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
          {reviews.map((review) => (
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

                {review.comment && (
                  <p className="text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                )}

                <p className="text-xs text-muted-foreground">
                  Service: {review.service.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

