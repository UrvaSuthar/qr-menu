-- Diagnostic: Check current RLS policies on restaurants table
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'restaurants'
ORDER BY policyname;

-- This will show all current policies on the restaurants table
-- Run this first to see what's blocking the insert
