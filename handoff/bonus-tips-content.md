# Bonus tips and tricks

Smaller power-user moves that make daily Claude use significantly better. Most require no setup. Pick what fits how you work and skip the rest.

---

## Saving conversations so they don't die with the thread

### 1. The context dump before a session dies

When a conversation gets long and Claude starts losing the thread, ask: "Summarize everything we built, decided, and resolved today. Format it as a markdown file I can paste into a fresh session." Save the output. Start a new conversation. Paste the summary. You lose the back-and-forth but keep everything that matters.

No setup. Do today.

### 2. End-of-session context dump ritual

Before closing any productive session, run: "Summarize what we decided, built, and learned today and format it for my memory file." This keeps your context files current without you having to remember what changed. Becomes the starting point for the next session.

No setup. Do today.

### 3. Monthly file audit to prevent rot

Once a month, ask Claude to review your context files and flag anything outdated, contradictory, or wrong. Stale context produces confident wrong answers. Fresh context produces accurate ones.

No setup. Do today.

---

## Expanding what Claude can see and remember

### 4. The four-file context system

Instead of re-explaining yourself every session, create four markdown files: Agents.md (who you are and how you work), Context.md (your business and brand), Memory.md (preferences and corrections that accumulate), Skills.md (workflows you invoke by name). Upload to a Claude Project. Every conversation starts already knowing you.

Requires: Claude Pro (for Projects). Setup: 30-60 minutes.

### 5. Show, don't tell - upload your best work

Describing your style produces inconsistent results. Uploading 5-10 examples of your best past emails, proposals, posts, or messages produces much better results. Claude reverse-engineers your actual patterns from real work instead of interpreting your description of it.

Requires: Claude Project. Setup: 15 minutes to collect examples.

### 6. Memory.md as a self-improving loop

Add an instruction to your context file telling Claude to automatically append new preferences and corrections to Memory.md during every session. Over time Claude stops repeating the same mistakes because the corrections are permanently logged. After a month you have a file that reflects how you actually work.

Requires: Claude Project. Setup: one paragraph in your context file.

### 7. Obsidian as a living knowledge base

The most powerful knowledge pattern in this section. A folder of markdown files that Claude writes and maintains. You clip raw sources into it. Claude compiles them into a structured wiki. You browse the wiki in Obsidian. Over time the wiki gets smarter with every source you add and every question you ask.

Why it works: Most note-taking systems die because the maintenance is too much work. Here, Claude does all the maintenance - summarizing, cross-referencing, filing, updating. You only curate and ask questions.

Setup steps:

