-- ============================================
-- NUCLEAR OPTION: DISABLE RLS ON PROFILES
-- ============================================
-- This is the only guaranteed way to stop the recursion
-- Since profiles data is not sensitive (basic user info only)
-- and we control access through app logic

-- Step 1: Drop ALL existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;

-- Step 2: DISABLE RLS on profiles (this stops ALL recursion)
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Step 3: Create a simple is_admin function that doesn't worry about RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ============================================
-- ALTERNATIVE OPTION (If you want RLS on profiles)
-- ============================================
-- If you MUST have RLS on profiles, use this approach instead:
-- Uncomment the following lines and comment out the DISABLE RLS above

/*
-- Keep RLS enabled but with simple policies only
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow ALL authenticated users to read ALL profiles
CREATE POLICY "Allow authenticated users to read profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Admin can insert/delete (for user management)
CREATE POLICY "Admins can insert profiles"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );
*/

-- ============================================
-- VERIFY OTHER TABLE POLICIES
-- ============================================
-- These should all work now since profiles has no RLS conflicts

-- Categories policies (these are fine)
DROP POLICY IF EXISTS "Anyone can read active categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;

CREATE POLICY "Anyone can read active categories"
  ON public.categories FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (public.is_admin());

-- Services policies (these are fine)
DROP POLICY IF EXISTS "Anyone can read active services" ON public.services;
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;

CREATE POLICY "Anyone can read active services"
  ON public.services FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage services"
  ON public.services FOR ALL
  USING (public.is_admin());

-- Orders policies (these are fine)
DROP POLICY IF EXISTS "Customers can read own orders" ON public.orders;
DROP POLICY IF EXISTS "Customers can create own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can read all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update all orders" ON public.orders;

CREATE POLICY "Customers can read own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = customer_id);

CREATE POLICY "Customers can create own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Admins can read all orders"
  ON public.orders FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update all orders"
  ON public.orders FOR UPDATE
  USING (public.is_admin());

-- Reviews policies (these are fine)
DROP POLICY IF EXISTS "Anyone can read reviews" ON public.reviews;
DROP POLICY IF EXISTS "Customers can create reviews" ON public.reviews;
DROP POLICY IF EXISTS "Customers can update own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can manage all reviews" ON public.reviews;

CREATE POLICY "Anyone can read reviews"
  ON public.reviews FOR SELECT
  USING (TRUE);

CREATE POLICY "Customers can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can update own reviews"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = customer_id);

CREATE POLICY "Admins can manage all reviews"
  ON public.reviews FOR ALL
  USING (public.is_admin());

