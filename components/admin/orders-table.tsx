"use client"

import { memo, useState } from "react"
import useSWR from 'swr'
import type { OrderWithDetails } from "@/types"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { format } from "date-fns"
import { parseBookingDateTime } from '@/lib/utils'

interface OrdersTableProps {
  orders: OrderWithDetails[]
  currentPage?: number
  totalCount?: number
  pageSize?: number
}

function OrdersTableComponent({ currentPage, totalCount, pageSize }: OrdersTableProps) {
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data: orders, mutate } = useSWR('/api/orders', fetcher, { refreshInterval: 5000 })
  const [showDropdown, setShowDropdown] = useState<string | null>(null)
  const handleConfirm = async (orderId: string) => {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'confirmed' })
    })
    if (res.ok) {
      mutate()
      setShowDropdown(null)
    } else {
      alert('Failed to confirm order.')
    }
  }
  const getStatusVariant = (
    status: string
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "default"
    }
  }

  if (!orders) return <div>Loading...</div>;
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No Bookings yet
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Sessions</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order: OrderWithDetails) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-xs">
                {order.id.slice(0, 8)}
              </TableCell>
              <TableCell className="font-medium">
                <div>
                  <div>
                    {order.customer?.first_name || order.customer_name || 'Unknown'}{' '}
                    {order.customer?.last_name || ''}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {order.customer?.email || order.customer_email || ''}
                    {order.customer_phone ? ` • ${order.customer_phone}` : ''}
                  </div>
                </div>
              </TableCell>
              <TableCell>{order.service.name}</TableCell>
              <TableCell className="font-medium">{order.session_count} {order.session_count === 1 ? 'session' : 'sessions'}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{order.address || '-'}</TableCell>
              <TableCell>
                {format(parseBookingDateTime(order.booking_date, order.booking_time || '00:00:00'), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>£{order.total_amount.toFixed(2)}</TableCell>
              <TableCell>
                {order.status === 'pending' ? (
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200 transition"
                      disabled
                    >
                      Pending
                    </button>
                    <button
                      className="px-2 py-1 rounded bg-green-100 text-green-800 border border-green-300 hover:bg-green-200 transition"
                      onClick={() => handleConfirm(order.id)}
                    >
                      Confirm
                    </button>
                  </div>
                ) : (
                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Simple pagination controls (server rendered links) */}
      {typeof currentPage !== 'undefined' && typeof totalCount !== 'undefined' && (
        <div className="flex items-center justify-between p-4">
          <div className="text-sm text-muted-foreground">Showing page {currentPage}</div>
          <div className="flex items-center gap-2">
            {currentPage > 1 && (
              <a href={`?page=${currentPage - 1}`} className="btn">Previous</a>
            )}
            {currentPage * (pageSize || 20) < (totalCount || 0) && (
              <a href={`?page=${currentPage + 1}`} className="btn">Next</a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export const OrdersTable = memo(OrdersTableComponent)

