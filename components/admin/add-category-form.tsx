"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/hooks/use-toast"
// import { createCategory } from "@/lib/supabase/create-category"

export function AddCategoryForm({ onCategoryAdded, initialValues, onCancel }: { onCategoryAdded?: () => void, initialValues?: any, onCancel?: () => void }) {
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
        const { error } = await supabase.storage.from('category-images').upload(fileName, imageFile)
        if (error) throw error
        const { data: urlData } = supabase.storage.from('category-images').getPublicUrl(fileName)
        finalImageUrl = urlData.publicUrl
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
    <div className={`rounded-lg border p-6 ${initialValues?.id ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        {initialValues?.id ? '✏️ Edit Category' : '➕ Add New Category'}
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label className="block mb-1 font-medium text-foreground">Name</label>
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Category name" required />
      </div>
      <div>
        <label className="block mb-1 font-medium text-foreground">Slug</label>
        <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="category-slug" required />
      </div>
      <div>
        <label className="block mb-1 font-medium text-foreground">Description</label>
        <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" />
      </div>
      <div>
        <label className="block mb-1 font-medium text-foreground">Image</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={e => setImageFile(e.target.files?.[0] || null)}
          className="w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        {uploading && <span className="text-xs text-muted-foreground">Uploading...</span>}
        {imageUrl && !imageFile && (
          <div className="mt-2"><img src={imageUrl} alt="Current" className="h-10 w-10 object-cover rounded" /></div>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium text-foreground">Display Order</label>
        <Input type="number" value={displayOrder} onChange={e => setDisplayOrder(Number(e.target.value))} min={0} />
      </div>
      <div className="flex items-center gap-2 mt-6">
        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} id="isActive" className="h-4 w-4 rounded border-input" />
        <label htmlFor="isActive" className="font-medium text-foreground">Active</label>
      </div>
      <div className="col-span-full flex gap-3">
        <Button type="submit" disabled={isPending || updating} size="lg" className="flex-1">
          {initialValues?.id ? (updating ? "Updating..." : "Update Category") : "Add Category"}
        </Button>
        {initialValues?.id && onCancel && (
          <Button type="button" variant="outline" size="lg" onClick={onCancel}>
            Cancel Edit
          </Button>
        )}
      </div>
    </form>
    </div>
  )
}
