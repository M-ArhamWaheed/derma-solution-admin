import React from 'react'
import { getOrderById } from '@/lib/supabase/queries'
import OrderEditCard from '@/components/admin/order-edit-card'

export default async function EditOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await getOrderById(id)
  if (!order) {
    return <div className="p-8">Order not found</div>
  }

  return (
    <div className="p-8">
      {/* Render client edit card */}
      {/* @ts-expect-error Server -> Client passing */}
      <OrderEditCard order={order} />
    </div>
  )
}
