import { NextRequest, NextResponse } from 'next/server';
import { getOrdersByCustomer } from '@/lib/supabase/queries';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const customerId = params.id;
    if (!customerId) {
      return NextResponse.json({ error: 'Missing customer id' }, { status: 400 });
    }
    const orders = await getOrdersByCustomer(customerId);
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