1. Download Obsidian for free at obsidian.md. Works on Mac, Windows, and iPhone.
2. Create a new vault (Obsidian's word for a folder). Name it anything. Put it somewhere intentional like ~/Documents/YourVault. Do not put it in iCloud Drive unless you want cloud sync.
3. Inside that vault, create three subfolders: raw/ (your junk drawer for unprocessed sources), wiki/ (where Claude writes the organized version), and outputs/ (answers and reports Claude generates).
4. Create a file at the vault root called CLAUDE.md. Tell Claude what the knowledge base is for, the folder rules, and that Claude maintains wiki/ entirely while you only add to raw/.
5. Install the Obsidian Web Clipper browser extension. Clip any web article to your raw/ folder in one click.
6. Open Claude Code, point it at your vault folder, and run: "Read everything in raw/. Compile a wiki in wiki/ following the rules in CLAUDE.md. Create an INDEX.md first, then one file per major topic. Link related topics. Summarize every source."
7. As Claude creates files, they appear live in Obsidian. Browse the graph view to see how topics connect.

Ongoing use: clip sources daily via Web Clipper, run a weekly compilation session, monthly health check asking Claude to find contradictions, orphan pages, and gaps.

You do not need to write code. The only technical step is opening a terminal to run Claude Code. Everything else is creating folders and clicking.

Requires: Obsidian (free), Claude Code, Obsidian Web Clipper extension. Setup: 30 minutes. First useful output same session.

---

## Working faster in chat

### 8. One-word execution mode

Add an instruction to your context file: "When I say 'yes,' 'do it,' or 'push,' execute immediately without repeating the plan." Eliminates the back-and-forth where Claude restates what you just approved before doing it.

No setup beyond one line in your context file. Do today.

### 9. Reverse prompting - let Claude interview you

Instead of writing the perfect prompt yourself, say: "I want to do X. Ask me 10 questions to gather everything you need before you start." Claude interviews you, extracts the context it needs, then produces significantly better output than if you described the task on your own. Works especially well for strategic or creative work.

No setup. Do today.

### 10. Chain prompting for complex tasks

Break large tasks into a sequence of connected prompts instead of one massive prompt. First: analyze the situation. Second: identify top options based on the analysis. Third: build an action plan for the best option. Each prompt builds on the previous output. Cleaner thinking than asking for everything at once.

No setup. Do today.

### 11. Extended thinking trigger

For anything requiring real analysis or multi-step reasoning, add phrases like "think deeply before responding" or "reason through this step by step before answering." Claude has extended reasoning capabilities that activate with explicit prompting. Unnecessary for simple tasks. Noticeably better output for complex decisions.

No setup. Do today.

### 12. Feedback loop iteration

Treat every Claude response as a first draft. Iterate with specific feedback: "cut this by 30% without losing the core argument," "the second point is weak, expand it with a concrete example," "rewrite this conversational, the tone is too formal." Three rounds of specific feedback consistently beats one long prompt trying to get it right the first time.

No setup. Do today.

### 13. Edit your message instead of replying when Claude misunderstands

When Claude misunderstands you, do not write a follow-up explaining what you meant. Hit Edit on your original message, fix it, regenerate. Every new reply stacks on top of all previous messages. By message 20 you're burning significantly more tokens than message 1. Editing replaces bad exchanges instead of stacking them.

No setup. Do today. Massive quality-of-life improvement.

### 14. Batch related questions into one message

Three separate prompts cost three full context loads. One message with three questions costs one. Combine related questions instead of sending them sequentially. Claude sees the full picture at once and the answers are usually better.

No setup. Do today.

---

## Connecting Claude to your other tools

### 15. Claude Projects for persistent context

Create a Project for each major area of your work - your recruiting practice, your client portfolio, your loan pipeline. Upload your context files as knowledge docs. Every conversation in that Project starts with your files already loaded. You never re-explain who you are or how you want things formatted.

Requires: Claude Pro or higher. Setup: 10 minutes per project.

### 16. Screenshot as universal input

When copy-paste won't work (a page that blocks copying, a complex table, a document in another format), screenshot it and upload directly to Claude. Claude reads text from images reliably. Works on mobile too.

No setup. Do today.

### 17. Import your ChatGPT history

If you have history in ChatGPT worth keeping, go to ChatGPT Settings, export your data as a zip, and upload the conversations.json file to a fresh Claude session. Ask: "Extract my recurring projects, preferences, decisions, and workflows from this history. Format as a structured context document." Save that output. Drop into your Claude Project. Your accumulated ChatGPT context now lives in Claude.

Requires: ChatGPT account with history worth preserving. Do today if applicable.

### 18. The five-advisor council for high-stakes decisions

For any decision where being wrong is expensive, run five separate Claude sessions with different framings:
- The Contrarian: "Find the fatal flaw in this plan"
- The First Principles Thinker: "Strip every assumption and rebuild from scratch"
- The Expansionist: "What upside am I missing here?"
- The Outsider: "Respond to this with zero context about me or my business"
- The Executor: "What action do I take Monday morning?"

Five independent perspectives, no groupthink. Read all five, then run a sixth session that synthesizes: "Here are five advisor responses on the same decision. Identify where they agree, where they conflict, and what I should actually do." Adversarial pressure on your thinking before you commit.

No setup. Do today on any decision that's keeping you up at night.
