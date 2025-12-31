"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { createClient } from "@/lib/supabase/client"
import { LogOut, User, Menu, LayoutDashboard, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import type { Profile } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface NavbarProps {
  user: Profile | null
  title?: string
  action?: React.ReactNode
}

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/book-consultation", label: "My Bookings" },

]

export function Navbar({ user, action }: NavbarProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    const supabase = createClient()
    // Clear the client session first
    try { await supabase.auth.signOut() } catch {}

    // Also call the server-side signout endpoint so server cookies
    // (including ds_role) are cleared immediately and server components
    // will observe the signed-out state on refresh.
    try {
      await fetch('/api/auth/signout', { method: 'POST', credentials: 'same-origin' })
    } catch (e) {
      // non-blocking
    }

    toast({ title: "Signed out", description: "You have been signed out successfully" })
    // navigate and revalidate server components
    router.push('/dashboard')
    router.refresh()
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "U"
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase()
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <SheetHeader>
                  <SheetTitle>
                    <div 
                      className="px-4 py-2 rounded-lg inline-block"
                      style={{ backgroundColor: '#333333' }}
                    >
                      <Image
                        src="/logos/logo.webp"
                        alt="Derma Solution"
                        width={120}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {action && (
                    <div className="pt-4 border-t">
                      {action}
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo - Hidden on mobile when menu is available */}
            <Link href="/dashboard" className="hidden md:block">
              <div 
                className="px-4 py-2 rounded-lg"
                style={{ backgroundColor: '#333333' }}
              >
                <Image
                  src="/logos/logo.webp"
                  alt="Derma Solution"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop Action Button */}
            <div className="hidden lg:block">
              {action}
            </div>
          </div>

          {/* Center Section removed — links moved to user dropdown */}

          {/* Right Section - User Menu, Book Consultation & Theme */}
          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
             

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 gap-2 px-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar_url} alt={user.first_name} />
                      <AvatarFallback>
                        {getInitials(user.first_name, user.last_name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/book-consultation')}>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span>My Bookings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/profile-settings')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Desktop-only actions: show Sign In + Book Consultation when not logged in */}
            {!user && (
              <div className="hidden lg:flex items-center gap-2">
                <Link href="/signin" className="text-black">
                  <Button variant="primary" size="default" >
                    Sign In
                  </Button>
                </Link>
                <Link href="/book-consultation">
                  <Button variant="primary" size="default">
                    Book Consultation
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
