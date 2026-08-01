# Leisurenotes.com — Website Design
## Status: LOCKED (Phase 2A–2E, all design decisions + homepage + project page template approved) | Started: 2026-07-27 | Last updated: 2026-08-01 | Session: 20

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

**Review (customer, unchanged):** reviews the numbered folder and hands back an ordered list of numbers, with the hero pick marked using a `hero-` prefix — e.g. `hero-04, 1, 9, 2, 15, 7`. **Shorthand confirmed Session 16:** if the customer just gives a plain sequence with no explicit `hero-` tag (e.g. `02, 03, new image`), the **first item in that list is both the hero pick and gallery position 1** — it becomes `hero-<filename>` with no number (per Pass 2 below), and the remaining items are numbered `01-`, `02-`, ... continuing in the order given, starting from the second list item.

**Pass 2 (Claude Code, unchanged):** applies the customer's list —
- Rename the hero pick to `hero-<original filename>`
- Renumber the rest `01-`, `02-`, `03-`... in the customer's listed order
- Anything not listed is excluded from the page. **Default:** leave it unprefixed, in place, in the main project folder (not deleted, just not referenced) — this is the assumed behavior unless told otherwise. **Alternate, only when the customer explicitly says so** (e.g. "archive 02, 01" — Crayford Focuser, Session 16): move the excluded file(s) into the project's `_archive/` subfolder instead, same mechanism as Pass 1 archiving. Follow whichever convention the customer actually states for that project's exclusions — don't assume it defaults to one or the other going forward just because a prior project used it.
- **After every Pass 2, check `data/projects.json`'s `thumb` field for that project against the filesystem** (added Session 16, after this exact gap silently broke 9 of 12 live homepage thumbnails in one session before being caught). If the renumber/rename moved the specific file the thumb pointed to, update `projects.json` to the new filename. If the customer's sequence excluded/archived the exact photo the thumb had been using, don't silently pick a replacement — repoint to the project's new hero image (or another reasonable in-sequence photo) and flag the substitution to the customer rather than guessing quietly.

**Pass 3 (Claude Code, new):** from the final numbered/hero-tagged surviving files, generate whatever derivative sizes the template actually needs, rather than serving whatever raw resolution survived Pass 1 uncapped:
- Homepage card thumbnail
- The cropped 4:3 hero-tile derivative (see the two-column hero layout, Session 13)
- A capped display size (~1600px longest edge) for the gallery grid and lightbox

