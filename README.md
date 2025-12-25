# QR Menu Platform - Sprint 1 Implementation

## Project Overview

A QR-based restaurant menu platform built with Next.js 14 and Supabase.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Supabase (Auth, PostgreSQL, Storage)
- **Deployment**: Vercel (planned)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env.local` file in the project root
   - Add your Supabase credentials (see `ENV_SETUP.md` for details):
     ```bash
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
     ```

4. **Set up Supabase Database**
   - Create a new Supabase project
   - Run the SQL migrations in `supabase/migrations/` folder
   - Enable Row Level Security (RLS)

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
qr-menu/
├── app/                      # Next.js App Router
│   ├── contexts/            # React contexts (Auth)
│   ├── lib/                 # Utilities and configs
│   ├── types/               # TypeScript definitions
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── restaurant/          # Restaurant dashboard
│   ├── food-court/          # Food court dashboard
│   └── unauthorized/        # Unauthorized access page
├── middleware.ts            # Route protection
├── ENV_SETUP.md            # Environment setup guide
└── public/                  # Static assets
```

## Features (Sprint 1)

✅ **Authentication**
- Email/password signup with role selection
- Login with role-based redirects
- Logout functionality

✅ **Role-Based Routing**
- Restaurant dashboard (`/restaurant`)
- Food court dashboard (`/food-court`)
- Middleware route protection
- Unauthorized access handling

✅ **User Roles**
- Restaurant: Single venue management
- Food Court: Multi-vendor management
- Customer: Public menu viewing (no auth required)

## Database Schema

See `architecture.md` for complete schema. Key tables:
- `user_profiles`: User info with roles
- `restaurants`: Restaurant/food court profiles
- `categories`: Menu categories
- `menu_items`: Individual menu items

## Next Steps (Sprint 2)

- Restaurant CRUD operations
- Menu item management
- QR code generation
- Public menu display

## Contributing

This is an MVP implementation. See `task.md` for current progress.

## License

MIT
