@AGENTS.md

# Truely — AI Self-Discovery Platform

Thai-first self-discovery platform for university students. Conversational AI assessment reveals strengths, growth areas, and personalized insights.

## Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui, Framer Motion
- **Auth & DB**: Supabase (auth, Postgres, RLS)
- **i18n**: next-intl v4 — Thai (default) + English
- **State**: Zustand, React Query
- **Forms**: react-hook-form + zod v4

## Project structure

```
src/
├── app/
│   ├── api/assessment/route.ts    # Assessment API (currently mock)
│   ├── [locale]/
│   │   ├── page.tsx               # Landing page
│   │   ├── (auth)/login/          # Email/password login
│   │   ├── (auth)/register/       # Registration
│   │   └── (main)/
│   │       ├── assessment/        # Chat-based AI assessment
│   │       └── dashboard/         # User dashboard
│   └── globals.css                # Tailwind v4 theme
├── components/ui/                 # shadcn/ui components
├── i18n/                          # next-intl config, routing, navigation
├── lib/supabase/                  # client.ts, server.ts, admin.ts
└── messages/{th,en}.json          # Translation files
```

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
```

## Conventions

- Path alias: `@/*` maps to `./src/*`
- All pages under `[locale]/` — use `useTranslations()` for user-facing text
- Navigation: use `Link`, `useRouter` from `@/i18n/navigation` (not next/link)
- Supabase clients: `client.ts` (browser), `server.ts` (Server Components), `admin.ts` (service role)
- Route groups: `(auth)` for login/register, `(main)` for authenticated pages
- UI components go in `src/components/ui/` (shadcn/ui managed)

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ANTHROPIC_API_KEY          # For AI assessment (not yet wired)
NEXT_PUBLIC_BASE_URL
```

## Current state (Phase 1 complete)

- Landing page with feature cards
- Email/password auth (register + login)
- Dashboard showing assessment CTA or results placeholder
- Assessment: 10-question mock chat UI (hardcoded questions, fake results)
- Supabase DB: profiles, assessments tables with RLS
- Google OAuth button present but disabled

## What's next

1. Replace mock assessment with real AI (Anthropic API) — adaptive questions based on user responses
2. Dashboard detail: display actual assessment results from DB
3. Reflection journal feature
