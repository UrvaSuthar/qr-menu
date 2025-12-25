# Signup Troubleshooting Checklist

The signup is still failing with a 400 error. Let's diagnose systematically:

## Step 1: Verify Migrations Were Run ✅

**Go to Supabase Dashboard:**
1. Click **SQL Editor**
2. Run this query:
```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_profiles', 'restaurants', 'categories', 'menu_items');

-- Check if trigger exists
SELECT trigger_name, event_manipulation, event_object_table 
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Check if function exists
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_name = 'handle_new_user';
```

**Expected Results:**
- 4 tables: user_profiles, restaurants, categories, menu_items
- 1 trigger: on_auth_user_created
- 1 function: handle_new_user

**If missing:** Run migrations in this order:
1. `001_initial_schema.sql`
2. `002_fix_rls_signup.sql`

---

## Step 2: Verify Email Confirmation is OFF ✅

**Go to Supabase Dashboard:**
1. **Authentication** → **Settings**
2. Click **Email** tab (under "Auth Providers")
3. Find **"Confirm email"** toggle
4. **Must be OFF** (gray, not blue)
5. Click **Save** if you made changes

---

## Step 3: Check Password Requirements ✅

**Go to Supabase Dashboard:**
1. **Authentication** → **Settings** → **Password**
2. Check these settings:
   - Minimum characters: Should be 6 or less
   - Require lowercase: Can be OFF
   - Require uppercase: Should be OFF
   - Require numbers: Should be OFF
   - Require special characters: Should be OFF

**Or just relax all password requirements for testing:**
```sql
-- In SQL Editor, run:
ALTER ROLE authenticator SET app.settings.password_min_length = '6';
```

---

## Step 4: Test Supabase Directly ✅

**In SQL Editor, run this to test the trigger:**
```sql
-- This simulates what happens when a user signs up
DO $$
DECLARE
    test_user_id UUID := gen_random_uuid();
    test_email TEXT := 'trigger-test@example.com';
BEGIN
    -- Insert test user into auth.users (simulating signup)
    INSERT INTO auth.users (
        id, 
        email,
        encrypted_password,
        email_confirmed_at,
        raw_user_meta_data,
        created_at,
        updated_at
    ) VALUES (
        test_user_id,
        test_email,
        crypt('testpassword', gen_salt('bf')),
        NOW(),
        '{"full_name": "Trigger Test"}',
        NOW(),
        NOW()
    );
    
    -- Check if profile was created by trigger
    IF EXISTS (SELECT 1 FROM public.user_profiles WHERE id = test_user_id) THEN
        RAISE NOTICE 'SUCCESS! Trigger created profile for user: %', test_email;
    ELSE
        RAISE NOTICE 'FAILED! No profile created. Trigger did not run.';
    END IF;
    
    -- Cleanup
    DELETE FROM auth.users WHERE id = test_user_id;
END $$;
```

**Expected:** Should see "SUCCESS! Trigger created profile"

**If FAILED:** The trigger isn't working. Re-run `002_fix_rls_signup.sql`

---

## Step 5: Enable Better Error Logging

**In browser console (F12), run:**
```javascript
// This will show you the EXACT error
localStorage.setItem('supabase.auth.debug', 'true');
```

Then try signing up again and check console for detailed error.

---

## Step 6: Try Manual Signup Test

**In SQL Editor:**
```sql
-- Manually create a test user
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at
) VALUES (
    gen_random_uuid(),
    'manual-test@example.com',
    crypt('password123', gen_salt('bf')),
    NOW()
);
```

**Then in the app:**
- Try logging in with: manual-test@example.com / password123
- If this works, the issue is with signup, not login

---

## Most Likely Issues:

### A) Trigger Not Created
**Symptom:** 400 error, no profile created
**Fix:** Run `002_fix_rls_signup.sql` completely

### B) Email Confirmation Still On
**Symptom:** Silent failure, no error shown
**Fix:** Disable in Auth settings AND click Save

### C) Password Rejected
**Symptom:** 400 error mentioning password
**Fix:** Use stronger password: `Test123!@#`

### D) Supabase URL/Key Wrong
**Symptom:** 400/401 errors immediately
**Fix:** Check `.env.local` has correct credentials

---

## Quick Fix to Try Right Now:

1. **Go to SQL Editor**
2. **Run this single command:**
```sql
-- Disable email confirmation at database level
UPDATE auth.config 
SET value = 'false' 
WHERE key = 'auth.confirm_email';
```

3. **Try signup again**

If that doesn't work, run through Steps 1-4 above systematically.
