# Leisurenotes.com — Session Notes
## Project: leisurenotes.com Redesign & Migration
## Last updated: 2026-07-31 | Session: 16

---

## ⚡ QUICK START — READ FIRST

- **Resume point:** Session 16 (Claude Code terminal) — two workflow/doc updates plus the first real Pass 2 of the image-selection workflow (Bicycle Maintenance Clamp), triggered by the customer dropping a new file into that project's folder between sessions.
  1. **Session startup now includes a `git status` check** (`CLAUDE.md`): added as step 3 of the existing startup sequence, right after reading the docs and before anything else — catches customer-added files (like this session's) automatically instead of relying on the customer remembering to flag every one.
  2. **New standing workflow documented: "Adding a new image to an already-processed project folder"** (`website-design.md`, after the Pass 1/2/3 workflow) — customer drops a file under any filename, flags it (or it's caught by the new git-status check), states the desired position in plain language; Claude Code renames/numbers/shifts in one pass via `git mv`. If the project hasn't had its hero-pick/sequence review yet, the new file just takes the next Pass 1 number. Also documented a shorthand confirmed this session: a plain sequence with no explicit `hero-` tag treats the **first listed item as both the hero pick and gallery position 1**.
  3. **Bicycle Maintenance Clamp — Pass 2 applied** (`projects/bicycle-maintenance-clamp/`): customer's sequence `02, 03, new image` (new image = a customer-added 4-panel Moi3D CAD-views screenshot, kept uncropped per their instruction). Applied via `git mv`: `02-bike-clamp-3d-example-scaled.jpg` → `hero-bike-clamp-3d-example-scaled.jpg` (hero + position 1); `03-bike-clamp-example-use-2-1536x1121.png` → `01-bike-clamp-example-use-2-1536x1121.png`; the new file → `02-bike-clamp-cad-views-2890x2666.png`; the PDF-instructions cover scan (`01-bicycle-clamp-...-pdf-...jpg`, not in the customer's list) had its numeric prefix stripped per the existing "leave anything not listed unprefixed" rule — kept, not deleted.
  4. **Cornhole Game Board — Pass 2 applied** (`projects/cornhole-game-board/`): customer's sequence `03, 04, 02, 01` (first item hero + position 1, same shorthand). Applied via `git mv`: `03-cornhole-example-300x289.jpeg` → `hero-cornhole-example-300x289.jpeg`; `01-cornhole-2d-part-dimensions-2048x1906.png` → `03-cornhole-2d-part-dimensions-2048x1906.png`; `04-cornhole-example-leg-end-225x300.jpeg` → `01-cornhole-example-leg-end-225x300.jpeg`; `02-cornhole-3d-2048x1281.png` unchanged (its Pass 1 number already matched its sequence position). All 4 Pass 1 survivors accounted for, none excluded.
  - **Pass 3 (derivative generation) and the actual page build are separate, not done for either project this session.**
  - See Session 16 Summary below for full detail.
- **Tool switch:** Currently in Claude Code terminal — correct per division-of-labor policy for coding work.
- **Still open / needs customer input:**
  1. **About page (3.4) doesn't exist** — needs customer-supplied content/copy before it can be built, not a template task.
  2. **Image review, 10 remaining folders** (Bicycle Maintenance Clamp and Cornhole Game Board now done) — whenever the customer is ready, in whatever order they choose: review each folder's numbered photos, hand back a hero pick + sequence. Pass 2/3 and the page builds are blocked on this per project.
  3. **Build time / Skill level values still needed for all 12 remaining projects** (standing gap, website-design.md Q10) — customer needs to supply these per project before spec grids can be filled in.
- **First action for next session:** Run the new git-status startup check as usual. Continue image review for the remaining 10 project folders as the customer works through them, applying Pass 2 (and eventually Pass 3 + page build) per project as sequences come in — Bicycle Maintenance Clamp and Cornhole Game Board this session are the template for how that goes. Cloudflare Web Analytics is live on all 3 built pages — worth a check of the dashboard for incoming beacon data.

### Foosball Table punch list — Claude Code brief (Session 08) — ALL 6 ITEMS DONE (Session 09 + 10)
Ready-to-implement, in `/projects/foosball-table/index.html` unless noted. Items 1–5 completed and committed Session 09; item 6 completed Session 10. Full list done — flagged for customer review before locking 2D.6.

1. **Fix stale category reference (newly found this session):** the Session 07 category-model rollout (Play/Workshop/Home/Tech) updated `data/projects.json`, `site.js`, and `index.html` homepage chips, but **missed the Foosball Table page itself** — line 26 breadcrumb (`<span>Woodworking</span>`) and line 35 `<span class="card-category">Woodworking</span>` still say "Woodworking." Foosball Table's correct category is **Play**. Fix both spots. When building the other 12 pages in Phase 3, use each project's `data/projects.json` category as the source of truth for this field — don't hand-type it.
2. **Remove the comments section entirely** — delete the `<section class="project-comments">` block (lines 212–228). No live commenting system exists on the new site. Nothing worth preserving as a pull-quote (both comments are generic praise, no unique build info) — confirmed drop, not fold-in.
3. **Make the breadcrumb category segment a clickable link, pre-filtering the homepage:**
   - Change `<span>Play</span>` (post-fix-1) to `<a href="/?category=play">Play</a>` in the breadcrumb.
   - In `assets/js/site.js`, on page load, read a `category` query param (e.g. `URLSearchParams`) and if present, pre-select/activate that category's filter chip so the grid opens already filtered — same mechanism the chips already use, just triggered from the URL instead of a click.
   - Category value in the URL should be lowercase, matching the chip's data attribute/value convention already used in `site.js`.
4. **Downloads: generalize to one combined ZIP with a contents note** — Foosball Table already has only one CAD ZIP (no separate PDF), so the visible change here is small, but implement the *pattern* now since other projects (e.g., Crayford Focuser: PDF + STL + SKP + STEP) need it:
   - Button label: `Download Project Files (ZIP)` (drop the current "3D Model CAD Files" wording — too specific to this one project).
   - Keep the `download-note` paragraph, update wording to describe what's inside: `Includes SKP, STEP, OBJ, and 3DM CAD formats.` (unchanged content, just confirm it reads as a contents list, not a CAD-only label).
   - **Flag, don't implement bundling logic yet:** some future projects' combined ZIP may exceed the ~60-80MB repo-file working threshold documented in `website-design.md` (GitHub file size section, added this session) — those will need GitHub Releases instead of a repo-committed ZIP. Decide per-project at Phase 3 build time, not now.
5. **Verify hero photo handles both portrait and landscape source images gracefully** — current Foosball Table hero image (`foosball-table-IMG_4829-e1641488166393-225x300.png`) is portrait (225×300). Check `.hero-photo-wrap` in `assets/css/style.css`: confirm it doesn't hard-code an aspect ratio or fixed height that would crop/distort a landscape hero on a different project page. If it does, fix to handle both (e.g., `max-height` + `object-fit: contain` or `cover` — pick whichever preserves the current Foosball Table look without regressing it). No visual change expected on Foosball Table itself if already handled correctly — this is a defensive check for the other 12 pages, several of which have landscape heroes.

6. **DONE (Session 10). Rebuild the spec block** per the revised Q10 decision in `website-design.md` (added Session 08, after customer review of the Foosball Table template's appearance): new field set (Build time, Skill level, Materials, Tools — replacing Difficulty/Fabrication method/CAD formats), new icon-above-label-above-value layout, exact colors/weights/icon names all specified there. Replaced the old `<dl class="spec-block">` markup with a flex-based `<div class="spec-block">` of 4 `.spec-item` columns (icon circle → label → value), matching the doc's colors/sizes exactly. Icons implemented as inline SVGs using the real Tabler outline paths (`ti-clock`, `ti-stairs`, `ti-stack-2`, `ti-tool`, fetched from the Tabler Icons GitHub source) rather than loading the Tabler icon font/CDN — keeps the site's established no-added-dependency approach (same reasoning as the Session 06 system-font decision) while still matching the spec'd icon set exactly. Materials value ("Wood, acrylic") uses the doc's own example, grounded in the project's real materials list; Tools value ("Router, sander, drill") grounded in the page's existing Supplies > Tools list — neither fabricated. Build time and Skill level values stay "Not yet specified" (styled italic/muted via a `.spec-tbd` modifier class, carried forward from the old markup's TBD treatment since the doc doesn't specify otherwise) pending customer input.

**Not part of this punch list, still open, needs customer input (not a coding task):** Foosball Table spec block build-time/skill-level fields are still "Not yet specified" — ask customer directly rather than guessing/fabricating.

**Reference for future firmware/electronics projects (not urgent, no action needed today):** `website-design.md` "Firmware/electronics projects — packaging rules" section, added this session — covers what to include/exclude if a firmware project (e.g. WLD water leak detector) is ever added to the site. Nothing to build yet.

### Category/tag model — DECIDED this session (Session 07)
**Model:** single primary category per project (no tags layer added yet, no true multi-category). 4 categories: **Play, Workshop, Home, Tech**.

Decision path (for context): started from Woodworking/STEM/Astronomy/Tools + possible 5th "Games/Toys" bucket. Customer redefined the taxonomy entirely to Play/Home/Tech/Workshop/Personal. "Personal" was dropped (only 1 candidate project, confusing label for public visitors) — Flag Display Case folded into Home instead. Considered splitting Play into Games/Toys for better chip balance, but customer's grandkids are now 11–14, so future "play" projects will likely skew older/game-like rather than young-kid "toys" — reverted to a single Play category to stay label-accurate as the project list grows. Astronomy folded into generic Tech (same single-project-category reasoning, and Tech doubles as a placeholder for future electronics/precision builds).

**Final mapping (applied to `data/projects.json`, `assets/js/site.js` CATEGORY_LABELS, and `index.html` chips):**

| Category | Count | Projects |
|---|---|---|
| Play | 7 | Foosball Table, Mechanical Pinball Machine, Cornhole Game Board, Biplane Wooden Toy, Baby Doll Carriage, Fan Powered Toy Car, Fidget Spinner |
| Workshop | 3 | Tablesaw Vertical Tenon Jig, Bicycle Maintenance Clamp, Vertical Tool Cart |
| Home | 2 | Mantel Clock, Flag Display Case |
| Tech | 1 | Crayford Focuser 1¼″ |

Chip order (left to right): Play, Workshop, Home, Tech (by count, descending).

Confirmed cheap to modify later: category is a plain string field per project in `projects.json`, labels are a 4-line object in `site.js`, chips are plain buttons in `index.html` — no CMS/build step. Adding a 5th category or splitting Play later is a few line-edits, not a redesign.

### Search capability — improved this session (Session 07)
Customer asked whether search would index full page content or just keywords. Answer: previously title-only substring match (`site.js` `matchesQuery`). Discussed three options — (1) add a `tags` array, (2) add a `summary` text field, (3) full-text search via Lunr.js with a generated index — recommended (2) as the best capability-for-complexity tradeoff for a static, no-build-step site this size; (1) tags remain the already-planned future facet (Q6, deferred to ~25–30 projects) and are a different mechanism (structured filter) than free-text search matching. Customer noted a summary written with deliberate keyword density (materials/tools/technique words) functions as an informal quasi-tag for search purposes even without formal tags — confirmed correct, and worth keeping in mind whenever project summaries/descriptions are written going forward.

**Implemented immediately this session** (customer asked "can this be done now" — turned out yes): discovered mid-session that `mcp__workspace__web_fetch` *can* reach leisurenotes.com directly from this Cowork session, contradicting the earlier documented belief (session-notes Session 02/06) that only the Claude Code terminal has real internet access — that earlier restriction applied specifically to raw `curl` in the Cowork sandbox shell, not this fetch tool. Live-fetched real page content for all 13 projects (the 12 that previously only had structural metadata in `content-inventory.md`, plus re-confirmed Foosball Table) and wrote a keyword-rich 1–2 sentence `summary` field per project — grounded in actual source text, nothing fabricated. Added `summary` to all 13 entries in `data/projects.json` and extended `site.js` `matchesQuery` to check `p.summary` in addition to `p.title`. Verified: valid JSON, all 13 summaries present, `site.js` syntax OK.

**Correction to carry forward:** Cowork sessions **can** reach the live leisurenotes.com site via the `web_fetch` tool (confirmed working this session) — the "Cowork sandbox has no internet access to the live site" note from earlier sessions was only true for direct shell `curl`/`wget`. Worth remembering next time content needs live-fetching and the session happens to be in Cowork rather than Claude Code terminal.

### Next session priority list

**1. Finalize the Foosball Table template.** Open punch list:
- [ ] Restructure project-body into Instructables-style Supplies (materials + tools, consumables separated from equipment) + numbered Steps, preserving original written content/voice as much as possible — **in progress**, first pass done this session (see below), customer has more changes coming
- [ ] Remove the "2 thoughts on..." comments section entirely — no live commenting system exists on the new site, and it would only appear on 2 of 13 pages. Fold any worthwhile line into the prose as a short pull-quote if worth preserving, otherwise drop entirely
- [ ] Make the breadcrumb category segment (e.g., "Woodworking") a clickable link back to a filtered homepage view — currently a plain, non-clickable `<span>`. Needs a homepage mechanism to land pre-filtered (e.g., `/?category=woodworking` read by `site.js` on load) since there are no dedicated category URLs per the locked sitemap
- [ ] Simplify downloads to one combined ZIP per project (CAD + PDF + any other files) instead of separate buttons per file type — single "Download Project Files (ZIP)" button with a note listing what's inside. Note: Foosball Table currently only has one CAD ZIP (no separate PDF), so this project may not visibly change, but the template/pattern should support projects that do have multiple files (e.g., Crayford Focuser has 4: PDF + STL + SKP + STEP ZIPs)
- [ ] Confirm the hero-photo section handles both portrait and landscape source images gracefully — photo orientation varies across all 13 projects (current Foosball Table hero is portrait; homepage thumbnails include both orientations)

Only after both items above are resolved and the customer has explicitly approved: lock the template (2D.6), then proceed to Phase 3 (build the remaining 12 pages using this finalized template + the live-fetch content approach + the finalized category mapping).

### Major discovery: Phase 1 content-harvest gap is resolved
Earlier sessions (Cowork, sandboxed) couldn't reach leisurenotes.com directly, so only images/CAD/PDFs were harvested — actual page body text (Intro/build narrative/comments) was never captured, only structural metadata in content-inventory.md. **This Claude Code terminal session has real internet access** (confirmed via `curl`), unlike the Cowork sandbox. Fetched the live Foosball Table page (`?page_id=703`) directly and pulled the verbatim build narrative and both real reader comments — no fabricated content was needed. **This unblocks Phase 3**: the same live-fetch approach should be used for all remaining 12 project pages instead of placeholder text. Two small, disclosed edits from the verbatim source: dropped a decorative thumbnail image that WordPress had embedded mid-heading (no textual change), and folded the source's "3D Model CAD Files" paragraph into the download section rather than repeating it in both places.

### Revisions applied this session (2C.3–2C.5 loop, chronological)
1. Fixed root-absolute asset paths (`/assets/...`, `/data/...`, image `thumb` paths, card links) → relative paths, after customer reported CSS/JSON 404s
2. Project grid: replaced auto-fill/minmax with explicit breakpoints — 3 col desktop (≥1024px) / 2 col tablet (640–1023px) / 1 col mobile (<640px)
3. On-page logo/title casing: "Leisurenotes" → "LeisureNotes" in nav, `<title>` tags, and footer (nav/title/footer only — docs still say "Leisurenotes.com" as the domain/project name, untouched)
4. Page background darkened for contrast against white project photos: introduced a dedicated `--color-page-bg` token (previously reused `--color-chip-bg`, which would have also darkened the filter chips) — went white → `#eef0f2` → `#e8eaec` (confirmed final by customer). Project cards also got a default subtle box-shadow on top of their existing border.
5. Homepage approved and locked (2C.6). Phase 2D.1: built Foosball Table sample project page with real live-fetched content (hero → spec block → downloads → body → gallery → comments), per "Major discovery" above.
6. First-pass restructure of the Foosball Table body into Intro / Supplies / Steps 1–5 / Final Thoughts (Instructables-compatible shape per Q5) — all original sentences preserved verbatim, only reorganized; Supplies lists extracted from items named in the narrative (materials & hardware / consumables / tools). Customer reviewed and requested further changes — see priority list above. **Session frozen here at customer's request** — remaining 12 pages and template lock explicitly deferred to next session.

---

## Project State

### Current Phase
| Phase | Status |
|---|---|
| Phase 0 — MacBook Readiness + Folder Setup | ✅ Complete |
| Phase 1 — Content Harvest | ✅ Complete + verified |
| Phase 2A — Design Interview | ✅ Complete — all 10 questions locked |
| Phase 2B — Sitemap | ✅ Complete — locked |
| Phase 2C — Homepage build + review | ✅ Complete, approved, locked (2C.6) |
| Phase 2D — Project page template | ✅ Complete, approved, locked (2D.6) — 2026-07-30 |
| Phase 2E — Design Sign-Off | ✅ Complete — website-design.md marked LOCKED |
| Phase 3 — Site Build | 🟡 In progress — structural items audited (3.1–3.6), image-selection Pass 1 done across all 12 remaining project folders, page builds not yet started (blocked on customer photo review + build time/skill level values) |
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
- [x] ~~Customer needs to review homepage~~ — reviewed, revised, and approved 2026-07-27 (2C.6 locked)
- [ ] **Crayford Focuser folder/slug mismatch:** locked sitemap (website-design.md) uses URL slug `crayford-focuser-1-25`, but the existing asset folder is `projects/crayford-focuser/`. Homepage links to `/projects/crayford-focuser-1-25/` per the locked sitemap; the folder itself hasn't been renamed (renaming existing files needs customer sign-off per CLAUDE.md). Resolve when building this project page in Phase 3 — either rename the folder or create the page at the new slug and point assets at the old folder.
- [ ] **Favicon missing** — site has no favicon yet; tracked as Phase 3 item 3.23, not blocking.
- [x] ~~Project body/instruction text was never actually harvested~~ — resolved: this Claude Code terminal session has real internet access (unlike the earlier Cowork sandbox) and can fetch live page content directly. See "Major discovery" above. Applies to all remaining 12 project pages in Phase 3.
- [ ] **Foosball Table spec block (build time, difficulty) left as "Not yet specified"** — not stated anywhere in the source content, so not fabricated. Needs customer input; same will apply to the other 12 pages unless the customer supplies estimates.
- [x] ~~Category assignments superseded~~ — resolved Session 07: Play/Workshop/Home/Tech model decided and applied to `data/projects.json`, `site.js`, and `index.html`. See "Category/tag model — DECIDED this session" above.
- [ ] Git PAT expires ~2027-07-27 — renewal reminder
- [ ] Monitor repo size — revisit GitHub Releases fallback at ~800MB
- [ ] WordPress stays live until Phase 5 approved
- [ ] **Reversed:** Foosball Table's 2 comments (pulled verbatim from the live site last session) are now slated for removal from the template — no live commenting system exists on the new site, and it only ever appeared on 2 of 13 pages. Fold anything worthwhile into a prose pull-quote, otherwise drop. Vertical Tool Cart's 1 comment should NOT be added anywhere either, per this same decision.
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
- Homepage reviewed through several rounds (path fixes, grid breakpoints, logo casing, background contrast) and **approved and locked (2C.6)**
- Discovered this Claude Code terminal session has real internet access (unlike the earlier Cowork sandbox) — resolved the Phase 1 content-harvest gap by fetching the live Foosball Table page directly. Built Phase 2D.1 sample project page with real body text, real image gallery, and both real reader comments, not placeholders
- Customer requested the project-body content follow the locked Instructables-compatible structure (Q5) rather than raw narrative — restructured into Intro / Supplies (materials & hardware / consumables / tools, extracted from the narrative) / Steps 1–5 / Final Thoughts, preserving all original sentences verbatim
- Customer then queued further changes and **froze the session mid-Phase-2D**: don't build the other 12 pages, don't lock the template yet. Two-item priority list set for next session — finalize the category/tag model (with draft mapping proposal for all 13 projects) and finish the Foosball Table template punch list (comments removal, clickable breadcrumb category, combined single-ZIP downloads, hero photo orientation handling) — see Quick Start above for full detail

---

## Session 07 Summary

### Accomplished
- Ran in Cowork (not Claude Code terminal) — flagged the documented tool switch to the customer, who chose to continue in Cowork for this session rather than switch
- Resolved Priority 1 from Session 06: finalized the category/tag model. Iterated through several taxonomies with the customer (original Woodworking/STEM/Astronomy/Tools+Games/Toys proposal → customer's Play/Home/Tech/Workshop/Personal → dropped Personal → considered/reverted a Games vs. Toys split based on customer's grandkids now being 11–14) — see "Category/tag model — DECIDED this session" above for full reasoning
- Applied the final Play/Workshop/Home/Tech model to `data/projects.json` (all 13 projects), `assets/js/site.js` (`CATEGORY_LABELS`), and `index.html` (filter chips + intro copy + meta description)
- Verified `projects.json` is valid JSON and category counts match the locked mapping (Play 7 / Workshop 3 / Home 2 / Tech 1)
- Answered customer question on future maintainability: confirmed categories are cheap to add/modify later (plain string field + 4-line label map + button markup, no CMS/build step)
- Answered customer question on search: clarified current search is title-only substring match; discussed tags vs. summary field vs. full-text (Lunr.js) options, recommended summary field as best capability/complexity tradeoff; clarified summary and the already-planned tag facets (Q6) are complementary, not competing
- Discovered `web_fetch` can reach leisurenotes.com directly from this Cowork session (corrects earlier documented belief that only Claude Code terminal has live internet access) — live-fetched real content for all 13 projects and wrote grounded, keyword-rich summaries (no fabrication)
- Implemented: added `summary` field to all 13 projects in `data/projects.json`; extended `site.js` search to match against title + summary. Verified JSON validity, summary presence for all 13, and `site.js` syntax

### Open Items carried forward
- **Tool switch still due** — Session 08 should default to Claude Code terminal on the MacBook Air unless customer says otherwise; ask again rather than assuming Cowork is now fine
- Foosball Table template punch list (comments removal, clickable breadcrumb category, combined single-ZIP downloads, hero photo orientation handling) — see Quick Start above, this is now the sole blocker before Phase 2D.6 lock + Phase 3
- Crayford Focuser folder/slug mismatch — unresolved, deferred to Phase 3 build of that page
- Favicon missing — Phase 3 item 3.23, not blocking
- Foosball Table spec block (build time, difficulty) — still "Not yet specified," needs customer input
- Git PAT expires ~2027-07-27 — renewal reminder
- Monitor repo size — revisit GitHub Releases fallback at ~800MB
- WordPress stays live until Phase 5 approved
- Instructables cross-posting — decide per-project after redesign ships

---

## Session 08 Summary

### Accomplished
- Ran in Cowork (customer's explicit choice again) — planning/advisory only, no code or git touched, per Session 07's division-of-labor policy
- Answered customer question on post-launch content maintainability: narrative edits are simple text changes inside each project's `index.html` (no CMS); recommended doing edits via Claude Code (find text, edit, commit, push) rather than customer hand-editing raw HTML directly — low friction either way given 1-2 projects/month cadence
- Answered customer question on GitHub file size limits (git hard cap 100MB/file, Releases 2GB/file, recommended repo <1GB) — researched and confirmed current limits via web search
- Reviewed customer's VS Code folder screenshots for a candidate future project (WLD — ESP32-H2 water-leak detector) and determined the mandatory vs. excludable folders for a firmware download package: `build/` (compiler output, ~1.2GB of the ~1.27GB total, always regenerable) and `mfg/` (device-specific manufacturing/attestation data — **flagged as security-sensitive: contains private key material, exclude always**) both excluded; `main/`, `CMakeLists.txt`, `sdkconfig(.defaults)`, `partitions.csv`, `dependencies.lock`, `managed_components/` are the mandatory buildable set
- Logged both the file-size limits and the firmware packaging rules into `website-design.md` (new "GitHub file size limits" and "Firmware/electronics projects — packaging rules" subsections under Technical Decisions) — reference for if/when WLD or a similar project is added to the site; nothing implemented, no firmware project live yet
- Reviewed the current Foosball Table page against the open punch list (comments removal, clickable breadcrumb, combined ZIP downloads, hero photo orientation) and wrote a fully specified, ready-to-implement brief for Claude Code — see Quick Start above
- Caught a gap the Session 07 category rollout missed: Foosball Table's own page still says "Woodworking" (breadcrumb + card-category), not updated to "Play" — added as punch-list item 1

### Open items carried forward
- Foosball Table punch list (5 items, fully specified) — see Quick Start, this is the sole blocker before Phase 2D.6 lock + Phase 3
- Foosball Table spec block (build time, difficulty) — still "Not yet specified," needs customer input directly, not a coding task
- Crayford Focuser folder/slug mismatch — unresolved, deferred to Phase 3 build of that page
- Favicon missing — Phase 3 item 3.23, not blocking
- Git PAT expires ~2027-07-27 — renewal reminder
- Monitor repo size — revisit GitHub Releases fallback at ~800MB (now also relevant per-file at ~60-80MB, see website-design.md)
- WordPress stays live until Phase 5 approved
- Instructables cross-posting — decide per-project after redesign ships
- WLD (water leak detector) firmware project — not yet added to site, packaging rules documented and ready whenever customer decides to add it

---

## Session 09 Summary

### Accomplished
- Ran in Claude Code terminal (correct tool per division-of-labor policy) — implemented the fully-specified Session 08 punch list against `/projects/foosball-table/index.html` and `assets/js/site.js`:
  1. Fixed stale "Woodworking" category reference (breadcrumb + `card-category` span) to "Play" — the Session 07 category rollout had missed this page
  2. Removed the `<section class="project-comments">` block entirely — no live commenting system on the new site, nothing worth preserving as a pull-quote
  3. Made the breadcrumb category segment a clickable link (`<a href="/?category=play">Play</a>`); extended `site.js` to read a `category` URL query param on page load via `URLSearchParams` and pre-activate the matching filter chip, reusing the existing chip-click mechanism
  4. Generalized the downloads button to `Download Project Files (ZIP)` (was "3D Model CAD Files (ZIP)") and updated the note wording to read as a contents list — pattern now ready for projects with multiple file types (e.g., Crayford Focuser); did not implement any bundling logic, per the brief's explicit flag-don't-build instruction
  5. Verified hero photo orientation handling — `.hero-photo-wrap` in `style.css` already uses `max-height` + `object-fit: contain` with flex centering, no hard-coded aspect ratio or fixed height, so both portrait and landscape heroes are already handled correctly. No CSS change needed; confirmed via code inspection, not a visual regression risk
- Verified via local `python3 -m http.server`: homepage and Foosball Table page both return 200, comments section confirmed absent from rendered HTML (grep count 0), `urlCategory` logic present in served `site.js`, breadcrumb link renders with the correct `?category=play` href. Also verified `.breadcrumbs a` CSS already styles the new link consistently with the existing "Home" breadcrumb link (muted color, hover-to-signal-color, no underline) — no CSS changes needed there either
- No browser extension connected this session (`claude-in-chrome` not set up) — verified via server response inspection and code/CSS review instead of a live visual check; flagging this as a lighter verification bar than the CLAUDE.md "test in a browser" guidance calls for, so customer should do a quick visual pass before sign-off
- `node -c` confirmed `site.js` syntax is valid after the edit

### Open items carried forward
- **Punch list implemented but not yet customer-approved** — do not start Phase 3 or mark 2D.6 locked until customer confirms the 5 changes look right (see Quick Start)
- Foosball Table spec block (build time, difficulty) — still "Not yet specified," needs customer input directly, not a coding task
- Crayford Focuser folder/slug mismatch — unresolved, deferred to Phase 3 build of that page
- Favicon missing — Phase 3 item 3.23, not blocking
- Git PAT expires ~2027-07-27 — renewal reminder
- Monitor repo size — revisit GitHub Releases fallback at ~800MB (per-file trigger ~60-80MB, see website-design.md)
- WordPress stays live until Phase 5 approved
- Instructables cross-posting — decide per-project after redesign ships
- WLD (water leak detector) firmware project — not yet added to site, packaging rules documented and ready whenever customer decides to add it

---

## Session 10 Summary

### Accomplished
- Ran in Claude Code terminal — implemented punch-list item 6 (the last open item): rebuilt the Foosball Table spec block per the revised Q10 decision in `website-design.md` (added Session 08 after customer review)
- Replaced the old `<dl class="spec-block">` (Build time / Difficulty / Fabrication method / CAD formats) with a new field set — Build time, Skill level, Materials, Tools — in an icon-above-label-above-value layout, 4 equal-width flex columns, exact colors/sizes/weights from the spec (`#f7f8f9` row background, `#e6f1fb`/`#1d4ed8` icon circle, 10px uppercase muted labels, 14px monospace regular-weight `#454b52` values)
- Icons: fetched the real Tabler outline SVG source (`clock`, `stairs`, `stack-2`, `tool`) directly from the Tabler Icons GitHub repo and inlined them as SVG (using `stroke="currentColor"` so CSS controls icon color) rather than adding a Tabler CDN/webfont dependency — consistent with the site's existing no-added-dependency direction (same reasoning as the Session 06 decision to use system fonts instead of Google Fonts/Inter)
- New CSS rules added to `assets/css/style.css`: `.spec-block`, `.spec-item`, `.spec-icon`, `.spec-icon svg`, `.spec-label`, `.spec-value`, `.spec-value.spec-tbd` — replacing the old `.spec-block`/`dt`/`dd` rules entirely. Confirmed via `grep` that no other page currently references the old markup, so nothing else needed updating
- Materials value ("Wood, acrylic") taken directly from the design doc's own worked example for this project, grounded in the project's real materials (plywood/MDF/walnut + acrylic playing surface) — not fabricated. Tools value ("Router, sander, drill") grounded in the page's existing Supplies > Tools list (Router, Orbital sander, Drill, Clamps — top 3 used). Build time and Skill level remain "Not yet specified" pending customer input, per the doc's explicit note that this is a content gap, not a design gap
- Verified via local `python3 -m http.server`: page returns 200, 4 `.spec-item` blocks render, new CSS rules are present in the served stylesheet, div tags balanced, old `<dl>` markup fully removed
- **All 6 items of the Session 08 punch list are now complete.** The Foosball Table template is feature-complete — flagging back to customer for explicit review/sign-off before marking 2D.6 locked, per standing instruction not to self-approve gated design decisions

### Open items carried forward
- **Full template implemented, awaiting customer sign-off on 2D.6** — do not start Phase 3 until approved
- Foosball Table spec block Build time/Skill level values — still "Not yet specified," needs customer input directly, not a coding task
- Crayford Focuser folder/slug mismatch — unresolved, deferred to Phase 3 build of that page
- Favicon missing — Phase 3 item 3.23, not blocking
- Git PAT expires ~2027-07-27 — renewal reminder
- Monitor repo size — revisit GitHub Releases fallback at ~800MB (per-file trigger ~60-80MB, see website-design.md)
- WordPress stays live until Phase 5 approved
- Instructables cross-posting — decide per-project after redesign ships
- WLD (water leak detector) firmware project — not yet added to site, packaging rules documented and ready whenever customer decides to add it

---

## Session 11 Summary

### Accomplished
- Ran in Claude Code terminal — implemented a fully-specified brief drafted by a same-day Cowork planning session, no clarification needed. Read `session-notes.md` and `implementation-plan.md` per standard startup before starting.
- **Homepage headline:** replaced `<h1>Free plans for functional maker builds</h1>` with `<h1>Free Maker Plans — No Ads, No Cookies, No Login</h1>` in `index.html`; subhead paragraph left unchanged.
- **Homepage grid:** changed the desktop (`min-width: 1024px`) `.project-grid` breakpoint from 3 columns to 4 in `assets/css/style.css`; tablet (2-col) and mobile (1-col) breakpoints untouched.
- **Foosball Table spec values:** Build time and Skill level, both "Not yet specified" since Session 10, now have real values supplied by the customer — "2-3 Weekends" and "Advanced" — with the `spec-tbd` placeholder class removed from both (that class is still defined in `style.css` for use on the other 12 pages' placeholder values until their own build-time/skill-level content arrives).
- **Header/footer restructure**, applied to `index.html`, `projects/foosball-table/index.html`, and `404.html` (customer flagged 404.html duplicated the old nav too, so it was folded into the same pass rather than left inconsistent):
  - Removed `<nav class="site-nav">` entirely from inside `<header class="site-header">` — header now contains only the site-title link. Corresponding `.site-nav a` / `.site-nav a:hover` CSS rules removed from `style.css` (verified nothing else in the repo referenced `site-nav` before deleting).
  - Replaced the footer's plain `mailto:` line with a structured footer: copyright/license line, a `<nav aria-label="Footer">` with About + Contact links (Home is not repeated in the footer — same reasoning as the old header nav not needing a "Home" link when the site-title already links there), and a new `.footer-privacy` line disclosing cookie-free, privacy-respecting analytics with no personal data collected.
  - Added `.footer-privacy` CSS (small, muted, matching `--color-text-muted`, `flex-basis: 100%` so it wraps below the copyright/nav line in the existing flex footer) and `.footer-inner nav a` spacing rules; the footer nav links inherit the pre-existing `.footer-inner a` styling (muted color via parent, hover → signal blue, no underline) — same visual treatment the old `.site-nav a` had, so nothing needed to be re-derived there.
- **Cloudflare Web Analytics (flagged item, implemented as instructed):** added the beacon `<script>` tag to `index.html`, `404.html`, and `projects/foosball-table/index.html`, each preceded by an explicit `<!-- TODO: add Cloudflare Web Analytics token -->` comment and a placeholder token string in the `data-cf-beacon` attribute. Customer had not created a Cloudflare account yet at that point in the session, so this didn't function until a real token was dropped in — did not block on this, per the brief's explicit instruction.
- **Cloudflare Web Analytics — resolved same session (follow-up pass):** customer created the Cloudflare account and supplied the real site token (`e969f64869f440da8109395b251f440a`). Replaced the placeholder token in the `data-cf-beacon` attribute and removed the now-obsolete `<!-- TODO -->` comment line in all 3 files. Verified the token string is byte-identical across `index.html`, `404.html`, and `projects/foosball-table/index.html`. Analytics is now live and functional on all 3 pages.
- **Documentation (this session's own job, not Cowork's):**
  - `website-design.md` Q10 section: added two new standing rules for all 13 projects — Skill level is always one of Beginner/Intermediate/Advanced (matches the existing `ti-stairs` 3-rung icon), and Build time uses flexible per-project units (hours vs. weekends) kept to 1-3 words with no parenthetical ranges. Also updated the old "Not yet resolved" note to record Foosball Table's values are now resolved, with the other 12 pages still open.
  - `website-design.md`: added a new "Phase 3 — Image selection workflow" subsection documenting the two-pass numbering process for the remaining 12 project folders (Pass 1: Claude Code first-pass `01-`/`02-`/`03-`... numbering, one file per distinct photo, largest/original resolution, duplicate WordPress crops skipped; Review: customer hands back an ordered number list with a `hero-` marked pick; Pass 2: Claude Code renames the hero pick to `hero-<original filename>`, renumbers the rest in the customer's order, leaves unlisted files unprefixed/excluded). Explicitly process documentation only — no project folders touched this session.
  - `session-notes.md` Quick Start updated to this session's resume point; this Session 11 summary added.
- Verified via local `python3 -m http.server`: `index.html`, `404.html`, and the Foosball Table page all serve with zero remaining `site-nav` references; Foosball Table's 4 `.spec-value` fields render correctly (2-3 Weekends / Advanced / Wood, acrylic / Router, sander, drill); grid CSS confirms `repeat(4, 1fr)` at the 1024px breakpoint.

### Open items carried forward
- **Foosball Table template still awaiting final customer sign-off (2D.6)** — new spec values + nav/footer restructure are additional changes since Session 10's "feature-complete" flag; do not start Phase 3 until approved
- Crayford Focuser folder/slug mismatch — unresolved, deferred to Phase 3 build of that page
- Favicon missing — Phase 3 item 3.23, not blocking
- Git PAT expires ~2027-07-27 — renewal reminder
- Monitor repo size — revisit GitHub Releases fallback at ~800MB (per-file trigger ~60-80MB, see website-design.md)
- WordPress stays live until Phase 5 approved
- Instructables cross-posting — decide per-project after redesign ships
- WLD (water leak detector) firmware project — not yet added to site, packaging rules documented and ready whenever customer decides to add it
- Phase 3 image-selection two-pass workflow now documented (website-design.md) — ready to use once Phase 3 build starts on the remaining 12 projects

---

## Session 12 Summary

### Accomplished
Ran in Claude Code terminal, three sequential fully-specified briefs (no clarification needed on any), each read `session-notes.md` per standard startup before starting:

1. **Homepage headline restyle** (`index.html`, `assets/css/style.css`): split `<h1>Free Maker Plans — No Ads, No Cookies, No Login</h1>` into `<h1>Free Maker Plans</h1>` plus a new `<p class="intro-tagline">No Ads · No Cookies · No Login</p>` badge line, sitting between the h1 and the existing muted body paragraph. `.intro h1` bottom margin reduced to 0.4rem (from 0.75rem); new `.intro-tagline` rule added (mono font, signal-blue, matching `.card-category`/`.spec-label` treatment). **Caught and fixed a spec bug before implementing:** the literal instructions specified a bare `.intro-tagline` class selector, but the existing `.intro p` rule (class+element, specificity 0-1-1) would have silently overridden the tagline's color and margin since the tagline is also a `<p>` (bare class selector is only 0-1-0). Scoped the new rule as `.intro .intro-tagline` instead to actually win the cascade.

2. **Footer reorder, pass 1** (`index.html`, `404.html`, `projects/foosball-table/index.html`): About/Contact nav and `.footer-privacy` moved to share the top row; copyright moved below into a new `.footer-copyright` paragraph. `.footer-privacy` lost its `flex-basis: 100%` (so it could sit inline) and its dedicated `font-size: 0.8rem` (so it inherits `.footer-inner`'s `0.85rem` instead).

3. **Footer reorder, pass 2 — final layout** (same 3 files, superseding pass 1 same session): `.footer-privacy` restored to its own full-width top row (`flex-basis: 100%`, plus `margin: 0 0 0.6rem` for spacing below); new `.footer-bottom-row` div wraps `.footer-copyright` and the About/Contact `nav`, `justify-content: space-between` putting copyright left / nav right; new `.footer-copyright` rule (`margin: 0`, previously unstyled); `.site-footer` given `background: var(--color-bg-alt)` so the whole footer band reads as a distinct lighter section matching the homepage `.intro` background, separated from content above by the existing `border-top`.

**Verification note:** attempted to visually confirm the final footer layout via a local `python3 -m http.server` + browser screenshot, but no visual verification tool was available this session — Chrome extension not connected, and Safari/`screencapture` AppleScript automation failed on missing OS Accessibility/Screen Recording permissions (`osascript is not allowed assistive access`, `screencapture: could not create image from display`). Verified correctness by tracing the CSS flexbox rules by hand instead (flex-basis forces the privacy line to its own row; the bottom-row div then gets the full second row via `flex: 1`, with `justify-content: space-between` splitting its two children). Flagged this caveat to the customer before committing pass 2; customer chose to proceed on the logic review rather than block for a live check.

**Session-numbering correction (this closing pass):** the three passes above were originally logged as Sessions 12, 13, and 14 — one bump per user turn — inconsistent with this doc's actual convention where a session number covers one full sitting regardless of how many sub-changes it contains (see Session 11, which bundled five). Consolidated back down to a single Session 12 covering all three passes; the header date/session and Quick Start section above were rewritten accordingly.

### Open items carried forward
- **Foosball Table template still awaiting final customer sign-off (2D.6)** — this session's headline/footer changes are additional changes since Session 10's "feature-complete" flag; do not start Phase 3 until approved
- **Footer layout not yet visually confirmed live** — traced correct via CSS reasoning, not screenshotted; worth a quick customer eyeball next live view
- Crayford Focuser folder/slug mismatch — unresolved, deferred to Phase 3 build of that page
- Favicon missing — Phase 3 item 3.23, not blocking
- Git PAT expires ~2027-07-27 — renewal reminder
- Monitor repo size — revisit GitHub Releases fallback at ~800MB (per-file trigger ~60-80MB, see website-design.md)
- WordPress stays live until Phase 5 approved
- Instructables cross-posting — decide per-project after redesign ships
- WLD (water leak detector) firmware project — not yet added to site, packaging rules documented and ready whenever customer decides to add it

---

## Session 13 Summary

### Accomplished
Ran in Claude Code terminal, one fully-specified brief from a same-day Cowork planning session (banner concepts reviewed, decision made there — implementation only, no clarification needed). Scope: `projects/foosball-table/index.html`, `assets/css/style.css`, new `assets/js/lightbox.js`, and one new image asset — all on the Foosball Table page only, not propagated to other templates yet.

1. **Combined two-column hero** (`index.html`, `style.css`): merged the old `.project-hero` (single centered photo) and `.project-spec` (4-column icon spec bar) sections into one `.hero-grid` block inside the existing `.container` (1100px max-width). CSS grid, `grid-template-areas: "content photo"`, `1fr 1fr`, `gap: 2.5rem`. Left column (`.hero-content`) is `display: flex; flex-direction: column; justify-content: center` so it vertically centers within whatever row height the image tile establishes — the row height is driven by the photo tile (`aspect-ratio: 4/3` sized off the 1fr column width), not by the text content, satisfying the brief's "block height driven by the image" requirement without any JS. Below 640px, `grid-template-areas` flips to a single column with photo on top, matching the existing site breakpoint.
2. **2x2 spec grid, icons dropped:** `.spec-block`/`.spec-item`/`.spec-icon` (flex row layout, icon circles, 4 inline Tabler SVGs for clock/stairs/stack/tool) replaced with `.spec-grid` (`display: grid; grid-template-columns: 1fr 1fr`) containing 4 `.spec-item` label/value pairs, no icon markup at all. Grepped the repo first to confirm `.spec-icon` had zero references outside this one page before deleting the CSS rule.
3. **Hero photo — no landscape swap, portrait + letterbox kept:** reviewed all 32 `.project-gallery` photos (the landscape 768×576 set) as potential banner replacements per the customer's landscape-first-hero rule. All 32 are in-progress workshop/build shots (clamps, router jigs, a drill press, parts laid out on a bench) — no composed finished-table shot among them. The one image that looked like a landscape version of the current portrait hero photo (`foosball-table-IMG_4829-768x576.png`) turned out on inspection to be the same photo rotated 90° into a landscape-dimensioned file, not an actual crop — visually unusable. Per the brief's fallback path, kept the existing portrait original (`foosball-table-IMG_4829-e1641488166393-225x300.png`) as the hero source and relied on the tile's `object-fit: cover` + `var(--color-page-bg)` background.
4. **New cropped hero derivative:** `foosball-table-IMG_4829-e1641488166393-hero-224x168.png`, produced via macOS `sips` (`--cropOffset` + `-c`) from the 225×300 portrait original — exact 4:3 (224×168, the largest clean 4:3 crop obtainable without upscaling past the source's native resolution), offset vertically to keep the full top rod handles in frame rather than a dead-center crop that clipped them. This derivative is the tile's `<img src>`; the original 225×300 file was not modified and remains the lightbox target. Both files now sit side by side in the project folder.
5. **New lightbox component** (`assets/js/lightbox.js`): plain vanilla JS IIFE, no dependency, consistent with the site's existing system-font/inline-SVG-icon no-added-dependency pattern. Single overlay element built once and reused; `.js-lightbox` class applied to the hero `<a>` (wrapping the cropped tile `<img>`, `href` = original photo path, click handler does `preventDefault` + reads `href`) and to all 34 `.gallery-grid img` elements (click handler reads `img.currentSrc || img.src` directly, no cropped/original distinction needed since gallery images have no separate derivative). Close via overlay-backdrop click (checks `event.target === overlay` so clicks on the image itself don't close it), a fixed `.lightbox-close` button, or `Escape`. New CSS block added after `.gallery-grid img` in `style.css`: `.lightbox-overlay` (fixed, full-viewport, dimmed backdrop, opacity/visibility transition), `.lightbox-image` (`max-width/max-height: 100%`, no forced aspect or stretch), `.lightbox-close`, and a `body.lightbox-locked { overflow: hidden }` scroll-lock toggled on open/close.
6. **Verification:** no browser/Chrome extension available in this sandbox (confirmed again via the `claude-in-chrome` skill — not connected). Verified the grid/aspect-ratio math and image crop by hand: read the actual cropped derivative back with the file-read tool to confirm the composition looked right before committing it, spot-checked all `<section>`/`</section>` tag balance, and grepped for zero remaining `.spec-icon`/`.hero-photo-wrap`/`.project-spec` references anywhere in the repo. Not a substitute for a live rendered check.

### Open items carried forward
- **Foosball Table template still awaiting final customer sign-off (2D.6)** — this session's hero/spec redesign stacks on top of Session 10's "feature-complete" flag and Session 12's headline/footer changes; do not start Phase 3 until approved.
- **Hero photo swap decision needs a customer look** — no gallery photo was swap-worthy this session (see item 3 above); worth confirming the portrait+letterbox treatment is acceptable, or flagging a future re-shoot for a landscape hero-worthy photo of the finished table.
- **Hero redesign not yet visually confirmed live** — traced correct via CSS/grid reasoning and a direct look at the cropped image file, not screenshotted in a browser; worth a quick customer eyeball alongside the still-unverified Session 12 footer layout.
- Crayford Focuser folder/slug mismatch — unresolved, deferred to Phase 3 build of that page
- Favicon missing — Phase 3 item 3.23, not blocking
- Git PAT expires ~2027-07-27 — renewal reminder
- Monitor repo size — revisit GitHub Releases fallback at ~800MB (per-file trigger ~60-80MB, see website-design.md)
- WordPress stays live until Phase 5 approved
- Instructables cross-posting — decide per-project after redesign ships
- WLD (water leak detector) firmware project — not yet added to site, packaging rules documented and ready whenever customer decides to add it

---

## Session 14 Summary

### Accomplished
Ran in Claude Code terminal, two fully-specified items from a same-day Cowork review of the live Session 13 result (no clarification needed).

1. **Hero photo blur fix** (`projects/foosball-table/`): the customer flagged visible softness in the Session 13 hero tile. Cause: the derivative was cropped from the 225×300 WordPress thumbnail (`foosball-table-IMG_4829-e1641488166393-225x300.png`) then browser-upscaled ~2.4x to fill the ~530px-wide tile. A higher-resolution source of the same photo already existed in the folder — `foosball-table-IMG_4829-768x576.png` — but it was stored rotated ~90° (the table appears sideways in the file), so Session 13 correctly identified it as visually unusable in its stored form and didn't reuse it. This session: rotated it back to true portrait with `sips -r 90` (confirmed the rotation direction by mapping which original edges — door, bookshelf — ended up on which sides of the sideways file before picking CW vs CCW, rather than guessing), producing a 576×768 image — 2.56x the linear resolution of the 225×300 file, same underlying photo. Re-cropped to the same 4:3 hero-tile framing from this higher-res source (`sips -c 432 576 --cropOffset 115 0`, offset scaled proportionally from the original 224×168/offsetY-45 crop so the framing — full top rod handles in shot, matching bottom margin — stayed the same, just sharper). Output: `foosball-table-IMG_4829-hero-576x432.png`, now the tile's `<img src>`; the old `foosball-table-IMG_4829-e1641488166393-hero-224x168.png` derivative was deleted (`git rm`) since it's fully superseded. Both original files — the 768×576 (now confirmed to just be a bigger version of the same portrait shot, stored sideways) and the 225×300 portrait — are untouched; the 225×300 file remains the lightbox target for the hero tile, unchanged from Session 13.
2. **Phase 3 image-selection workflow updated** (`docs/website-design.md`, "Phase 3 — Image selection workflow" section): expanded from two passes to three, per this session's own hero-photo mixup as the concrete motivating case.
   - Pass 1 now requires a quick visual check before discarding smaller siblings of a photo, instead of trusting filename/size convention alone — cites this session's `IMG_4829-768x576.png` (looked like a bigger duplicate by name, was actually a different rotated composition) as the cautionary example directly in the doc.
   - Redundant smaller sizes move to a new per-project `_archive/` subfolder (outside any served path) instead of being deleted, so a wrong keep/discard call is recoverable.
   - Pass 1's sequential `01-`/`02-`/`03-`... rename is restated as unchanged, since it's referenced by the Review step.
   - Review and Pass 2 are unchanged from the existing (Session 11) doc.
   - New Pass 3: generate the actual template-needed derivative sizes from the final survivor set (homepage card thumbnail, the 4:3 hero-tile crop, and a ~1600px-longest-edge capped size for the gallery grid and lightbox) rather than serving whatever raw resolution survived Pass 1.
   - Documentation only — no other project folders' files were touched; this only takes effect once Phase 3 build work starts on the remaining 12 pages.
3. **Session 12 footer layout — closed out.** Customer visually confirmed the footer layout (privacy line full-width top row, copyright/nav split below) looks correct on a live view. No further action; removed from the open-items list.
4. **Verification:** same sandbox limitation as prior sessions — no Chrome extension connected, confirmed again this session via the `claude-in-chrome` skill. Verified the rotation direction analytically before running it (mapped original portrait edges to their expected position in the sideways file), then read the actual rotated and cropped output files back with the image-reading tool to visually confirm the composition (full table, bookshelf, door, rod handles in frame) before committing — not a substitute for a live rendered check.

### Open items carried forward
- **Foosball Table template still awaiting final customer sign-off (2D.6)** — both open visual issues (footer, hero resolution) are now resolved; 2D.6 itself is still an explicit customer decision, not implied by "nothing left to fix." Needs one final full-page live look before Phase 3 starts on the remaining 12 pages.
- Crayford Focuser folder/slug mismatch — unresolved, deferred to Phase 3 build of that page
- Favicon missing — Phase 3 item 3.23, not blocking
- Git PAT expires ~2027-07-27 — renewal reminder
- Monitor repo size — revisit GitHub Releases fallback at ~800MB (per-file trigger ~60-80MB, see website-design.md)
- WordPress stays live until Phase 5 approved
- Instructables cross-posting — decide per-project after redesign ships
- WLD (water leak detector) firmware project — not yet added to site, packaging rules documented and ready whenever customer decides to add it

---

## Session 15 Summary

### Accomplished
Ran in Claude Code terminal. Customer approved the live Foosball Table page outright (no revisions) after reviewing the Session 12/14 footer and hero fixes — this session's job was to lock that approval into the docs, audit what Phase 3's non-page-specific checklist items actually still need doing, and unblock the customer's next step (photo review) across all 12 remaining projects at once.

1. **2D.6 locked, Phase 2E closed out** (`implementation-plan.md`): marked 2D.2–2D.6 complete (customer's direct approval satisfies the revision loop trivially — nothing to revise). For 2E.1 ("update website-design.md with build decisions"), treated it as a real verification pass rather than a rubber stamp — grepped the doc for the actual current category labels and spec-block layout and found both were stale:
   - Q6 still described the pre-Session-07 category draft (Woodworking/STEM/Astronomy/Tools) — added the real Play/Workshop/Home/Tech mapping with counts, matching what's actually in `data/projects.json`/`site.js`/`index.html`.
   - Q10 still presented the Session 08 icon-based spec-block layout as current, with zero mention of the Session 13 combined two-column hero, 2x2 no-icon spec grid, new lightbox component, or the Session 14 resolution fix. Added a new "CURRENT, Session 13/14" layout block, marked the old one superseded and kept it for history (matches how the doc already handled the Session 08 field-set revision).
   - `website-design.md` header changed to **Status: LOCKED (Phase 2A–2E...)**. 2E.2 (customer approval) and 2E.4 (standing rule: all future pages use the locked template, no more ad hoc template changes) both marked complete.
2. **Phase 3 structural audit** (`implementation-plan.md` 3.1–3.6), checked against the actual repo state rather than assumed:
   - **3.1 (site architecture)** — confirmed done: `assets/{css,js}`, `data/projects.json`, `docs/`, `projects/<slug>/`, `index.html`, `404.html`, header/footer nav on every page. Checked off.
   - **3.2 (homepage grid)** — the checklist text ("scrolling project banner") predates the Q4 carousel-reversal decision from Session 05 and was never actually built that way; corrected the wording to match the real static filterable/searchable/sortable grid. Checked off.
   - **3.3 (category filtering)** — same kind of stale-wording issue (said "Woodworking/STEM/Astronomy/Tools", actual categories are Play/Workshop/Home/Tech per Session 07). Corrected wording, confirmed chips/labels/JSON field/URL-param pre-filtering all present and working. Checked off.
   - **3.4 (About page)** — checked `find` for any `/about/` content: **none exists**. Every page's footer links to it (404s live right now). Flagged as a genuine open item needing customer-supplied copy — explicitly did not draft placeholder content, since the brief was clear this needs real content decisions, not a guess.
   - **3.5 (mailto)** — confirmed `mailto:leisurenotes.hsc@gmail.com` present in the footer nav on every page. The checklist's original "+ contact page" wording was already stale against the locked Phase 2B sitemap decision (mailto only, explicitly no separate Contact page) — corrected the wording rather than building a page the sitemap already ruled out. Whether the About page (once it exists) should also restate contact info is a content question for that page's copy, not a separate build task — left bundled with the 3.4 flag, not decided unilaterally.
   - **3.6 (CC BY-NC footer)** — confirmed present site-wide. Checked off.
3. **Image-selection workflow Pass 1, all 12 remaining project folders** (417 total files audited): wrote a grouping script (base-filename + WordPress `-WIDTHxHEIGHT` suffix parsing) to identify one "distinct photo" identity per group and its largest available file, then applied the Session 14 lesson directly — **flagged every case where a same-subject file family looked ambiguous by filename alone and visually checked it before merging or discarding, rather than trusting the pattern.** Two real findings from that check (both included in the website-design.md workflow doc as the concrete cases, alongside the original Foosball one):
   - **`mechanical-pinball-machine`**: `pinball-mechanical-example-20210708-1` (plain) vs. `...-e1625848163126` (WordPress-edited) looked like the same Foosball-style risk pattern. Visual check showed they're genuinely **different photos** — the plain version is a wide shot of the whole machine, the edited version is a cropped detail shot of just the scoreboard. Correctly kept as two separate distinct-photo entries, each deduped to its own largest version.
   - **`cornhole-game-board`**: `cornhole-example` vs. `cornhole-example-e1622929223937` looked like the same risk pattern but visually turned out to be **near-duplicate crops of the same shot** (same board, same angle, marginally different crop box) — correctly merged into one identity, kept the larger of the two, archived the other.
   - Also caught two **non-obvious duplicate patterns** the same script surfaced: `vertical-tool-cart` had three CAD-render pairs (`tool-cart-CAD0000{1,2,3}` vs. `...-1`) and one photo (`tool-cart00004` vs. `...-1`) with identical WordPress-generated size cascades — visually confirmed one pair pixel-identical, treated the pattern as WordPress's same-filename-reupload collision rename and merged all four pairs. Two files (`bike-clamp-3d-example-scaled.jpg`, `mantel-clock-example-3D-scaled.jpg`) had no dimension suffix at all (WordPress's "-scaled" full-resolution export name) and were initially mis-grouped as false singletons by the script until `sips`-based real-dimension lookup was added — both turned out to be the actual largest version of an existing photo group and now anchor those groups' keepers.
   - Net result: **88 distinct photos** identified across the 12 folders. Every group's smaller siblings moved to a new per-project `projects/<slug>/_archive/` folder via `git mv` (nothing deleted, fully recoverable) — chosen specifically because GitHub Pages' default Jekyll processing excludes underscore-prefixed folders from the built site automatically (same convention already used by the pre-existing `projects/_unsorted/` folder), so no extra Pages/Jekyll config was needed to keep archived files unpublished. Surviving keeper files renamed with a sequential `01-`, `02-`, `03-`... prefix per project (398 total files renamed/moved).
   - **`data/projects.json` `thumb` field updated for all 12 affected projects** to point at each project's new keeper filename — none of these projects have a built page yet, but their homepage grid card thumbnails are live right now, and Pass 1's renames/archiving would have silently 404'd every one of them without this fix. Verified all 12 new thumb paths resolve to real files on disk after the rename.
4. **Verification:** no browser available (same sandbox limitation as prior sessions). Verified file-move correctness via `git status` (398 renames, no unexpected deletions/additions), verified archived-vs-kept counts reconcile against original per-folder file counts for all 12 projects, and verified all 12 updated `thumb` paths resolve on disk. Did not verify the homepage grid renders correctly in an actual browser.

### Open items carried forward
- **About page (3.4) needs customer content** — not built, needs real copy decisions first.
- **Photo review needed per project, all 12 folders** — numbered/archived and ready; customer reviews each folder's numbered photos and returns a hero pick + sequence (`hero-04, 1, 9, 2, 15, 7` style) whenever ready, in whatever order they want to tackle the 12. Pass 2/3 and the actual page builds are blocked on this per project.
- **Build time / Skill level values needed for all 12 remaining projects** — standing gap from Session 11, still unresolved; needed before spec grids can be filled in for any of them.
- Crayford Focuser folder/slug mismatch — unresolved, deferred to Phase 3 build of that page
- Favicon missing — Phase 3 item 3.23, not blocking
- Git PAT expires ~2027-07-27 — renewal reminder
- Monitor repo size — revisit GitHub Releases fallback at ~800MB (per-file trigger ~60-80MB, see website-design.md)
- WordPress stays live until Phase 5 approved
- Instructables cross-posting — decide per-project after redesign ships
- WLD (water leak detector) firmware project — not yet added to site, packaging rules documented and ready whenever customer decides to add it

---

## Session 16 Summary

### Accomplished
Ran in Claude Code terminal. Two small workflow/doc updates prompted by the customer having manually dropped a new image into the Bicycle Maintenance Clamp folder between sessions, plus applying Pass 2 for that project and, later the same session, Cornhole Game Board.

1. **`git status` added to session startup** (`CLAUDE.md`): new step 3 in the existing numbered startup sequence — after reading `session-notes.md`/`implementation-plan.md`, before anything else, run `git status` and flag any untracked files. Directly closes the gap this session opened with: the customer's new CAD screenshot sat in the Bicycle Maintenance Clamp folder with no prior flag beyond this session's own instructions describing it — a `git status` check would have surfaced it automatically at the top of any session touching that project, regardless of whether the customer remembered to mention it.
2. **"Adding a new image" workflow documented** (`website-design.md`, new subsection right after the Pass 1/2/3 workflow): formalizes the pattern used for Bicycle Maintenance Clamp as the standing process for any future one-off image addition to an already-Pass-1'd folder — customer drops the file under any filename (no renaming on their end), flags it or it's caught by the new git-status check, states the desired position in plain language ("insert as image 3, shift the rest down," or a full sequence). Claude Code does the rename/number/shift in one `git mv` pass, not a separate cleanup step. If the target project hasn't had its hero/sequence review yet, the new file just takes the next available Pass 1 number and its final position waits for that project's full sequence like every other file in the folder. Also documented a **shorthand confirmed this session**: when the customer's sequence has no explicit `hero-` tag, the first listed item is implicitly both the hero pick and gallery position 1 (matters for how Pass 2 below was applied).
3. **Bicycle Maintenance Clamp Pass 2 applied** (`projects/bicycle-maintenance-clamp/`), all via `git mv` to preserve history:
   - Customer's sequence: `02, 03, new image`. Per the shorthand above, `02` is both hero and position 1.
   - `02-bike-clamp-3d-example-scaled.jpg` → `hero-bike-clamp-3d-example-scaled.jpg`
   - `03-bike-clamp-example-use-2-1536x1121.png` → `01-bike-clamp-example-use-2-1536x1121.png`
   - The customer-added file (`E6D2F3BF-7281-44A3-BB56-105081D6F1A0.png`, 2890×2666, a 4-panel Moi3D viewport screenshot — Top/3D/Front/Right views with dimensions, kept uncropped per the customer's instruction since it's a different convention from the site's single-view `dwg-*` CAD images) → `02-bike-clamp-cad-views-2890x2666.png`. Verified the pixel dimensions matched the customer's stated 2890x2666 before renaming, and viewed it directly to confirm the description (4-panel dimensioned CAD view) and pick the `cad-views` slug.
   - `01-bicycle-clamp-20210601-pdf-791x1024.jpg` (the PDF-instructions cover-page scan, not in the customer's list) → `bicycle-clamp-20210601-pdf-791x1024.jpg` — numeric prefix stripped per the existing "leave anything not listed unprefixed" rule from the Pass 2 spec. Kept on disk, not deleted.
   - **Pass 3 (capped derivative generation) and the actual page build were explicitly out of scope this session** — not started.
4. **Cornhole Game Board Pass 2 applied** (`projects/cornhole-game-board/`), all via `git mv`:
   - Customer's sequence: `03, 04, 02, 01`. Per the same shorthand, `03` is both hero and position 1.
   - `03-cornhole-example-300x289.jpeg` → `hero-cornhole-example-300x289.jpeg`
   - `01-cornhole-2d-part-dimensions-2048x1906.png` → `03-cornhole-2d-part-dimensions-2048x1906.png`
   - `04-cornhole-example-leg-end-225x300.jpeg` → `01-cornhole-example-leg-end-225x300.jpeg`
   - `02-cornhole-3d-2048x1281.png` — no rename; its Pass 1 number already matched its position in the customer's sequence.
   - All 4 Pass 1 survivors accounted for in the customer's list, nothing excluded/unprefixed this time.
   - Renames applied in the order specified (hero first, then the two positional swaps) to avoid any transient filename collision. **Pass 3 and the page build not started, same as Bicycle Maintenance Clamp.**
5. **Verification:** confirmed via `git status` before starting each pass that the working tree was otherwise clean (no other untracked/unexpected changes). Confirmed both projects' final folder listings match their respective briefs exactly.

### Open items carried forward
- **About page (3.4) needs customer content** — not built, needs real copy decisions first.
- **Photo review needed per project, 10 remaining folders** (Bicycle Maintenance Clamp and Cornhole Game Board now done) — numbered/archived and ready; customer reviews each folder's numbered photos and returns a hero pick + sequence whenever ready, in whatever order they want to tackle the rest. Pass 2/3 and the actual page builds are blocked on this per project.
- **Build time / Skill level values needed for all 12 remaining projects** — standing gap from Session 11, still unresolved.
- Crayford Focuser folder/slug mismatch — unresolved, deferred to Phase 3 build of that page
- Favicon missing — Phase 3 item 3.23, not blocking
- Git PAT expires ~2027-07-27 — renewal reminder
- Monitor repo size — revisit GitHub Releases fallback at ~800MB (per-file trigger ~60-80MB, see website-design.md)
- WordPress stays live until Phase 5 approved
- Instructables cross-posting — decide per-project after redesign ships
- WLD (water leak detector) firmware project — not yet added to site, packaging rules documented and ready whenever customer decides to add it

---

## Session Close Protocol

### Every session — Claude does automatically:
- [x] Update all relevant documents in /docs
- [x] Commit with descriptive message
- [x] Push to GitHub
- [x] No customer sync step needed — Cowork/Claude Code operate directly on the MacBook Air's local copy, already in sync with GitHub after push

**Updated 2026-07-28 (Session 07):** Commit + push now happens from **Claude Code terminal only** — confirmed `git push` fails outright from Cowork (403 from proxy, no GitHub network access in the Cowork sandbox). See CLAUDE.md "Division of labor" section. Cowork sessions close by updating `/docs` files and stopping there; the next Claude Code session commits and pushes anything left pending.

### Session 05 Close — final state
- CLAUDE.md, .gitignore, session-notes.md, implementation-plan.md, config-mgmt.md, website-design.md all current and pushed
- Phase 2A — COMPLETE (all 10 questions locked)
- Phase 2B — COMPLETE (sitemap locked)
- Next session: **Claude Code terminal session on MacBook Air**, Phase 2C — Homepage build (`cd ~/projects/web/leisurenotes-com && claude`)

### Session 06 Close — final state
- Homepage — COMPLETE, approved, locked (2C.6)
- Phase 2D — IN PROGRESS, frozen at customer's request. Foosball Table sample page built with real content but **not** locked as a template; do not copy its current structure to other projects yet
- session-notes.md, implementation-plan.md, index.html, 404.html, assets/css/style.css, assets/js/site.js, data/projects.json, projects/foosball-table/index.html all current and pushed
- Next session priority (in order): (1) finalize category/tag model + draft mapping proposal for all 13 projects, (2) finish Foosball Table template punch list — see Quick Start above for full detail. Do not start Phase 3 (remaining 12 pages) until both are done and customer has explicitly approved the template

### Session 07 Close — final state
- Ran in Cowork (customer's explicit choice this session) — see CLAUDE.md "Division of labor" section, added this session, for the standing workflow going forward: Cowork = advisor/planning, Claude Code = coding + git
- Category/tag model — DECIDED and applied: Play (7) / Workshop (3) / Home (2) / Tech (1), across `data/projects.json`, `assets/js/site.js`, `index.html`
- Search improved: added a keyword-rich `summary` field to all 13 projects (real content, live-fetched from leisurenotes.com — discovered `web_fetch` reaches the live site from Cowork, correcting an earlier documented assumption), `site.js` search now matches title + summary
- CLAUDE.md updated with a new "Division of labor" section codifying Cowork-advisor / Claude-Code-implementer split, and confirming `git push` is hard-blocked from Cowork (403 from proxy) — not just a preference, a fixed constraint
- All changes committed and pushed **successfully** — customer ran `git push` from Terminal after two local commits landed (`e50f76e`, `ba7e155`); confirmed clean push with no errors
- **This CLAUDE.md + session-notes.md update (the close-out itself) has NOT yet been committed/pushed** — per the new division of labor, that's next Claude Code session's first job
- Next session priority (in order): (1) finish Foosball Table template punch list (comments removal, clickable breadcrumb category, combined single-ZIP downloads, hero photo orientation handling), (2) lock template (2D.6), (3) build remaining 12 project pages using live-fetched content approach (now proven to work from either Cowork or Claude Code) — see Quick Start above for full detail
