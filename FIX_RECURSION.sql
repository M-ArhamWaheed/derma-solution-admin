-- ============================================
-- FINAL FIX: REMOVE THE PROBLEMATIC ADMIN POLICY
-- ============================================

-- The "Admins can read all profiles" policy causes infinite recursion
-- because is_admin() queries profiles, which triggers the policy,
-- which calls is_admin() again = infinite loop!

-- SOLUTION: Drop the admin policy from profiles
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;

-- Recreate is_admin function (keeping it simple and safe)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  user_role text;
BEGIN
  -- This will only check against "Users can read own profile" policy
  -- which doesn't cause recursion
  SELECT role INTO user_role
  FROM public.profiles
  WHERE id = auth.uid()
  LIMIT 1;
  
  RETURN COALESCE(user_role = 'admin', false);
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
   SET search_path = public;

-- Now profiles table only has these two policies (NO RECURSION):
-- 1. "Users can read own profile" - users can see their own profile
-- 2. "Users can update own profile" - users can update their own profile

-- Admins will be able to read all profiles through the admin dashboard
-- using service-level queries or by modifying your queries to use
-- the service role key for admin operations

