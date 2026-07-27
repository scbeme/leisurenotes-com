# Leisurenotes.com — Implementation Plan
## Last updated: 2026-07-27 | Session: 03 | Status: Active
## PM: Claude | Customer: Harvey Carson

---

## Architecture
```
Claude Code (MacBook) → GitHub [scbeme/leisurenotes-com] → GitHub Pages → leisurenotes.com
DNS managed at Hostinger hPanel
```

---

## Tooling by Phase — Cowork vs. Claude Code

Two different Claude products are used across this project, both on the MacBook Air only:
- **Cowork** — chat-based sessions; git actions require driving GitHub Desktop via screen automation (slower, needs on-screen confirmation each session)
- **Claude Code** — terminal-based sessions on the MacBook Air; git push is direct and immediate (no GUI automation) since a fine-grained GitHub PAT was cached in macOS Keychain (`credential.helper osxkeychain`) on 2026-07-27, expires ~2027-07-27 (renewal reminder needed)

| Phase | Recommended tool | Why |
|---|---|---|
| 0 — MacBook Readiness | Either (completed) | One-time setup |
| 1 — Content Harvest | Either (completed) | Mostly file organization, light git activity |
| 2A/2B — Design Interview + Sitemap | **Cowork** | Conversational, no heavy git iteration |
| 2C/2D — Homepage + Project Page Build | **Claude Code** | Iterative build/review cycles — frequent commits, direct push is faster than GUI automation |
| 3 — Site Build (all pages) | **Claude Code** | High commit volume — 13 project pages + structure |
| 3R — Customer Review & Revisions | **Claude Code** | Revision commits, likely frequent |
| 4 — Deployment | **Claude Code** (+ customer GUI steps at Hostinger/GitHub for DNS) | Push complete site; DNS steps are manual customer actions regardless of tool |
| 5 — Client Review | Either | Mostly customer review, minor correction commits |
| 6 — Go Live & WordPress Retirement | Either | Mostly customer actions (backup, cancel hosting) |
| 7 — Ongoing Operations | **Claude Code** preferred | New-project additions — direct git keeps customer's ~15 min/project estimate accurate |

**Switch point:** at the start of Phase 2C (Homepage Design build), move from this Cowork session to a Claude Code terminal session on the MacBook Air.

---

## Phase 0 — MacBook Readiness & Project Setup

### 0A — MacBook Audit *(Claude Code autonomous)*
- [x] 0.1 Check Node.js installed + version ≥18
- [x] 0.2 Check GitHub Desktop installed + signed into scbeme
- [x] 0.3 Check VS Code installed
- [x] 0.4 Check Claude Code extension installed in VS Code
- [x] 0.5 Check Live Preview extension installed in VS Code
- [x] 0.6 Report: present vs missing

### 0B — Missing App Installation *(GUI only — Claude guides)*
- [x] 0.7 Install Node.js LTS if missing → nodejs.org (v24.18.0 installed)
- [x] 0.8 Install GitHub Desktop if missing → desktop.github.com → sign in scbeme
- [x] 0.9 Install VS Code if missing → code.visualstudio.com
- [x] 0.10 Install Claude Code extension if missing → VS Code Extensions panel
- [x] 0.11 Install Live Preview extension if missing → VS Code Extensions panel

### 0C — Project Initialization *(GUI + Claude Code)*
- [x] 0.12 GitHub Desktop → New Repository → name: leisurenotes-com (public)
- [x] 0.13 GitHub Desktop → Publish repository → scbeme/leisurenotes-com
- [x] 0.14 GitHub.com → repo Settings → Pages → enable (deploy from main branch)
- [x] 0.15 Verify test page loads at scbeme.github.io/leisurenotes-com (404 confirms Pages live, no content yet)
- [x] 0.16 Confirm leisurenotes.hsc@gmail.com accessible (corrected from leisurenotes@gmail.com)

### 0D — Folder Structure + Document Upload *(Claude Code)*
- [x] 0.17 Create ~/projects/web/leisurenotes-com/ folder structure
- [x] 0.18 Create /docs folder in repository
- [x] 0.19 Upload session-notes.md, implementation-plan.md, config-mgmt.md to /docs
- [x] 0.20 Commit "Initial project setup + docs" → push to GitHub
- [x] 0.21 Customer: GitHub Desktop → Fetch/Pull to confirm sync (same machine, already in sync)

---

