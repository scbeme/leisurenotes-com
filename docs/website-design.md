# Leisurenotes.com — Website Design
## Status: Phase 2A + 2B LOCKED | Started: 2026-07-27 | Last updated: 2026-07-30 | Session: 14

---

## Project Framing (established Session 05)
Leisurenotes.com is a **maker/hackerspace** site, not a woodworking/craft site. Each project is undertaken to produce a specific **functional end product** (a foosball table, a working focuser, a fidget spinner) — fabrication method (woodworking, CAD, 3D printing, electronics) is a means selected as appropriate per project, not the site's identity. This framing governs the visual style, reference sites, and content hierarchy decisions below.

## Audience
Hobbyist makers with some technical fluency — comfortable with tools and CAD files, not professional engineers. Site should read as DIY-plan sharing, not a formal spec sheet.

---

## Technical Decisions

### Asset pipeline (locked 2026-07-27)
- **Drop redundant WordPress-generated image sizes.** Keep 2 sizes per photo: a card/thumbnail size and one full display size — not the 4-8 auto-generated WordPress crops currently harvested.
- **Convert all site images to WebP.** ~25-40% smaller than PNG/JPEG at equivalent quality, universally supported.
- **CAD ZIPs and PDFs stay in the repo for now** — not moved to GitHub Releases at this time.

### GitHub Releases — documented fallback (not implemented now)
If repo size approaches the monitoring trigger, move CAD ZIPs/PDFs out of the git-tracked tree into a single ongoing GitHub Release; link project pages to the release asset URLs instead. Confirmed via GitHub docs: release assets don't count toward the Pages 1GB published-size limit, support files up to 2GiB each, no total size or bandwidth cap, served via GitHub's own CDN — no adverse effect on site speed or reliability when adopted. Deferred now because nothing is published yet under the new design, so there's no cost to doing this later instead of now.

**Monitoring trigger:** revisit this when the repo approaches ~800MB (vs. current projection of ~400-460MB after asset pipeline changes).

### GitHub file size limits — reference (added Session 08)
- **Git hard limit: 100MB per file** — git rejects the push outright above this, no exception. Warning issued at 50MB.
- **GitHub Releases: 2GB per file**, doesn't count against repo/Pages size at all.
- **Recommended repo total: under ~1GB** (5GB is the hard "don't" ceiling).
- **Working rule for this site:** any single downloadable file over **~60-80MB** goes to a GitHub Release, not the git-tracked tree — gives headroom under the 100MB wall rather than running up against it. Applies per-file, so a project with several smaller files can still stay in-repo even if projects with one large CAD/firmware bundle can't.

### Firmware/electronics projects — packaging rules (added Session 08, ahead of any firmware project going live)
Prompted by review of the WLD (water leak detector) ESP32-H2 project folder as a candidate future addition. These rules apply to it and any future firmware/PCB project on the site — **not yet implemented, no firmware project is live on the site today.**

**Mandatory download package** (what a new builder needs to open in VS Code + ESP-IDF and Build → Flash their own device):
- `main/` (source), `CMakeLists.txt`, `sdkconfig`, `sdkconfig.defaults`, `partitions.csv`, `dependencies.lock`, `managed_components/` (keep committed rather than relying on live component-registry fetch, for build reproducibility)

**Always excluded — never packaged for download:**
- `build/` — 100% compiler output (object files, generated makefiles, final binaries); regenerated automatically by Build. For the WLD project specifically this folder alone was ~1.2GB of a ~1.27GB total — dropping it resolves the size problem almost entirely.
- `backups/` — personal working-copy safety net, not part of the buildable project
- `mfg/` (or equivalent manufacturing/attestation folders) — **security-sensitive, exclude always, no exceptions.** Confirmed on the WLD project: this folder holds one physical unit's Matter/Thread device-attestation data (DAC cert/key, PAI cert, provisioning CSVs) *including private key material* (`DAC_private_key.bin`, `pai_key.pem`). Device-specific, not reusable by a new builder, and would leak private keys if ever zipped up without a second look. If this folder structure is reused on future firmware projects, apply the same exclusion by default — treat any `mfg`/manufacturing/provisioning folder as excluded unless explicitly reviewed.

