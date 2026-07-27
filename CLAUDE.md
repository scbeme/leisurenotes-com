# CLAUDE.md — leisurenotes.com

Project-level instructions for Claude Code / Cowork sessions working in this repo.

## Source of truth
Read `docs/session-notes.md` first each session (Quick Start section), then `docs/implementation-plan.md` for phase status.

## Autonomy policy (overrides global "ask before every task" preference — this project only)

Default to autonomous execution. Do not ask permission for reversible, in-scope work:
- Building/editing pages, code, and content within the currently approved phase
- Committing and pushing routine progress (docs, code, assets) — do it, then note what changed
- Minor decisions: file naming, folder organization, formatting, small content structure
- When genuinely uncertain on a reversible call, make the reasonable default choice, flag it in session notes, and keep moving — don't block on it

Ask first, always:
- Locking in design/sitemap decisions gated for customer sign-off in implementation-plan.md (Phase 2E, 3R, etc.)
- Any destructive or irreversible action (deleting/renaming existing files, force-push, publishing to the live domain, canceling Hostinger hosting)
- Anything outside the currently approved phase
- Anything already covered by hard product guardrails (financial transactions, permanent deletion, credentials) — these can't be waived regardless of this file

## Standing facts
- Customer: Harvey Carson (Scott) — GUI only, no terminal
- GitHub: scbeme/leisurenotes-com — hosting via GitHub Pages, DNS/domain stays at Hostinger
- Contact email: leisurenotes.hsc@gmail.com
- License: CC BY-NC 4.0
- 13 projects to migrate — full inventory in docs/content-inventory.md
