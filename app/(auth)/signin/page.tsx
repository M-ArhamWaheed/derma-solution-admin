import { SignInForm } from "@/components/auth/signin-form"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sign In | Derma Solution",
  description: "Sign in to your account",
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 mb-8">
              ← Back to dashboard
            </Link>
            
            <h1 className="text-4xl font-bold font-heading">Sign In</h1>
            <p className="text-muted-foreground">
              Enter your email and password to sign in!
            </p>
          </div>

          <SignInForm />

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign Up
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

