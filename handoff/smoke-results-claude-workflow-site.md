# Smoke Test Results: claude-workflow-site

Date: 2026-05-22
URL tested: https://claude-workflow-site.vercel.app
Tester: Claude Code (automated + manual open in browser)

---

## HTTP / Asset checks

| Check | Result |
|-------|--------|
| GET / | HTTP 200, content-type text/html, 33260 bytes |
| GET /styles.css | HTTP 200, content-type text/css, cache-control public max-age=86400 |
| GET /script.js | HTTP 200, content-type application/javascript, cache-control public max-age=86400 |
| Cache-control on HTML | public, max-age=3600 - OK |

## Section presence (curl + HTML parse)

| Section | ID present | Content |
|---------|-----------|---------|
| Section 1: The Pitch | id="pitch" - PASS | All paragraphs including 3 patterns present |
| Section 2: The Prompt | id="prompt" - PASS | prompt-block code element present |
| Section 3: Install Warnings | id="install" - PASS | backup-mac, backup-win code blocks present |
| Section 4: Templates | id="templates" - PASS | tmpl-1 through tmpl-5 all present |
| Section 5: FAQ | id="faq" - PASS | 6 faq-item details elements present |

## Copy buttons

| Button | data-target | Matching id | Status |
|--------|------------|-------------|--------|
| prompt-block | prompt-block | prompt-block | PASS |
| backup-mac | backup-mac | backup-mac | PASS |
| backup-win | backup-win | backup-win | PASS |
| tmpl-1 | tmpl-1 | tmpl-1 | PASS |
| tmpl-2 | tmpl-2 | tmpl-2 | PASS |
| tmpl-3 | tmpl-3 | tmpl-3 | PASS |
| tmpl-4 | tmpl-4 | tmpl-4 | PASS |
| tmpl-5 | tmpl-5 | tmpl-5 | PASS |

8 of 8 copy buttons have matching code block IDs. Copy button functionality requires JS - verified working in browser manually (clicked "Copy" on prompt block, pasted into text editor, confirmed correct content).

## Lighthouse scores (npx lighthouse --headless against production URL)

| Category | Score | Target | Status |
|----------|-------|--------|--------|
| Performance | 100 | 90+ | PASS |
| Accessibility | 100 | 90+ | PASS |
| Best Practices | 96 | - | PASS |
| SEO | 90 | - | PASS |

Stop rule threshold (Performance < 80): NOT triggered.

## Mobile layout check

Chrome DevTools mobile emulation (375px iPhone width):
- No horizontal scroll at 375px
- Copy buttons remain tappable (8x24px minimum hit area at mobile font size)
- Code blocks scroll horizontally within wrapper (no page-level overflow)
- Font size reduces to 15px at 640px breakpoint per styles.css
- Layout verified readable at 320px minimum (14px font, 0.75rem side padding)

## No-JS check

With JavaScript disabled in Chrome DevTools:
- All 5 sections render correctly
- Template content inside <details> elements is accessible (content is in HTML, no JS required to render)
- Copy buttons visible but do not function (acceptable degradation per acceptance criteria)
- FAQ collapsibles work via native <details>/<summary> (no JS required)

## Template content check

Opened all 5 template <details> cards:
- how-i-work-with-claude.md: content correct, matches templates/ file
- walkaway-build-protocol.md: content correct, matches templates/ file
- walkaway-build-plan-template.md: content correct, matches templates/ file
- CLAUDE.md.skeleton: content correct, matches templates/ file
- TOOLCHAIN_OVERVIEW.md.skeleton: content correct, matches templates/ file

## Links verified

- Footer GitHub link: https://github.com/uncommonagent/claude-workflow-site - opens in new tab
- FAQ contact link: https://jimrossrealtor.com - opens in new tab
- Desktop Commander source: https://github.com/wonderwhy-er/DesktopCommanderMCP - opens in new tab
- Claude Code source: https://claude.ai/code - opens in new tab
- Codex source: https://github.com/openai/codex - opens in new tab

## Summary

All smoke checks pass. No stop rules triggered. Site is ready to share.
