# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server on :3000
npm run lint      # ESLint (flat config, eslint.config.mjs)
npm run build     # production build — CI uses this as the type check
npm run analyze   # build with @next/bundle-analyzer
npm run deploy    # vercel --prod
```

There is no test suite. CI (`.github/workflows/ci.yml`, Node 20) runs `npm ci`, `npm run lint`, `npm run build`.

Husky hooks: pre-commit runs `lint-staged` (`eslint --fix`), commit-msg runs commitlint with `@commitlint/config-conventional` — commit messages must be Conventional Commits (`feat:`, `fix:`, `refactor:`, …).

Env: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Architecture

Next.js 16 App Router + React 19 + Tailwind 4, backed entirely by Supabase (Auth, Postgres with RLS, Storage). No custom API routes. The `@/*` path alias maps to `./app/*` (not the repo root), so `@/lib/...`, `@/components/...`, `@/types` all live under `app/`.

**Data model.** One `restaurants` table holds both restaurants and food courts: `is_food_court` flags a food court, and `parent_food_court_id` links a sub-restaurant to its food court. `user_profiles.id` is the `auth.users.id` and carries `role` (`restaurant` | `food_court` | `customer` | `admin`). `qr_scans` logs public menu views. `categories` / `menu_items` exist in the schema, but menus are actually served as uploaded PDFs (`menu_pdf_url`). Types are in `app/types/index.ts`.

**Storage.** Public buckets `restaurant-logos` and `restaurant-menus`; `uploadFile` / `deleteFile` in `app/lib/restaurants.ts` store the public URL plus the storage path on the restaurant row (`logo_url` / `logo_storage_path`, `menu_pdf_url` / `menu_pdf_storage_path`).

**Data access.** `app/lib/restaurants.ts` and `app/lib/foodCourts.ts` are the data layer, and both use the *browser* Supabase client (`app/lib/supabase/client.ts`) even when called from server components such as the public menu pages. `app/lib/supabase/server.ts` (cookie-based SSR client) is only used by the server action `app/actions/auth.ts`.

**Auth and roles.**
- `middleware.ts` guards `/restaurant/*` (role `restaurant`) and `/food-court/*` (role `food_court`), redirecting to `/login?redirect=…` or `/unauthorized`.
- Client-side auth state comes from `AuthProvider` (`app/contexts/AuthContext.tsx`), which exposes `user` and `profile`.
- After signup, `/onboarding` runs a role-specific wizard that creates the restaurant or food court row, then sends the user to their dashboard.
- The signup trigger `handle_new_user` creates the `user_profiles` row with the role from signup metadata (never `admin`). RLS blocks users from setting `admin` themselves.
- New Supabase projects require email confirmation, and Supabase's default SMTP only delivers to project team members. Real signups need confirmation disabled or a custom SMTP server.

**Routes.**
- Owner dashboards: `/restaurant/*`, `/food-court/*`. Each has `qr-code` and `settings` pages; the food court dashboard also has `restaurants` for managing sub-restaurants.
- Public QR targets:
  - `/menu/[slug]`: full-screen PDF iframe; also logs the scan.
  - `/fc/[slug]`: food court grid of sub-restaurants.
  - `/menu/r/[id]`: restaurant by id.
  - `/menu/fc/[id]`: food court by id.

**UI.** Shared primitives live in `app/components/ui` (barrel `index.tsx`). Feature components live in `app/components/{auth,landing,layout,features}`. Styling mixes Tailwind classes with hand-written CSS in `app/styles/` (`design-system.css` is global; `app.css` / `auth.css` are imported per page). Toasts go through `ToastContext`.

## Database

`supabase/schema.sql` is the complete schema (tables, RLS, triggers, storage buckets and policies) and is what the live project (`gdqsvdotnrrmwaqogoje`) was built from. Use it to set up a new project in one run. `supabase/migrations/` is history only: many files from 009 onward are diagnostics or temporary RLS resets (`014_rls_nuclear_reset.sql`, `016_allow_all_temp.sql`) and must not be replayed. Make schema changes in `schema.sql` and apply them to the project as well; there is no Supabase CLI config.

## Other

`sonar-project.properties` and `docker-compose.yml` (a local SonarQube server on :9000) support `npm run sonar`. Contribution guidelines are in `docs/CONTRIBUTING.md`.
