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
