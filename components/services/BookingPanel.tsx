"use client"
import React, { useState, useEffect } from "react"
import ServiceDateSelector from "@/components/services/ServiceDateSelector"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function BookingPanel({ service }: { service: any }) {
  const router = useRouter()
  const defaultPackages = ["1 session", "3 sessions", "6 sessions", "10 sessions"]
  const servicePackages: string[] = Array.isArray(service?.session_options)
    ? service.session_options
    : service?.session_options
    ? JSON.parse(String(service.session_options))
    : defaultPackages
  const [selectedPackage, setSelectedPackage] = useState<string>(servicePackages[0] || "1 session")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // receive selection updates from ServiceDateSelector
  useEffect(() => {
    // ensure selectedPackage is valid when servicePackages change
    if (!servicePackages.includes(selectedPackage)) {
      const t = setTimeout(() => setSelectedPackage(servicePackages[0] || "1 session"), 0)
      return () => clearTimeout(t)
    }
    return
  }, [servicePackages, selectedPackage])

  // restore selections from pendingBooking if user is returning from confirm page
  useEffect(() => {
    try {
      const raw = localStorage.getItem('pendingBooking')
      if (!raw) return
      const pending = JSON.parse(raw)
      if (pending?.service_id === service?.id) {
        const timers: number[] = []
        if (pending.package && servicePackages.includes(pending.package)) {
          timers.push(window.setTimeout(() => setSelectedPackage(pending.package), 0))
        }
        if (pending.date) timers.push(window.setTimeout(() => setSelectedDate(pending.date), 0))
        if (pending.time) timers.push(window.setTimeout(() => setSelectedTime(pending.time), 0))
        return () => timers.forEach(t => clearTimeout(t))
      }
    } catch {
      // ignore parse errors
    }
    return
  }, [service?.id, servicePackages])

  const basePrice = Number(service?.base_price ?? 0)
  const getSessionCount = (label: string) => {
    const m = String(label).match(/(\d+)/)
    return m ? parseInt(m[0], 10) : 1
  }
  const getDiscount = (label: string) => {
    const n = getSessionCount(label)
    switch (n) {
      case 3:
        return 0.25
      case 6:
        return 0.35
      case 10:
        return 0.45
      default:
        return 0
    }
  }
  const formatPrice = (v: number) => `£${v.toFixed(2)}`

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
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-semibold">Select package</div>
          </div>
          {/* <div className="text-muted-foreground text-base mb-4">Full Body (excluding face)</div> */}
          <div className="flex flex-col gap-4">
            {servicePackages.map((p) => {
              const count = getSessionCount(p)
              const discount = getDiscount(p)
              const perSession = basePrice * (1 - discount)
              const total = perSession * count
              const totalSave = basePrice * count - total
              return (
                <div
                  key={p}
                  onClick={() => setSelectedPackage(p)}
                  className={`border rounded-xl px-4 py-2 flex items-center justify-between hover:shadow-md hover:bg-white hover:text-black transition cursor-pointer ${selectedPackage === p ? "ring-2 ring-offset-2 ring-slate-400" : ""}`}
                >
                  <div>
                    <div className="text-lg font-semibold">{p}</div>
                    <div className="text-sm text-muted-foreground">{count} × {formatPrice(perSession)} per session</div>
                    {discount > 0 && (
                      <div className="text-xs text-green-700 mt-1">Save {Math.round(discount * 100)}% — you save {formatPrice(totalSave)}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{formatPrice(perSession)}</div>
                    <div className="text-muted-foreground text-xs">per session</div>
                  </div>
                </div>
              )
            })}
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
