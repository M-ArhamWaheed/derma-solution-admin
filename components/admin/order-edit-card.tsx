"use client"

import React, { useState } from 'react'
import { parseBookingDateTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

interface Props {
  order: any
  onSaved?: (updatedOrder: any) => void
}

export default function OrderEditCard({ order, onSaved }: Props) {
  const initialDate = order?.booking_date
  const initialTime = order?.booking_time || '00:00:00'
  const [bookingDate, setBookingDate] = useState<string>(initialDate)
  const [bookingTime, setBookingTime] = useState<string>(initialTime.slice(0,5))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const service = order?.service
  const customer = order?.customer

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      const payload = {
        booking_date: bookingDate,
        booking_time: bookingTime + ':00'
      }
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok || data?.success === false) {
        setError(data?.error || 'Failed to update')
      } else {
        // call optional callback with updated order
        try {
          const updated = data?.data ?? data
          onSaved?.(updated)
        } catch (e) {
          // ignore
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Unexpected error')
    } finally {
      setSaving(false)
    }
  }

  const dt = parseBookingDateTime(order.booking_date, order.booking_time || '00:00:00')
  const dateLabel = dt.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })
  const timeLabel = dt.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="rounded-md border p-4 bg-muted flex flex-col md:flex-row gap-4">
      <div className="flex-1 min-w-0">
        <div className="mb-2">
          <span className="inline-block bg-[#7B61FF] text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">Edit Booking</span>
        </div>
        <h2 className="text-2xl font-bold mb-1">{service?.name || order.service_title}</h2>
        <div className="text-muted-foreground text-sm mb-2">{service?.category?.name || ''}</div>
        <div className="text-lg font-medium mb-1">{order.service_title}</div>
        <div className="text-muted-foreground text-sm mb-4">{customer?.first_name} {customer?.last_name}</div>
        <div className="flex flex-col gap-2 max-w-xs">
          <label className="text-sm font-medium">Date</label>
          <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} className="input" />
          <label className="text-sm font-medium">Time</label>
          <input type="time" value={bookingTime} onChange={e => setBookingTime(e.target.value)} className="input" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-4 min-w-[180px]">
        <div className="text-base font-semibold text-right">{format(dt, 'PPP')}</div>
        <div className="flex gap-2 bottom-4">
          <Button variant="ghost" className="border border-input bg-background hover:bg-muted" onClick={() => {
            // Reset to original
            setBookingDate(initialDate)
            setBookingTime(initialTime.slice(0,5))
            setError(null)
          }}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
        </div>
        {error && <div className="text-sm text-destructive">{error}</div>}
      </div>
    </div>
  )
}
