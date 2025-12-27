"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export function SignUpForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Trim and validate email
    const email = formData.email.trim()
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address",
      })
      return
    }

    // Password min 6 characters
    if (formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Weak Password",
        description: "Password must be at least 6 characters",
      })
      return
    }

    if (!formData.agreeToTerms) {
      toast({
        variant: "destructive",
        title: "Terms Required",
        description: "Please agree to the Terms and Conditions",
      })
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({
        email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: "customer",
          },
        },
      })

      if (error) {
        toast({
          variant: "destructive",
          title: "Signup Failed",
          description: error.message,
        })
        return
      }

      if (data.user) {
        toast({
          title: "Success",
          description: "Account created! Check your email to confirm.",
        })

        if (typeof window !== 'undefined' && localStorage.getItem('pendingBooking')) {
          router.push('/confirm-booking')
          router.refresh()
          return
        }

        router.push("/dashboard")
        router.refresh()
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Unexpected Error",
        description: "Something went wrong during signup",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
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
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, agreeToTerms: checked as boolean })
          }
        />
        <label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <Link href="/terms" className="text-primary underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary underline">
            Privacy Policy
          </Link>
        </label>
      </div>

      <Button type="submit" disabled={loading} className="w-full" size="lg">
        {loading ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  )
}
