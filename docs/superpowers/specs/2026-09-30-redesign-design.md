# QR Menu redesign: one editorial design system

Date: 2026-09-30 · Status: awaiting review

## Intent

**What the owner asked for:** redesign the whole site ("all above": owner signups, the diner experience, and the owner dashboard), and let Claude pick the direction.

**Understanding:** QR Menu currently looks like three different products. Landing and auth are near-black; onboarding, dashboards and public menus are plain white Tailwind; and `design-system.css` describes a third, "Nothing-inspired" style that is barely used. The goal is one recognisable brand from the landing page to the menu a diner opens, without changing what the product does.

**Success means:**
- Every route uses the same tokens, type and components, with no page-specific colour or font choices.
- The landing page shows its content without needing to be scrolled. At the moment the sections below the hero are invisible until they animate in.
- Diners get a fast, mobile-first menu view.
- Owners always know what to do next.
- Nothing regresses: the existing 31-check Playwright suite, lint and build all pass.
- Accessibility: WCAG AA contrast, visible focus, form labels linked to their inputs, and `prefers-reduced-motion` respected.

## Direction: ink + cream editorial

This matches the two launch videos, so the site and the marketing look the same. Fraunces and Inter are already loaded in `app/layout.tsx`.

| Token | Value | Use |
|---|---|---|
| `ink` | `#0B0B0C` | Text, primary buttons, dark marketing bands |
| `paper` | `#F6F1E7` | App and page background (warm cream) |
| `card` | `#FFFDF8` | Cards, inputs, and the surfaces on top of paper |
| `line` | `rgb(11 11 12 / 0.12)` | Borders and dividers |
| `muted` | `#6B645A` | Secondary text (AA on paper and card) |
| `accent` | `#D7261E` | One red accent: highlights, focus ring, status dot. Never used for body text, because red on cream fails AA at small sizes. |
| `success` | `#1F7A4D` | Success states only |

- **Type.** Fraunces (optical sizing on) for display text and page titles. Inter for everything else. A fixed scale: 12/14/16/18/24/32/48/72.
- **Shape.** Cards have a 14px radius, buttons and chips are fully rounded pills, and shadows are soft and warm rather than grey.
- **Motion.** Motion only enhances, never gates content: elements are visible by default and animate in when framer-motion runs. Everything is disabled under `prefers-reduced-motion`.

**Rejected alternatives:**
- Dark everywhere: dashboards and forms are harder to read, and PDFs look out of place.
- Plain white: generic, and doesn't match the videos.
- Bold and playful: loud, and competes with the restaurants' own menus.

## Implementation approach

**Chosen: retoken the existing class system in place, and expose the same tokens to Tailwind.**
- Almost every page is already styled through `app-*`/`food-*` classes in `app/styles/app.css` and `auth-*` classes in `auth.css`, all driven by `--app-*` variables, and pages use those variables in Tailwind arbitrary values too.
- The palette, type and component rules are rewritten there. Tailwind `@theme` in `globals.css` gets the same tokens (`bg-paper`, `text-ink`, `font-display`, …).
- `design-system.css` merges into `app.css` and is deleted, as is `auth-background.tsx`.
- `Input` and `Textarea` get `useId()` so their labels are always linked.
- Pages that need a new structure are rebuilt: the landing page, auth, a shared owner `AppShell`, and the diner views. Inline `style={{…}}` objects are removed as each page is touched.

(Revised during planning: the first draft proposed deleting `app.css` and converting to Tailwind classes. That gives the same visual result with much more churn, because the primitives already encapsulate the classes.)

**Rejected alternatives:**
- shadcn/ui: a new dependency and a component rewrite, for about 12 primitives.
- Converting everything to Tailwind classes: see the note above.

## Surfaces

1. **Landing (`/`)**
   - Hero: an ink band with the headline "Your menu is stuck in the past. Let's fix that." (Let's in red), the real CTA, and a static phone mock showing a cream PDF menu, built in HTML/CSS as in the videos.
   - "How it works": three steps on cream (Upload the PDF, Get your QR code, Diners scan). Features: 3 cards with the existing claims.
   - A food court band (one QR, every stall), then the final CTA on ink.
   - The 30s launch film is embedded with a poster and `preload="none"` so it doesn't slow first load. It is copied into `public/` compressed to about 4 MB or less.
   - Copy stays true to what the app does; only existing claims are reused.
2. **Auth (`/login`, `/signup`)**
   - Split layout: a cream form card on one side and an ink brand panel (logo, one line, a small menu mock) on the other. On mobile, a single column with the form first.
   - The role selector becomes two large choice cards.
3. **Onboarding (`/onboarding`)**
   - A cream page with the stepper at the top and one card per step. The Ready step shows the QR large, with Download and Print.
4. **Owner app (`/restaurant/*`, `/food-court/*`)**
   - A shared app shell: top bar with the logo, section nav (Dashboard, QR code, Settings, plus Restaurants for food courts) and sign out. It collapses to a compact bar on mobile.
   - The dashboard shows a status card (menu uploaded or not, public link with a copy button) and a QR card.
   - Food court stalls appear as a card grid with an edit sheet.
5. **Diner views (`/menu/[slug]`, `/menu/r/[id]`, `/fc/[slug]`, `/menu/fc/[id]`)**
   - The full-screen PDF stays, since it's the product. The floating logo becomes a small pill with the logo and restaurant name, with safe-area insets. If there's no PDF, a styled empty state shows instead.
   - Food court pages: a cream header with the name and address, and a 2-column mobile grid of stall cards (logo or initials on a tinted tile, name, "View menu").
6. **Misc:** `/unauthorized`, the 404 page, loading and error states, all on the same system.

## Out of scope

- New features.
- Data or schema changes.
- A dark-mode toggle.
- Changing any claims in the copy.
- Replacing `<img>` with `next/image`. Supabase public URLs would need `remotePatterns`; that's a separate perf change.

**Included cleanup:** remove the unused `three`, `@react-three/fiber`, `@react-three/drei` and `@types/three` dependencies. Nothing imports them.

## Verification

- The Playwright e2e suite (31 checks, both roles, uploads, public pages, access control) passes against a local production build on the live Supabase project. The test data is deleted afterwards.
- Screenshots of every route at 1440px and 390px wide are reviewed before merging.
- Lighthouse accessibility scores 95 or higher on `/`, `/login` and one public menu page.
- `npm run lint` shows 0 errors, `npm run build` passes, and CI is green.
- Ships as one PR from `feat/redesign`. After merging, the production deploy is verified with the live checks.
