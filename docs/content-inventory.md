# Leisurenotes.com — Content Inventory (Phase 1)
## Last updated: 2026-07-26 | Session: 02

---

## Status
Text/structure crawl of all 13 project pages + About + Projects listing: **complete**.
Actual file downloads (images, PDFs, CAD ZIPs): **not started** — blocked this session (see Blockers below). Plan is Hostinger hPanel File Manager bulk export of `wp-content/uploads`.

---

## Site Structure

| Page | page_id | URL |
|---|---|---|
| Home | — | https://leisurenotes.com/ |
| Projects (listing) | 395 | https://leisurenotes.com/?page_id=395 |
| About | 8 | https://leisurenotes.com/?page_id=8 |

**Contact email (corrected this session):** leisurenotes.hsc@gmail.com (previous docs incorrectly had leisurenotes@gmail.com)

**License:** CC BY-NC 4.0 (Creative Commons Attribution-NonCommercial), footer on every page

**CAD programs used across projects:** SketchUp (.skp), DesignSpark Mechanical (.rsdoc), Moment of Inspiration / Moi3D (.3dm, exported as .stp)

---

## 13 Project Pages

| # | Project | page_id | Est. reading time | Downloadable files | Comments |
|---|---|---|---|---|---|
| 1 | Flag Display Case | 245 | 1 min | PDF + ZIP (STEP + EPS) | 0 |
| 2 | Tablesaw Vertical Tenon Jig | 257 | 1 min | PDF + ZIP (STEP) | 0 |
| 3 | Bicycle Maintenance Clamp | 292 | 2 min | PDF + ZIP (STEP) | 0 |
| 4 | Cornhole Game Board | 406 | 2 min | ZIP (STEP) via attachment | 0 |
| 5 | Biplane Wooden Toy | 423 | 2 min | ZIP (STP + SKP) via attachment | 0 |
| 6 | Baby Doll Carriage | 435 | 3 min | ZIP (STP + SKP) via attachment | 0 |
| 7 | Mantel Clock | 456 | 3 min | PDF (attachment — **unresolved, see below**) + ZIP (STP + SKP) | 0 |
| 8 | Fan Powered Toy Car | 511 | 5 min | ZIP (3DM + STP + SKP) via attachment | 0 |
| 9 | Mechanical Pinball Machine | 543 | 4 min | PDF (**unresolved**) + ZIP (**unresolved**) | 0 (see note below) |
| 10 | Crayford Focuser 1 1/4″ | 580 | 8 min | PDF + STL ZIP + SKP ZIP + STEP ZIP (4 files) | 0 |
| 11 | Fidget Spinner | 609 | 2 min | ZIP (3dm, stp, skp, stp — **unresolved**) | 0 |
| 12 | Vertical Tool Cart | 621 | 6 min | ZIP (STP + STEP + OBJ) | **1** |
| 13 | Foosball Table | 703 | 17 min | ZIP (SKP + STEP + OBJ + 3DM) | **2** |

**Note on comments:** implementation-plan.md originally flagged "Foosball + Pinball" as having user comments to preserve. Actual crawl found comments on **Foosball Table (2)** and **Vertical Tool Cart (1)** instead — Mechanical Pinball Machine currently has none. Verify this is expected (comments may have been removed, or original note was mistaken) before Phase 3 build.

---

## Full Download File URLs (resolved)