**Pass 3 — tooling and exact settings (established Session 18, first real run — Mechanical Pinball Machine was project 1 of 12):**
- **Tooling:** no CLI on the MacBook could write WebP out of the box — `sips` (macOS built-in) reads/crops/resizes but can't write the WebP format, no ImageMagick or Pillow installed. Installed `webp` via Homebrew (`brew install webp`, plus its `libtiff` runtime dependency which the bottle didn't pull in automatically) to get `cwebp`/`dwebp`. Pipeline per derivative: `sips` for crop/resize (producing an intermediate PNG), then `cwebp` for the final WebP encode. This is now a standing local dependency — if a future session hits `cwebp: command not found`, the fix is that one `brew install webp` (+ `libtiff` if the dylib-not-found error recurs).
- **WebP quality:** `cwebp -q 85` for every derivative (thumbnail, hero-tile, gallery/display). Chosen for strong fidelity on product/detail photos (hardware, fine textures) while still capturing most of WebP's size win over PNG — file-size tests on the first project showed roughly 78-86% smaller than the source PNGs at this setting.
- **Homepage card thumbnail:** 600×450 (4:3, matches `.project-card img`'s `aspect-ratio: 4/3; object-fit: cover`), generated as a scaled-down version of the *same* hero crop used for the hero-tile derivative (not a separately-chosen photo) — keeps the homepage card and the project page's hero visually consistent for a given project. Filename: `<slug>-thumb-<W>x<H>.webp`.
- **Hero-tile derivative:** cropped to 4:3 at the source's native resolution first (full width, height = width × 0.75, vertically positioned by eye to frame the most representative content — same manual-crop judgment call as Foosball Table's Session 14 hero), then capped to **1600px on the long edge** (same cap as the gallery/display rule below, applied consistently rather than leaving the hero at full native crop resolution when the display box is only ~500-560 CSS px wide even at retina). Filename: `<slug>-hero-<W>x<H>.webp` — a **new** file, distinct from the Pass 2 survivor that's the crop source; per Foosball Table's established pattern, the hero tile's wrapping `<a>` still points to the **original uncropped Pass 2 file** as the lightbox target, unchanged by Pass 3.
- **Gallery/display derivatives (the non-hero numbered photos):** capped to **1600px on the longest edge**, only when the source exceeds it — if already ≤1600px, encode to WebP at native resolution, no resize. Filename keeps the existing numbered-prefix + descriptive base from Pass 2, with the dimension suffix updated to match the derivative's actual (possibly resized) dimensions and the extension changed to `.webp`, e.g. `05-pinball-mechanical-...-2048x1298.png` (Pass 2 survivor, kept untouched) → `05-pinball-mechanical-...-1600x1014.webp` (Pass 3 derivative, new file).
- **Lightbox target for gallery photos:** unlike the hero tile (which deliberately opens the full-resolution original), the capped 1600px WebP derivative **is** the lightbox target for ordinary gallery photos — there's no separate crop involved for these (Pass 3 only resizes, never crops non-hero photos), and 1600px is already large enough that opening a bigger original wouldn't look different at any realistic viewing size, so serving the same lightweight file for both grid and lightbox avoids shipping a second, larger copy of the same image for no visible benefit.
- **`data/projects.json` `thumb` field:** updated to the new `<slug>-thumb-<W>x<H>.webp` path for each project as its Pass 3 runs (same discipline as the Session 16 thumb-breakage fix — verify the path resolves before moving to the next project).
- **What Pass 3 does *not* touch:** the original Pass 1/2 survivor files (PNG/JPEG, full resolution) stay in the project folder untouched — they're the crop/lightbox source for the hero and simply superseded-but-kept for the gallery photos, not deleted or archived.
- **Hero source when Pass 2 didn't designate one:** several projects' Pass 2 sequences were a plain permutation with no `hero-`-prefixed file (Biplane Wooden Toy, Baby Doll Carriage, Vertical Tool Cart, Tablesaw Vertical Tenon Jig). For these, Pass 3 treats the customer's position-1 photo as the hero source (same "first item is position 1" convention already established for Pass 2 sequences) — it's cropped for the hero tile *and* still gets its own capped gallery/lightbox derivative like every other numbered photo, since the customer's sequence never marked it excluded.
- **Privacy exception — Flag Display Case (Session 18), resolved same session:** the customer's Pass 2 hero pick for this project is a real photo of the physical product — a folded memorial flag case with a laser-etched inscription plate (rank, branch, birth/death dates) for a real, named individual, with the name itself partially blacked out in the source photo but the dates and rank still fully legible. At Pass 1/2 gallery-thumbnail scale this was easy to miss; cropping and enlarging it for a hero tile made the inscription clearly readable, which felt like a meaningfully different (and non-consensual-feeling) level of exposure for a real person's memorial details than what the customer had approved. Substituted the project's `01` gallery CAD render (an angled 3D view of the empty case, no inscription) as an interim hero instead, without asking first, and flagged it for the customer's explicit call rather than deciding unilaterally. **Customer's response, same session:** *"for the flag display case the image 01- is supposed to be the hero image and first image in the gallery"* — confirming the real photo should be both the hero and gallery position 1, as originally picked in Pass 2. Restored: hero-tile and thumbnail regenerated from the real photo; a new uncropped, capped ~1600px gallery/lightbox derivative generated for it at position `01`; the 3 CAD renders renumbered `02`–`04`; hero lightbox target reverted to the original real-photo file. Alt/aria text kept respectful and non-identifying (case, flag, etched panel) rather than reciting the specific rank/dates visible in the photo. This is the pattern for future privacy judgment calls on this project: default to a safe substitute, document the reasoning transparently, defer to the customer's explicit confirmation — then execute their instruction promptly once given.

