# PIXEL EDU × RoHub migration audit

## Scope and guardrails

- Target repository: `nklinhcgblink-sudo/PIXEL` (keep existing repository).
- Existing backend: PIXEL's current Supabase project; do not replace project URL, keys, tables, auth settings, or RLS policies without verified need and explicit migration plan.
- Reference repository: `HOANGJKERD/roflix-hub`.
- Target: PIXEL EDU for Vietnamese high-school learning, with shared RoHub platform capabilities where appropriate.
- This migration is developed on `feat/rohub-deep-migration`; do not merge to `main` until checks and review pass.

## Source inventory (verified from repository files)

### PIXEL

- React 18, TypeScript 5.7, Vite 6; `npm run build` runs `tsc -b && vite build`.
- Supabase JS v2 is installed as a dependency.
- App currently uses a local React state page switcher in `src/app/App.tsx`.
- Login and registration forms are currently demo flows: submit navigates to dashboard; no call to Supabase Auth was observed in the inspected App component.
- `src/lib/supabase.ts` reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (or legacy anon key) from environment; it falls back to placeholder values when missing.
- `.env.example` documents the environment variables. Do not commit real environment secrets.
- `package.json` exposes build, typecheck, and Vitest scripts; repository-side execution has not yet been verified in this audit.

### RoHub / RoFlix reference

- `index.html`, `roflix.html`, `admin.html`, and `rohub-studio.html` are standalone HTML pages.
- `roflix.html` loads Tailwind via CDN, multiple CSS files, Supabase JS v2 via CDN, and project-local JavaScript.
- `js/config/supabase.config.js` and `js/core/supabase.js` configure a separate RoHub Supabase project. Those credentials/configuration must not be copied into PIXEL.
- `css/base-variables.css` and `css/liquid-glass.css` define dark surfaces, glass treatments, transitions, and amber/violet accents.
- RoHub Admin includes an admin-auth gate in its UI and modules for users, movie management, analytics, moderation, system health, RoTruyen and audit logs. Each operation still needs code- and backend-level verification before reuse.
- RoHub Studio describes theme editing, preview, draft/publish and rollback concepts. These concepts are not proof that every persistence and rollback path is production-safe.
- README explicitly cautions that described features may be planned or incomplete.

## Reuse decisions

1. **Port visual language, not the legacy page runtime:** convert design tokens and selected visual patterns into scoped React CSS/components.
2. **Rebuild navigation in React:** typed routes/layouts and page guards, rather than copying inline `onclick` handlers.
3. **Reuse patterns, not film business logic:** replace movies, watch history and schedules with subjects, lessons, quizzes, enrollments and learning progress.
4. **Use PIXEL's existing Supabase client only:** authenticate through the current project and verify schema/RLS before wiring data features. Never import the RoHub Supabase URL/key.
5. **Admin and Studio are later phases:** require server-side/RLS authorization, auditability, safe draft/publish separation and verified rollback before claiming they work.

## Commit plan

- Phase 1: complete — migration branch and source inventory committed.
- Phase 2: partial — hash routes and browser history added; a full shared shell/admin layout remains future work.
- Phase 3: partial — sign-up/sign-in/sign-out use PIXEL's existing Supabase Auth client; session state guards the dashboard; profile creation is attempted under existing RLS.
- Phase 4: partial — published subjects/lessons load from the existing schema; dashboard reads profile/progress counts. Quiz UI is explicitly marked as a demo because there is no safe client-facing grading path yet.
- Phase 5: pending — education admin tools and theme preview must wait for an authorization model and secure content-management paths.
- Phase 6: in progress — GitHub status checks were successful for commit `1f0a5b3`; later commit `d0cd1ff` still needs its own check. A local build could not run in this environment because GitHub DNS/network access was unavailable.

## Verification status

This document is a source-code inventory, not a production certification. No claim is made that the RoHub or PIXEL app currently builds, that auth works, that RLS is correct, or that a deployment is live. Those checks remain to be run and reported individually.


## Live Supabase audit (2026-10-23)

Project `sblkdgssieogtfoxsfov` was confirmed ACTIVE_HEALTHY and was not modified by this migration. The public schema already contains `edu_profiles`, `edu_subjects`, `edu_lessons`, `edu_quiz_questions`, `edu_quiz_attempts`, `edu_learning_progress`, `edu_badges`, `edu_user_badges`, `edu_content_reports`, and `edu_admin_roles`; RLS is enabled on these tables. At inspection time there were 6 published subjects, 6 published lessons, and 6 published questions; no student profiles or admin-role rows existed.

Security findings:

- `edu_quiz_questions` has RLS enabled but no policies. This prevents direct client reads, which is preferable to exposing `answer_index` in a public select. A secure grading endpoint/RPC is still needed before real quiz submission can be enabled.
- `edu_admin_roles` has RLS enabled but no policies and zero rows. Do not assume any user has admin rights. Admin screens and content mutations must not be enabled until a server-enforced role policy is designed.
- Supabase advisors reported four foreign keys without covering indexes and two unused indexes; these are advisory performance findings, not changes made by this migration.
- RoHub's separate Supabase project/configuration was inspected but not copied or connected.
