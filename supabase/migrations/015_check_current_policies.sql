-- Check what policies actually exist right now
SELECT 
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'restaurants'
ORDER BY policyname;
