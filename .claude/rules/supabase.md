---
paths:
  - "src/lib/supabase/**/*.ts"
  - "src/app/api/**/*.ts"
  - "src/app/[locale]/**/*.tsx"
---

# Supabase Conventions

- Three clients exist — pick the right one:
  - `client.ts` → browser/client components (`createBrowserClient`)
  - `server.ts` → Server Components and Route Handlers (`createServerClient` with cookies)
  - `admin.ts` → service role, bypasses RLS — use sparingly
- All tables must have RLS policies — never disable RLS
- Use `.single()` when expecting exactly one row
- Always handle `{ data, error }` destructuring from Supabase calls
- DB tables: profiles, assessments (more to come: journal_entries, development_plans)