| Project | File | URL |
|---|---|---|
| Flag Display Case | Instructions PDF | https://leisurenotes.com/wp-content/uploads/2021/05/flag-display-case-instructions-20210523.pdf |
| Flag Display Case | Design ZIP | https://leisurenotes.com/wp-content/uploads/2021/05/flag-display-case-design-files.zip |
| Tenon Jig | Instructions PDF | https://leisurenotes.com/wp-content/uploads/2021/05/tablesaw-tenon-jig-instructions-20210530.pdf |
| Tenon Jig | CAD ZIP | https://leisurenotes.com/wp-content/uploads/2021/05/tablesaw-vertical-tenon-jig-3d-model-20210413.stp_.zip |
| Bicycle Clamp | Instructions PDF | https://leisurenotes.com/wp-content/uploads/2021/06/bicycle-clamp-20210601.pdf |
| Bicycle Clamp | CAD ZIP | https://leisurenotes.com/wp-content/uploads/2021/06/bike-clamp-20210601.stp_.zip |
| Cornhole | CAD ZIP | https://leisurenotes.com/wp-content/uploads/2021/06/cornhole-3d-20210605.stp_.zip |
| Biplane | CAD ZIP | https://leisurenotes.com/wp-content/uploads/2021/06/biplane-design-skp-stp.zip |
| Baby Doll Carriage | CAD ZIP | https://leisurenotes.com/wp-content/uploads/2021/06/babydoll-carriage-stp-skp.zip |
| Mantel Clock | CAD ZIP | https://leisurenotes.com/wp-content/uploads/2021/06/mantel-clock-20210613-stp-skp.zip |
| Mantel Clock | Instructions PDF | **unresolved** (attachment_id=499) |
| Fan Powered Car | CAD ZIP | https://leisurenotes.com/wp-content/uploads/2021/07/fan-powered-car-20210729-3dm-stp-skp.zip |
| Mechanical Pinball | Instructions PDF | **unresolved** (attachment_id=573) |
| Mechanical Pinball | CAD ZIP | **unresolved** (attachment_id=553) |
| Crayford Focuser | Instructions PDF | https://leisurenotes.com/wp-content/uploads/2021/12/crayford-focuser-1-25-instructions.pdf |
| Crayford Focuser | STL ZIP | https://leisurenotes.com/wp-content/uploads/2021/12/focuser-125-3D-print-parts-stl.zip |
| Crayford Focuser | SKP ZIP | https://leisurenotes.com/wp-content/uploads/2022/01/focuser-1-25-125wall-base-20211217.skp_.zip |
| Crayford Focuser | STEP ZIP | https://leisurenotes.com/wp-content/uploads/2022/01/focuser-1-25-125wall-base-20211217.stp_.zip |
| Fidget Spinner | CAD ZIP | **unresolved** (attachment_id=610) |
| Vertical Tool Cart | CAD ZIP | https://leisurenotes.com/wp-content/uploads/2022/01/tool-cart-CAD.zip |
| Foosball Table | CAD ZIP | https://leisurenotes.com/wp-content/uploads/2022/01/foosball-table-20220105-03-CAD-files.zip |

**4 unresolved attachment links** (site returned empty response on repeated attempts — likely a fetch-tool limitation, not a site problem): Mantel Clock PDF (id 499), Pinball PDF (id 573), Pinball CAD ZIP (id 553), Fidget Spinner CAD ZIP (id 610). These will be included automatically in the Hostinger uploads-folder bulk export, so no separate action needed once that export happens.

Image counts are heaviest on **Foosball Table** (~30 images) and **Vertical Tool Cart** (~13 images); most other projects have 2–6 images each. Exact file sizes not yet available — pending the uploads-folder export, then flag anything over 90MB per the risk register.

---

## Blockers This Session
- Sandbox shell network is allowlisted and blocks leisurenotes.com directly — cannot `curl`/download files programmatically.
- Safari is available to Claude in view-only mode (no clicks) without the Claude-in-Chrome extension connected — cannot drive downloads through the browser either.
- **Resolution (customer decision):** use Hostinger hPanel File Manager to zip and download the entire `wp-content/uploads` folder in one action next session (or before), rather than fetching ~150+ individual files/images one at a time.

---

## Next Session — Resume Point
1. Customer downloads `wp-content/uploads` zip via Hostinger hPanel File Manager
2. Provide the zip to Claude (drop in project folder or workspace)
3. Claude extracts, matches files to the 13 projects per this inventory, organizes into `~/projects/web/leisurenotes-com/projects/<project-name>/`
4. Verify all files present, flag any >90MB
5. Resolve the 4 unresolved attachment files from the extracted uploads folder
6. Mark Phase 1 complete → proceed to Phase 2 (Design Interview)
