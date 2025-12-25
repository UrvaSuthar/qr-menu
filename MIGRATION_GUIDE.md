# Running Database Migrations

You have two options to run the migration:

## Option 1: Via Supabase Dashboard (Recommended - Quickest)

1. **Go to your Supabase project dashboard:**
   - Visit [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Open the SQL Editor:**
   - Click "SQL Editor" in the left sidebar
   - Click "New query"

3. **Copy and paste the migration:**
   - Open `supabase/migrations/001_initial_schema.sql`
   - Copy the entire contents
   - Paste into the SQL Editor

4. **Run the migration:**
   - Click "Run" or press Cmd/Ctrl + Enter
   - You should see: "Success. No rows returned"

5. **Verify tables were created:**
   - Click "Database" → "Tables" in the sidebar
   - You should see:
     - user_profiles
     - restaurants
     - categories
     - menu_items
     - qr_scans

---

## Option 2: Via Supabase CLI (For Local Development)

### Install Supabase CLI

**macOS (via Homebrew):**
```bash
brew install supabase/tap/supabase
```

**Alternative (via npm):**
```bash
npm install -g supabase
```

### Link to your project

```bash
# Initialize Supabase in your project
supabase init

# Link to your remote project
supabase link --project-ref your-project-ref
```

*Get your project ref from: Supabase Dashboard → Settings → General*

### Run migrations

```bash
# Push migration to remote database
supabase db push

# Or apply locally first
supabase db reset
```

---

## Verification

After running the migration, test the setup:

1. **Check RLS is enabled:**
   - Go to Database → Tables → user_profiles
   - Click "Policies" tab
   - You should see 3 policies:
     - Users can read own profile
     - Users can update own profile
     - Users can insert own profile

2. **Test the app:**
   ```bash
   npm run dev
   ```
   - Visit http://localhost:3000
   - Try signing up with a test account
   - You should be redirected to the dashboard

---

## Troubleshooting

**Error: "relation 'user_profiles' already exists"**
- The migration was already run
- Safe to ignore

**Error: "permission denied"**
- Make sure you're logged into Supabase
- Check you have the right project selected

**Error: "function uuid_generate_v4() does not exist"**
- Run this first in SQL Editor:
  ```sql
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  ```
