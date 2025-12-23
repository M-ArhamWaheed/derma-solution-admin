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
    <section className="w-full py-4 overflow-hidden">
      <div className="container px-4">
        {/* Wrapped buttons for all screen sizes */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center max-w-full">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              size="sm"
              className="font-semibold text-xs md:text-sm whitespace-nowrap"
              onClick={() => scrollToCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
