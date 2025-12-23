import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, description } = body
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("categories")
    .insert([
      {
        name,
        description,
        is_active: true,
        display_order: 0,
      },
    ])
    .select()
    .single()
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data, { status: 201 })
}
