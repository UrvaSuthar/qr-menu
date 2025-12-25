# Fix: Storage Upload RLS Error

## The Problem

When trying to upload logo or menu PDF, you're seeing:
```
new row violates row-level security policy
```

**Why this happens:**
The storage policies check if you own a restaurant BEFORE allowing upload. But when creating a restaurant for the first time, the restaurant doesn't exist yet!

```sql
-- This fails because restaurant doesn't exist:
auth.uid() IN (SELECT owner_id FROM restaurants)
```

---

## The Solution

Run the new migration that allows any authenticated user to upload files:

### 1. Go to Supabase SQL Editor

### 2. Run This Migration:

Open: [`supabase/migrations/004_fix_storage_policies.sql`](file:///Users/urvasuthar/development/qr-menu/supabase/migrations/004_fix_storage_policies.sql)

Copy the entire contents and run in SQL Editor.

### 3. Refresh the Page

After running the migration:
- Refresh `localhost:3000/restaurant/settings`
- Try uploading again
- Should work now! ✅

---

## What Changed?

### Before (Broken):
```sql
-- Only restaurant owners can upload
CREATE POLICY "Restaurant owners can upload logos"
  WITH CHECK (
    auth.uid() IN (SELECT owner_id FROM restaurants)
    -- ❌ Fails if restaurant doesn't exist yet!
  );
```

### After (Fixed):
```sql
-- Any authenticated user can upload
CREATE POLICY "Authenticated users can upload logos"
  WITH CHECK (
    bucket_id = 'restaurant-logos'
    AND auth.role() = 'authenticated'
    -- ✅ Works even before restaurant creation!
  );
```

---

## Security Notes

**Is this secure?**
Yes! Here's why:

1. **Storage:** Any authenticated user can upload files
2. **Database:** Only restaurant owners can link files to their restaurant
3. **Application:** Only shows files that belong to user's restaurant
4. **Cleanup:** Orphaned files (uploads without restaurant) can be cleaned up periodically

**Trade-off:**
- ✅ Users can upload before creating restaurant (better UX)
- ⚠️ Unused uploads consume storage (minimal impact)
- ✅ Database RLS still protects restaurant data

---

## Quick Test

After running the migration:

1. Go to Settings page
2. Upload a logo (should work now)
3. Upload a menu PDF (should work now)
4. Fill in restaurant details
5. Click "Create Restaurant"
6. Should save successfully! 🎉

---

## Alternative: Manual Bucket Creation

If the migration still doesn't work, you may need to create the buckets manually first:

1. **Go to Supabase Dashboard**
2. **Storage** → **Create Bucket**
3. Create two buckets:
   - Name: `restaurant-logos`, Public: YES
   - Name: `restaurant-menus`, Public: YES
4. **Then run** migrations 003 and 004

---

This should fix the upload error! Try it now.
