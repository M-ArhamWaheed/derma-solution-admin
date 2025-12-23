"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
// import { createCategory } from "@/lib/supabase/create-category"

export function AddCategoryForm({ onCategoryAdded }: { onCategoryAdded?: () => void }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      toast({ title: "Category name is required", variant: "destructive" })
      return
    }
    startTransition(async () => {
      try {
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, description }),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || "Unknown error")
        }
        toast({ title: "Category created!" })
        setName("")
        setDescription("")
        onCategoryAdded?.()
      } catch (err: any) {
        toast({ title: "Error creating category", description: err.message, variant: "destructive" })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-end mb-8">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Category name" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" />
      </div>
      <Button type="submit" disabled={isPending} size="lg">
        Add Category
      </Button>
    </form>
  )
}
