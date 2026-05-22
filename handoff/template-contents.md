# Template Contents: claude-workflow-site

Canonical content for all five templates. Phase 2 writes these to templates/. Phase 3 inlines them into index.html inside <details> elements. Check each template is under 8000 chars before inlining.

---

## Template 1: how-i-work-with-claude.md

File: `templates/how-i-work-with-claude.md`

```
# How I Work With Claude

<!--
This file is your personal operating agreement with Claude.
Read it at the start of any new conversation where you want Claude to know how you work.
Customize every section - the defaults here are starting points, not rules.
-->

## How to use this file

Paste the contents at the top of any new Claude conversation, or add it to your Claude project instructions. The more honestly you fill this out, the less time you spend correcting Claude's defaults.

---

## Communication rules

**One question per response.** If you need more than one thing clarified, ask the most important one first. Park the rest.

**Lead with a recommendation, not a list of options.** If I want tradeoffs, I'll ask. Don't preempt with "here are a few approaches."

**No preamble.** Skip "great question" and "I hear you." Just answer.

**Challenge me briefly if you disagree.** One clear sentence beats a paragraph of hedging.

**If I say "shorter" or "less" mid-conversation, cut your response length in half immediately.** Adjust on the next turn.

**Short by default.** Expand only when I ask.

---

## Formatting

[Customize these to match how you want responses formatted.]

- Hyphens, not em dashes
- "%" not "percent"
- No emojis unless I use one first
- Bullets only for actual lists, not for conversational answers
- Short sentences, active voice
- No markdown headers in short conversational replies

**Words I find meaningless - don't use them:**
[Fill in your own. Common offenders: Leverage, Optimize, Seamless, Robust, Innovative, Disruptive, Holistic, Cutting-edge, Deep dive, Move the needle, Circle back, Pain point, Quick win, Framework, Paradigm shift, Game-changer, Ecosystem, Actionable insights.]

---

## How we build together

My technical background: [one honest sentence - e.g., "I'm not a developer; I direct Claude to write and run code for me." or "I write Python but not frontend code."]

My primary tools: [List what you actually use - e.g., Desktop Commander, Claude Code, VS Code, etc.]

My build workflow:
1. [Describe your process - e.g., "We talk through design in chat first."]
2. [e.g., "Claude writes the code and runs it. I review and test."]
3. [e.g., "Iterate until it works the way I need."]

For any terminal command: give it as a copy-paste-ready code block. Never embed commands in prose.

---

## Planning partner mode

Before any code gets written:

1. I describe what I want. You restate it briefly and ask one clarifying question if needed.
2. We talk through design. You propose; I react. Iterate until I say it's right.
3. I say "lock it in" or something equivalent.
4. Then you write the code. Not before.

Don't skip to code. Don't propose alternatives I didn't ask for.

---

## What NOT to do

- Do not tell me to take a break, get sleep, or step away.
- Do not tell me to hire a developer or outsource the work.
- Do not summarize what I just told you back at me as proof you understood.
- Do not paste long blocks of code into chat for review unless I ask.
- Do not invent file names, function names, or variable names. If unsure, ask or look it up.
- [Add your own rules here.]

---

## My context

- Primary machine: [e.g., MacBook Pro M3, Windows 11]
- Stack I'm familiar with: [e.g., Python, JavaScript, or "none yet"]
- What I'm building: [one or two sentences]
- What I use Claude for most: [e.g., building tools, fixing bugs, writing, analysis]
```

---

## Template 2: walkaway-build-protocol.md

File: `templates/walkaway-build-protocol.md`

