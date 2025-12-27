"use client"
import React, { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function ConfirmBookingPage() {
  const router = useRouter()
  const [booking, setBooking] = useState<any | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const [needsAuth, setNeedsAuth] = useState(false)
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const raw = localStorage.getItem('pendingBooking')
    if (raw) setBooking(JSON.parse(raw))

    const supabase = createClient()
    supabase.auth.getUser().then(res => {
      if (res.data?.user) {
        setUser(res.data.user)
      } else {
        // Instead of an immediate redirect, show a friendly call-to-action
        // so the user can navigate to sign in and return to confirm booking.
        setNeedsAuth(true)
      }
    })
  }, [])

  const handleConfirm = async () => {
    if (!booking) return
    setLoading(true)
    try {
      const payload = {
        service_id: booking.service_id,
        service_title: booking.service_name,
        package: booking.package,
        date: booking.date,
        time: booking.time,
        notes: address,
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        alert(err?.error || 'Failed to create booking')
        setLoading(false)
        return
      }
      // success toast, clear pending and redirect
      toast({ title: 'Booking confirmed', description: 'Your appointment has been created.' })
      localStorage.removeItem('pendingBooking')
      router.push('/book-consultation')
    } catch (e) {
      alert('Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  if (!booking) return <div className="p-8">No pending booking found.</div>
  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-muted rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Confirm Booking</h2>
        <div className="mb-2">Service: <strong>{booking.service_name}</strong></div>
        <div className="mb-2">Package: <strong>{booking.package}</strong></div>
        <div className="mb-2">Date: <strong>{booking.date}</strong></div>
        <div className="mb-2">Time: <strong>{booking.time}</strong></div>

        {needsAuth && !user ? (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="mb-4">Please sign in to confirm your pending booking.</p>
            <div className="flex gap-2">
              <Button onClick={() => router.push('/signin')}>Sign In</Button>
              <Button variant="ghost" onClick={() => router.push('/')}>Back to Dashboard</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-2">Name: <strong>{user?.user_metadata?.first_name || ''} {user?.user_metadata?.last_name || ''}</strong></div>
            <div className="mb-4">Email: <strong>{user?.email || ''}</strong></div>

            <div className="mb-4">
              <label className="block mb-2">Address</label>
              <Input value={address} onChange={(e:any) => setAddress(e.target.value)} placeholder="Enter delivery address" />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleConfirm} disabled={loading}>{loading ? 'Confirming...' : 'Confirm Booking'}</Button>
              <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
