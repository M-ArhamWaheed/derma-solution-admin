import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { CalendarDays, RefreshCcw, Package, ShoppingBag, Settings, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function BookConsultationPage() {
  // TODO: Pass user prop if available from context or session
  return (
    <>
      <Navbar user={null} />
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
            <h2 className="text-2xl font-bold mb-1">
              Monday, 29th Dec 2025
            </h2>
            <div className="text-muted-foreground text-sm mb-2">BATH</div>
            <div className="text-lg font-medium mb-1">
              Anti-Wrinkle Treatment Free Consultation
            </div>
            <div className="text-muted-foreground text-sm mb-4">
              Susanne P.
            </div>
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
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCcw className="w-4 h-4 mr-1" /> Reschedule
              </Button>
            </div>
          </div>
        </section>
        {/* Book Consultation page content will go here */}
        <h1 className="text-2xl font-bold mb-4 hidden">Book Consultation</h1>
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
            <div className="flex items-center px-6 py-5 gap-4 hover:bg-white hover:text-black transition cursor-pointer">
              <span className="bg-muted p-2 rounded-full"><ShoppingBag className="w-6 h-6 text-primary" /></span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-lg ">My Order History</div>
                <div className="text-muted-foreground text-sm">Manage recent orders and view previous purchases</div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex items-center px-6 py-5 gap-4 hover:bg-white hover:text-black transition cursor-pointer rounded-b-xl">
              <span className="bg-muted p-2 rounded-full"><Settings className="w-6 h-6 text-primary" /></span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-lg ">Profile Settings</div>
                <div className="text-muted-foreground text-sm">Manage your account information</div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
