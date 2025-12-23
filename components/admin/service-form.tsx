"use client"

import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export function ServiceForm({ onServiceSaved, initialValues, categories, onCancel }: { onServiceSaved?: () => void, initialValues?: any, categories: any[], onCancel?: () => void }) {
  const [name, setName] = useState(initialValues?.name || "")
  const [slug, setSlug] = useState(initialValues?.slug?.trim() || "")
  const [description, setDescription] = useState(initialValues?.description || "")
  const [categoryId, setCategoryId] = useState(initialValues?.category_id || "")
  const [basePrice, setBasePrice] = useState(initialValues?.base_price || "")
  const [duration, setDuration] = useState(initialValues?.duration_minutes || "")
  const [isPopular, setIsPopular] = useState(initialValues?.is_popular || false)
  const [isActive, setIsActive] = useState(initialValues?.is_active ?? true)
  const [thumbnail, setThumbnail] = useState(initialValues?.thumbnail || "")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !slug.trim() || !categoryId || !basePrice) {
      toast({ title: "All required fields must be filled", variant: "destructive" })
      return
    }
    const safeSlug = slug.trim().replace(/\s+/g, '-');
    let finalThumbnail = thumbnail
    if (imageFile) {
      setUploading(true)
      try {
        const supabase = (await import("@/lib/supabase/client")).createClient()
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${safeSlug}-${Date.now()}.${fileExt}`
        const { error } = await supabase.storage.from('service-images').upload(fileName, imageFile)
        if (error) throw error
        const { data: urlData } = supabase.storage.from('service-images').getPublicUrl(fileName)
        finalThumbnail = urlData.publicUrl
        setThumbnail(finalThumbnail)
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
          res = await fetch(`/api/services/${initialValues.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              slug,
              description,
              category_id: categoryId,
              base_price: Number(basePrice),
              duration_minutes: duration ? Number(duration) : null,
              is_popular: isPopular,
              is_active: isActive,
              thumbnail: finalThumbnail,
            }),
          })
        } else {
          res = await fetch("/api/services", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              slug,
              description,
              category_id: categoryId,
              base_price: Number(basePrice),
              duration_minutes: duration ? Number(duration) : null,
              is_popular: isPopular,
              is_active: isActive,
              thumbnail: finalThumbnail,
            }),
          })
        }
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || "Unknown error")
        }
        toast({ title: initialValues?.id ? "Service updated!" : "Service created!" })
        setName("")
        setSlug("")
        setDescription("")
        setCategoryId("")
        setBasePrice("")
        setDuration("")
        setIsPopular(false)
        setIsActive(true)
        setThumbnail("")
        setImageFile(null)
        onServiceSaved?.()
      } catch (err: any) {
        toast({ title: `Error ${initialValues?.id ? "updating" : "creating"} service`, description: err.message, variant: "destructive" })
      }
    })
  }

  return (
    <div className={`rounded-lg border p-6 ${initialValues?.id ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
      <h3 className="text-lg font-semibold mb-4">
        {initialValues?.id ? '✏️ Edit Service' : '➕ Add New Service'}
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Service name" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Slug</label>
        <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="service-slug" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full border rounded px-2 py-2">
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Base Price</label>
        <Input type="number" value={basePrice} onChange={e => setBasePrice(e.target.value)} min={0} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Duration (minutes)</label>
        <Input type="number" value={duration} onChange={e => setDuration(e.target.value)} min={0} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Thumbnail</label>
        <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
        {uploading && <span className="text-xs text-muted-foreground">Uploading...</span>}
        {thumbnail && !imageFile && (
          <div className="mt-2"><img src={thumbnail} alt="Current" className="h-10 w-10 object-cover rounded" /></div>
        )}
      </div>
      <div className="flex items-center gap-2 mt-6">
        <input type="checkbox" checked={isPopular} onChange={e => setIsPopular(e.target.checked)} id="isPopular" />
        <label htmlFor="isPopular" className="font-medium">Popular</label>
      </div>
      <div className="flex items-center gap-2 mt-6">
        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} id="isActive" />
        <label htmlFor="isActive" className="font-medium">Active</label>
      </div>
      <div className="col-span-full flex gap-3">
        <Button type="submit" disabled={isPending || uploading} size="lg" className="flex-1">
          {initialValues?.id ? "Update Service" : "Add Service"}
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