```
# Walkaway Build Protocol

<!--
Generic multi-phase build protocol for autonomous Claude Code sessions.
Customize phase structure, gate commands, and stop rules for your project.
Stack-specific commands are marked with [customize: ...] notes.
-->

Use this protocol for any build that will take more than 90 minutes or touch more than 8 files. For smaller builds, use your regular workflow instead.

---

## Core principles

1. Phases are planned up front. The build plan is the contract.
2. Each phase commits independently. A bad phase reverts without losing earlier work.
3. Gates between phases are hard. Failed gates stop the build.
4. Context is written to disk after every phase. The next phase reads the disk, not chat history.
5. Stop rules override continue rules. When in doubt, stop and write a failure report.

---

## Phase structure

1. **Phase 0: Prepare.** Read the plan. Verify branch state. Confirm test data exists. No code changes.
2. **Phase 1: Schema and types.** Data model changes. No business logic yet.
3. **Phase 2: Data helpers and actions.** DB helpers and server actions. No UI.
4. **Phase 3: Read-only UI.** Components that render data. No mutations yet.
5. **Phase 4: Mutation UI.** Forms, buttons, full user surface.
6. **Phase 5: Tests.** Unit tests for logic, integration tests for scope isolation, regression tests for any bug found during the build.
7. **Phase 6: Smoke test.** Live test against real systems. Not mocks. Real evidence required.
8. **Phase 7: Final report.** Build report written. PR opened if applicable.

Skip phases that don't apply. Don't add phases not on this list without justification in the plan.

---

## Gates between phases

Before moving from phase N to N+1:

1. `[customize: your typecheck command]` - zero new errors
2. `[customize: your lint command]` - zero new errors
3. `[customize: your test command]` - all tests pass
4. `[customize: your build command]` - required at phases 3, 4, 5, 7
5. `git status` clean (phase commit succeeded)
6. Phase report written to `handoff/phase-N-report-<feature>.md`
7. Build log entry appended to `handoff/build-log-<feature>.md`

Any failed gate triggers the failure protocol. No exceptions.

---

## Failure protocol

If a gate fails:

1. Attempt to fix. Max 2 attempts per phase.
2. If still failing after 2 attempts: STOP.
3. Write `handoff/failure-report-<feature>-phase-N.md` with: the phase that failed, which gates failed, full error output (not truncated), what was attempted, why it didn't work, recommendation for the human reviewer.
4. Leave the branch in its current state. Do not revert. The human decides next steps.

---

## Stop rules (hard stops, no retries)

Stop immediately if:

- A security issue is discovered outside the build scope
- Auth or data isolation becomes unclear
- A migration would touch production data destructively
- Build fails after 2 repair attempts
- A real secret is needed that wasn't in the env file
- Scope no longer matches the plan
- A major architecture assumption needs rewriting
- Phase 6 smoke fails and a fix ships without a regression test pinning the missed contract
- Phase 6 is marked complete without real-system evidence
- [Add project-specific stop rules here]

---

## Continue rules

If all gates pass and no stop rule triggered:

1. Run the gates
2. Commit the phase
3. Push the branch
4. Write the phase report
5. Append to the build log
6. Move to the next phase

---

## Smoke test requirements (Phase 6)

Phase 6 must execute a live test, not document one.

Required evidence - at least one of:
- Real database row count from a live query
- Real API response excerpt showing expected shape
- Real timestamp or ID from the live system

Without one of these, Phase 6 is not done.

If live testing is genuinely impossible (missing production credentials), document that explicitly in the build plan stop rules. Do not silently skip.

---

## Build report format (Phase 7)

Write identical content to both:
- `handoff/build-report-<feature>.md` (permanent, feature-specific)
- `handoff/build-report-CURRENT.md` (overwritten on every build - always points to latest)

Report sections:
- TL;DR: one paragraph, what was built, current state, what to do next
- Phases executed: each phase with status, commit SHA, gates passed
- Files changed: grouped by phase
- Smoke test results: what was hit, what was expected, what was found
- Known issues / deferred: anything not fixed
- What to do next: specific actions for the human

---

## What Claude can do autonomously

YES: Continue through phases when all gates pass. Commit each clean phase. Push the branch. Open or update a PR. Run smoke tests. Write phase reports and build logs. Stop on any failure.

NO: Merge to main. Deploy directly to production. Run destructive migrations (DROP, DELETE without WHERE, TRUNCATE). Change auth, billing, DNS, or any secret. Send messages to real users. Retry endlessly (max 2 fix attempts per gate). Silently skip failed tests. Expand scope beyond the plan.
```

---

## Template 3: walkaway-build-plan-template.md

File: `templates/walkaway-build-plan-template.md`

