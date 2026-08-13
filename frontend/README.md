# TN Class 12 Maths — Learning & Evaluation Platform (Frontend)

React + Vite + TypeScript + SCSS frontend for a chapter-wise learning, model-exam,
answer-sheet correction, and school-subscription platform, with three role-based
areas: **Student**, **Teacher**, and **School Admin**.

This is a **frontend-only** scaffold — all data is mocked in `src/data/`. Every
network call is centralized in `src/utils/apiUrls.ts` so wiring up a real backend
later means editing one file, not hunting through components.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. There's no real backend, so:
- Go to **Sign up**, pick a role (Student / Teacher / School Admin), fill the form,
  and you'll be dropped straight into that role's dashboard.
- Or use **Log in** and pick a role from the dropdown — any email/password works,
  it's a mocked auth flow (`src/context/AuthContext.tsx`) backed by `localStorage`.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production (outputs to `dist/`)
- `npm run preview` — preview the production build locally

## Project structure

```
src/
  components/
    layout/     Header, Sidebar, Layout (the app shell used by all logged-in pages)
    ui/         Reusable design-system components (Button, Card, Input, Table, Modal, ...)
    routing/    ProtectedRoute (role-based route guard)
  pages/
    Landing/    Public marketing page
    Auth/       Login, Register (role picker)
    Student/    Dashboard, Chapters, ChapterDetail, Exams, ExamAttempt, AnswerUpload, Results, Subscription
    Teacher/    Dashboard, Content, Correction, Classes
    Admin/      Dashboard, Users, Reports, Subscriptions, AccessControl
    NotFound/
  router/       Central route table (src/router/index.tsx)
  context/      AuthContext (mock auth/role state)
  data/         Mock data (chapters, exams, answer sheets, plans, reports)
  utils/
    apiUrls.ts    All backend endpoints, in one place, keyed by feature
    constants.ts  App-wide constants (nav items per role, role labels)
    helpers.ts    Small formatting/utility functions
  types/        Shared TypeScript types
  styles/       _variables.scss (design tokens), _mixins.scss, global.scss
```

## Design system

Brand colors are `#b34172` (primary) and `#ffffff`, extended with a plum-tinted
neutral scale (instead of flat gray) so the UI reads as intentionally designed.
All tokens live in `src/styles/_variables.scss` — change them there and the whole
app updates. Both `_variables.scss` and `_mixins.scss` are auto-injected into every
`.scss`/`.module.scss` file (see `vite.config.ts`), so components can use
`$color-primary`, `@include card`, etc. without manual imports.

## Tamil / English support

Toggle in the top-right of the header (EN / தமிழ்). Implementation:
- `src/context/LanguageContext.tsx` — holds the current language, persisted to
  `localStorage`. Exposes `useBilingual()`, a `pick(en, ta)` helper for bilingual
  content fields, and `useLanguage()` for the raw toggle.
- `src/utils/i18n.ts` + `src/hooks/useTranslation.ts` — a small UI-string dictionary
  (`t(key)`) for nav labels, buttons, and the chapter/question flow.
- `src/data/chapters.ts` and `src/data/questions.ts` carry a `tamilTitle` /
  `textTa` / `optionsTa` field alongside the English content.
- Coverage today: sidebar nav, chapter titles, and the full question bank
  (MCQ + descriptive) are bilingual. Extend the dictionary/data fields to
  translate more of the app.

## Chapter question bank (MCQ / 2 / 3 / 5 mark)

`src/data/questions.ts` holds a per-chapter question bank split into four
categories (`mcq`, `2-mark`, `3-mark`, `5-mark`). Chapters 1 & 2 have
hand-authored bilingual questions; the rest are generated with the same shape
so every chapter has 12 MCQs + a handful of descriptive questions. The
**Practice Questions** tab on a chapter page (`ChapterDetail` → `QuestionBank`)
renders these by category, with inline MCQ practice (select → instant
correct/incorrect feedback) and a link into the answer composer for
descriptive questions. Premium chapters show a couple of free preview
questions per category, then a lock card pointing at `/student/subscription`.

## Descriptive answer composer

`src/pages/Student/QuestionAnswer/QuestionAnswer.tsx` is where a student
answers a 2/3/5-mark question:
- **Final answer** — a `MathEditor` (LaTeX input with a symbol toolbar and a
  live KaTeX-rendered preview), for typing the answer neatly.
- **Short explanation** — plain text.
- **Key steps** — an add/remove list of steps, each with its own `MathEditor`.
- **File upload** — `FileDropzone` (drag-and-drop, multi-file, PDF/image,
  optional per-file tag: diagram / graph / table / rough work / other) for
  photos or scans of handwritten work — the same component also powers the
  exam-level Answer Upload page.

Both `MathEditor` (`src/components/ui/MathEditor`) and `FileDropzone`
(`src/components/ui/FileDropzone`) are generic, reusable UI components — not
one-off page code — so they can be dropped into other answer flows later.

## Connecting a real backend

1. Add a `.env` file with `VITE_API_BASE_URL=https://your-api.example.com/v1`
2. Replace the mock data imports in each page with real `fetch`/`axios` calls to
   the matching endpoint in `src/utils/apiUrls.ts`
3. Swap `AuthContext`'s mock `login()` for a real call to `API.auth.login`

## Notes

- No external icon library — icons are a small hand-authored SVG set
  (`src/components/ui/Icon/Icon.tsx`) so the app has zero extra runtime dependencies
  beyond React and React Router.
- Fully responsive: sidebar collapses to an off-canvas drawer below ~1080px width.
