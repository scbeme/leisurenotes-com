# Leisurenotes.com — Session Notes
## Project: leisurenotes.com Redesign & Migration
## Last updated: 2026-07-26 | Session: 02

---

## ⚡ QUICK START — READ FIRST

- **Resume point:** Phase 1 — Content Harvest, file download step
- **First action:** Customer downloads `wp-content/uploads` zip via Hostinger hPanel File Manager and provides it to Claude
- **Confirm with customer:** "Ready to resume Phase 1 — do you have the uploads folder zip from Hostinger?"

---

## Project State

### Current Phase
| Phase | Status |
|---|---|
| Phase 0 — MacBook Readiness + Folder Setup | ✅ Complete |
| Phase 1 — Content Harvest | 🔶 In progress — crawl/inventory done, file download pending |
| Phase 2 — Design Interview + Build | Pending |
| Phase 3 — Site Build | Pending |
| Phase 4 — Deployment | Pending |
| Phase 5 — Client Review | Pending |
| Phase 6 — Go Live | Pending |
| Phase 7 — Ongoing Operations | Pending |

### Decisions Locked This Session
- GitHub Pages = free hosting (replaces Hostinger hosting plan)
- Domain registration stays at Hostinger (~$15/yr, auto-renew ON)
- DNS managed at Hostinger hPanel
- No contact form — leisurenotes@gmail.com mailto link only
- Content harvested from live website — not local files
- Design = fresh interview next session (all previous mockups discarded)
- Customer GUI only — no terminal commands ever
- Project documents stored in GitHub repo /docs folder
- Git handles all document version control — fixed filenames, no date suffixes
- MacBook = primary working copy; GitHub = automatic cloud backup
- No separate GitHub folder needed — repo lives inside project folder
- Folder structure: only create folders as needed — start minimal

### Open Items
- [ ] Customer to download `wp-content/uploads` zip via Hostinger hPanel File Manager (Phase 1 resume step)
- [ ] Verify all CAD/ZIP file sizes <100MB once files are in hand
- [ ] WordPress stays live until Phase 5 approved
- [ ] Foosball Table (2) + Vertical Tool Cart (1) user comments — preserve as static text. NOTE: Mechanical Pinball currently has 0 comments, contradicting the original assumption — verify before Phase 3.
- [ ] 4 attachment file links didn't auto-resolve during crawl (Mantel Clock PDF, Pinball PDF, Pinball CAD ZIP, Fidget Spinner CAD ZIP) — will be in the uploads export, no separate action needed
- [ ] Build time estimates on project cards need customer verification
- [x] Corrected contact email: **leisurenotes.hsc@gmail.com** (was incorrectly leisurenotes@gmail.com in prior docs)

---

## Session 02 Summary

### Accomplished
- Confirmed GitHub Pages as hosting platform — free, eliminates Hostinger hosting fee
- Confirmed domain stays registered at Hostinger
- Confirmed DNS at Hostinger hPanel (ns1/ns2.dns-parking.com)
- Confirmed GitHub username: scbeme
- Established contact: leisurenotes@gmail.com mailto link — no form needed
- Defined complete implementation plan Phases 0–7
- Established document management via GitHub /docs + Git versioning
- Defined design process: interview → website-design doc → sitemap → build → review
- Discarded all previous mockups — fresh design start next session
- Confirmed customer GUI-only throughout
- Defined MacBook directory structure — minimal, expand as needed
- Confirmed no separate GitHub folder needed on MacBook
- Completed Phase 0A audit: Node.js, GitHub Desktop, VS Code, extensions all checked
- Installed Node.js v24.18.0, GitHub Desktop, VS Code
- Installed Claude Code + Live Preview VS Code extensions
- Signed into GitHub Desktop as scbeme
- Created scbeme/leisurenotes-com repo (public), enabled GitHub Pages (verified via 404 test)
- Created local folder structure: docs/, images/, projects/
- Phase 1: crawled all 13 project pages + About + Projects listing — full text/structure captured in content-inventory.md
- Identified all downloadable file URLs (CAD ZIPs, PDFs) and image URLs per project; 4 attachment links didn't auto-resolve
- Found actual user comments on Foosball Table (2) and Vertical Tool Cart (1) — not Pinball as previously assumed
- Corrected contact email to leisurenotes.hsc@gmail.com
- Identified blocker: sandbox network + view-only Safari prevent direct file downloads; decided to use Hostinger hPanel File Manager bulk export of wp-content/uploads instead

### Key Reference — Permanent Facts

**Architecture:**
```
Claude Code (MacBook) → GitHub [scbeme/leisurenotes-com] → GitHub Pages → leisurenotes.com
DNS changes: Hostinger hPanel
```

**MacBook Folder Structure (today):**
```
~/projects/
└── web/
    └── leisurenotes-com/       ← GitHub repo + project files
        ├── docs/               ← project documents
        ├── images/             ← site images
        ├── projects/           ← individual project pages
        └── index.html
```
*Folders created by Claude Code in Phase 0C — not manually*

**Customer:**
- Name: Harvey Carson
- GitHub: scbeme
- Contact: leisurenotes.hsc@gmail.com
- Hostinger: Single plan — domain only after migration
- Domain expiry: 2027-01-29 (auto-renew ON)
- MacBook: Dedicated — Claude Code configured
- Terminal: NOT comfortable — GUI only

**Project Facts:**
- 13 projects to migrate
- CAD: Moi3D → STEP format (sizes TBC — must be <100MB)
- License: CC BY-NC 4.0
- WordPress stays live until Phase 5 approved

**AI Capabilities — Honest Summary:**
| Task | Claude can do? |
|---|---|
| Web / HTML / CSS / JS | ✅ Fully autonomous |
| ESP32 / Arduino / RPi firmware | ✅ Fully autonomous |
| Documentation / markdown | ✅ Fully autonomous |
| 3D print scripts (CadQuery/OpenSCAD → STL) | ✅ Good |
| Moi3D / native CAD geometry | ❌ Cannot — your tool |

---

## Session Close Protocol

### Every session — Claude Code does automatically:
- [ ] Update all relevant documents in /docs
- [ ] Commit with descriptive message
- [ ] Push to GitHub
- [ ] Remind customer: GitHub Desktop → Fetch/Pull to sync MacBook

### Phase 0C/0D — completed this session:
- [x] Create repo + enable GitHub Pages (Phase 0C)
- [x] Claude Code creates folder structure + /docs
- [ ] Claude Code uploads all documents → commit + push
- [ ] Customer: GitHub Desktop → Fetch/Pull to confirm sync
