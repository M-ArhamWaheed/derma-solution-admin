import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { CalendarDays, RefreshCcw, ShoppingBag, Settings, ChevronRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getOrdersByCustomer } from "@/lib/supabase/queries";

export default async function BookConsultationPage() {
  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()
  const user = userData?.user || null

  let upcoming: any = null
  if (user) {
    const orders = await getOrdersByCustomer(user.id)
    if (orders && orders.length) {
      const candidates = orders.filter((o: any) => o.status === 'pending' || o.status === 'confirmed')
      candidates.sort((a: any, b: any) => {
        const ad = new Date(`${a.booking_date}T${a.booking_time || '00:00:00'}`)
        const bd = new Date(`${b.booking_date}T${b.booking_time || '00:00:00'}`)
        return ad.getTime() - bd.getTime()
      })
      upcoming = candidates[0]
    }
  }

  function formatDate(dateStr: string) {
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })
    } catch {
      return dateStr
    }
  }

  return (
    <>
      <Navbar user={user} />
      <main className="container mx-auto py-8">
        {/* Account Greeting Section */}
        <section className="max-w-3xl mx-auto mb-10">
          <div className="mb-2 text-muted-foreground text-base font-normal">Good evening</div>
          <h1 className="text-4xl font-bold tracking-tight">My Account</h1>
        </section>
        {/* Upcoming Appointment Section */}
        <section className="bg-muted rounded-xl shadow p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between max-w-3xl mx-auto">
          <div className="flex-1 min-w-0">
            <div className="mb-2">
              <span className="inline-block bg-[#7B61FF] text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                Upcoming
              </span>
            </div>
            {upcoming ? (
              <>
                <h2 className="text-2xl font-bold mb-1">{formatDate(upcoming.booking_date)}</h2>
                <div className="text-muted-foreground text-sm mb-2">{upcoming.service?.category?.name || ''}</div>
                <div className="text-lg font-medium mb-1">{upcoming.service_title}</div>
                <div className="text-muted-foreground text-sm mb-4">{upcoming.customer?.first_name} {upcoming.customer?.last_name}</div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-1">No upcoming appointments</h2>
                <div className="text-muted-foreground text-sm mb-2">You have no upcoming bookings.</div>
              </>
            )}
          </div>
          <div className="flex flex-col items-end gap-4 min-w-[180px] mt-4 md:mt-0">
            {upcoming ? (
              <>
                <div className="text-base font-semibold text-right">{new Date(`${upcoming.booking_date}T${upcoming.booking_time}`).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}</div>
                <div className="flex gap-2 bottom-4">
                  <Button variant="ghost" className="border border-input bg-background hover:bg-muted">Cancel</Button>
                  <Button variant="outline" className="flex items-center gap-2"><RefreshCcw className="w-4 h-4 mr-1" /> Reschedule</Button>
                </div>
              </>
            ) : (
              <div className="flex gap-2 bottom-4">
                <Button variant="ghost" className="border border-input bg-background hover:bg-muted">Book now</Button>
              </div>
            )}
          </div>
        </section>
        {/* Manage Section */}
        <section className="max-w-3xl mx-auto mt-10">
          <h2 className="text-xl font-bold mb-4">Manage</h2>
          <div className="bg-muted rounded-xl shadow divide-y">
            <Link href="/my-bookings" className="flex items-center px-6 py-5 gap-4 hover:bg-white hover:text-black transition cursor-pointer">
              <span className="bg-muted p-2 rounded-full"><CalendarDays className="w-6 h-6 text-primary" /></span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-lg">My Bookings</div>
                <div className="text-muted-foreground text-sm">Manage your upcoming appointments and history</div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link href="/order-history" className="flex items-center px-6 py-5 gap-4 hover:bg-white hover:text-black transition cursor-pointer">
              <span className="bg-muted p-2 rounded-full"><ShoppingBag className="w-6 h-6 text-primary" /></span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-lg ">My Order History</div>
                <div className="text-muted-foreground text-sm">Manage recent orders and view previous purchases</div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link href="/profile-settings" className="flex items-center px-6 py-5 gap-4 hover:bg-white hover:text-black transition cursor-pointer rounded-b-xl">
              <span className="bg-muted p-2 rounded-full"><Settings className="w-6 h-6 text-primary" /></span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-lg ">Profile Settings</div>
                <div className="text-muted-foreground text-sm">Manage your account information</div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
