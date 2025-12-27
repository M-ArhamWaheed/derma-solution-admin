import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { ArrowLeft } from "lucide-react";

export default function MyBookingsPage() {
  return (
    <>
      <Navbar user={null} />
      
      <main className="container mx-auto py-8">
        {/* Back to Account Section */}
        <section className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center gap-2 mb-2">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            <Link href="/book-consultation" className="text-muted-foreground text-base font-normal cursor-pointer">Go back</Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">My Bookings</h1>
        </section>
        {/* Tab Switcher Section */}
        <section className="max-w-3xl mx-auto mb-8">
          <div className="flex w-full rounded-full overflow-hidden bg-muted p-2">
            <button className="flex-1 py-4 text-lg font-medium bg-background shadow transition rounded-full">Upcoming</button>
            <button className="flex-1 py-4 text-lg font-medium text-muted-foreground transition">Previous</button>
          </div>
        </section>
        {/* Upcoming Appointment Section */}
        <section className="bg-muted rounded-xl shadow p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between max-w-3xl mx-auto">
          <div className="flex-1 min-w-0">
            <div className="mb-2">
              <span className="inline-block bg-[#7B61FF] text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                Upcoming
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-1">Monday, 29th Dec 2025</h2>
            <div className="text-muted-foreground text-sm mb-2">BATH</div>
            <div className="text-lg font-medium mb-1">
              Anti-Wrinkle Treatment Free Consultation
            </div>
            <div className="text-muted-foreground text-sm mb-4">Susanne P.</div>
          </div>
          <div className="flex flex-col items-end gap-4 min-w-[180px] mt-4 md:mt-0">
            <div className="text-base font-semibold text-right">
              2:30 pm - 3:00 pm
            </div>
            <div className="flex gap-2 bottom-4">
              <Button
                variant="ghost"
                className="border border-input bg-background hover:bg-muted"
              >
                Cancel
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCcw className="w-4 h-4 mr-1" /> Reschedule
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
