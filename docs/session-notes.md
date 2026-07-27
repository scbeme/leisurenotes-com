# Leisurenotes.com — Session Notes
## Project: leisurenotes.com Redesign & Migration
## Last updated: 2026-07-27 | Session: 06

---

## ⚡ QUICK START — READ FIRST

- **Resume point:** Phase 2C.2–2C.5 (homepage customer review + revisions) **in progress** — several rounds of feedback already applied this session (see below). Homepage not yet formally approved/locked (2C.6). Next: check whether customer has further homepage feedback; if none, get explicit approval before moving to 2D (project page template).
- **Tool switch already made:** this and all subsequent sessions run in **Claude Code terminal on the MacBook Air** (`cd ~/projects/web/leisurenotes-com && claude`), not Cowork.
- **First action for next session:** Read this Quick Start + implementation-plan.md. If the customer has given new homepage feedback, apply it (2C.3–2C.5). If the customer has explicitly approved the homepage, mark 2C.6 locked and move to 2D. Don't assume approval — ask if unstated.

### Revisions applied this session (2C.3–2C.5 loop, chronological)
1. Fixed root-absolute asset paths (`/assets/...`, `/data/...`, image `thumb` paths, card links) → relative paths, after customer reported CSS/JSON 404s
2. Project grid: replaced auto-fill/minmax with explicit breakpoints — 3 col desktop (≥1024px) / 2 col tablet (640–1023px) / 1 col mobile (<640px)
3. On-page logo/title casing: "Leisurenotes" → "LeisureNotes" in nav, `<title>` tags, and footer (nav/title/footer only — docs still say "Leisurenotes.com" as the domain/project name, untouched)
4. Page background darkened for contrast against white project photos: introduced a dedicated `--color-page-bg` token (previously reused `--color-chip-bg`, which would have also darkened the filter chips) — went white → `#eef0f2` → `#e8eaec` (confirmed final by customer). Project cards also got a default subtle box-shadow on top of their existing border.

---

## Project State

### Current Phase
| Phase | Status |
|---|---|
| Phase 0 — MacBook Readiness + Folder Setup | ✅ Complete |
| Phase 1 — Content Harvest | ✅ Complete + verified |
| Phase 2A — Design Interview | ✅ Complete — all 10 questions locked |
| Phase 2B — Sitemap | ✅ Complete — locked |
| Phase 2C.1 — Homepage build | ✅ Complete — pending customer review (2C.2) |
| Phase 2C.2–2E | ⬅️ Next (Claude Code, MacBook Air terminal) |
| Phase 3 — Site Build | Pending |
| Phase 4 — Deployment | Pending |
| Phase 5 — Client Review | Pending |
| Phase 6 — Go Live | Pending |
| Phase 7 — Ongoing Operations | Pending |