**Optional, decide per-project:** a small pre-built binary (final `.bin` from a completed build, flashable via `esptool.py` with no toolchain needed) for visitors who want a working unit without building from source. Nice-to-have, not a substitute for the source package — site's maker-audience framing (Q1/Q7) leans toward people who want to inspect/modify code.

### Phase 3 — Image selection workflow (process, updated Session 14)
Three-pass process for picking/ordering the photo set on each of the remaining 12 project pages (Foosball Table's gallery is already finalized and not affected by Passes 1/2 — see Session 14 hero-photo fix below for why Pass 1's visual-check rule exists). **Process documentation only — no files renamed yet, nothing to do until each project's Phase 3 build.**

**Pass 1 (Claude Code, per project folder):**
- Group files by distinct photo, keeping only the largest version of each. **Do a quick visual check before discarding smaller siblings — don't rely on filename pattern alone.** Cautionary example: Foosball Table's own `IMG_4829-768x576.png` looked like a simple bigger duplicate of `IMG_4829-...-225x300.png` by filename convention, but was actually a different, rotated composition of the same photo (the true portrait shot stored sideways in a landscape-dimensioned file) — a purely mechanical largest-by-name rule would have picked the wrong one as the "clean" representative and either produced a sideways hero or discarded the higher-resolution source entirely. Fixed in Session 14 by rotating the 768x576 file back to true portrait and re-cropping the hero tile from it instead of the lower-res 225x300 file — see session-notes.md Session 14 summary.
- Move the redundant smaller sizes to a new per-project `_archive/` subfolder (outside any path the site serves) rather than deleting them — recoverable if a keep/discard call turns out wrong.
- Rename each surviving file with a sequential `01-`, `02-`, `03-`... prefix (unchanged from the original documented behavior) — this is the customer's reference numbering for the review step below.

**Review (customer, unchanged):** reviews the numbered folder and hands back an ordered list of numbers, with the hero pick marked using a `hero-` prefix — e.g. `hero-04, 1, 9, 2, 15, 7`.

**Pass 2 (Claude Code, unchanged):** applies the customer's list —
- Rename the hero pick to `hero-<original filename>`
- Renumber the rest `01-`, `02-`, `03-`... in the customer's listed order
- Leave anything not listed unprefixed — unprefixed files are excluded from the page (not deleted, just not referenced)

**Pass 3 (Claude Code, new):** from the final numbered/hero-tagged surviving files, generate whatever derivative sizes the template actually needs, rather than serving whatever raw resolution survived Pass 1 uncapped:
- Homepage card thumbnail
- The cropped 4:3 hero-tile derivative (see the two-column hero layout, Session 13)
- A capped display size (~1600px longest edge) for the gallery grid and lightbox

---

## Interview Answers — LOCKED (Session 05)

### Q1 — Audience
Hobbyist makers with some technical fluency — comfortable with tools/CAD, not professional engineers.

### Q2 — Visual style
**Light/clean base** (white/light-gray background) with a **neutral graphite/charcoal accent**, plus **one functional "signal" color** (engineering-diagram orange or a technical blue) used sparingly for CTAs, category chips, and spec highlights. No wood-tone accent — rejected after the Project Framing clarification above, since a wood-tone identity doesn't fit projects like the Crayford Focuser or Fidget Spinner that have nothing to do with wood. Project photos carry the visual warmth; the chrome around them stays neutral.

### Q3 — Typography
Clean sans-serif for body/UI (Inter or system-ui stack). Monospace accent (JetBrains Mono or IBM Plex Mono) reserved for spec/data fields only (build time, dimensions, materials, difficulty) — datasheet feel for data, readable prose elsewhere.

### Q4 — Homepage priority
**Reverses the Session 1 scrolling-banner-hero decision.** Research (Notre Dame CTR study via Smashing Magazine/thegood.com) found carousels get ~1% control-click rate, 84% of users view only the first slide, and CTR drops from ~40% (first item) to ~11% (last) — a poor fit for surfacing a 13+ project cross-section to a goal-oriented visitor. Replaced with:
- Minimal keyword-rich intro headline above the fold, e.g. "Free plans for functional maker builds — CAD files, step-by-step instructions, and downloads for woodworking, STEM, astronomy, and shop tools."
- Static, filterable/searchable project grid immediately below — all projects visible/scannable at once, tight spacing, consistent thumbnail sizing

