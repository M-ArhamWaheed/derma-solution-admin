"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderTree,
  Sparkles,
  ShoppingCart,
  Mail,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"

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

function SidebarContent({ onLinkClick, isCollapsed }: { onLinkClick?: () => void, isCollapsed?: boolean }) {
  const pathname = usePathname()

  return (
    <>
      <div className={cn(
        "flex h-16 items-center justify-center border-b transition-all",
        isCollapsed ? "px-2" : "px-6"
      )}>
        <Link href="/admin" onClick={onLinkClick}>
          <Image 
            src={isCollapsed ? "/logos/favicon.webp" : "/logos/logo.webp"}
            alt="Derma Solution" 
            width={isCollapsed ? 40 : 120} 
            height={isCollapsed ? 40 : 120}
            className="object-contain transition-all"
          />
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
              onClick={onLinkClick}
              title={isCollapsed ? link.title : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                isCollapsed && "justify-center"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{link.title}</span>}
            </Link>
          )
        })}
      </nav>
    </>
  )
}

export function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopCollapsed, setDesktopCollapsed] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden md:flex flex-col border-r bg-background transition-all duration-300 relative",
        desktopCollapsed ? "w-16" : "w-64"
      )}>
        <SidebarContent isCollapsed={desktopCollapsed} />
        
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDesktopCollapsed(!desktopCollapsed)}
          className="absolute -right-3 top-20 z-10 h-6 w-6 rounded-full border bg-background shadow-md hover:bg-accent"
        >
          {desktopCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="flex flex-col h-full">
            <SidebarContent onLinkClick={() => setMobileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

