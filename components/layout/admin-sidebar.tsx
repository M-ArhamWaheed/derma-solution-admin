"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderTree,
  Sparkles,
  ShoppingCart,
  Mail,
} from "lucide-react"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Services",
    href: "/admin/services",
    icon: Sparkles,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Emails",
    href: "/admin/emails",
    icon: Mail,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin" className="flex items-center gap-2 font-heading">
          <span className="text-2xl font-bold text-primary">DS</span>
          <span className="text-lg font-semibold">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href
          const Icon = link.icon

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {link.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