### Q5 — Project page layout
Order: **hero photo → spec block (monospace) → downloads (prominent, not buried) → full steps/description.**
- Downloads placed right after the spec block, not at the bottom — a meaningful share of visitors want the CAD/PDF immediately, not the build narrative first.
- Underlying content authored in an **Instructables-compatible structure** (Intro/overview → Supplies [materials + tools, consumables separated] → numbered Steps with photos/safety notes → wrap-up) as the source content model for every project — displayed on-site in the function-first order above, but reusable near-verbatim for Instructables cross-posting.
- Instructables caps individual file uploads at 25MB — well under some CAD ZIP sizes — so any Instructables post links back to leisurenotes.com for full downloads (a traffic-driver, not a limitation).
- **Cross-posting to Instructables itself is optional, per-project, decided after the redesign ships** — not a Phase 3 requirement.

### Q6 — Navigation
**Simple top nav: Home / About / Contact** — replacing the old WordPress "Projects" mega-dropdown (13 individual project links), confirmed via live fetch of the current site menu. Gap closed by:
- **Category filter chips** (Woodworking / STEM / Astronomy / Tools) on the homepage grid
- **Live text search box** next to the chips (client-side, against a JSON project manifest — title/category/tags/difficulty/build time)
- **Sort control** (alphabetical / most recent) + result count ("Showing 8 of 13 projects")
- Scales cleanly to 50+ projects with no nav redesign; **secondary tag facets** (material, skill level) deferred until ~25–30 projects, per faceted-search best practice of not exposing filters that don't yet earn their keep
- **Breadcrumbs** (`Home / Category / Project Title`) on project pages only — most traffic lands directly on a project page from search, not from Home, so orientation matters there specifically. Home/About don't need one (not nested).

### Q7 — Reference sites
**Hackaday.io / Adafruit / Instructables** as tonal reference points (project-first, technical, spec-forward, photo-forward with prominent downloads) — explicitly **light theme**, not Hackaday's dark theme.

### Q8 — Specific dislikes
No ads, no popups/modals, no auto-play video/audio, no infinite scroll. Site is hobby/non-commercial — simplicity prioritized throughout, no monetization-adjacent UI patterns.

### Q9 — Mobile vs. desktop priority
**Desktop-primary, mobile-friendly** (not mobile-first). Core action — opening/using CAD files and multi-page PDFs — happens at a desk. Site stays fully responsive for the discovery/browsing moment (finding a project via phone), just not built around mobile-specific patterns (bottom nav, swipe gestures).

### Q10 — Content hierarchy (spec block order) — REVISED Session 08
**Superseded — original 4 fields (Build time, Difficulty, Fabrication method, CAD formats) revised after customer review of the Foosball Table template.** Two of the original fields had problems: "CAD formats" duplicated the download-note text directly below it, and "Fabrication method" carried little signal since most projects share the same value (Woodworking, CAD-designed) — it also duplicated the category chip already shown on the hero.

**New field set, same left-to-right priority logic (hardest constraint first):** Build time → Skill level (renamed from Difficulty, same meaning) → Materials → Tools. "Materials" replaces fabrication method with something more differentiating (top 1-2 materials, e.g. "Wood, acrylic"). "Tools" (not "Tools needed" or "Equipment" — shorter, and matches the existing Supplies-section "Tools" subheading for consistency) surfaces a real pre-commit question ("do I own this tool?") that was previously buried in the Supplies list further down the page.

