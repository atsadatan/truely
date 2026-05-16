---
paths:
  - "src/app/api/**/*.ts"
---

# API Route Conventions

- Validate request body with zod before processing
- Return consistent shape: `{ data, error }` for JSON responses
- Use `createClient()` from `@/lib/supabase/server` for authenticated requests
- Use `createAdminClient()` from `@/lib/supabase/admin` only for operations requiring service role
- Always check auth: `const { data: { user } } = await supabase.auth.getUser()`
- Return 401 for unauthenticated, 400 for bad input, 500 for server errors
