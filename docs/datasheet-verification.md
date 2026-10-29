# Datasheet verification — 29 Oct 2026

The specs in [`market-research-2026-10.md`](market-research-2026-10.md) and on the live site
were checked against the four source PDFs the client supplied:

| File | What it is |
| --- | --- |
| `93276.pdf` | Ringers / Ansell *Impact Protection Solutions* catalogue, © 2019, 8 pp |
| `AVON_NH15_H2S_Brochure.pdf` | Avon Protection NH15 H₂S brochure, ref. GR13260 (Sept 2015), 4 pp |
| `TAEDYLINN_ORR_FR_Anti_Static_Coverall_W2849_Orange.pdf` | Taedylinn W2849 datasheet, issued by Perfactive (Abu Dhabi), 2 pp |
| `product catalogue.pdf` | Oasis Star 2025 catalogue, 8 pp (the client's own document, so not a manufacturer source) |

These PDFs are not committed to the repo. They are the client's files, and two of them
are third-party copyright.

---

## Live site corrected

**Roughneck R-267 TefLoc Palm** (`rn-267` in `site/assets/js/data.js`). The client
catalogue was wrong in two places, and the site copied it:

| | Site before | Manufacturer (Ringers catalogue p.5) |
| --- | --- | --- |
| "Level 2" | "ANSI/ISEA level 2 **cut**", standard listed as **ANSI/ISEA 105** | **ANSI/ISEA 138 level 2 — impact**. The catalogue gives no ANSI cut level for this glove |
| EN 388 | "level 2 cut **and puncture**" | **4243BP**: abrasion 4, cut 2, tear 4, **puncture 3**, ISO cut B, impact P |
| Other | — | EN 420; knit Kevlar liner; 5 pairs/bag, 50 pairs/carton (added to the specs) |

Marking strip now reads `EN 388 4243BP / ANSI/ISEA 138 L2 / EN 420`.

**Still open on R-267:** sizes. The client catalogue gives XS–4XL as codes
`267-07`–`267-14` (8 sizes). The 2019 Ringers catalogue lists sizes **7–13** (7 sizes),
so it has no size 14. The site keeps the client's run because the codes may come from a
newer Ringers sheet. Confirm `267-14` / 4XL with the supplier before quoting it.

The other three live entries (Petroking 3228 / 3229, Smart-Ex 03) match the client
catalogue. No manufacturer datasheet for them was supplied, so they aren't
independently verified here.

---

## Research-file claims that failed or need care

| Claim in the research | Finding |
| --- | --- |
| R-065 "ANSI A4 cut" | **Not in the catalogue.** Only EN 388 4X43DP and ISEA 138 L2 appear. Don't publish an ANSI cut level without a source |
| R-259B "ANSI cut A5" | **Not in the catalogue.** EN 388 4X44FP, EN 511 021, ISEA 138 L2 only |
| R-138 / R-133 "EN 388 2121X", R-840, EDGE 48-xxx, HyFlex 11-xxx, Solvex 37-675 | Not in the uploaded PDFs. They came from WhatsApp product images that weren't supplied. Still unverified |
| W2849 welding "Class 1" vs "Class 2" | **The manufacturer sheet contradicts itself.** The standards block says *EN ISO 11611 Class 1 (A1+A2)*; the feature bullets say *Class 2 Welding Protection*. Publish **Class 1**, the formal standards line, unless SATRA certificate 2777/12375-02/E00-00 shows otherwise |
| W2849 sizes "XS–4XL" | p.1 says S–4XL, but the p.2 SKU table includes `W2849ORRXS`. XS exists for orange. Royal blue and red were not checked |
| W2849 "carton 43×28×58 cm, 1.06–1.21 kg" | That's a per-SKU (single garment) shipping row, not a carton |
| NH15 "100 min at 5,000 ppm H₂S" | Correct (>100 min), but it comes from **TNO** testing (report 010DV4/274), not from the approval. The NIOSH approval (TC-14G-0302) is **CBRN APER escape-only, 15 min**. Don't present 100 min as the certified rating |
| NH15 CE approval | Approved to BS 8468-3.2:2009 Type 1 under **PPE Directive 89/686/EEC**, which was replaced by Regulation (EU) 2016/425 in 2018. The brochure is from 2015. Ask Avon for the current certificate before calling it CE-marked on the site |
| NH15 competitor table | Avon's own comparison. Don't reproduce it as independent data |

Confirmed as stated in the research: Ringers EN 388 codes for 065 / 068 / 085 / 176 / 259 /
259B / 267 / 297 / 665; EN 511 121 (176) and 021 (259B); ISEA 138 L2 on all of these
except 665; the carton quantities; W2849 fabric, EN 1149-5 / EN ISO 11612
(A1+A2, B1, C1, F1), 19% burn prediction (0% third-degree), 60 °C max 50 washes, HS code
6211321000, SATRA NB 2777; the NH15 weight, pack size, sizes, NIOSH/CE part numbers, filter
gases and 5-year shelf life.

---

## Ready to add once brands are cleared

These are verified to the manufacturer sheet and can go into `OS_PRODUCTS` as data-only
edits. They aren't added yet because **Taedylinn and Avon would expand the published
brand list**, which `CLAUDE.md` gates on distributor confirmation. The client also hasn't
picked which glove models from the ~17 they sent are actually stocked.

| Product | Category | Marking strip (verified) | Notes |
| --- | --- | --- | --- |
| Taedylinn W2849 FR anti-static coverall 210 g | `body` (flip to `stocked: true`) | `EN ISO 11612 A1+A2 B1 C1 F1 / EN ISO 11611 Class 1 / EN 1149-5` | Orange (blue, red listed); XS–4XL; part codes `W2849ORR{XS…4XL}` |
| Avon NH15 H₂S escape hood | **new category needed** (respiratory / escape): category entry plus a pictogram in `icons.js` | `NIOSH CBRN TC-14G-0302 / BS 8468-3.2 Type 1 / P3` | XS / Regular / Large by neck size; NIOSH 75027-104-B / -100-B / -107-B |
| Ringers R-065 R-Flex half-dip | `hand` | `EN 388 4X43DP / ANSI/ISEA 138 L2 / EN 420` | Sizes 7–13; 72 pr/carton |
| Ringers R-068 R-Flex full-dip | `hand` | `EN 388 4X44FP / ANSI/ISEA 138 L2 / EN 420` | Sizes 7–13; 60 pr/carton |
| Ringers R-085 R-Flex fleece | `hand` | `EN 388 4X44FP / ANSI/ISEA 138 L2 / EN 420` | Sizes 7–13; 48 pr/carton; cold-weather niche in UAE |
| Ringers R-176 Super Hero insulated | `hand` | `EN 388 3X44FP / EN 511 121 / ANSI/ISEA 138 L2` | Sizes 8–13; 50 pr/carton |
| Ringers R-259 synthetic leather | `hand` | `EN 388 4X44EP / ANSI/ISEA 138 L2 / EN 420` | Sizes 8–13; 50 pr/carton |
| Ringers R-259B barrier | `hand` | `EN 388 4X44FP / EN 511 021 / ANSI/ISEA 138 L2` | Sizes 8–13; 50 pr/carton |
| Ringers R-297 KevLoc | `hand` | `EN 388 4343CP / ANSI/ISEA 138 L2 / EN 420` | Sizes 7–13; 50 pr/carton |
| Ringers R-665 R-Hide impact | `hand` | `EN 388 3X42EP / EN 420` | Sizes 8–13; 50 pr/carton; no ISEA 138 rating |

Ringers is already on the site (the 267 is listed as a Ringers glove under the
Roughneck line), so the Ringers models don't add a new brand. They're held only for the
client's stock choice. Note that the Ringers catalogue's size runs are numeric (7–13); the
client should say how they want sizes shown.
