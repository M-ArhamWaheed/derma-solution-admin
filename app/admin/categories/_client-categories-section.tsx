"use client"

import { useState } from "react"
import { AddCategoryForm } from "@/components/admin/add-category-form"
import { CategoriesTable } from "@/components/admin/categories-table"

export default function ClientCategoriesSection({ initialCategories }: { initialCategories: any[] }) {
  const [categories, setCategories] = useState(initialCategories)
  const handleCategoryAdded = async () => {
    // Refetch categories from API
    const res = await fetch("/api/categories-list")
    if (res.ok) {
      setCategories(await res.json())
    }
  }
  return (
    <>
      <AddCategoryForm onCategoryAdded={handleCategoryAdded} />
      <div className="flex-1 w-full">
        <h2 className="text-2xl font-semibold mb-6">All Categories</h2>
        <CategoriesTable categories={categories} />
      </div>
    </>
  )
}