"use client"
import React, { useState, useEffect } from "react"
import ServiceDateSelector from "@/components/services/ServiceDateSelector"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function BookingPanel({ service }: { service: any }) {
  const router = useRouter()
  const [selectedPackage, setSelectedPackage] = useState<string>("1 session")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // receive selection updates from ServiceDateSelector
  useEffect(() => {
    // no-op here; ServiceDateSelector will control date/time via callbacks
  }, [])

  const handleBook = async () => {
    // save pending booking to localStorage and redirect to signup if not logged in
    const booking = {
      service_id: service.id,
      service_name: service.name,
      package: selectedPackage,
      date: selectedDate,
      time: selectedTime,
    }
    if (!booking.date || !booking.time) {
      alert("Please select a date and time before booking")
      return
    }

    localStorage.setItem("pendingBooking", JSON.stringify(booking))

    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData?.user) {
      router.push("/signup")
      return
    }

    // if logged in, go to confirm-booking flow
    router.push("/confirm-booking")
  }

  return (
    <div>
      <section className="max-w-2xl mx-auto mb-8">
        <div className="bg-muted rounded-xl shadow p-4">
          <div className="flex items-center justify-between ">
            <div className="text-xl font-semibold">Select package</div>
          </div>
          <div className="text-muted-foreground text-base mb-4">Full Body (excluding face)</div>
          <div className="flex flex-col gap-2">
            {["1 session", "3 sessions", "6 sessions", "10 sessions"].map((p) => (
              <div
                key={p}
                onClick={() => setSelectedPackage(p)}
                className={`border rounded-xl p-4 flex items-center justify-between hover:shadow-md hover:bg-white hover:text-black transition cursor-pointer ${selectedPackage === p ? "ring-2 ring-offset-2 ring-slate-400" : ""}`}
              >
                <div>
                  <div className="text-lg font-semibold">{p}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">£{p.startsWith("1")?"249.95":p.startsWith("3")?"174.95":p.startsWith("6")?"139.95":"119.95"}</div>
                  <div className="text-muted-foreground text-xs">per session</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceDateSelector onChange={(s: any) => {
        setSelectedDate(s.date || null)
        setSelectedTime(s.time || null)
      }} />

      <div className="flex justify-center items-center my-8">
        <Button onClick={handleBook} className="bg-[#333] text-white text-lg font-semibold rounded-full px-10 py-4 shadow-md hover:bg-[#222] transition-all" style={{ minWidth: 320 }} disabled={loading}>
          {loading ? "Booking..." : "Book Treatment"}
        </Button>
      </div>
    </div>
  )
}
