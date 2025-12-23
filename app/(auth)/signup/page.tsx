import { SignUpForm } from "@/components/auth/signup-form"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sign Up | Derma Solution",
  description: "Create a new account",
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 mb-8">
              ← Back to dashboard
            </Link>
            
            <h1 className="text-4xl font-bold font-heading">Sign Up</h1>
            <p className="text-muted-foreground">
              Enter your email and password to sign up!
            </p>
          </div>

          <SignUpForm />

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-primary hover:underline font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-primary/10 dark:bg-primary/5 items-center justify-center p-8">
        <div className="max-w-md space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-5xl font-bold font-heading text-primary">
              Derma Solution
            </h2>
            <p className="text-lg text-muted-foreground">
              Aesthetic Skin Clinic
            </p>
          </div>
          <p className="text-muted-foreground">
            Book appointments for professional aesthetic treatments and skin care services
          </p>
        </div>
      </div>
    </div>
  )
}

