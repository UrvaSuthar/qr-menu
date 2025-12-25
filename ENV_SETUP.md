# Supabase Environment Variables

## Setup Instructions

1. Create a `.env.local` file in the project root
2. Add the following variables with your Supabase project credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Getting Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Create a new project (free tier)
3. Navigate to Settings → API
4. Copy the **Project URL** and **anon/public key**
5. Paste them into `.env.local`

## Security Notes

- `.env.local` is gitignored for security
- Never commit sensitive keys to version control
- The `NEXT_PUBLIC_` prefix makes these available to the browser
