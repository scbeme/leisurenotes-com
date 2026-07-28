# Leisurenotes.com — Website Design
## Status: Phase 2A + 2B LOCKED | Started: 2026-07-27 | Last updated: 2026-07-28 | Session: 08

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

### Q10 — Content hierarchy (spec block order)
**Build time → difficulty → fabrication method → materials/CAD format.** Time is the harder constraint (a project needing 3 weekends is a no regardless of skill level) and more objective/scannable than difficulty, which is relative to the viewer's own skill.

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
