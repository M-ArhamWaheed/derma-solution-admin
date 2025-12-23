"use client"

import { Button } from "@/components/ui/button"
import type { Category } from "@/types"

interface CategoryButtonsProps {
  categories: Category[]
}

export function CategoryButtons({ categories }: CategoryButtonsProps) {
  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`)
    element?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section className="container py-4">
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            size="lg"
            className="font-semibold"
            onClick={() => scrollToCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </section>
  )
}

