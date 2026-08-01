# Leisurenotes.com — Configuration Management Register
## Last updated: 2026-08-01 | Session: 20

---

## Active Documents

| File | Status | Notes |
|---|---|---|
| `session-notes.md` | Active | Includes quick start |
| `implementation-plan.md` | Active | Phases 0–7 |
| `website-design.md` | **LOCKED** | Phase 2A–2E complete and locked (all 10 interview questions, sitemap, homepage + project page template); amendments recorded post-lock as dated notes under the relevant Q-section (most recent: Session 20, Q4 mobile grid columns) |
| `config-mgmt.md` | Active | This document |

---

## Document Status Definitions

| Status | Meaning |
|---|---|
| **Pending** | Not yet created |
| **Draft** | Under development — not approved |
| **Active** | Current working version |
| **LOCKED** | No changes without PM + customer sign-off |

---

## Storage & Version Control

| Item | Detail |
|---|---|
| Repository | scbeme/leisurenotes-com |
| Documents folder | /docs |
| Version control | Git automatic — every commit |
| Find past revision | GitHub Desktop History tab or github.com → file → History |
| Filename convention | Fixed — no date/revision suffixes |
| MacBook sync | GitHub Desktop → Fetch/Pull each session |
| LOCKED indicator | Single line in document header |

---

## Document Descriptions

| File | Purpose | Owner |
|---|---|---|
| `session-notes.md` | Quick start + session record + key facts | PM — updated each session |
| `implementation-plan.md` | Complete project plan + phase checklists | PM — updated as phases complete |
| `website-design.md` | Design requirements + sitemap + decisions log | Created Phase 2A — customer approves |
| `config-mgmt.md` | This document — register + status | PM — updated each session |

---

## Document Access
**Primary workflow:** Claude Code on MacBook reads /docs directly from local repo folder.
**Exception:** Claude Chat (iPhone/iPad) — upload current docs manually if needed between sessions.

---

## Session Close Checklist
- [ ] Update session-notes.md
- [ ] Update implementation-plan.md (completed items)
- [ ] Update website-design.md (if design decisions made)
- [ ] Update config-mgmt.md
- [ ] Commit all with descriptive message
- [ ] Push to GitHub
- [ ] Customer: GitHub Desktop → Fetch/Pull

---

## Repository & MacBook Structure
```
scbeme/leisurenotes-com/          ← GitHub repo
~/projects/web/leisurenotes-com/  ← MacBook local copy (same folder)
    ├── docs/                     ← project documents
    ├── images/
    ├── projects/
    └── index.html
```
