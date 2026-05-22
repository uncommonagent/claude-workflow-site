# Build Plan: claude-workflow-site

Single-page static site for sharing Jim's Claude workflow with friends and other builders. Hosts the pitch, the prompt to paste into a fresh Claude chat, install warnings, and five generic markdown templates (how-i-work-with-claude, walkaway build protocol, build plan template, generic CLAUDE.md skeleton, generic TOOLCHAIN_OVERVIEW.md skeleton).

---

## Feature name

`claude-workflow-site`

## Repo

New repo: `~/Projects/claude-workflow-site/` (already created). GitHub: `uncommonagent/claude-workflow-site` (public).

## Branch name

`main` (single-branch, no feature branches for this build)

## Goal

A clean, single-page HTML site at a free `*.vercel.app` URL that Jim can send to non-developer friends (a fractional recruiter, a builder rep, and a loan officer). Site explains how Jim works with Claude, gives them a prompt to paste into a fresh Claude chat, warns them about install pitfalls, and provides five generic markdown templates they can adapt. Every code/prompt block has a one-click copy button.

## Non-goals

- Multi-page navigation
- Dark mode toggle (single light theme is fine)
- User accounts, analytics, contact forms
- Custom domain (use free vercel.app subdomain)
- Markdown rendering from external files (inline the markdown as pre-formatted text inside HTML)
- Backend, database, or any server-side logic
- Tailwind, React, or build step. Plain HTML + CSS + minimal vanilla JS only.
- Hosting on Uncommon Agent or Throughline domains

## Acceptance criteria

