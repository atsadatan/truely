---
paths:
  - "src/app/[locale]/**/*.tsx"
  - "src/components/**/*.tsx"
---

# Component Conventions

- UI primitives: use shadcn/ui from `@/components/ui/` — don't build custom buttons, cards, inputs
- Animations: use Framer Motion (`motion.div` with `initial`/`animate`)
- Icons: use `lucide-react`
- Styling: Tailwind v4 utility classes — no CSS modules or styled-components
- Client components: add `"use client"` directive at top when using hooks or browser APIs
- Forms: use `react-hook-form` + `zod` for validation
