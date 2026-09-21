# Blueprint: MONON (মনন) Frontend

> **Bengali digital magazine** focused on mindful living & digital wellness.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.3.5 |
| UI | React | 19.2.8 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS v4 | ^4 |
| Icons | lucide-react | ^1.47.0 |
| Components | class-variance-authority + clsx + tailwind-merge | - |
| Email | nodemailer (Gmail SMTP) | ^10.0.10 |
| Fonts | Noto Serif Bengali, Hind Siliguri, Geist Mono | via next/font |

**No ORM, no state management library, no database client.**

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

## Folder Structure

```
articel-pr/
├── app/                    # Next.js App Router (file-based routing)
│   ├── layout.tsx          # Root: Bengali fonts, AuthProvider, SEO metadata
│   ├── page.tsx            # Homepage (client-rendered, 7 editorial sections)
│   ├── globals.css         # Tailwind v4 theme tokens + editorial CSS
│   │
│   ├── admin/              # Admin panel routes
│   │   ├── login/          # Admin login form
│   │   ├── dashboard/      # Metrics, charts, article table
│   │   ├── articles/       # Article listing + create new
│   │   ├── categories/     # Topic/category management
│   │   ├── analytics/      # Analytics dashboard
│   │   └── settings/       # Admin settings
│   │
│   ├── articles/
│   │   └── [slug]/         # Article reader (SSR + client hybrid)
│   │       ├── page.tsx         # Server: fetch data, generateMetadata for SEO
│   │       └── ArticleReaderClient.tsx  # Client: themes, font size, bookmarks
│   │
│   └── api/
│       └── contact/route.ts  # Server API: Nodemailer email sending
│
├── components/
│   ├── layout/             # Header.tsx (sticky nav), Footer.tsx
│   ├── home/               # Homepage sections
│   │   ├── EditorialHero.tsx
│   │   ├── FeaturedCoverStory.tsx
│   │   ├── TopicsSection.tsx
│   │   ├── LatestArticles.tsx
│   │   ├── StartHereGuide.tsx
│   │   ├── EditorialPhilosophy.tsx
│   │   └── NewsletterSection.tsx
│   │
│   ├── article/            # Article reader features
│   │   ├── ReadingToolbar.tsx   # Theme (light/sepia/dark) + font controls
│   │   ├── SocialShare.tsx      # Share buttons
│   │   └── CommentSection.tsx   # Comments + replies + likes
│   │
│   ├── admin/              # Admin panel components
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   ├── ArticleTable.tsx
│   │   ├── CreateArticleModal.tsx
│   │   ├── DeleteDialog.tsx
│   │   ├── MetricCard.tsx
│   │   └── AnalyticsChart.tsx
│   │
│   └── ui/                 # Reusable primitives
│       ├── button.tsx          # CVA: 7 variants
│       ├── badge.tsx           # CVA: 11 color variants
│       ├── input.tsx, textarea.tsx, spinner.tsx
│       ├── SearchModal.tsx     # Ctrl+K search
│       ├── ArticleModal.tsx    # Quick-read modal
│       ├── EditorialArt.tsx    # SVG artwork generator (8 themes)
│       └── toast-banner.tsx
│
├── lib/
│   ├── api.ts              # API client (fetch wrapper, auth headers, typed responses)
│   ├── auth-context.tsx    # React Context for JWT auth (localStorage persistence)
│   ├── utils.ts            # cn() class merge + toBengaliNumber()
│   └── data/               # Static seed data (fallback when API unreachable)
│       ├── articles.ts
│       ├── topics.ts
│       └── admin-articles.ts
│
├── design-system/
│   └── monon/MASTER.md     # Design system docs
│
└── public/                 # Static assets (SVGs)
```

## Key Architecture

### Routing
| Route | Type | Notes |
|-------|------|-------|
| `/` | Client page | Full editorial homepage |
| `/articles/[slug]` | SSR + Client | Server fetch + `generateMetadata()` + client reader |
| `/admin/*` | Client pages | Login, dashboard, CRUD |
| `/api/contact` | API route | Nodemailer Gmail SMTP |

### State Management
- **Auth:** React Context (`lib/auth-context.tsx`) → `useAuth()` hook
- **Everything else:** Local `useState`/`useEffect` in components
- **Persistence:** `localStorage` for auth token (`monon_auth_token`) and bookmarks (`monon_saved_articles`)

### Data Fetching
1. **Client-side:** `useEffect` + `api.*` calls with static seed data fallback
2. **Server-side:** Direct `fetch()` with ISR revalidation (article pages)
3. **Graceful degradation:** Site works fully without backend running

### API Client (`lib/api.ts`)
- Base URL: `NEXT_PUBLIC_API_URL` (default `http://localhost:5000/api/v1`)
- Modules: `api.auth`, `api.topics`, `api.articles`, `api.comments`, `api.contact`, `api.analytics`, `api.upload`

### Component System
- **CVA-based:** `Button` (7 variants), `Badge` (11 colors)
- **Theme tokens:** Paper tones (#FAF8F5), forest green (#0E5A44), terracotta, amber
- **Editorial CSS:** `.drop-cap`, `.editorial-border`, `.editorial-divider`
- **EditorialArt:** 8 procedural SVG illustrations (no AI/stock images)

## Important Files to Know

| File | Why It Matters |
|------|----------------|
| `app/layout.tsx` | Entry point - fonts, auth provider, metadata |
| `app/page.tsx` | Homepage - assembles all sections |
| `lib/api.ts` | Every API call goes through here |
| `lib/auth-context.tsx` | Auth state for entire app |
| `components/ui/button.tsx` | Reference for CVA component pattern |
| `components/ui/EditorialArt.tsx` | SVG artwork system |
| `app/globals.css` | Theme tokens and editorial styles |
| `lib/data/articles.ts` | Article TypeScript interfaces |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up env (copy .env.example if available)
# NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
# GMAIL_USER=..., GMAIL_APP_PASSWORD=..., CONTACT_RECEIVER=...

# 3. Start backend first (article-pr-server), then:
npm run dev

# Frontend runs on http://localhost:3000
```

## Common Tasks

- **Add new page:** Create `app/your-page/page.tsx`
- **Add new component:** Follow CVA pattern in `components/ui/`
- **Add API endpoint:** Add method to `lib/api.ts`, consume in component
- **Add new section to homepage:** Create in `components/home/`, import in `app/page.tsx`
- **Modify theme:** Edit `app/globals.css` tokens
