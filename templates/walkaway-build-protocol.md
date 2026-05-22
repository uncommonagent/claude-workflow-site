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
8. **Phase 7: Code review with Codex.** Run a second AI (Codex) against the diff. Triage findings into real bugs vs noise. Fix concrete bugs. Max 2 review cycles before moving on.
9. **Phase 8: Final report.** Build report written. PR opened. Codex findings and fixes documented in the report.

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

## Code review with Codex (Phase 7)

After Phase 6 smoke passes and before the build report, Claude runs Codex against the diff for an independent review.

The pattern:

1. Claude runs `codex review --base main` (or equivalent for your setup) and saves the output to `handoff/codex-review-<feature>.md`.
2. Claude triages Codex findings into three buckets:
   - **P1 (block merge):** real bugs in the diff, security issues, data loss risk. Fix before merging.
   - **P2 (fix if obvious):** real bugs but not catastrophic. Fix if the fix is contained to the current diff. If the fix expands scope, log as a follow-up instead.
   - **Noise:** style preferences, opinions on architecture decisions already made, suggestions outside the build scope. Ignore.
3. Claude applies P1 and P2 fixes that fit. Re-runs Codex once more to verify the fixes landed. Max 2 Codex cycles total. If round 3 would surface more findings, log them as follow-ups and merge anyway.
4. Build report (Phase 8) documents what Codex found and what was fixed.

Why two AIs: Claude wrote the diff and is biased toward thinking it's correct. A second model with no investment in the code finds things the first one rationalized past. Both miss things, but the overlap is smaller than either alone.

---

## Build report format (Phase 8)

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
