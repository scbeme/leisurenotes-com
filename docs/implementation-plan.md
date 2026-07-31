# Leisurenotes.com — Implementation Plan
## Last updated: 2026-07-31 | Session: 18 | Status: Active
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

### 2A — Customer Design Interview *(chat session)* — ✅ COMPLETE
- [x] 2A.1 Claude conducts structured interview:
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
- [x] 2A.2 Publish website-design.md capturing all requirements
- [x] 2A.3 Customer approves before proceeding — all 10 questions locked Session 05

### 2B — Sitemap *(added to website-design.md)* — ✅ COMPLETE
- [x] 2B.1 Claude proposes sitemap based on design document
- [x] 2B.2 Added to website-design.md as new section
- [x] 2B.3 Customer approves
- [x] 2B.4 Revisions if needed → committed (none needed)
- [x] 2B.5 Sitemap locked before proceeding

> ⚠️ **TOOL SWITCH HERE:** Close this Cowork session and open a Claude Code terminal session on the MacBook Air for 2C onward. Git PAT already cached in Keychain — no additional setup needed.

### 2C — Homepage Design *(Claude Code — iterative)*
- [x] 2C.1 Build homepage per approved website-design.md
- [x] 2C.2 Customer reviews (Live Preview in VS Code)
- [x] 2C.3 Revisions submitted
- [x] 2C.4 Claude Code revises
- [x] 2C.5 Repeat until approved
- [x] 2C.6 Homepage locked — approved 2026-07-27

### 2D — Project Page Design *(Claude Code — iterative)*
- [x] 2D.1 Build sample project page (Foosball Table) — real content pulled live from leisurenotes.com (see note below), not placeholder text
- [x] 2D.1a Foosball Table template punch list (6 items: category fix, comments removal, clickable breadcrumb + URL category filter, combined-ZIP downloads, hero photo orientation check, spec block rebuild) — all complete as of Session 10. Template is feature-complete, awaiting customer review below
- [x] 2D.1b Session 13: hero section redesign (combined two-column hero + spec grid, icons dropped, click-to-enlarge lightbox added) — additional change layered on top of the Session 10 "feature-complete" state, implemented on Foosball Table only. Still awaiting customer review below before Phase 3 rollout.
- [x] 2D.1c Session 14: hero photo blur fix (re-cropped from the higher-res rotated source instead of the 225x300 thumbnail) + Phase 3 image-selection workflow doc updated (website-design.md, now 3 passes). Session 12 footer layout customer-confirmed and closed out — no longer an open item.
- [x] 2D.2 Customer reviews (Live Preview) — customer reviewed the live Foosball Table page (footer + hero, Sessions 12/14 fixes) and approved outright
- [x] 2D.3 Revisions submitted — none requested; approval was direct
- [x] 2D.4 Claude Code revises — n/a, no revisions requested
- [x] 2D.5 Repeat until approved — n/a, approved on first final-look pass
- [x] 2D.6 Project page template locked — **2026-07-30**

### 2E — Design Sign-Off
- [x] 2E.1 Update website-design.md with build decisions — verified current for all Session 06–14 decisions during this pass; found and fixed two real gaps that had only ever been recorded in session-notes.md: the Q6 category-chip labels (still said the original Woodworking/STEM/Astronomy/Tools draft, not the Session 07 Play/Workshop/Home/Tech model — now documented with the full mapping) and the Q10 spec-block layout (still described the Session 08 icon layout as current, with no mention of the Session 13 combined two-column hero / 2x2 no-icon grid / lightbox component, or the Session 14 hero-resolution fix — now documented, old layout marked superseded and kept for history)
- [x] 2E.2 Customer formally approves homepage + project page template — homepage 2026-07-27 (2C.6), project page template 2026-07-30 (2D.6)
- [x] 2E.3 website-design.md marked LOCKED in header
- [x] 2E.4 All subsequent pages built to approved templates — standing rule from this point forward: all 12 remaining pages use the locked Foosball Table template (combined two-column hero, 2x2 spec grid, no icons, lightbox) as-is; any further template-level change requires a new customer decision, not built ad hoc during a page build

---

## Phase 3 — Site Build *(Claude Code autonomous)*

