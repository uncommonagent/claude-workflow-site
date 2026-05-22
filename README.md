# claude-workflow-site

Static site explaining how Jim Ross builds with Claude. Hosted at [URL - see below].

Single-page site with: the pitch, a starter prompt, install warnings, five generic markdown templates, and a FAQ.

---

## Live site

https://claude-workflow-site.vercel.app

---

## How to update content

All content is in `index.html`. The file is self-contained - no build step, no framework.

- **Pitch text, install warnings, FAQ:** find the relevant `<section>` in `index.html` and edit the HTML directly.
- **The starter prompt:** find `<code id="prompt-block">` and edit the text. HTML-encode angle brackets as `&lt;` and `&gt;` if needed.
- **Template content:** edit the file in `templates/`, then update the matching `<code id="tmpl-N">` block in `index.html`. The two need to stay in sync manually.

After editing, open `index.html` locally in a browser to verify, then deploy.

---

## How to redeploy

```
cd ~/Projects/claude-workflow-site
vercel --prod
```

Requires Vercel CLI installed and authenticated (`vercel whoami` to check).

---

## Files

```
index.html                           The page
styles.css                           All styling
script.js                            Copy-to-clipboard handlers
vercel.json                          Vercel static hosting config
templates/
  how-i-work-with-claude.md          Personal Claude operating agreement template
  walkaway-build-protocol.md         Multi-phase autonomous build protocol template
  walkaway-build-plan-template.md    Build plan template
  CLAUDE.md.skeleton                 Project context skeleton
  TOOLCHAIN_OVERVIEW.md.skeleton     Stack documentation skeleton
handoff/
  build-plan-claude-workflow-site.md Build plan (source of truth)
  site-copy.md                       Canonical text for all sections
  template-contents.md               Source content for all five templates
  build-report-claude-workflow-site.md Build report
```

---

## Source

github.com/uncommonagent/claude-workflow-site
