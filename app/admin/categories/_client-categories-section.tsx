"use client"

import { useState } from "react"
import Image from "next/image"
import { AddCategoryForm } from "@/components/admin/add-category-form"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import type { Category } from "@/types"

export default function ClientCategoriesSection({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState(initialCategories)
  const [showForm, setShowForm] = useState(false)
  const [editCategory, setEditCategory] = useState<Category | null>(null)
  
  const handleCategoryAdded = async () => {
    setShowForm(false)
    setEditCategory(null)
    const res = await fetch("/api/categories-list")
    if (res.ok) {
      setCategories(await res.json())
    }
  }
  
  const handleEdit = (cat: Category) => {
    setEditCategory(cat)
    setShowForm(true)
  }
  
  const handleDelete = async (cat: Category) => {
    if (!window.confirm(`Delete category "${cat.name}"?`)) return
    const res = await fetch(`/api/categories/${cat.id}`, { method: "DELETE" })
    if (res.ok) {
      setCategories(categories.filter((c) => c.id !== cat.id))
    }
  }
  return (
    <>
      <div className="mb-6">
        <button className="bg-primary text-white px-4 py-2 rounded" onClick={() => { setShowForm(v => !v); setEditCategory(null); }}>
          {showForm && !editCategory ? "Cancel" : "Add Category"}
        </button>
      </div>
      {showForm && (
        <AddCategoryForm onCategoryAdded={handleCategoryAdded} initialValues={editCategory} />
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Slug</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Display Order</th>
              <th className="px-4 py-2 border">Active</th>
              <th className="px-4 py-2 border">Manage</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b">
                <td className="px-4 py-2 border font-semibold">{cat.name}</td>
                <td className="px-4 py-2 border">{cat.slug}</td>
                <td className="px-4 py-2 border">{cat.description}</td>
                <td className="px-4 py-2 border">{cat.image_url ? <Image src={cat.image_url} alt={cat.name} width={40} height={40} className="object-cover rounded" /> : '-'}</td>
                <td className="px-4 py-2 border text-center">{cat.display_order}</td>
                <td className="px-4 py-2 border text-center">{cat.is_active ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 border text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Manage</button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(cat)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(cat)} className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}