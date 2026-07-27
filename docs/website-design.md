# Leisurenotes.com — Website Design
## Status: Phase 2A + 2B LOCKED | Started: 2026-07-27 | Last updated: 2026-07-27 | Session: 05

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