## Phase 1 — Content Harvest *(Claude Code autonomous)* — ✅ COMPLETE
- [x] 1.1 Crawl all 13 project pages on leisurenotes.com
- [x] 1.2 Download all page text, titles, descriptions, metadata (captured in docs/content-inventory.md)
- [x] 1.3 Download all project images and gallery photos (via Hostinger hPanel File Manager export of wp-content/uploads 2021+2022)
- [x] 1.4 Download all downloadable files (CAD ZIPs, PDFs)
- [x] 1.5 Capture Foosball + Vertical Tool Cart user comments (preserve as static text) — note: found on these two pages, not Pinball as originally assumed
- [x] 1.6 Document complete file inventory with sizes — see docs/content-inventory.md
- [x] 1.7 Flag any files exceeding 90MB — Pinball (111MB) and Mantel Clock (46MB) PDFs compressed to <1MB each; no file over 100MB remains
- [x] 1.8 Organize all content into ~/projects/web/leisurenotes-com/projects/<project-name>/

**Resolution note:** Claude's sandbox network blocks leisurenotes.com directly, and Safari is view-only without the Claude-in-Chrome extension — so files couldn't be downloaded programmatically or via browser automation. Customer used Hostinger hPanel File Manager to zip and download `wp-content/uploads/2021` + `2022` in one action instead of ~150+ individual downloads. Claude then organized, deduplicated to smaller image sizes, compressed 2 oversized PDFs, and flagged one orphan file (kept aside, not deleted). Final `projects/` folder: 622MB, no file over 100MB.

**Coverage verification:** All 13 pages re-fetched individually and checked — every embedded file/image URL resolves only to 2021 or 2022 upload folders. Confirmed the two exported year folders were complete; nothing in 2023–2026 is referenced by any live page.

---

## Phase 2 — Design Interview, Documentation & Build

### 2A — Customer Design Interview *(chat session)*
- [ ] 2A.1 Claude conducts structured interview:
  - Audience definition
  - Visual style (colors, mood, energy)
  - Typography preferences
  - Homepage priority
  - Project page layout
  - Navigation preferences
  - Mobile vs desktop priority
  - Reference websites admired
  - Specific dislikes
  - Content hierarchy per page
- [ ] 2A.2 Publish website-design.md capturing all requirements
- [ ] 2A.3 Customer approves before proceeding

### 2B — Sitemap *(added to website-design.md)*
- [ ] 2B.1 Claude Code proposes sitemap based on design document
- [ ] 2B.2 Added to website-design.md as new section
- [ ] 2B.3 Customer approves
- [ ] 2B.4 Revisions if needed → committed
- [ ] 2B.5 Sitemap locked before proceeding

> ⚠️ **TOOL SWITCH HERE:** Close this Cowork session and open a Claude Code terminal session on the MacBook Air for 2C onward. Git PAT already cached in Keychain — no additional setup needed.

### 2C — Homepage Design *(Claude Code — iterative)*
- [ ] 2C.1 Build homepage per approved website-design.md
- [ ] 2C.2 Customer reviews (Live Preview in VS Code)
- [ ] 2C.3 Revisions submitted
- [ ] 2C.4 Claude Code revises
- [ ] 2C.5 Repeat until approved
- [ ] 2C.6 Homepage locked

### 2D — Project Page Design *(Claude Code — iterative)*
- [ ] 2D.1 Build sample project page (Foosball Table)
- [ ] 2D.2 Customer reviews (Live Preview)
- [ ] 2D.3 Revisions submitted
- [ ] 2D.4 Claude Code revises
- [ ] 2D.5 Repeat until approved
- [ ] 2D.6 Project page template locked

### 2E — Design Sign-Off
- [ ] 2E.1 Update website-design.md with build decisions
- [ ] 2E.2 Customer formally approves homepage + project page template
- [ ] 2E.3 website-design.md marked LOCKED in header
- [ ] 2E.4 All subsequent pages built to approved templates

---

## Phase 3 — Site Build *(Claude Code autonomous)*

### Structure
- [ ] 3.1 Build site architecture (folders, navigation, templates)
- [ ] 3.2 Build homepage with scrolling project banner + project grid
- [ ] 3.3 Build category filtering (Woodworking / STEM / Astronomy / Tools)
- [ ] 3.4 Build About page
- [ ] 3.5 Add leisurenotes@gmail.com mailto link (footer + contact page)
- [ ] 3.6 Add CC BY-NC 4.0 license footer