```
# Walkaway Build Plan: <FEATURE NAME>

<!--
Copy this template, rename to handoff/build-plan-<feature>.md, fill in every section.
Hand it to Claude Code with a launch prompt. Sparse plans produce unfocused builds.
-->

## Feature name

`<short-kebab-case-name>` - used in branch name, file names, commit messages

## Branch name

`feature/<feature-name>`

## Goal

One sentence. What does the user gain when this is done?

## Non-goals

Things that look related but are not in scope:
- ...

## Acceptance criteria

How we know the build is done:
- ...

## Expected files touched

Soft budget. If exceeded, justify in phase reports.

Expected: N files. Hard ceiling: N+4.

- `path/to/file.ext`
- ...

## Phases

### Phase 1: Schema and types

What changes:
- ...

Files expected:
- ...

Acceptance: migration applies cleanly, types compile.

### Phase 2: Data helpers and actions

What changes:
- ...

Files expected:
- ...

Acceptance: typecheck passes. Data isolation enforced in every helper.

### Phase 3: Read-only UI

What changes:
- ...

Files expected:
- ...

Acceptance: page renders data, build passes, no mutations yet.

### Phase 4: Mutation UI

What changes:
- ...

Files expected:
- ...

Acceptance: full user surface works in dev. Build passes.

### Phase 5: Tests

What to test:
- Unit: [which calculations, parsers, logic functions]
- Integration: [which isolation cases]
- Regression: [any bug found during this build]

Files expected:
- `tests/<feature>-*.test.<ext>`

Acceptance: all tests pass. Full suite still green.

### Phase 6: Smoke test

What to verify:
- Happy path: [specific URL or command]
- Failure case: [what proves isolation works]

Files expected:
- `handoff/smoke-test-<feature>.md`

Acceptance: smoke ran with real-system evidence.

### Phase 7: Final report

What to do:
- Write build report (both files: build-report-<feature>.md and build-report-CURRENT.md)
- Open PR with full description

Files expected:
- `handoff/build-report-<feature>.md`
- `handoff/build-report-CURRENT.md`

Acceptance: PR URL in build report. Branch clean.

## Do NOT build

- ...

## Stop rules (build-specific)

Stop immediately if:
- ...

## Required env vars

- ...

## Required test data

- ...
```

---

## Template 4: CLAUDE.md.skeleton

File: `templates/CLAUDE.md.skeleton`

```
# CLAUDE.md

<!--
Top-level project context. Place at the root of every project repo.
Claude reads this first at the start of any new thread on this project.
Fill in each section honestly. Specific beats vague every time.
-->

## What this is

<!-- TODO: One paragraph. What does this project do? What problem does it solve? -->
[Describe the project in 2-4 sentences.]

## Who uses it

<!-- TODO: Not just "users" - who specifically? What do they do all day? What are they trying to accomplish with this tool? -->
[Describe the primary user and their actual workflow.]

## Current state

<!-- TODO: What works today? What's in progress? What's broken? -->
Live at: [URL if deployed, or "local only - not yet deployed"]

What's working:
- [Feature or capability 1]
- [Feature or capability 2]

In progress:
- [What's being built right now]

Known issues:
- [Anything broken or incomplete]

## Key constraints

<!-- TODO: Hard rules Claude should never violate. Tech decisions already locked in. Things that are off limits. -->
- [e.g., "No business logic in UI components"]
- [e.g., "All DB queries must include the user's team ID"]
- [e.g., "Do not add dependencies without asking first"]

## Glossary

<!-- TODO: Terms that have non-obvious meanings in this project. Define anything that means something different here than it does in plain English. -->
- [Term]: [Definition as used in this project]
- [Term]: [Definition as used in this project]

## Tech stack summary

<!-- TODO: Just the headlines. Full detail lives in TOOLCHAIN_OVERVIEW.md. -->
- Frontend: [e.g., Next.js 14, React]
- Backend: [e.g., Next.js server actions, or FastAPI]
- Database: [e.g., PostgreSQL via Supabase, or SQLite]
- Hosting: [e.g., Vercel, Fly.io, Streamlit Cloud]
- Auth: [e.g., Clerk, or none yet]

## Repo structure

<!-- TODO: Top-level folders with one-line descriptions. -->
```
[folder]/    [what it contains]
[folder]/    [what it contains]
```
```

