"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import type { Service, Category } from "@/types/database"

export function ServiceForm({ onServiceSaved, initialValues, categories, onCancel }: { onServiceSaved?: () => void, initialValues?: Partial<Service>, categories: Category[], onCancel?: () => void }) {
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
  const defaultSessionOptions = ["1 session", "3 sessions", "6 sessions", "10 sessions"]
  const [sessionOptions, setSessionOptions] = useState<string[]>(
    Array.isArray(initialValues?.session_options)
      ? (initialValues?.session_options as string[])
      : initialValues?.session_options
      ? JSON.parse(String(initialValues?.session_options))
      : []
  )

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
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error"
        toast({ title: "Image upload failed", description: errorMessage, variant: "destructive" })
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
              session_options: sessionOptions,
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
              session_options: sessionOptions,
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
        setSessionOptions([])
        onServiceSaved?.()
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error"
        toast({ title: `Error ${initialValues?.id ? "updating" : "creating"} service`, description: errorMessage, variant: "destructive" })
      }
    })
  }

  return (
    <div className={`rounded-lg border p-6 ${initialValues?.id ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        {initialValues?.id ? '✏️ Edit Service' : '➕ Add New Service'}
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label className="block mb-1 font-medium text-foreground">Name</label>
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Service name" required />
      </div>
      <div>
        <label className="block mb-1 font-medium text-foreground">Slug</label>
        <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="service-slug" required />
      </div>
      <div>
        <label className="block mb-1 font-medium text-foreground">Category</label>
        <select 
          value={categoryId} 
          onChange={e => setCategoryId(e.target.value)} 
          className="w-full border border-input bg-background text-foreground rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium text-foreground">Base Price</label>
        <Input type="number" value={basePrice} onChange={e => setBasePrice(e.target.value)} min={0} required />
      </div>
      <div>
        <label className="block mb-1 font-medium text-foreground">Duration (minutes)</label>
        <Input type="number" value={duration} onChange={e => setDuration(e.target.value)} min={0} />
      </div>
      <div>
        <label className="block mb-1 font-medium text-foreground">Session options (enable for this service)</label>
        <div className="flex flex-wrap gap-3">
          {defaultSessionOptions.map((opt) => {
            const checked = sessionOptions.includes(opt)
            return (
              <label key={opt} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => {
                    if (e.target.checked) setSessionOptions((s) => [...s, opt])
                    else setSessionOptions((s) => s.filter((x) => x !== opt))
                  }}
                  className="h-4 w-4 rounded border-input"
                />
                <span className="text-foreground">{opt}</span>
              </label>
            )
          })}
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium text-foreground">Description</label>
        <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" />
      </div>
      <div>
        <label className="block mb-1 font-medium text-foreground">Thumbnail</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={e => setImageFile(e.target.files?.[0] || null)}
          className="w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        {uploading && <span className="text-xs text-muted-foreground">Uploading...</span>}
        {thumbnail && !imageFile && (
          <div className="mt-2"><Image src={thumbnail} alt="Current" width={40} height={40} className="object-cover rounded" /></div>
        )}
      </div>
      <div className="flex items-center gap-2 mt-6">
        <input type="checkbox" checked={isPopular} onChange={e => setIsPopular(e.target.checked)} id="isPopular" className="h-4 w-4 rounded border-input" />
        <label htmlFor="isPopular" className="font-medium text-foreground">Popular</label>
      </div>
      <div className="flex items-center gap-2 mt-6">
        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} id="isActive" className="h-4 w-4 rounded border-input" />
        <label htmlFor="isActive" className="font-medium text-foreground">Active</label>
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