**Layout — icon-above-label-above-value, 4 equal-width columns:**
- Icon: 16px Tabler outline icon, centered in a 30px circle, background `#e6f1fb` (light tint of the site's signal blue), icon color `#1d4ed8` (signal-dark token) — icons: `ti-clock` (Build time), `ti-stairs` (Skill level — chosen over `ti-gauge`/`ti-chart-bar`/`ti-trending-up` as the clearest "levels of experience" metaphor), `ti-stack-2` (Materials), `ti-tool` (Tools — singular, a clean wrench glyph; confirmed via live render test that `ti-screwdriver` doesn't exist in this icon set, and `ti-tools`/`ti-wrench`/`ti-hammer` were the other real alternatives tested)
- Label: 10px, uppercase, letter-spacing 0.05em, color `#5b6470` (existing `--color-text-muted` token) — directly below icon
- Value: 14px, monospace (`ui-monospace, Menlo, Consolas` — same stack as rest of site, no new font dependency), font-weight 400 (regular — NOT 500/600, see note below), color `#454b52` (custom, sits between muted and full text-color) — directly below label
- Row container: `background: #f7f8f9` (existing `--color-bg-alt` token), `border-radius: 10px`, `padding: 16px 18px`, `display: flex; justify-content: space-between`

**Technical note — why weight is 400, not an intermediate value:** system monospace fonts (Menlo/Consolas/ui-monospace) only ship two real weights (~400 regular, ~700 bold) — no true "medium." Any font-weight value between 401-699 gets silently rounded by the browser to whichever of the two is closest, so there's no way to dial in a "slightly bold" look with this font stack. Tested this directly (four weight/color combos side by side) and confirmed: browser renders exactly two visual clusters, not a gradient. Decided to stay within the current no-added-font-dependency stack (per the site's dependency-free design goal) and use regular weight + a color between muted and full-black to get the desired "present but not shouting" look, rather than loading a variable-weight webfont (JetBrains Mono/IBM Plex Mono — the original Q3 recommendation, substituted with system fonts in Session 06 for performance) just to fix this one field's weight.

**Resolved for Foosball Table (Session 11):** Build time = "2-3 Weekends", Skill level = "Advanced". Still a per-project content gap for the other 12 pages until the customer supplies estimates for each.

**Standing rules for Build time / Skill level values, all 13 projects (added Session 11):**
- **Skill level** is always one of exactly three values: **Beginner, Intermediate, Advanced** — matches the three-rung "levels of experience" metaphor of the existing `ti-stairs` icon (Q10 above). Don't introduce a fourth tier or synonyms (e.g. "Expert", "Easy") — pick the closest of the three.
- **Build time** uses flexible, scale-appropriate units per project — hours for short builds (e.g. "2-3 Hours"), weekends for larger ones (e.g. "2-3 Weekends") — rather than one fixed unit across all projects. Keep it short: 1-3 words, no parenthetical ranges or footnotes, matching the existing terse `.spec-value` style (e.g. "2-3 Weekends", not "2-3 Weekends (approx., assuming prior woodworking experience)").

### Contact method
**`mailto:` link only** — no contact form. GitHub Pages has no server-side processing (the reason the old Hostinger PHP mail form can't carry over without a third-party service), and the old WordPress site never had a dedicated Contact page either. Consistent with the "no unnecessary complexity" direction from Q8.

---

## Sitemap — LOCKED (Phase 2B, Session 05)

**Pages:**
- `/` — Home (intro headline + filterable/searchable project grid)
- `/about/` — About
- `/projects/<project-slug>/` — 13 project pages:
  foosball-table, mechanical-pinball-machine, crayford-focuser-1-25, flag-display-case, mantel-clock, vertical-tool-cart, bicycle-maintenance-clamp, cornhole-game-board, biplane-wooden-toy, baby-doll-carriage, fan-powered-toy-car, fidget-spinner, tablesaw-vertical-tenon-jig

**Not separate pages (by design):**
- Categories — handled entirely by client-side filter chips on Home, no dedicated category URLs
- Contact — `mailto:` link in footer/nav, not a standalone page

**Additions (new, not from the interview, standard/low-cost):**
- `sitemap.xml` — SEO (already tracked as Phase 3 item 3.22)
- Simple 404 page — the URL structure changes entirely from `?page_id=` to clean `/projects/<slug>/` paths; old bookmarks/indexed links need somewhere to land

**Downloads** stay co-located with each project at `/projects/<project-slug>/` — no separate `/downloads/` tree.
