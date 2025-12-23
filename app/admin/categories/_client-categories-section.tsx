"use client"


import { useState } from "react"
import { AddCategoryForm } from "@/components/admin/add-category-form"

export default function ClientCategoriesSection({ initialCategories }: { initialCategories: any[] }) {
  const [categories, setCategories] = useState(initialCategories)
  const [showForm, setShowForm] = useState(false)
  const handleCategoryAdded = async () => {
    setShowForm(false)
    const res = await fetch("/api/categories-list")
    if (res.ok) {
      setCategories(await res.json())
    }
  }
  return (
    <>
      <div className="mb-6">
        <button className="bg-primary text-white px-4 py-2 rounded" onClick={() => setShowForm(v => !v)}>
          {showForm ? "Cancel" : "Add Category"}
        </button>
      </div>
      {showForm && <AddCategoryForm onCategoryAdded={handleCategoryAdded} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="rounded-lg shadow bg-white p-6 flex flex-col">
            <h3 className="font-bold text-xl mb-2">{cat.name}</h3>
            <p className="text-muted-foreground mb-2">{cat.description}</p>
            <span className="text-xs text-gray-500">Slug: {cat.slug}</span>
          </div>
        ))}
      </div>
    </>
  )
}