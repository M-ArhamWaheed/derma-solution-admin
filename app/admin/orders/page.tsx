import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getOrders } from "@/lib/supabase/queries"
import { OrdersTable } from "@/components/admin/orders-table"

async function OrdersList() {
  const orders = await getOrders()
  return <OrdersTable orders={orders} />
}

export default function OrdersPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading mb-2">Orders</h1>
        <p className="text-muted-foreground">
          Manage customer orders and bookings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            }
          >
            <OrdersList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