### Decisions Locked This Session (05)
All captured in full in website-design.md. Summary:
- **Q2 Visual style:** light/clean base, neutral graphite/charcoal accent + one functional "signal" color (engineering-diagram orange or technical blue), no wood-tone accent — reframed after customer clarified the site is maker/hackerspace-first (end product/function), not woodworking-craft-first; fabrication method (wood, CAD, electronics) is incidental per project, not the identity
- **Q3 Typography:** sans-serif body/UI (Inter or system-ui), monospace accent (JetBrains Mono / IBM Plex Mono) for spec data only
- **Q4 Homepage:** reversed Session 1's scrolling-banner-hero decision — research showed carousels get ~1% interaction and 84% single-slide-only views (Notre Dame study), poor fit for showing a 13+ project cross-section. Replaced with: minimal keyword-rich intro headline ("Free plans for functional maker builds...") + static filterable/searchable project grid, all projects visible at once
- **Q5 Project page layout:** hero photo → spec block (monospace) → downloads (prominent, not buried) → full steps/description. Underlying content authored in Instructables-compatible shape (Intro → Supplies → numbered Steps w/ photos → wrap-up) as dual-purpose source structure; actual cross-posting to Instructables is **optional per-project, decided after redesign ships** (Instructables 25MB/file cap means full CAD downloads stay linked back to leisurenotes.com regardless)
- **Q6 Navigation:** simple nav (Home/About/Contact) replacing the old WordPress 13-item "Projects" mega-dropdown (verified via live fetch of current menu). Gap closed via: category filter chips + live search box + sort control + result count, all client-side against a JSON project manifest — scales to 50+ projects without a dropdown or nav redesign; secondary tag facets (material/skill level) deferred until ~25–30 projects. Breadcrumbs (`Home / Category / Project Title`) added on project pages only, since most traffic lands directly on a project page from search, not from Home
- **Q7 Reference sites:** Hackaday.io / Adafruit / Instructables tone (project-first, technical, spec-forward) — explicitly light theme, not Hackaday's dark theme
- **Q8 Dislikes:** no ads, no popups/modals, no auto-play, no infinite scroll — site is hobby/non-commercial, simplicity prioritized throughout
- **Q9 Mobile/desktop:** desktop-primary, mobile-friendly (responsive throughout, not mobile-first) — core action (opening CAD/PDF files) happens at a desk; mobile matters for discovery/browsing only
- **Q10 Spec block order:** build time → difficulty → fabrication method → materials/CAD format (time is the harder constraint and more objective/scannable than difficulty)
- **Contact:** `mailto:` link only, no contact form — GitHub Pages has no server-side processing (confirmed as the reason a form isn't viable without a third-party service), and old WordPress site never had a dedicated Contact page either
- **Sitemap (2B) locked:** `/`, `/about/`, `/projects/<slug>/` × 13 (see full list in website-design.md). No dedicated category URLs (chips handle it client-side). Added: `sitemap.xml` (already on Phase 3 checklist) and a simple 404 page (new addition — old `?page_id=` URLs will all 404 under the new clean-URL structure)

### Open Items
- [ ] **Customer needs to review homepage** (2C.2) via Live Preview/local server, not by opening index.html directly — see Quick Start
- [ ] **Crayford Focuser folder/slug mismatch:** locked sitemap (website-design.md) uses URL slug `crayford-focuser-1-25`, but the existing asset folder is `projects/crayford-focuser/`. Homepage links to `/projects/crayford-focuser-1-25/` per the locked sitemap; the folder itself hasn't been renamed (renaming existing files needs customer sign-off per CLAUDE.md). Resolve when building this project page in Phase 2D/3 — either rename the folder or create the page at the new slug and point assets at the old folder.
- [ ] **Favicon missing** — site has no favicon yet; tracked as Phase 3 item 3.23, not blocking for 2C.
- [ ] **Project body/instruction text was never actually harvested** despite Phase 1 marking content harvest complete — content-inventory.md only has a structural table (titles, file lists, page_ids), not full page copy. Only images/CAD/PDFs exist locally per project folder. This will block Phase 2D/3 project page builds (need real Intro/Supplies/Steps text) — will need to re-fetch page text from the live WordPress site or have the customer export it.
- [ ] Category assignments (Woodworking/STEM/Astronomy/Tools) and "most recent" ordering on the homepage were inferred by Claude from project titles and upload-folder dates (2021/05 through 2022/01) — not customer-confirmed. Flag for customer review during 2C.2.
- [ ] Git PAT expires ~2027-07-27 — renewal reminder
- [ ] Monitor repo size — revisit GitHub Releases fallback at ~800MB
- [ ] WordPress stays live until Phase 5 approved
- [ ] Build time estimates on project cards need customer verification (carried from Session 02) — not yet added to homepage cards; deferred to project page spec blocks (Q10) in Phase 2D since no verified data exists yet
- [ ] Foosball Table (2) + Vertical Tool Cart (1) user comments — preserve as static text (carried from Session 02)
- [ ] Instructables cross-posting — decide per-project after redesign ships (not before)

---

## Session 03 Summary

### Accomplished
- Resolved discrepancy between stale Claude.ai project knowledge (Session 1 only, Hostinger-hosting assumption) and the actual current project state (Session 2 docs, GitHub Pages decision) — connected the real project folder as source of truth going forward
- Created `CLAUDE.md` with autonomy policy and interface preference, refined through discussion to balance "minimize customer actions" against actual tool constraints (Cowork sandbox has no GitHub network access)
- Verified file access (read/write on real project folder) and GitHub Desktop screen-control access (granted, full tier)
- Confirmed Cowork's sandboxed terminal cannot reach github.com (403 from proxy) — clarified this is a tool constraint, not a customer preference issue
- Set up and verified a git push credential (fine-grained PAT via macOS Keychain) on the MacBook Air, enabling future Claude Code terminal sessions to push directly
- Updated implementation-plan.md with a "Tooling by Phase" table and explicit tool-switch flag before Phase 2C
- Conducted web research on maker/DIY static site best practices (sitemap/IA, color/typography, homepage layout, project page template conventions, GitHub Pages technical constraints) to inform the design interview
- Answered a customer question on GitHub storage limits: researched and ruled out Git LFS (incompatible with Pages), confirmed GitHub Releases as the correct fallback mechanism (2GiB/file, no total cap, doesn't count toward Pages 1GB limit, served via GitHub's CDN with no adverse performance impact)
- Scoped and locked an asset-reduction plan for Phase 3: drop redundant WordPress image sizes + WebP conversion; deferred GitHub Releases migration as a documented fallback with an 800MB monitoring trigger
- Created `docs/website-design.md`, began Phase 2A structured design interview
- Phase 2A Q1 (Audience) answered and locked; Q2 (Visual style) proposed with recommendation, session closed before customer answered

### Key Reference — Permanent Facts

**Architecture:**
```
Cowork/Claude Code (MacBook Air) → GitHub [scbeme/leisurenotes-com] → GitHub Pages → leisurenotes.com
DNS changes: Hostinger hPanel
```

**Tooling split (see implementation-plan.md "Tooling by Phase" for full table):**
- Cowork: Phases 0, 1, 2A, 2B (conversational, light git activity)
- Claude Code (MacBook Air terminal): Phases 2C onward (iterative build, high commit volume, direct git push via cached PAT)

**MacBook Folder Structure (today):**
```
~/projects/
└── web/
    └── leisurenotes-com/       ← GitHub repo + project files
        ├── CLAUDE.md           ← project instructions (autonomy policy, interface preference)
        ├── .gitignore
        ├── docs/               ← project documents
        ├── images/             ← site images
        ├── projects/           ← individual project pages
        └── index.html
```

**Customer:**
- Name: Harvey Carson (Scott)
- GitHub: scbeme
- Contact: leisurenotes.hsc@gmail.com
- Hostinger: Single plan — domain only after migration, domain expiry 2027-01-29 (auto-renew ON)
- MacBook Air: Cowork + Claude Code both used here only (Mac Mini/iPhone/iPad are Claude Chat only)
- Interface preference: GUI preferred; terminal OK via copy-paste script when more efficient than GUI automation — goal is minimizing customer's total actions, not avoiding terminal at all costs
- Git push credential: fine-grained PAT, cached in macOS Keychain on MacBook Air, set 2026-07-27, expires ~2027-07-27

**Project Facts:**
- 13 projects to migrate — full inventory in docs/content-inventory.md
- Current repo size: ~622MB (projects/ folder) — projected ~400-460MB after Phase 3 asset pipeline (WebP + dropping redundant image sizes)
- CAD: Moi3D → STEP format
- License: CC BY-NC 4.0
- WordPress stays live until Phase 5 approved
- Repo size monitoring trigger: ~800MB → revisit GitHub Releases migration for CAD/PDF files

**AI Capabilities — Honest Summary:**
| Task | Claude can do? |
|---|---|
| Web / HTML / CSS / JS | ✅ Fully autonomous |
| ESP32 / Arduino / RPi firmware | ✅ Fully autonomous |
| Documentation / markdown | ✅ Fully autonomous |
| 3D print scripts (CadQuery/OpenSCAD → STL) | ✅ Good |
| Moi3D / native CAD geometry | ❌ Cannot — your tool |

---

## Session 04 Summary

### Accomplished
- Customer flagged process friction: Claude required a prompt to read project docs at session start, and had to re-request folder access — asked why session startup isn't automated
- Root cause: CLAUDE.md already instructed reading `docs/session-notes.md` first each session, but Claude asked clarifying questions instead of acting on it immediately — a Claude execution gap, not a platform limitation
- Folder-access re-prompting is a genuine platform constraint (Cowork requires a per-session consent grant for folder mounts) — not fixable from this repo, only mitigated by requesting it proactively instead of waiting to be told
- Added a "Session startup" section to CLAUDE.md: request folder access + read session-notes.md/implementation-plan.md automatically at session start, before asking the customer anything
- Re-asked Phase 2A Question 2 (visual style) — same recommendation as Session 03 (light/clean base, warm wood-tone accent), still awaiting customer answer

### Open Items carried forward
- Question 2 (visual style) answer still pending
- Questions 3–10 remaining: typography, homepage priority, project page layout, navigation, mobile/desktop priority, reference sites, dislikes, content hierarchy
- Git PAT expires ~2027-07-27 — renewal reminder
- Monitor repo size — revisit GitHub Releases fallback at ~800MB
- WordPress stays live until Phase 5 approved
- Build time estimates on project cards need customer verification (carried from Session 02)
- Foosball Table (2) + Vertical Tool Cart (1) user comments — preserve as static text (carried from Session 02)

---

## Session 05 Summary

### Accomplished
- Customer clarified project framing: leisurenotes.com is maker/hackerspace-first (functional end product), not woodworking-craft-first — fabrication method is incidental per project. This reframed Q2 (visual style) away from a wood-tone accent
- Completed full Phase 2A design interview (Questions 2–10), each with research-backed recommendations — see "Decisions Locked This Session (05)" above for full list
- Reversed the Session 1 scrolling-banner-hero decision after carousel-vs-grid UX research (Notre Dame CTR study, Smashing Magazine, thegood.com) showed carousels perform poorly for multi-item discovery — replaced with a static filterable/searchable grid
- Researched Instructables' publishing format (Intro → Supplies → numbered Steps, 25MB/file cap) to inform a dual-purpose project-page content structure; cross-posting itself deferred as optional, decided per-project after launch
- Verified the live WordPress site's actual navigation menu via direct fetch (Home / 13-item Projects dropdown / About) to answer a customer question about nav parity — informed the Q6 filter+search+breadcrumb solution
- Researched faceted-filter and carousel/grid UX best practices to support Q6 and Q4 recommendations with external sources, not just judgment calls
- Completed Phase 2B: proposed and locked full sitemap (`/`, `/about/`, `/projects/<slug>/` × 13, sitemap.xml, 404 page); confirmed `mailto:` contact link only (no form — GitHub Pages has no server-side processing)
- Phase 2A and 2B both now complete — reached the documented tool-switch point ahead of Phase 2C

### Open Items carried forward
- **Tool switch now due** — Phase 2C onward runs in Claude Code on the MacBook Air, not Cowork
- Git PAT expires ~2027-07-27 — renewal reminder
- Monitor repo size — revisit GitHub Releases fallback at ~800MB
- WordPress stays live until Phase 5 approved
- Build time estimates on project cards need customer verification (carried from Session 02)
- Foosball Table (2) + Vertical Tool Cart (1) user comments — preserve as static text (carried from Session 02)
- Instructables cross-posting — decide per-project after redesign ships

---

## Session 06 Summary

### Accomplished
- First session run in Claude Code terminal on the MacBook Air (tool switch from Cowork now in effect)
- Built Phase 2C.1 homepage: `index.html`, `assets/css/style.css`, `assets/js/site.js`, `data/projects.json`, `404.html`
- Homepage implements all locked Session 05 decisions: minimal intro headline (no carousel), static grid with category filter chips (Woodworking/STEM/Astronomy/Tools), live search, sort (A–Z / most recent), result count, simple Home/About/Contact nav, footer with CC BY-NC 4.0 + mailto contact, no ads/popups/autoplay
- Visual style: light background, graphite/charcoal text, technical blue (`#2563eb`) as the single signal/accent color (chosen over orange for better contrast against warm wood-toned project photos) — system-ui font stack for body, ui-monospace for spec-like UI chrome (result count, category tag) rather than loading Inter/JetBrains Mono from a CDN, to keep the site dependency-free and fast on GitHub Pages — both reasonable-default calls per CLAUDE.md autonomy policy, flagged here rather than blocking
- Built `data/projects.json` manifest for all 13 projects (slug, title, category, thumbnail, dateAdded) — thumbnails picked from existing WordPress-exported images (not yet WebP-converted; that's the Phase 3.20 bulk pass), categories and dates inferred from titles/upload folders (open item above, needs customer confirmation)
- Verified manifest JSON validity and that all 13 thumbnail paths resolve on disk; verified HTML/CSS/JS element IDs and class names all match up. Did not run a local server this session (skipped per customer request) — customer should sanity-check in a browser via Live Preview before 2C.2 sign-off
- Surfaced a gap from Phase 1: actual project page body text (Intro/Supplies/Steps copy) was never harvested, only structural metadata — flagged as open item, will need resolving before Phase 2D/3 project page builds

---

## Session Close Protocol

### Every session — Claude does automatically:
- [x] Update all relevant documents in /docs
- [x] Commit with descriptive message
- [x] Push to GitHub
- [x] No customer sync step needed — Cowork/Claude Code operate directly on the MacBook Air's local copy, already in sync with GitHub after push

### Session 05 Close — final state
- CLAUDE.md, .gitignore, session-notes.md, implementation-plan.md, config-mgmt.md, website-design.md all current and pushed
- Phase 2A — COMPLETE (all 10 questions locked)
- Phase 2B — COMPLETE (sitemap locked)
- Next session: **Claude Code terminal session on MacBook Air**, Phase 2C — Homepage build (`cd ~/projects/web/leisurenotes-com && claude`)
