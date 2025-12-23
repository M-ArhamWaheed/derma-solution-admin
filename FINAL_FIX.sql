-- ============================================
-- ULTIMATE FIX FOR INFINITE RECURSION (42P17)
-- ============================================

-- Step 1: Drop ALL policies on profiles
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;

-- Step 2: Recreate is_admin function (simple version)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- This only works if the user can read their own profile
  -- which we'll allow with the policy below
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Step 3: Create NON-RECURSIVE policies for profiles

-- Policy 1: Any authenticated user can read their own profile
-- This allows is_admin() to work without recursion
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Policy 2: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- IMPORTANT: DO NOT add "Admins can read all profiles" policy!
-- That's what causes the recursion!
-- ============================================

-- Instead, for admin operations, use a server-side approach
-- or modify the other table policies to allow admins to read
-- related profile data through joins.

-- ============================================
-- VERIFICATION
-- ============================================
-- After running this, test by:
-- 1. Login as a regular user -> should see dashboard
-- 2. Login as an admin -> should redirect to /admin
-- 3. No more 42P17 errors!

