# Truely — Product Requirements Document v1.0

## Vision

Help university students (18-22) truly understand themselves — their strengths, weaknesses, and what matters most — so they can focus their energy on what counts.

## Problem Statement

University students face a critical identity-forming period but lack structured tools to understand themselves. Existing solutions (MBTI, StrengthsFinder) are:
- **Static**: one-time test, no growth tracking
- **Generic**: not contextualized to a student's actual life
- **Expensive**: paid assessments behind corporate paywalls
- **English-only**: not accessible for Thai students

Students end up comparing themselves to peers, chasing trends, or feeling lost — wasting years on paths that don't align with who they are.

## Solution

**Truely** is an AI-driven self-discovery platform that guides students through adaptive assessments, reveals their strengths and growth areas, and helps them build a personal development plan they can actually follow.

## Target Users

| User Type | Description | Primary Need |
|-----------|-------------|--------------|
| **Student** | Thai university students, age 18-22 | Understand strengths/weaknesses, find direction |
| **Admin** (future) | University counselors, career centers | View anonymized insights, support students |

### User Persona — Primary

- **Name**: Ploy, 20, 2nd year, Chulalongkorn University
- **Pain**: Chose her major because parents suggested it. Feels "okay" but not excited. Sees friends thriving in internships. Wonders if she's on the wrong path.
- **Goal**: Understand what she's naturally good at. Get clarity on what career paths fit her.
- **Behavior**: Uses LINE daily, browses TikTok/IG, prefers Thai content, does quizzes for fun (but forgets results)

## Core Features — V1

### F1: AI Adaptive Assessment

**Description**: Conversational assessment powered by AI. Not a fixed questionnaire — the AI adapts follow-up questions based on previous answers to go deeper.

**User Story**: As a student, I want to answer questions about myself in a natural way so that I get personalized insights, not generic results.

**Acceptance Criteria**:
- Assessment feels like a conversation, not a form
- AI asks 15-25 adaptive questions (not fixed)
- Questions cover: personality traits, interests, values, skills, energy patterns
- Student can pause and resume assessment
- Assessment takes 10-15 minutes
- Available in Thai and English

### F2: Strengths & Weaknesses Dashboard

**Description**: Visual dashboard showing assessment results — top strengths, growth areas, personality traits, and how they connect.

**User Story**: As a student, I want to see my strengths and weaknesses clearly so that I know what to focus on.

**Acceptance Criteria**:
- Top 5 strengths with descriptions and examples
- Top 3 growth areas with actionable suggestions
- Visual chart/graph of trait distribution
- Comparison to anonymized peer data (optional)
- Shareable result card (image export)
- Results update as student retakes or completes more assessments

### F3: Personal Development Plan

**Description**: AI-generated action plan based on assessment results. Concrete steps the student can take this week/month/semester.

**User Story**: As a student, I want specific actions I can take to develop my strengths so that I make real progress.

**Acceptance Criteria**:
- 3-5 recommended actions based on top strengths
- Actions are specific and time-bound (this week, this month)
- Mix of activities: courses, books, experiences, habits
- Student can mark actions as done
- Plan refreshes based on progress and new assessments

### F4: Reflection Journal

**Description**: Guided journaling prompts that help students process their self-discovery journey. AI analyzes patterns over time.

**User Story**: As a student, I want to reflect on my experiences regularly so that I notice patterns about myself.

**Acceptance Criteria**:
- Daily/weekly reflection prompts (AI-generated, contextual)
- Free-text journal entry
- AI highlights patterns after 5+ entries ("You mention creativity a lot", "Energy peaks when...")
- Private by default
- Mood/energy tag per entry

### F5: Onboarding

**Description**: First-time experience that explains Truely's purpose and gets the student started with their first assessment.

**User Story**: As a new user, I want to understand what Truely does and start my assessment quickly.

**Acceptance Criteria**:
- 3-4 screen intro explaining the value
- Quick profile setup (name, university, year, major — optional)
- Leads directly into first assessment
- Can skip intro on subsequent visits
- Login via email or social (LINE, Google)

## Information Architecture — V1

```
/                       → Landing page (marketing)
/login                  → Auth (email, LINE, Google)
/onboarding             → Intro screens + profile setup
/assessment             → AI adaptive assessment (conversational UI)
/assessment/result      → Result summary after completion
/dashboard              → Main dashboard (strengths, growth areas, plan)
/dashboard/strengths    → Detailed strengths breakdown
/dashboard/growth       → Detailed growth areas
/journal                → Reflection journal list
/journal/new            → New journal entry
/journal/[id]           → View/edit journal entry
/plan                   → Personal development plan
/profile                → User profile + settings
/profile/settings       → Language, notifications, account
```

## Non-Functional Requirements

- **Mobile-first**: 80%+ users will be on mobile
- **Bilingual**: Thai (primary) + English
- **Performance**: First contentful paint < 2s
- **Privacy**: Assessment data is private. No selling data. PDPA compliant.
- **Accessibility**: WCAG 2.1 AA minimum

## Tech Stack (Recommended)

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | Next.js 15 (App Router) | SSR, API routes, Vercel deploy |
| Language | TypeScript | Type safety |
| UI | Tailwind CSS + shadcn/ui | Rapid, consistent UI |
| Database | Supabase (PostgreSQL) | Auth, DB, realtime, free tier |
| Auth | Supabase Auth | Email + social login |
| AI | Claude API | Adaptive assessment, journal analysis |
| i18n | next-intl | Thai/English |
| State | Zustand | Simple client state |
| Server State | TanStack React Query | Caching, optimistic updates |
| Deploy | Vercel | Free tier, GitHub integration |

## Success Metrics — V1

| Metric | Target |
|--------|--------|
| Assessment completion rate | > 70% |
| Return within 7 days | > 40% |
| Journal entries per user (30 days) | > 3 |
| NPS | > 50 |

## Phases

| Phase | Scope | Timeline |
|-------|-------|----------|
| 0 | Project setup, auth, landing page | Week 1 |
| 1 | AI assessment (core flow) | Week 2-3 |
| 2 | Dashboard + results | Week 3-4 |
| 3 | Development plan | Week 4-5 |
| 4 | Journal + patterns | Week 5-6 |
| 5 | Polish, i18n, deploy | Week 6-7 |

## Out of Scope — V1

- Admin portal (counselor dashboard)
- Group/class assessments
- Paid features / subscription
- Native mobile app
- Integration with university systems
- Gamification / badges
