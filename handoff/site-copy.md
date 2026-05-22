# Site Copy: claude-workflow-site

Canonical text for all five sections of index.html. Phase 3 embeds this content verbatim.

---

## Section 1: The Pitch

**Page headline:** How Jim Builds With Claude
**Page subhead:** A framework for people who want Claude to ship real work, not talk about it

---

**Section headline:** How I Build With Claude
**Section subhead:** A workflow for people who want Claude to ship real work, not vibes

---

Most people use Claude the same way they used Google search: type something in, read the output, type something else. They get answers but not work. This page is about getting work - finished features, shipping code, real tools that do things.

The difference between Claude as a search box and Claude as a builder comes down to context. Claude does not remember your last conversation. It does not know your codebase, your communication preferences, or what you tried last week that didn't work. Every new thread starts cold. If you don't tell Claude what it needs to know, it guesses. Guesses slow you down.

This workflow fixes that with three patterns.

**Pattern 1: Context files as onboarding docs.** Before any build starts, a set of markdown files tells Claude what it needs to know: how you like to communicate, what the project does, what stack you're on, what decisions you've already made and why. Claude reads these at the start of every thread. The conversation picks up where it left off instead of starting from scratch every time.

**Pattern 2: Build plans as contracts.** Before any code gets written, you write down exactly what the build is supposed to do, what it is not supposed to do, and how you'll know it's done. Claude treats this as a binding scope document - not a suggestion. If something comes up during the build that's not in the plan, Claude stops and asks rather than expanding scope on its own. This prevents the classic failure mode where you ask for one thing and get three things you didn't want.

**Pattern 3: Stop rules.** Every build defines specific conditions under which Claude halts and waits for you. Failed tests, unexpected API behavior, a security issue outside the build scope - anything that requires a human decision. Claude does not push through stop conditions or work around them. It stops, writes a report of what it found, and waits. This is what makes it safe to walk away during a long build.

You do not need to be a developer to use this. I'm a real estate agent. The key skill is describing what you want clearly and reviewing what Claude ships. Claude handles the code. You handle the direction.

The five sections below give you what you need to get started. Work through them in order the first time. After that, use what's useful and leave the rest.

---

## Section 2: The Prompt

**Section headline:** Step 1: Paste this prompt into a fresh Claude chat
**Section subhead:** Have Claude help you adapt this workflow to how YOU actually use it

---

```
I'm starting to use Claude more seriously for building tools and software. A friend who builds with Claude every day shared his workflow markdown files with me. The files are in this folder: [insert path or GitHub URL].

The files describe how he works with Claude: his communication preferences, his build planning protocol, and his templates for capturing project context.

I'd like you to read all of them, then have a conversation with me about whether his approach is the right starting point for me, or whether I should adapt it to fit how I'll actually use Claude.

Before you read the files, here is context on me:
- What I'm trying to build: [insert one or two sentences]
- My technical background: [insert one or two sentences, honest about coding ability]
- How I currently use Claude: [casual chat, building prototypes, production code, etc.]
- What I want Claude to do more of: [insert one or two sentences]
- What frustrates me about how Claude works for me today: [insert one or two sentences]

After you read the files, please answer these in order:

1. What parts of his workflow translate directly to my situation? Don't be polite about it. If something is overkill for my level or use case, say so.

2. What parts should be cut or simplified for me?

3. What parts are missing for my specific use case that his files don't address?

4. Based on all of that, draft a customized version of `how-i-work-with-claude.md` for me. Use his structure but rewrite the content to fit my actual preferences, communication style, and goals. Ask me one question at a time if you need more from me to write it well. Do not ask multiple questions at once.

5. Once that file is drafted, tell me what other files from his set I should adapt next and in what order.

Beyond the files you can read, my friend also uses a set of project-specific living documents that he did not share because they only make sense in the context of a specific project. Once I have a real project going, I will need to create my own versions. Here is what each one is for:

- `CLAUDE.md`: top-level project context. What the project is, what it does, who the user is, current state, key constraints. Lives at the root of the project repo. Claude reads this first in every new thread.

- `TOOLCHAIN_OVERVIEW.md`: the stack. Frontend framework, backend, database, hosting, auth, billing, third-party APIs, CLI tools used. Anything Claude needs to know to write code that fits the existing system.

- `ROADMAP.md`: what's in flight, what's queued, what's deferred. Updated as priorities shift.

- `DECISIONS.md`: dated entries explaining why specific architecture, library, or product decisions were made. Newest at the top. Prevents Claude from suggesting reversals of decisions already made.

- `SESSION_LOG.md`: running diary of what happened in major build sessions. Newest at the top. Captures the "why" behind recent commits in a way git history can't.

- `project-state-YYYY-MM-DD.md`: dated snapshots of where the project stands at major milestones. Created at the end of significant sessions.

- `next-thread-kickoff.md`: the explicit instructions for what the next Claude thread should do first. Written at the end of the current thread when work is being handed off.

After we finish drafting my customized `how-i-work-with-claude.md`, please also help me understand:

6. Of these seven project-specific files, which ones should I create on day one of my first real project, and which can wait until I actually need them?

7. For each file I create, give me a template skeleton I can fill in as I go.

Do not start writing code or building anything. This is a planning conversation only.
```

