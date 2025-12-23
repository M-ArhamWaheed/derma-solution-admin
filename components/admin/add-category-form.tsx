"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/hooks/use-toast"
// import { createCategory } from "@/lib/supabase/create-category"

export function AddCategoryForm({ onCategoryAdded, initialValues }: { onCategoryAdded?: () => void, initialValues?: any }) {
  const [name, setName] = useState(initialValues?.name || "")
  const [description, setDescription] = useState(initialValues?.description || "")
  const [slug, setSlug] = useState(initialValues?.slug || "")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [displayOrder, setDisplayOrder] = useState(initialValues?.display_order || 0)
  const [isActive, setIsActive] = useState(initialValues?.is_active ?? true)
  const [imageUrl, setImageUrl] = useState(initialValues?.image_url || "")
  const [updating, setUpdating] = useState(false)
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
    let finalImageUrl = imageUrl
    if (imageFile) {
      setUploading(true)
      try {
        const supabase = createClient()
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${slug}-${Date.now()}.${fileExt}`
        const { data, error } = await supabase.storage.from('category-images').upload(fileName, imageFile)
        if (error) throw error
        finalImageUrl = supabase.storage.from('category-images').getPublicUrl(fileName).publicUrl
        setImageUrl(finalImageUrl)
      } catch (err: any) {
        toast({ title: "Image upload failed", description: err.message, variant: "destructive" })
        setUploading(false)
        return
      }
      setUploading(false)
    }
    startTransition(async () => {
      try {
        let res
        if (initialValues?.id) {
          setUpdating(true)
          res = await fetch(`/api/categories/${initialValues.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              description,
              slug,
              image_url: finalImageUrl,
              display_order: displayOrder,
              is_active: isActive,
            }),
          })
        } else {
          res = await fetch("/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              description,
              slug,
              image_url: finalImageUrl,
              display_order: displayOrder,
              is_active: isActive,
            }),
          })
        }
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || "Unknown error")
        }
        toast({ title: initialValues?.id ? "Category updated!" : "Category created!" })
        setName("")
        setDescription("")
        setSlug("")
        setImageFile(null)
        setImageUrl("")
        setDisplayOrder(0)
        setIsActive(true)
        setUpdating(false)
        onCategoryAdded?.()
      } catch (err: any) {
        toast({ title: `Error ${initialValues?.id ? "updating" : "creating"} category`, description: err.message, variant: "destructive" })
        setUpdating(false)
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
        {imageUrl && !imageFile && (
          <div className="mt-2"><img src={imageUrl} alt="Current" className="h-10 w-10 object-cover rounded" /></div>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Display Order</label>
        <Input type="number" value={displayOrder} onChange={e => setDisplayOrder(Number(e.target.value))} min={0} />
      </div>
      <div className="flex items-center gap-2 mt-6">
        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} id="isActive" />
        <label htmlFor="isActive" className="font-medium">Active</label>
      </div>
      <Button type="submit" disabled={isPending || updating} size="lg" className="col-span-full">
        {initialValues?.id ? (updating ? "Updating..." : "Update Category") : "Add Category"}
      </Button>
    </form>
  )
}