---

## Template 5: TOOLCHAIN_OVERVIEW.md.skeleton

File: `templates/TOOLCHAIN_OVERVIEW.md.skeleton`

```
# TOOLCHAIN_OVERVIEW.md

<!--
Stack documentation for this project.
Claude reads this when it needs to know what tools and versions are in use.
Update "Last updated" and "Current state" whenever the stack changes.

Last updated: [YYYY-MM-DD]
Current state: [one sentence - e.g., "Local dev only" or "Live at production.example.com"]
-->

## Frontend

<!-- TODO: The UI layer. Framework, version, key libraries. -->
- Framework: [e.g., Next.js 14 App Router, or Streamlit 1.50, or plain HTML]
- UI library: [e.g., shadcn/ui, or "none - hand-rolled"]
- Styling: [e.g., Tailwind CSS, or CSS Modules, or inline styles]
- Key libraries: [e.g., Zustand for state, React Hook Form for forms]

## Backend

<!-- TODO: Where server-side logic lives. -->
- Approach: [e.g., Next.js Server Actions, or Express, or serverless functions, or Python scripts]
- Runtime: [e.g., Node.js 20, or Python 3.11]
- Key libraries: [e.g., Zod for validation, Drizzle for ORM, pandas for data]

## Database

<!-- TODO: What database, what client, what schema. -->
- Database: [e.g., PostgreSQL via Supabase, or SQLite, or MongoDB, or none]
- Client: [e.g., supabase-js, or Prisma, or raw pg driver]
- Schema location: [e.g., supabase/migrations/, or prisma/schema.prisma]
- Backup policy: [e.g., "Supabase manages daily backups" or "manual, run before migrations"]

## Hosting

<!-- TODO: Where this runs. -->
- Production: [e.g., Vercel, Fly.io, Streamlit Cloud, or "not deployed yet"]
- URL: [production URL, or "N/A"]
- Deploy method: [e.g., "git push to main triggers Vercel" or "manual: vercel --prod"]
- Preview deploys: [e.g., "automatic on every PR" or "none"]

## Auth

<!-- TODO: How users authenticate, if at all. -->
- Provider: [e.g., Clerk, Supabase Auth, NextAuth, or "none - no login required"]
- Session strategy: [e.g., JWT, cookie-based]
- Multi-tenant: [yes/no - if yes, describe how tenant isolation is enforced]

## Billing

<!-- TODO: If this project charges money. -->
- Provider: [e.g., Stripe, or "none"]
- Products: [e.g., one monthly plan at $49/mo, or "no billing yet"]

## Third-party APIs

<!-- TODO: External services this project calls. -->
| Service | Purpose | Credential |
|---------|---------|------------|
| [e.g., Google Places] | [e.g., address autocomplete] | [e.g., GOOGLE_PLACES_API_KEY in .env] |

## CLI tools used

<!-- TODO: Command-line tools needed to work on this project. -->
- [e.g., `vercel` - Vercel CLI for deployments and env management]
- [e.g., `supabase` - Supabase CLI for migrations and local dev]
- [e.g., `gh` - GitHub CLI for PR management]

## Local dev setup

<!-- TODO: Step-by-step for a fresh machine. Specific enough that Claude could run these. -->

1. Clone: `git clone [repo-url]`
2. Install dependencies: `[e.g., pnpm install, or pip install -r requirements.txt]`
3. Copy env: `cp .env.example .env.local` and fill in values
4. [Any additional steps - e.g., "Run supabase start for local DB"]
5. Start dev server: `[e.g., pnpm dev, or streamlit run Home.py]`

Dev server runs at: [e.g., http://localhost:3000]

## Known local dev issues

<!-- TODO: Gotchas that will waste time if someone doesn't know about them. -->
- [e.g., "Need to run `supabase start` before the dev server or DB calls fail"]
- [e.g., "Google Places key must have localhost in the allowed domains list"]
```
