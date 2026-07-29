# CLAUDE.md — leisurenotes.com

Project-level instructions for Claude Code / Cowork sessions working in this repo.

## Source of truth
Read `docs/session-notes.md` first each session (Quick Start section), then `docs/implementation-plan.md` for phase status.

## Session startup (do this automatically, no prompting needed)
At the start of every session in this project, before asking the customer anything:
1. Request access to the project folder (`mcp__cowork__request_cowork_directory` with the exact path `/Users/ai/projects/web/leisurenotes-com`) if not already mounted.
2. Read the live docs **inside that mounted folder**: `docs/session-notes.md` Quick Start section, then `docs/implementation-plan.md`.
3. Resume at the documented resume point — do not ask the customer what they mean if the docs already answer it.

**Do not treat Claude.ai imported project knowledge (any `memory.md` or cached files under a `.project-cache` path, separate from the mounted folder) as current.** That cache reflects only Session 01 (2026-06-29) and is stale — later sessions superseded its architecture (Hostinger → GitHub Pages), platform (WordPress → static site details), and phase status. It's fine to skim for pre-Session-2 history if asked, but the mounted folder's `docs/session-notes.md` and `docs/implementation-plan.md` are the only source of truth for current state. If both are present, mounted-folder docs always win.

Note: the folder-access grant itself is a per-session security prompt the customer will still see and must approve — that's a platform consent boundary, not something to solve for. The fix here is only that Claude requests it and reads the docs proactively, instead of waiting to be told to.

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

## Interface preference
GUI is preferred but not exclusive. Goal: minimize the customer's total implementation actions — not avoid the terminal at all costs.
- Default for routine/recurring actions (e.g. git commit + push each session): Claude Code/Cowork automates via GUI (GitHub Desktop) — zero action required from customer.
- If a terminal command is genuinely more efficient than GUI automation (e.g. one-time setup, environment config), Claude provides an exact copy-paste script for the customer to run in their own Mac Terminal — which has full network access that a Cowork sandbox session does not.
- For git-heavy phases where GUI automation proves slow/unreliable, consider running that phase via a Claude Code terminal session instead (direct, unrestricted git access on the customer's Mac) rather than continuing to drive GitHub Desktop's screen from Cowork.

## Division of labor: Cowork vs. Claude Code (customer's standing workflow)

Customer's intent: **Claude Code does the coding. Cowork is the advisor/interpreter** — used to talk through decisions, clarify requirements, and turn the customer's intent into clear, actionable instructions that Claude Code then executes.

- **Cowork's role:** conversational planning, research, answering questions, presenting tradeoffs and recommendations, and — once a decision is reached — drafting the exact doc updates (session-notes.md entries, website-design.md sections, etc.) **as text in the chat response**, clearly labeled as a brief for Claude Code. Cowork does not write these into the actual files.
- **Claude Code's role:** all file writes of every kind in this repo, with no exception — code, data, assets, **and `/docs` files** (`session-notes.md`, `implementation-plan.md`, `website-design.md`, `content-inventory.md`, `config-mgmt.md`, `CLAUDE.md` itself) — plus all git operations (`add`/`commit`/`push`).
- **No exceptions for `/docs`:** an earlier version of this policy let Cowork edit `/docs` files directly on the reasoning that documentation isn't "coding." Customer overturned that distinction (2026-07-29) — repo file writes of any kind, docs included, are Claude Code's job. Cowork's job stops at producing the text; it does not call Edit/Write on any file in this repo, `/docs` included.
- **Why git specifically is Claude Code's job, not just a preference:** confirmed 2026-07-28 that `git push` from a Cowork session fails outright (`403 from proxy` — Cowork's sandbox cannot reach github.com). `git commit` sometimes succeeds locally despite `.git` permission warnings, but push never will. Don't attempt `git push` from Cowork going forward — it will fail every time, not just sometimes.
- **Recommended session order:** start with Cowork for any planning/decision work → Cowork drafts the doc updates in chat → switch to Claude Code terminal (`cd ~/projects/web/leisurenotes-com && claude`), paste/hand off the drafted text, and it writes the files, commits, and pushes.

## Standing facts
- Customer: Harvey Carson (Scott) — GUI preferred, terminal OK via copy-paste scripts when more efficient
- GitHub: scbeme/leisurenotes-com — hosting via GitHub Pages, DNS/domain stays at Hostinger
- Contact email: leisurenotes.hsc@gmail.com
- License: CC BY-NC 4.0
- 13 projects to migrate — full inventory in docs/content-inventory.md
- Git push credential: fine-grained PAT cached in macOS Keychain (`credential.helper osxkeychain`) on MacBook Air, set 2026-07-27, expires ~2027-07-27 — renewal reminder needed. Enables direct git push from Claude Code terminal sessions with zero GUI automation.
- Tool switch: see docs/implementation-plan.md "Tooling by Phase" — Cowork for design interview (2A/2B), Claude Code for build/iterate/deploy (2C onward)