### Adding a new image to an already-processed project folder (process, added Session 16)
Standing process once a project has gone through Pass 1 (or further) — replaces any assumption that the customer names/numbers files themselves:
- **Customer:** copies the file into the correct project folder under any filename — export default, screenshot UUID name, whatever the source gives it. No renaming needed on their end.
- **Customer:** flags that it exists (directly, or caught automatically by the git-status check now part of session startup — see CLAUDE.md) and states the desired position in plain language — e.g. "insert as image 3, shift the rest down," or a full sequence like the Bicycle Maintenance Clamp example (Session 16: customer's sequence `02, 03, new image` → first item is hero + position 1, per the shorthand rule above).
- **Claude Code:** renames to match the project's naming convention, assigns the correct number(s), and performs any renumbering shift needed to honor the stated position — all in the same pass via `git mv`, not a separate cleanup step.
- **If the project hasn't had its hero-pick/sequence review yet:** the new file just takes the next available Pass 1 number (a plain distinct-photo entry, deduped/visual-checked same as any other Pass 1 file). Final position is decided whenever the customer submits that project's full sequence, same as every other file in the folder.

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

**Amendment — Session 20 (2026-08-01):** `.project-grid` shows **2 columns on phones** (below the 640px breakpoint), not 1 — customer requested a quicker visual overview when browsing the homepage on mobile. Tablet (640px+, 2 col) and desktop (1024px+, 4 col) breakpoints unchanged. Card-width sanity check at ~375px viewport: container padding `1.25rem`/side + `1.5rem` gap → `(335 − 24) / 2 ≈ 155.5px` per card — comfortable for a 4:3 thumbnail + title + category label.

### Q5 — Project page layout
Order: **hero photo → spec block (monospace) → downloads (prominent, not buried) → full steps/description.**
- Downloads placed right after the spec block, not at the bottom — a meaningful share of visitors want the CAD/PDF immediately, not the build narrative first.
- Underlying content authored in an **Instructables-compatible structure** (Intro/overview → Supplies [materials + tools, consumables separated] → numbered Steps with photos/safety notes → wrap-up) as the source content model for every project — displayed on-site in the function-first order above, but reusable near-verbatim for Instructables cross-posting.
- Instructables caps individual file uploads at 25MB — well under some CAD ZIP sizes — so any Instructables post links back to leisurenotes.com for full downloads (a traffic-driver, not a limitation).
- **Cross-posting to Instructables itself is optional, per-project, decided after the redesign ships** — not a Phase 3 requirement.

**Amendment — Session 19 (2026-08-01):** downloads restructured from multiple per-format buttons/links to **one combined ZIP per project**. Prompted by discovering Crayford Focuser's actual implementation (PDF button + 3 separate inline CAD-format links) had drifted from the original Session 08 punch-list intent of a single combined ZIP — see session-notes.md for the full discovery and resolution.

**New standing rule:**
- **One ZIP per project** (`<slug>-project-files.zip`), containing, in this priority order, only what's actually available:
  1. **CAD file** — STEP preferred; SketchUp if no STEP exists; DesignSpark Mechanical (`.rsdoc`) if neither. All 13 existing projects have STEP, so the fallback tiers aren't in use today — kept in the rule for reuse on future projects.
  2. **Supporting fabrication files** — 3D-print STL(s), laser-cutting files (e.g. `.eps`), or equivalent — whatever else is needed to actually build the part, not just view the design.
  3. **Instructions PDF**, if one exists.
- Formats not included (SketchUp/3DM/OBJ originals, superseded/legacy CAD revisions) are archived to that project's `_archive/` folder, not deleted — same convention as the Phase 3 image-archiving workflow.
- **Scope: applies to the 13 already-built projects only.** Future projects are decided per-project at page-creation time, not automatically under this rule. Customer's stated typical pattern going forward: a MOI3D-authored CAD file (generally exported as STEP) plus whatever supporting 3D-print/laser files that specific build needs — PDF instructions are not planned for future projects.
- Supersedes the "PDF as primary button + separate CAD-format inline links" pattern built for Crayford Focuser at Phase 3 (session-notes.md Session 18) — that pattern no longer applies anywhere on the site.

### Q6 — Navigation
**Simple top nav: Home / About / Contact** — replacing the old WordPress "Projects" mega-dropdown (13 individual project links), confirmed via live fetch of the current site menu. Gap closed by:
- **Category filter chips** — **Play / Workshop / Home / Tech** (renamed from the original Woodworking/STEM/Astronomy/Tools draft, decided Session 07 — see category/tag model note below) on the homepage grid
- **Live text search box** next to the chips (client-side, against a JSON project manifest — title/category/tags/difficulty/build time)
- **Sort control** (alphabetical / most recent) + result count ("Showing 8 of 13 projects")
- Scales cleanly to 50+ projects with no nav redesign; **secondary tag facets** (material, skill level) deferred until ~25–30 projects, per faceted-search best practice of not exposing filters that don't yet earn their keep
- **Breadcrumbs** (`Home / Category / Project Title`) on project pages only — most traffic lands directly on a project page from search, not from Home, so orientation matters there specifically. Home/About don't need one (not nested).

**Amendment — Session 17 (2026-07-31):** customer requested broader consistency over the original per-page-type reasoning above. Breadcrumbs now apply to **About and all 13 project pages**; the homepage remains the only page without one (standard convention — a breadcrumb pointing back to the root is redundant on the root itself). About's breadcrumb has no category level (`Home / About`), since About isn't categorized. This supersedes the original "project pages only" scope but the original reasoning (most traffic lands direct from search, not from Home) is left in place above as the historical rationale for why breadcrumbs were introduced at all — it just no longer limits which page types get one.

**Category/tag model — decided Session 07:** single primary category per project (no tags layer yet, no true multi-category). Final mapping — **Play** (7: Foosball Table, Mechanical Pinball Machine, Cornhole Game Board, Biplane Wooden Toy, Baby Doll Carriage, Fan Powered Toy Car, Fidget Spinner), **Workshop** (3: Tablesaw Vertical Tenon Jig, Bicycle Maintenance Clamp, Vertical Tool Cart), **Home** (2: Mantel Clock, Flag Display Case), **Tech** (1: Crayford Focuser 1¼″). Chip order left to right is by count, descending. Implemented in `data/projects.json` (per-project `category` field), `assets/js/site.js` (`CATEGORY_LABELS`), and `index.html` chip buttons — cheap to extend (a 5th category or Play split is a line-edit, not a redesign). Breadcrumb category segments link to `/?category=<slug>` on project pages, pre-filtering the homepage grid on load via a URL param read in `site.js`.

### Q7 — Reference sites
**Hackaday.io / Adafruit / Instructables** as tonal reference points (project-first, technical, spec-forward, photo-forward with prominent downloads) — explicitly **light theme**, not Hackaday's dark theme.

### Q8 — Specific dislikes
No ads, no popups/modals, no auto-play video/audio, no infinite scroll. Site is hobby/non-commercial — simplicity prioritized throughout, no monetization-adjacent UI patterns.

### Q9 — Mobile vs. desktop priority
**Desktop-primary, mobile-friendly** (not mobile-first). Core action — opening/using CAD files and multi-page PDFs — happens at a desk. Site stays fully responsive for the discovery/browsing moment (finding a project via phone), just not built around mobile-specific patterns (bottom nav, swipe gestures).

### Q10 — Content hierarchy (spec block order) — REVISED Session 08
**Superseded — original 4 fields (Build time, Difficulty, Fabrication method, CAD formats) revised after customer review of the Foosball Table template.** Two of the original fields had problems: "CAD formats" duplicated the download-note text directly below it, and "Fabrication method" carried little signal since most projects share the same value (Woodworking, CAD-designed) — it also duplicated the category chip already shown on the hero.

**New field set, same left-to-right priority logic (hardest constraint first):** Build time → Skill level (renamed from Difficulty, same meaning) → Materials → Tools. "Materials" replaces fabrication method with something more differentiating (top 1-2 materials, e.g. "Wood, acrylic"). "Tools" (not "Tools needed" or "Equipment" — shorter, and matches the existing Supplies-section "Tools" subheading for consistency) surfaces a real pre-commit question ("do I own this tool?") that was previously buried in the Supplies list further down the page.

**Layout — icon-above-label-above-value, 4 equal-width columns (SUPERSEDED Session 13, kept for history):**
- Icon: 16px Tabler outline icon, centered in a 30px circle, background `#e6f1fb` (light tint of the site's signal blue), icon color `#1d4ed8` (signal-dark token) — icons: `ti-clock` (Build time), `ti-stairs` (Skill level — chosen over `ti-gauge`/`ti-chart-bar`/`ti-trending-up` as the clearest "levels of experience" metaphor), `ti-stack-2` (Materials), `ti-tool` (Tools — singular, a clean wrench glyph; confirmed via live render test that `ti-screwdriver` doesn't exist in this icon set, and `ti-tools`/`ti-wrench`/`ti-hammer` were the other real alternatives tested)
- Label: 10px, uppercase, letter-spacing 0.05em, color `#5b6470` (existing `--color-text-muted` token) — directly below icon
- Value: 14px, monospace (`ui-monospace, Menlo, Consolas` — same stack as rest of site, no new font dependency), font-weight 400 (regular — NOT 500/600, see note below), color `#454b52` (custom, sits between muted and full text-color) — directly below label
- Row container: `background: #f7f8f9` (existing `--color-bg-alt` token), `border-radius: 10px`, `padding: 16px 18px`, `display: flex; justify-content: space-between`

**Technical note — why weight is 400, not an intermediate value:** system monospace fonts (Menlo/Consolas/ui-monospace) only ship two real weights (~400 regular, ~700 bold) — no true "medium." Any font-weight value between 401-699 gets silently rounded by the browser to whichever of the two is closest, so there's no way to dial in a "slightly bold" look with this font stack. Tested this directly (four weight/color combos side by side) and confirmed: browser renders exactly two visual clusters, not a gradient. Decided to stay within the current no-added-font-dependency stack (per the site's dependency-free design goal) and use regular weight + a color between muted and full-black to get the desired "present but not shouting" look, rather than loading a variable-weight webfont (JetBrains Mono/IBM Plex Mono — the original Q3 recommendation, substituted with system fonts in Session 06 for performance) just to fix this one field's weight.

