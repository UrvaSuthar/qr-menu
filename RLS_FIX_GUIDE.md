# How to Fix the RLS Signup Error

## The Problem

You're getting this error during signup:
```
new row violates row-level security policy for table "user_profiles"
```

This happens because the user profile creation is blocked by Row Level Security before the user session is fully established.

## The Solution

I've created a fix using a **database trigger** that automatically creates user profiles when users sign up. This bypasses the RLS issue entirely.

---

## Steps to Fix

### 1. Run the Fix Migration

**Go to Supabase Dashboard:**
- Open **SQL Editor**
- Create a **New query**

**Copy and paste this migration:**
- Open: `supabase/migrations/002_fix_rls_signup.sql`
- Copy ALL the contents
- Paste into SQL Editor
- Click **Run**

### 2. Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### 3. Test Signup Again

- Go to http://localhost:3000/signup
- Create a new test account
- It should work now! ✅

---

## What Changed?

### Before (Broken):
```typescript
// App tries to INSERT into user_profiles
// RLS blocks it because session isn't ready
signUp() → INSERT user_profiles ❌ RLS Error
```

### After (Fixed):
```typescript
// Database trigger creates profile automatically
// App just UPDATEs the role (which works with RLS)
signUp() → Trigger creates profile → UPDATE role ✅ Works!
```

### The Fix Details:

1. **Database Trigger** (`handle_new_user`) runs when a new user signs up
2. Creates `user_profiles` row with **SECURITY DEFINER** (bypasses RLS)
3. Sets default role to `customer`
4. App then **updates** the role to the correct one (restaurant/food_court)
5. UPDATE works because the user is now authenticated

---

## Verification

After applying the fix, you should be able to:
1. ✅ Sign up as a restaurant owner
2. ✅ Sign up as a food court manager
3. ✅ Get redirected to the correct dashboard
4. ✅ See your profile data loaded

---

## Troubleshooting

**Still getting the error?**
- Make sure you ran the migration in the correct project
- Check the Functions were created: Database → Functions → `handle_new_user`
- Check the Trigger exists: Database → Triggers → `on_auth_user_created`

**Users created before the fix:**
- Might have incomplete profiles
- Can manually update them in: Database → Tables → user_profiles