- Site renders at a free `*.vercel.app` URL after `vercel --prod`
- Single `index.html` file, single `styles.css` file, single `script.js` file for copy buttons
- Five sections in this order: (1) The pitch, (2) The prompt, (3) Install warnings, (4) The five markdown templates, (5) FAQ
- Every code block, prompt block, and template has a "Copy" button that copies the raw content to clipboard
- Copy buttons give visual feedback ("Copied!" for 1.5 seconds, then reverts)
- Mobile-responsive (readable on iPhone-width screens, no horizontal scroll)
- Renders without JavaScript (copy buttons just don't work; content is still readable)
- No external CSS frameworks, no external JS libraries
- Lighthouse score 90+ on Performance and Accessibility (run via Chrome dev tools, document in build report)
- Site deployed and accessible at a public URL before PR is opened
- README.md at repo root documents how to update content and redeploy

## Expected files touched

Soft budget. Hard ceiling: 10 files.

- `index.html` (the page)
- `styles.css` (typography, layout, colors, mobile breakpoints)
- `script.js` (copy-to-clipboard handlers)
- `vercel.json` (static-site config, cache headers)
- `README.md` (how to edit + redeploy)
- `.gitignore` (node_modules-style ignores even though no node)
- `templates/how-i-work-with-claude.md` (generic version, referenced by site copy)
- `templates/walkaway-build-protocol.md` (generic version)
- `templates/walkaway-build-plan-template.md` (generic version)
- `templates/CLAUDE.md.skeleton` (generic project-context skeleton)
- `templates/TOOLCHAIN_OVERVIEW.md.skeleton` (generic stack-doc skeleton)

The templates folder exists for two reasons: source of truth that gets copied into the HTML inline, and a place future visitors can browse if they want to fork the repo.

## Content brief (what goes on the page)

### Section 1: The pitch
Headline: "How I Build With Claude"
Subhead: "A workflow for people who want Claude to ship real work, not vibes"
Body: 4-6 paragraphs explaining the three principles (MDs as onboarding doc, builds as contracts, stop rules so Claude stops). Exact copy provided in `handoff/site-copy.md` (see Phase 1).

### Section 2: The prompt
Headline: "Step 1: Paste this prompt into a fresh Claude chat"
Subhead: "Have Claude help you adapt this workflow to how YOU actually use it"
Body: Single large code block with the full prompt (the one Jim and I built earlier, with bracketed placeholders). Copy button at top-right of the block.

### Section 3: Install warnings
Headline: "Step 2: Before you install anything"
Subhead: "Read this before adding any MCP server, CLI tool, or Claude integration"
Body: 3 numbered install rules, then commands for Mac and Windows backup, then a "Tools Jim recommends" sub-section listing Desktop Commander, Claude Code, and Codex with their official sources. Each install command in its own copy-able block. End with the "blank window" troubleshooting note.

### Section 4: The five markdown templates
Headline: "Step 3: The templates"
Subhead: "Adapt these to your own workflow. Don't try to fill out all of them on day one."
Five collapsible cards, one per template. Each card has a title, a one-sentence description, and a "View / Copy" toggle that reveals the full markdown content in a code block with a copy button.

### Section 5: FAQ
Headline: "Common questions"
4-6 collapsible Q&A items:
- "Do I need to be a developer to use this?"
- "What's Desktop Commander and why do I need it?"
- "What if my Claude desktop app opens to a blank window after installing something?"
- "How do I know which template files to create first?"
- "Can I share this with other people?"
- "How do I reach Jim if I have questions?"

## Phases

### Phase 1: Content drafting

Draft `handoff/site-copy.md` with the exact text for all five sections of the site. This is the human-readable content that gets embedded into `index.html` in Phase 3. Include:
- Pitch body text (4-6 paragraphs)
- The full prompt (verbatim from the conversation Jim and I had)
- Install warnings (verbatim)
- One-sentence description for each of the five templates
- FAQ Q&A pairs (4-6 of them)

Also draft `handoff/template-contents.md` which contains the actual content of all five generic markdown templates. These are the canonical source.

Acceptance: both files exist, complete, ready to copy into HTML in Phase 3. Jim does not need to review these — they're internal artifacts.

### Phase 2: Generic markdown templates

Write the five real `.md` and `.skeleton` files into `templates/`:

1. `how-i-work-with-claude.md` — generic version of Jim's file. Strip all references to Jim, Throughline, Uncommon Agent, specific tools (other than Desktop Commander as a generic recommendation), and specific projects. Keep the structural pattern: communication rules, banned words section (leave as a placeholder with examples), planning partner mode, what NOT to do. Make it 60-80% as long as Jim's original. Include a "How to use this file" header explaining the user should personalize each section.

2. `walkaway-build-protocol.md` — generic version of `WALKAWAY_BUILD_PROTOCOL.md`. Keep the seven-phase structure, the stop rules concept, the Codex review integration, the mandatory smoke tests. Strip out Throughline-specific commands (replace `pnpm` with `<your package manager>`, replace `supabase` migration steps with `<your migration tool>`, etc.). Make stack-agnostic notes inline saying "customize for your stack."

3. `walkaway-build-plan-template.md` — the template Jim already uses, with all sections kept (Feature name, Branch name, Goal, Non-goals, Acceptance criteria, Expected files, Phases 1-7, Do NOT build, Stop rules, Required env vars, Required test data). Strip stack specifics.

4. `CLAUDE.md.skeleton` — top-level project context skeleton with prompts in `<!-- TODO: ... -->` comments for each section. Sections: Project name, what it does, who the user is, current state, key constraints, glossary of project-specific terms.

5. `TOOLCHAIN_OVERVIEW.md.skeleton` — stack doc skeleton. Sections: Frontend, Backend, Database, Hosting, Auth, Billing, Third-party APIs, CLI tools used, Local dev setup.

Each file starts with a 2-3 line comment at the top explaining what it's for and reminding the user to personalize.

Acceptance: all five files exist in `templates/`. Jim can spot-check one or two but does not need to review all five line-by-line. Quality bar: usable by a non-developer with light customization.

### Phase 3: Build the HTML page

Single `index.html` file:
- Semantic HTML5 (header, main, section, footer)
- Inline all content from `handoff/site-copy.md` (no fetching, no markdown rendering at runtime)
- Inline all template content inside collapsible `<details>` elements (no external file loading)
- Code blocks use `<pre><code>` with a "Copy" button positioned absolute top-right
- Collapsible sections use native `<details>` / `<summary>` (no JS framework)
- All links open in new tab if external

Inline images: none. Decorative emoji: none (Jim's banned list). Use simple Unicode characters like `→` or `✓` sparingly.

Header: "How Jim Builds With Claude" + one-line subhead.
Footer: small text, "Built by Jim Ross / Uncommon Agent. Last updated [date]. Source: github.com/uncommonagent/claude-workflow-site"

Acceptance: opens in any modern browser as a static file with no server. Renders correctly with content from Phase 1.

### Phase 4: Styling + copy buttons

Single `styles.css`:
- System font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)
- Single light theme: cream/ivory background, dark text, accent color for headings (subtle blue like `#1e3a8a`)
- Max content width 720px, centered
- Generous line-height (1.6), generous section spacing
- Code blocks: monospace, light gray background, rounded corners, 12px padding, 14px font
- Copy buttons: small rounded buttons, top-right of code block, gray default state, green when "Copied!"
- Collapsible cards: subtle border, hover state
- Mobile breakpoint at 640px: reduce font sizes by ~10%, remove side padding

Single `script.js`:
- Single event listener delegating clicks on `.copy-btn` elements
- Reads the `data-target` attribute pointing to the code block ID
- Uses `navigator.clipboard.writeText()`
- Swaps button text to "Copied!" for 1500ms then reverts
- No build step, no bundler, no framework

Acceptance: visual design is clean and readable. Copy buttons work on all code blocks and template content. Mobile layout is usable on iPhone width (375px).

### Phase 5: Deploy

- Add `vercel.json` for static hosting: `{ "cleanUrls": true, "trailingSlash": false }`
- `git init`, initial commit, push to new GitHub repo `uncommonagent/claude-workflow-site` (public)
- Run `vercel --prod` from repo root to deploy
- Capture the production URL
- Add the URL to README.md

Acceptance: live site renders at a public URL. URL captured for Jim. Lighthouse score ≥90 on Performance and Accessibility (run Lighthouse via Chrome dev tools and document the actual numbers in the build report).

### Phase 6: Smoke test

- Open the live URL in Chrome desktop. Verify all 5 sections render. Verify all copy buttons work (click 3-4 of them, paste into a scratchpad, confirm correct content).
- Open the live URL on iPhone (or Chrome dev tools mobile emulator at 375px). Verify no horizontal scroll, readable text, copy buttons tappable.
- Open the live URL with JavaScript disabled in Chrome dev tools. Verify content is still readable (copy buttons may not work, that's acceptable degradation).
- Click into each of the 5 template `<details>` sections. Verify content is correct and complete.
- Document results in `handoff/smoke-results-claude-workflow-site.md`.

Acceptance: all smoke checks pass. Document with screenshots-equivalent text notes.

### Phase 7: Final report and handoff

- Write `handoff/build-report-claude-workflow-site.md`
- Write `handoff/build-report-CURRENT.md` (identical content)
- Include: production URL, GitHub repo URL, file list, Lighthouse scores, smoke results, anything deferred
- Open a PR if there's a branch, otherwise tag a release `v0.1.0` on main

Acceptance: build report exists with URL Jim can immediately share with friends.

## Do NOT build

- Multi-page site or nested navigation
- Search functionality
- Markdown-to-HTML rendering at runtime (Marked.js, markdown-it, etc.)
- React, Next.js, Vue, Svelte, or any framework
- Tailwind, Bootstrap, or any CSS framework
- Custom domain configuration (Jim said "whatever is easiest" — use vercel.app subdomain)
- Analytics (Google Analytics, Plausible, anything)
- Email signup forms or any data collection
- Authentication
- Discord/Slack integrations
- Cookie banners (no cookies set)
- Any backend, serverless function, or API route
- Custom fonts (use system font stack only)
- SVG illustrations or generated graphics
- Light/dark theme toggle
- Print stylesheet
- RSS feed
- Sitemap.xml (Vercel can auto-generate if needed later)

## Stop rules

Stop immediately if:
- Lighthouse Performance score is below 80 after styling is complete. Means something is loading inefficiently and needs investigation before deploy.
- Copy buttons don't work in Safari or Firefox. Means `navigator.clipboard.writeText` polyfill is needed.
- Any template content exceeds 8000 characters when inlined. Means the templates need to be linked externally instead of inlined.
- Mobile layout breaks below 320px width. Means responsive design needs work.
- Vercel deploy fails twice in a row.

## Required env vars

None. Static site, no secrets.

## Required test data

None.