### All 13 Project Pages
- [ ] 3.7 Foosball Table
- [ ] 3.8 Mechanical Pinball Machine
- [ ] 3.9 Crayford Focuser 1¼″
- [ ] 3.10 Flag Display Case
- [ ] 3.11 Mantel Clock
- [ ] 3.12 Vertical Tool Cart
- [ ] 3.13 Bicycle Maintenance Clamp
- [ ] 3.14 Cornhole Game Board
- [ ] 3.15 Biplane Wooden Toy
- [ ] 3.16 Baby Doll Carriage
- [ ] 3.17 Fan Powered Toy Car
- [ ] 3.18 Fidget Spinner
- [ ] 3.19 Tablesaw Vertical Tenon Jig

### Assets & Polish
- [ ] 3.20 Optimize all images for web
- [ ] 3.21 Preserve Foosball + Pinball comments as static text
- [ ] 3.22 Generate sitemap.xml for SEO
- [ ] 3.23 Add favicon
- [ ] 3.24 Verify all download links working
- [ ] 3.25 Verify mobile responsiveness all pages

---

## Phase 3R — Customer Review & Revisions *(iterative)*
- [ ] 3R.1 Customer reviews complete site (Live Preview)
- [ ] 3R.2 Consolidated revision list submitted
- [ ] 3R.3 Claude Code implements revisions
- [ ] 3R.4 Customer re-reviews
- [ ] 3R.5 Repeat until approved
- [ ] 3R.6 Site approved for deployment

---

## Phase 4 — Deployment *(Claude Code + minimal GUI)*
- [ ] 4.1 Push complete site to scbeme/leisurenotes-com
- [ ] 4.2 Confirm GitHub Pages at scbeme.github.io/leisurenotes-com
- [ ] 4.3 Test all pages, links, downloads
- [ ] 4.4 **You:** GitHub repo Settings → Pages → Custom domain → leisurenotes.com
- [ ] 4.5 **You:** Hostinger hPanel → DNS → add 4 GitHub A records:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- [ ] 4.6 **You:** Hostinger hPanel → DNS → CNAME: www → scbeme.github.io
- [ ] 4.7 Wait DNS propagation (typically 1–2 hrs, up to 24 hrs)
- [ ] 4.8 **You:** GitHub Pages → Enable Enforce HTTPS
- [ ] 4.9 Verify leisurenotes.com loads correctly

---

## Phase 5 — Client Review & Approval
- [ ] 5.1 Review all 13 project pages — content accuracy
- [ ] 5.2 Verify all downloads (download + open each file)
- [ ] 5.3 Test on iPhone/iPad — mobile check
- [ ] 5.4 Test leisurenotes@gmail.com link
- [ ] 5.5 Confirm build times, difficulty ratings, labels accurate
- [ ] 5.6 Submit consolidated corrections
- [ ] 5.7 Claude Code implements corrections
- [ ] 5.8 Final approval — go-live authorized

---

## Phase 6 — Go Live & WordPress Retirement
- [ ] 6.1 Confirm leisurenotes.com fully operational
- [ ] 6.2 Monitor 72 hours — confirm stable
- [ ] 6.3 **You:** WordPress admin → export full backup
- [ ] 6.4 **You:** Cancel Hostinger hosting plan (keep domain only)
- [ ] 6.5 WordPress eliminated

---

## Phase 7 — Ongoing Operations

### Adding a New Project
- [ ] Provide: description, photos, CAD files, build notes
- [ ] Claude Code builds page + updates homepage
- [ ] Commit + push → auto-deploys
- [ ] Your time: ~15 minutes

### Routine Maintenance
| Task | Owner | Frequency |
|---|---|---|
| Security updates | N/A | Never |
| Plugin updates | N/A | Never |
| Domain renewal | Harvey (auto-renew) | Annual ~$15 |
| Content edits | Claude Code | On request |
| New projects | Claude Code | 1–2/month |

---

## Risk Register
| Risk | Likelihood | Mitigation |
|---|---|---|
| CAD file >100MB | Low | Flagged Phase 1.7 |
| DNS propagation delay | Medium | WordPress stays live |
| Content missed in harvest | Low | Full crawl + Phase 5 |
| GitHub policy change | Very low | Local copy always current |
| Domain renewal lapse | Very low | Auto-renew ON |

---

## MacBook Directory Structure
```
~/projects/                         ← all projects (expand as needed)
└── web/
    └── leisurenotes-com/           ← GitHub repo + all site files
        ├── docs/                   ← project documents
        ├── images/
        ├── projects/               ← individual project pages
        └── index.html
```
*Add new technology folders (~/projects/esp/, ~/projects/arduino/ etc.) only when needed*
