# Project Context

## About the User
- **Name**: Atsada
- **Role**: Junior Product Manager at Fintect
- **Goal**: Building Truely — an AI-driven self-discovery platform for university students
- **Experience**: Product/UX design background. Learning to build with AI tools (Claude Code). First full-stack project.
- **GitHub**: atsadatan

## About the Product
- **Name**: Truely
- **Tagline**: Understand yourself. Focus on what matters.
- **What**: AI adaptive assessment → strengths/weaknesses dashboard → personal development plan → reflection journal
- **Who**: Thai university students (18-22)
- **Language**: Thai (primary) + English (i18n)

## Tech Stack
- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript
- **UI**: React 19 + Tailwind CSS v4 + shadcn/ui (new-york style)
- **Database**: Supabase (PostgreSQL + Auth)
- **AI**: Claude API (assessment engine, journal analysis, plan generation)
- **i18n**: next-intl (th/en)
- **Client State**: Zustand
- **Server State**: TanStack React Query v5
- **Forms**: React Hook Form + Zod
- **Animation**: Framer Motion
- **Deployment**: Vercel

## Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/           # i18n routing (th/en)
│   │   ├── (auth)/         # Login, register, onboarding
│   │   ├── (main)/         # Authenticated pages (dashboard, journal, plan)
│   │   └── assessment/     # Assessment flow
│   └── api/                # API routes
├── components/             # React components
│   ├── ui/                 # shadcn/ui primitives
│   ├── assessment/         # Assessment feature components
│   ├── dashboard/          # Dashboard feature components
│   ├── journal/            # Journal feature components
│   └── layout/             # Shell, navigation, headers
├── hooks/                  # Custom React hooks
├── stores/                 # Zustand stores
├── lib/                    # Utilities
│   ├── supabase/           # DB client, types
│   ├── ai/                 # Claude API integration
│   └── i18n/               # Internationalization config
├── messages/               # i18n JSON (th.json, en.json)
└── types/                  # TypeScript type definitions
```

## Conventions

### File Naming
- Components: `kebab-case.tsx` (e.g., `strength-card.tsx`)
- Hooks: `use-kebab-case.ts` (e.g., `use-assessment.ts`)
- Stores: `kebab-case-store.ts` (e.g., `user-store.ts`)
- Types: `kebab-case.ts` (e.g., `assessment.ts`)

### Component Pattern
- Server Components by default
- `"use client"` only when needed (interactivity, hooks, browser APIs)
- Colocate feature components in feature folders

### Styling
- Tailwind CSS utility classes — no custom CSS unless unavoidable
- shadcn/ui for all UI primitives (Button, Card, Input, Dialog, etc.)
- Mobile-first: design for 375px width, scale up
- Use CSS variables from shadcn/ui theme

### Data Fetching
- Server Components: direct Supabase queries
- Client Components: TanStack React Query with custom hooks
- Mutations: React Query `useMutation` with optimistic updates

### i18n
- All user-facing strings in `messages/th.json` and `messages/en.json`
- Use `useTranslations('namespace')` in components
- Thai is the primary language — write Thai strings first

### AI Integration
- All AI calls go through API routes (never expose API keys client-side)
- Claude API for: assessment questions, result analysis, journal insights, plan generation
- Stream responses for conversational UI

## Database Schema (Supabase)

### profiles
- `id` (uuid, FK to auth.users)
- `display_name` (text)
- `university` (text, nullable)
- `year` (int, nullable)
- `major` (text, nullable)
- `locale` (text, default 'th')
- `created_at`, `updated_at`

### assessments
- `id` (uuid)
- `user_id` (uuid, FK to profiles)
- `status` (enum: in_progress, completed)
- `started_at`, `completed_at`
- `result_json` (jsonb — strengths, growth areas, traits)

### assessment_messages
- `id` (uuid)
- `assessment_id` (uuid, FK to assessments)
- `role` (enum: assistant, user)
- `content` (text)
- `order` (int)
- `created_at`

### journal_entries
- `id` (uuid)
- `user_id` (uuid, FK to profiles)
- `content` (text)
- `prompt` (text, nullable — AI-generated prompt)
- `mood` (text, nullable)
- `energy` (int, nullable, 1-5)
- `ai_insights` (jsonb, nullable)
- `created_at`, `updated_at`

### development_plans
- `id` (uuid)
- `user_id` (uuid, FK to profiles)
- `assessment_id` (uuid, FK to assessments)
- `actions` (jsonb — array of action items)
- `created_at`, `updated_at`

### plan_actions
- `id` (uuid)
- `plan_id` (uuid, FK to development_plans)
- `title` (text)
- `description` (text)
- `timeframe` (enum: this_week, this_month, this_semester)
- `status` (enum: todo, in_progress, done)
- `completed_at` (timestamp, nullable)

## Current Phase
- **Phase 0**: Project setup, auth, landing page

## Docs
- `docs/PRD.md` — Product Requirements Document
