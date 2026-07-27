# Leisurenotes.com — Session Notes
## Project: leisurenotes.com Redesign & Migration
## Last updated: 2026-07-27 | Session: 05

---

## ⚡ QUICK START — READ FIRST

- **Resume point:** Phase 2A + 2B **complete and locked**. Next: **Phase 2C — Homepage build.**
- **TOOL SWITCH REQUIRED:** Per implementation-plan.md "Tooling by Phase," Phase 2C onward runs in a **Claude Code terminal session on the MacBook Air**, not Cowork. Customer opens Claude Code via `cd ~/projects/web/leisurenotes-com && claude` (or VS Code + Claude Code extension on that same folder) — CLAUDE.md and /docs are read automatically on startup, no re-briefing needed.
- **First action for the Claude Code session:** Read session-notes.md Quick Start + implementation-plan.md, then begin Phase 2C.1 — build homepage per website-design.md (locked decisions below): intro headline + static filterable/searchable project grid, no scrolling banner.

---

## Project State

### Current Phase
| Phase | Status |
|---|---|
| Phase 0 — MacBook Readiness + Folder Setup | ✅ Complete |
| Phase 1 — Content Harvest | ✅ Complete + verified |
| Phase 2A — Design Interview | ✅ Complete — all 10 questions locked |
| Phase 2B — Sitemap | ✅ Complete — locked |
| Phase 2C–2E | ⬅️ Next (Claude Code, MacBook Air terminal) |
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
- [ ] **Tool switch now due:** open Claude Code terminal session on MacBook Air for Phase 2C (Homepage build) — see Quick Start above
- [ ] Git PAT expires ~2027-07-27 — renewal reminder
- [ ] Monitor repo size — revisit GitHub Releases fallback at ~800MB
- [ ] WordPress stays live until Phase 5 approved
- [ ] Build time estimates on project cards need customer verification (carried from Session 02)
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
