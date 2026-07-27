# Leisurenotes.com — Website Design
## Status: Draft | Started: 2026-07-27 | Session: 03

---

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

## Interview Answers (in progress)

*Remaining: visual style, typography, homepage priority, project page layout, navigation, mobile/desktop priority, reference sites, dislikes, content hierarchy — to be completed this session.*
