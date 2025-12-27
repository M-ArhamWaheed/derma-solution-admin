import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = await createClient()

    const { data: userData } = await supabase.auth.getUser()
    const user = userData?.user
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // fetch profile for name/email
    const { data: profile } = await supabase.from('profiles').select('first_name,last_name,email').eq('id', user.id).single()

    const serviceId = body.service_id
    const serviceTitle = body.service_title || body.service_name || ''
    const pkg = body.package || body.session_count || '1 session'
    const sessionCount = typeof pkg === 'number' ? pkg : (pkg.toString().match(/\d+/) ? parseInt(pkg.toString().match(/\d+/)![0], 10) : 1)

    // fetch service base price
    const { data: service } = await supabase.from('services').select('base_price').eq('id', serviceId).single()
    const unitPrice = body.unit_price ?? service?.base_price ?? 0

    const discountPercent = body.discount_percent ?? 0
    const totalAmount = body.total_amount ?? (Number(unitPrice) * sessionCount * (1 - Number(discountPercent) / 100))

    const bookingDateRaw = body.date || body.booking_date
    const bookingTimeRaw = body.time || body.booking_time

    function normalizeOrdinal(s: string) {
      return s.replace(/(\d+)(st|nd|rd|th)/, "$1")
    }

    function parseBookingDate(raw: any) {
      if (!raw) return null
      if (raw instanceof Date) {
        const d = raw as Date
        return d.toISOString().split('T')[0]
      }
      let str = String(raw)
      str = str.replace(/^\w{3},\s*/,'') // remove weekday like "Mon, "
      str = normalizeOrdinal(str)
      const parsed = new Date(str)
      if (isNaN(parsed.getTime())) return null
      return parsed.toISOString().split('T')[0]
    }

    function parseBookingTime(raw: any) {
      if (!raw) return null
      // Accept formats like "10:00 am", "5:15 pm", "17:00"
      const s = String(raw).trim().toLowerCase()
      const ampmMatch = s.match(/(\d{1,2}):(\d{2})\s*(am|pm)/i)
      if (ampmMatch) {
        let hh = parseInt(ampmMatch[1], 10)
        const mm = ampmMatch[2]
        const ap = ampmMatch[3]
        if (ap === 'pm' && hh !== 12) hh += 12
        if (ap === 'am' && hh === 12) hh = 0
        return `${String(hh).padStart(2,'0')}:${mm}:00`
      }
      const isoMatch = s.match(/(\d{1,2}):(\d{2})/) // 24h
      if (isoMatch) {
        return `${String(parseInt(isoMatch[1],10)).padStart(2,'0')}:${isoMatch[2]}:00`
      }
      return null
    }

    const bookingDate = parseBookingDate(bookingDateRaw)
    const bookingTime = parseBookingTime(bookingTimeRaw)

    if (!bookingDate || !bookingTime) {
      return NextResponse.json({ error: 'Invalid booking date or time' }, { status: 400 })
    }

    const insertObj = {
      customer_id: user.id,
      service_id: serviceId,
      service_title: serviceTitle,
      customer_name: profile ? `${profile.first_name} ${profile.last_name}` : '',
      customer_email: profile?.email || user.email || '',
      customer_phone: body.customer_phone || null,
      session_count: sessionCount,
      unit_price: unitPrice,
      discount_percent: discountPercent,
      total_amount: totalAmount,
      booking_date: bookingDate,
      booking_time: bookingTime,
      notes: body.notes || null,
    }

    const { data: inserted, error } = await supabase.from('orders').insert([insertObj]).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json(inserted, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 500 })
  }
}