---

## Section 3: Install Warnings

**Section headline:** Step 2: Before you install anything
**Section subhead:** Read this before adding any MCP server, CLI tool, or Claude integration

---

**Rule 1: Research before you install.** MCP servers run as local processes with access to your file system and terminal. An MCP server that goes bad - or that you don't fully understand - can read, write, or execute things you didn't intend. Check the GitHub repo, verify the maintainer is real, and read what permissions the tool requests. If something in the setup instructions feels aggressive, it probably is.

**Rule 2: Back up your config before making any changes.** Your Claude desktop app stores its configuration - including every installed MCP server - in a single JSON file. One bad entry can prevent the app from opening. Backing up takes 5 seconds.

**Rule 3: Install one thing at a time.** Add one MCP server, restart Claude, verify it works, then add the next. Installing three things at once and then debugging which one broke the app is not a good use of an afternoon.

---

**Back up your config:**

Mac:
```
cp ~/Library/Application\ Support/Claude/claude_desktop_config.json ~/claude_desktop_config.backup.json
```

Windows:
```
copy "%APPDATA%\Claude\claude_desktop_config.json" "%APPDATA%\Claude\claude_desktop_config.backup.json"
```

---

**Tools I use and recommend:**

- **Desktop Commander** - gives Claude direct access to your terminal, files, and shell commands. The biggest single productivity unlock in this workflow. Install this before anything else.
  Source: github.com/wonderwhy-er/DesktopCommanderMCP

- **Claude Code** - Anthropic's command-line tool for larger multi-file builds. Run `claude` in any project directory and it can read your codebase, write files, run tests, and commit code.
  Source: claude.ai/code

- **Codex** - OpenAI's command-line code review tool. Used in the walkaway build workflow to get an independent review of the diff before merging.
  Source: github.com/openai/codex

Use the official sources listed above. Not third-party browser extensions or mirrors claiming to add the same functionality.

---

**Blank window after installing an MCP server:**

If you open Claude after adding an MCP server and the window is white or blank, the server crashed on startup. Open your config file:

Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`
Windows: `%APPDATA%\Claude\claude_desktop_config.json`

Remove the entry for the server you just added, save the file, and restart Claude. Once the app opens normally, check the server's documentation for prerequisites it needs before it will run.

---

## Section 4: Template Descriptions (one-sentence each)

1. **how-i-work-with-claude.md** - Your personal operating agreement with Claude: communication rules, response style, how you build together, and what Claude should never do.

2. **walkaway-build-protocol.md** - The multi-phase build pattern for larger features, with mandatory gates between phases, stop rules, and autonomous continuation rules.

3. **walkaway-build-plan-template.md** - Fill-in-the-blank template for scoping a build before any code gets written.

4. **CLAUDE.md.skeleton** - Project context skeleton: what this project is, who uses it, current state, key constraints, and a glossary of project-specific terms.

5. **TOOLCHAIN_OVERVIEW.md.skeleton** - Stack documentation skeleton: frontend, backend, database, hosting, auth, billing, and CLI tools.

---

## Section 5: FAQ

**Q: Do I need to be a developer to use this?**
A: No. I'm a real estate agent. The key skill is describing what you want clearly and being willing to read what Claude ships. Claude writes the code. You set the direction, check the output, and decide what ships.

**Q: What's Desktop Commander and why do I need it?**
A: Desktop Commander is an MCP server that gives Claude access to your terminal and file system. Without it, Claude in the chat interface can only suggest commands for you to run yourself. With it, Claude can run them directly - git operations, test runs, file edits, API calls. It changes Claude from "tell me what to do" to "I'll do it." Install it early.

**Q: What if my Claude desktop app opens to a blank window after installing something?**
A: An MCP server crashed on startup. Open your config file (path in Section 3 above), remove the entry you just added, save, and restart Claude. Once the app opens normally, check that server's GitHub page for setup requirements you may have missed.

**Q: How do I know which template files to create first?**
A: Start with `how-i-work-with-claude.md`. That file is what Claude reads at the start of every thread to understand how you want to work together. One file, fully customized to you, does more than five files filled out halfway. The prompt in Section 2 walks you through building it in a conversation with Claude.

**Q: Can I share this with other people?**
A: Yes. The site is public and the GitHub repo is open. If it helps you, pass it along.

**Q: How do I reach Jim if I have questions?**
A: I'm a real estate agent in Columbus, Ohio. My contact is at jimrossrealtor.com. I'm not offering support on the workflow, but if you have a specific question I'm reachable there.
