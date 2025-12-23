"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/hooks/use-toast"
// import { createCategory } from "@/lib/supabase/create-category"

export function AddCategoryForm({ onCategoryAdded }: { onCategoryAdded?: () => void }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [slug, setSlug] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [displayOrder, setDisplayOrder] = useState(0)
  const [isActive, setIsActive] = useState(true)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      toast({ title: "Category name is required", variant: "destructive" })
      return
    }
    if (!slug.trim()) {
      toast({ title: "Slug is required", variant: "destructive" })
      return
    }
    let imageUrl = ""
    if (imageFile) {
      setUploading(true)
      try {
        const supabase = createClient()
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${slug}-${Date.now()}.${fileExt}`
        const { data, error } = await supabase.storage.from('category-images').upload(fileName, imageFile)
        if (error) throw error
        imageUrl = supabase.storage.from('category-images').getPublicUrl(fileName).publicUrl
      } catch (err: any) {
        toast({ title: "Image upload failed", description: err.message, variant: "destructive" })
        setUploading(false)
        return
      }
      setUploading(false)
    }
    startTransition(async () => {
      try {
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            description,
            slug,
            image_url: imageUrl,
            display_order: displayOrder,
            is_active: isActive,
          }),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || "Unknown error")
        }
        toast({ title: "Category created!" })
        setName("")
        setDescription("")
        setSlug("")
        setImageFile(null)
        setDisplayOrder(0)
        setIsActive(true)
        onCategoryAdded?.()
      } catch (err: any) {
        toast({ title: "Error creating category", description: err.message, variant: "destructive" })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Category name" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Slug</label>
        <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="category-slug" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Image</label>
        <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
        {uploading && <span className="text-xs text-muted-foreground">Uploading...</span>}
      </div>
      <div>
        <label className="block mb-1 font-medium">Display Order</label>
        <Input type="number" value={displayOrder} onChange={e => setDisplayOrder(Number(e.target.value))} min={0} />
      </div>
      <div className="flex items-center gap-2 mt-6">
        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} id="isActive" />
        <label htmlFor="isActive" className="font-medium">Active</label>
      </div>
      <Button type="submit" disabled={isPending} size="lg" className="col-span-full">
        Add Category
      </Button>
    </form>
  )
}
