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
import { ThemeToggle } from "@/components/theme-toggle"
import { createClient } from "@/lib/supabase/client"
import { LogOut, User, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import type { Profile } from "@/types"

interface NavbarProps {
  user: Profile | null
  title?: string
  action?: React.ReactNode
}

export function Navbar({ user, title, action }: NavbarProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    })
    router.push("/signin")
    router.refresh()
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "U"
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase()
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left Section - Action Button */}
        <div className="flex items-center gap-4">
          {action}
        </div>

        {/* Center Section - Title */}
        {title && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-lg font-semibold font-heading">{title}</h1>
          </div>
        )}

        {/* Right Section - User Menu */}
        <div className="flex items-center gap-3">
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
                  <span className="hidden md:inline-block font-medium">
                    {user.first_name}
                  </span>
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
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  )
}

