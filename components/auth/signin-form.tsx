"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export function SignInForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const pre = localStorage.getItem('prefillEmail')
      if (pre) {
        // intentionally do not auto-fill; leave for manual entry
        localStorage.removeItem('prefillEmail')
      }
    } catch {}
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        // Common cause: email not confirmed or invalid credentials
        const msg = error.message || String(error)
        if (msg.toLowerCase().includes('invalid_grant') || msg.toLowerCase().includes('email') || msg.toLowerCase().includes('confirm')) {
          toast({ variant: 'destructive', title: 'Sign in failed', description: 'Your email may not be confirmed. Check your inbox or use magic link.' })
          return
        }
        toast({ variant: "destructive", title: "Error", description: msg })
        return
      }

      // Get user role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      toast({
        title: "Success",
        description: "Signed in successfully!",
      })

      // Resume pending booking if the booking flow saved a `pendingBooking` item.
      // Do not send admins to the booking flow.
      const hasPending = typeof window !== 'undefined' && localStorage.getItem('pendingBooking')
      if (hasPending && profile?.role !== 'admin') {
        try { localStorage.removeItem('prefillEmail') } catch {}
        router.push('/confirm-booking')
        router.refresh()
        return
      }

      // Redirect based on role
      if (profile?.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
      router.refresh()
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="info@gmail.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">
            Password <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              disabled={loading}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={formData.rememberMe}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, rememberMe: checked as boolean })
            }
          />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Keep me logged in
          </label>
        </div>

        <Link
          href="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={loading} size="lg">
        {loading ? "Signing in..." : "Sign In"}
      </Button>
      </form>
  )
}

