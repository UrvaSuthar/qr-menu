-- Fix for RLS issue during signup
-- This creates user profiles automatically when a new auth user is created

-- Drop existing INSERT policy that's causing issues
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;

-- Create a more permissive INSERT policy for signup
-- This allows inserts where the id matches the authenticated user
CREATE POLICY "Enable insert for authenticated users during signup"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Alternative: Create a function to handle profile creation with elevated privileges
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER -- This runs with the permissions of the function creator
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, role, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    'customer', -- default role, will be updated by the app
    NEW.raw_user_meta_data->>'full_name',
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create user_profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.user_profiles TO authenticated;