### Structure — audited Session 15, see session-notes.md for full detail
- [x] 3.1 Build site architecture (folders, navigation, templates) — done via 2C/2D: `assets/{css,js}`, `data/projects.json`, `docs/`, `projects/<slug>/`, `index.html`, `404.html`, header/footer nav on every page, Foosball Table as the locked project-page template
- [x] 3.2 Build homepage with project grid — **wording corrected:** the original "scrolling project banner" text predates the Q4 carousel-reversal decision (Session 05) and was never actually built that way. Live homepage is a static keyword-rich intro headline + filterable/searchable/sortable project grid, no banner. Confirmed built and matches website-design.md Q4.
- [x] 3.3 Build category filtering — **wording corrected:** categories are **Play / Workshop / Home / Tech** (Session 07 decision), not the original draft "Woodworking / STEM / Astronomy / Tools." Confirmed built: chips in `index.html`, `CATEGORY_LABELS` in `site.js`, `category` field in `data/projects.json`, URL-param pre-filtering from project-page breadcrumbs.
- [x] 3.4 Build About page — **built Session 17** (`about/index.html`), customer-approved copy (Projects/CAD Programs/Copyright/Disclaimer/Contact sections, Contact rewritten to drop the old comment-system reference and typo'd email). Same site chrome as index.html/Foosball Table. Breadcrumb scope amended same session — see website-design.md Q6 amendment.
- [x] 3.5 Add mailto link — **wording corrected:** locked sitemap (website-design.md, Phase 2B) explicitly rules out a separate Contact page ("mailto: link in footer/nav, not a standalone page") — the original checklist text ("footer + contact page") was already stale against that decision. `mailto:leisurenotes.hsc@gmail.com` confirmed present in the footer nav on every page, **and** now also in About's own Contact section (Session 17) — resolves the open question this item previously flagged.
- [x] 3.6 Add CC BY-NC 4.0 license footer — confirmed present on every page (`footer-copyright`, links to the CC BY-NC 4.0 license).

### All 13 Project Pages
- [x] 3.7 Foosball Table — **wording corrected, this was already done and just never checked off:** built under 2C/2D (not this Phase 3 checklist), template locked 2D.6. Materials/Tools spec values updated Session 18 to match the final 13-project spreadsheet (website-design.md Q10).
**Pass 3 (derivative generation) — DONE for all 12 remaining projects (Session 18)**, per website-design.md's tooling writeup: homepage thumbnail, cropped 4:3 hero-tile capped at 1600px, capped ~1600px gallery/lightbox derivatives, all WebP, `data/projects.json` thumb updated and verified for every project. Actual page HTML (below) is the remaining work per project. **Exception: Flag Display Case's hero is an interim CAD-render substitute pending a customer privacy decision — see website-design.md and session-notes.md.**

- [x] 3.8 Mechanical Pinball Machine — built Session 18. Content from live WordPress page + the 13-page instructions PDF (Misc. Materials list, Construction Tips, Possible Improvements). Two download buttons (PDF + CAD ZIP), no combined-zip fabrication.
- [x] 3.9 Crayford Focuser 1¼″ — built Session 18. Content from live page + 5-page instructions PDF (design specs, printer settings, full build steps, parts list). 4 download files (PDF + 3 CAD formats) — PDF as primary button, CAD formats as inline links rather than 4 big buttons or a fabricated combined zip.
- [x] 3.10 Flag Display Case — built Session 18, using the interim CAD-render hero (see above). **Hero photo still needs the customer's explicit decision** — new context found while fetching this page's content (this is the customer's own tribute to his late father-in-law, a USAF veteran; the exact photo with the same partial redaction is already the large cover image on the customer's own published instructions PDF) makes it likely the original photo was always meant to be prominent, and an attempt to restore it as hero was blocked by a system safety check rather than completed. Content otherwise complete: full parts list, construction tips, and final-assembly steps from the 8-page instructions PDF. Gallery currently shows only the 3 CAD renders — the original personal photo has no gallery derivative and isn't referenced anywhere on the page pending the hero decision.
- [x] 3.11 Mantel Clock — built Session 18. Content from live page + 13-page instructions PDF (grandparents' cedar story, rotating pedestal design, full Construction Tips).
- [x] 3.12 Vertical Tool Cart — built Session 18. Content from live page (Adam Savage origin story, design notes, build steps). Its one reader comment (a genuinely useful tip — power strip for charging, paper towel dispenser) folded into Final Thoughts as prose rather than dropped, unlike Foosball's 2 comments (generic praise, confirmed drop Session 09) — see 3.21 below, that item's premise was wrong.
- [x] 3.13 Bicycle Maintenance Clamp — built Session 18. Content from live page + 6-page instructions PDF (full parts list table with dimensions, construction tips).
- [x] 3.14 Cornhole Game Board — built Session 18. No instructions PDF for this project (CAD zip only) — content built from the live WordPress page, using the tool's directly-quoted phrases as the verbatim anchor since two separate fetch attempts both returned lightly-processed summaries rather than pure sentence-by-sentence text.
- [x] 3.15 Biplane Wooden Toy — built Session 18. No instructions PDF (CAD zip only); content from the live page.
- [x] 3.16 Baby Doll Carriage — built Session 18. No instructions PDF (CAD zip only); content from the live page.
- [x] 3.17 Fan Powered Toy Car — built Session 18. No instructions PDF; content from the live page, including the full 10-step verbatim assembly list.
- [ ] 3.18 Fidget Spinner — Pass 3 done. Page HTML not yet written.
- [ ] 3.19 Tablesaw Vertical Tenon Jig — Pass 3 done (no explicit hero, position-1 used). Page HTML not yet written.

**Build time / Skill level standing gap (Session 11) — RESOLVED Session 18:** customer supplied final spec values for all 13 projects via a completed specs spreadsheet — see the full table in website-design.md Q10. Values get applied to each page's spec-grid as that page is built.

### Assets & Polish
- [ ] 3.20 Optimize all images for web
- [x] 3.21 Preserve comments as static text — **wording corrected:** this item's premise (Foosball + Pinball) was already flagged wrong in content-inventory.md Session 02 — the actual crawl found comments on Foosball (2, generic praise) and Vertical Tool Cart (1, a genuinely useful build tip), not Pinball (0). Foosball's 2 comments were confirmed dropped, not folded in, back in Session 09. Vertical Tool Cart's 1 comment was folded into that page's Final Thoughts as prose (Session 18) since it has real content value, unlike Foosball's.
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
| Repo approaches 1GB Pages limit | Low (projected ~400-460MB after Phase 3 asset pipeline) | Monitor; trigger point ~800MB — move CAD ZIPs/PDFs to GitHub Releases (see website-design.md) |

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