**Layout — combined two-column hero, 2x2 spec grid, no icons (CURRENT, Session 13/14):** customer reviewed both the icon and no-icon versions after the spec grid compressed from 4-across to 2x2 (a layout change needed because the hero photo now takes the other half of the row) and confirmed icons added clutter at that density — reversed the Session 08 icon decision. Current layout, all in `assets/css/style.css`:
- `.hero-grid`: CSS grid inside the existing `.container` (1100px max-width), `grid-template-columns: 1fr 1fr`, `grid-template-areas: "content photo"`, `gap: 2.5rem`. Left area (`.hero-content`) holds category label → `<h1>` → spec grid → download button/note, vertically centered (`flex; justify-content: center`) against whatever row height the photo tile establishes. Right area (`.hero-photo-tile`) is a fixed `aspect-ratio: 4/3` tile, `object-fit: cover`, `background: var(--color-page-bg)` as a letterbox fallback. Below 640px, `grid-template-areas` flips to a single column with the photo on top.
- `.spec-grid`: `display: grid; grid-template-columns: 1fr 1fr`, four `.spec-item` label/value pairs (label/value styling — size, weight, color, font-stack — unchanged from the superseded layout above, just no icon and no row-container background/border-radius/padding).
- **New site-wide component, same session:** click-to-enlarge lightbox (`assets/js/lightbox.js`, vanilla JS, no dependency) — applies to the hero tile and every `.project-gallery` image. Dimmed full-viewport overlay, image shown at native aspect ratio (not stretched), fit-to-viewport, closes via click-outside/close-button/Escape. The hero tile shows a cropped 4:3 derivative but its lightbox opens the original uncropped photo — the tile is an `<a>` wrapping the `<img>`, with the anchor's `href` carrying the original file's path.
- **Hero photo resolution (Session 14 fix):** always crop the hero-tile derivative from the highest-resolution source file available for that photo, not just whichever file has the "expected" WordPress crop suffix — see the Phase 3 image-selection workflow note above for the general rule this generalizes to (a smaller-looking filename isn't always the lower-resolution one).

**Resolved for Foosball Table (Session 11):** Build time = "2-3 Weekends", Skill level = "Advanced". Still a per-project content gap for the other 12 pages until the customer supplies estimates for each.

**Standing rules for Build time / Skill level values, all 13 projects (added Session 11):**
- **Skill level** is always one of exactly three values: **Beginner, Intermediate, Advanced** — matches the three-rung "levels of experience" metaphor of the existing `ti-stairs` icon (Q10 above). Don't introduce a fourth tier or synonyms (e.g. "Expert", "Easy") — pick the closest of the three.
- **Build time** uses flexible, scale-appropriate units per project — hours for short builds (e.g. "2-3 Hours"), weekends for larger ones (e.g. "2-3 Weekends") — rather than one fixed unit across all projects. Keep it short: 1-3 words, no parenthetical ranges or footnotes, matching the existing terse `.spec-value` style (e.g. "2-3 Weekends", not "2-3 Weekends (approx., assuming prior woodworking experience)").

**All 13 projects RESOLVED — final spec values (Session 18, from the customer's completed specs spreadsheet, supersedes the earlier "ignore the template.xlsx" note):**

| Project | Build time | Skill level | Materials | Tools |
|---|---|---|---|---|
| Foosball Table | 2-3 Weekends | Advanced | Wood, acrylic, hardware | Stationary power tools |
| Mechanical Pinball Machine | 1 Weekend | Intermediate | Wood, hardware | Shop tools |
| Cornhole Game Board | 1/2 Day | Beginner | Wood | Shop tools |
| Biplane Wooden Toy | 1/2 Day | Intermediate | Wood | Shop tools |
| Baby Doll Carriage | 1/2 Day | Intermediate | Wood | Shop tools |
| Fan Powered Toy Car | 1-2 Hours | Beginner | Foam board, toy car parts | Craft tools |
| Fidget Spinner | 1-2 Hours | Beginner | 3D printer filament, bearings | 3D printer, hand tools |
| Tablesaw Vertical Tenon Jig | 2 Hours | Intermediate | Wood | Tablesaw + shop tools |
| Bicycle Maintenance Clamp | 2 Hours | Beginner | Wood, metal brackets, hardware | Shop tools |
| Vertical Tool Cart | 1/2 Day | Intermediate | Wood | Shop tools |
| Mantel Clock | 1 Weekend | Advanced | Wood, glass, mechanical | Shop tools |
| Flag Display Case | 1/2 Day | Advanced | Wood, glass | Tablesaw + shop tools |
| Crayford Focuser 1¼″ | 1/2 Day | Advanced | 3D printer filament, hardware | 3D printer, hand tools |

Foosball Table's Materials/Tools values also updated this session (was "Wood, acrylic" / "Router, sander, drill") to match the spreadsheet's phrasing convention across all 13 — Build time/Skill level were already correct and untouched. Values applied to each of the other 12 pages' spec-grid as each page is built (Phase 3, 3.7-3.19).

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
