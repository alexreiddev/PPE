# PPE market, product & supplier research — Oct 2026 (RESEARCH INPUT, NOT VERIFIED FOR PUBLICATION)

> **Status: research input. Nothing here is approved for `site/` yet.**
>
> This was compiled on 29 Oct 2026 from the client's WhatsApp export (24 Jul – 11 Oct 2026),
> 4 PDFs, 19 images and a contact card. It is the source behind the 20-SKU plan in
> [`catalogue-expansion-draft.md`](catalogue-expansion-draft.md), and it is better sourced
> than that draft: most entries name the datasheet or flyer they come from. Every gate in
> that draft and in [`../CLAUDE.md`](../CLAUDE.md) still applies.
>
> **Review notes — read before using any of this on the site:**
>
> 1. **Brand names are still gated.** Distributor authorisation is unconfirmed for every
>    brand here (Red Wing, ecom, Ansell/Ringers, ATG, Reebok, Taedylinn, Avon). The research
>    itself lists this as an open item (§7). No brand name goes live until it's confirmed.
> 2. **Specs must be checked against the original PDFs, not this summary.** The source files
>    (`93276.pdf`, `AVON_NH15_H2S_Brochure.pdf`, the Taedylinn W2849 datasheet, the Red Wing
>    flyers) aren't in this repo. Discrepancies already visible in the summary:
>    - W2849 lists **EN ISO 11611 Class 1** under standards but "Class 2 welding protection"
>      under features. One of the two is wrong. Check the SATRA certificate.
>    - R-138 / R-133 show EN 388 as `2121X`, a 5-character code from before the 2016 revision.
>      The current marking has 6 characters. Check the datasheet.
>    - The NH15 competitor table is **Avon's own marketing comparison**. Don't present it as
>      independent data.
>    - Ansell's company figures (sales, headcount, gloves per year) come from Ansell's
>      catalogue and are not needed on an Oasis Star page.
> 3. **Ideas here that conflict with settled decisions:**
>    - §6.1 #4 suggests an "ANSI A-level filter". The datasheet layout is settled and a
>      filter grid is excluded. Certification filtering is only in the **Option 2** quote
>      (AED 9,500), so it waits for the client to choose that option.
>    - §6.1 #13 suggests an "Ex-Handy 10 discontinued? Upgrade here" landing page. A page
>      that redirects to the Smart-Ex 03 would not reintroduce the product, but the Ex-Handy
>      10 was removed on the client's instruction. It's a new page, so check with the client
>      before building it.
>    - §6.2 #1 "stock badge" and §6.1 #16 "2-hour quote promise" are commercial commitments
>      the client hasn't made. Don't publish them as claims.
>    - §1 records the logo colours as royal blue + red. The site tokens (teal / amber) are
>      locked and client-approved. Logo colours affect the logo slot (`.brand__mark`), not
>      the token palette.
>    - §6.2 #2 "starter kit bundle" and §6.2 #5 "carton pricing" must not bring prices into
>      the catalogue. The site stays enquiry-only (quantities yes, prices no).
> 4. **The Red Wing flyers carry the Dubai showroom's phone number** (+971 56 990 3609), not
>    Oasis Star's. Don't use them as-is.
> 5. **Security:** the GoDaddy sign-in screenshot (`IMG-20260724-WA0032.jpg`) sent the
>    password as a plain image. Treat that password as exposed. The client should change it
>    and turn on 2-Step Verification (already on the handoff's "Turn on (free)" list).
> 6. **Already actioned:** the "Outlook mail from info@ lands in spam" item (§6.3) has a fix
>    runbook in [`email-authentication.md`](email-authentication.md). That fix is the free
>    SPF/DKIM item in the 8 Oct offer. The Ex-Handy 10 is already removed from `data.js`.
>
> The research below is reproduced as supplied.

---

# Oasis Star General Trading: PPE Market, Product & Supplier Research

**Source:** WhatsApp export "WhatsApp Chat with Rahul Mummy Almasood" (24 Jul 2026 to 11 Oct 2026), 4 PDFs, 19 images, 1 contact card
**Compiled:** 29 Oct 2026
**Purpose:** Research input for the Oasis Star B2B website and catalogue, covering market, products, suppliers and the buyer pain points that drive fast-converting sales

> **Coverage note:** The 45+ WhatsApp voice notes (`.opus`) were **not transcribed** because no transcription tool is installed on this machine. Anything said only in the voice notes is missing from this file.
>
> **Omitted on purpose:** login credentials (a GoDaddy sign-in screenshot), bank account details, a verification code and personal email addresses all appear in the chat. They are left out of this file. You may want to remove that screenshot from shared folders and **change the GoDaddy password**, since it was sent as a plain image.

---

## 1. The Company: Oasis Star General Trading

| Item | Detail |
|---|---|
| Legal / trade name | Oasis Star General Trading (UAE) |
| Domain | `oasisstargt.com` (registered on GoDaddy; showed a "Launching Soon" GoDaddy Airo placeholder as of Jul 2026) |
| Demo site built | `https://oasis-star.netlify.app/` |
| Business email | `info@oasisstar...` on Outlook / Microsoft 365, **with mail landing in spam** |
| Brand colours (from logo) | Royal blue + red, with "GENERAL TRADING" in black. The logo is a bar-chart "growth" mark with a swoosh |
| Catalogue | "Oasis Star Product Catalogue 2025" (8 pages) |
| Main contact going forward | +971 56 182 1086 (client's personal number; the old SIM is being handed to the office) |
| Positioning (own words) | "Committed to protecting lives by supplying high-quality safety equipment to the UAE's thriving construction sector… from head to toe." Tagline: **"Choose Oasis Star. Choose Safety That Lasts."** / "Your Safety, Our Priority" |
| Stated sectors | Construction (primary in copy), plus oil & gas, refineries, industrial (implied by the product mix) |

### Reference / competitor sites the client pointed to
- **SAMS Solutions** – the reference website the client liked
- **eyevexsafety.com** – the client asked: "have a look"
- **Red Wing Shoes Dubai** showroom, Al Qusais (its flyers are being reused as product assets)

---

## 2. Project Timeline & Commercial Decisions (from the chat)

| Date | Event |
|---|---|
| 24 Jul 2026 | Demo site shared. Client: *"Ex Handy 10 remove chey – it's discontinued."* The domain (oasisstargt.com) and GoDaddy access were shared |
| 25 Jul 2026 | Client listed the **initial launch SKU plan** (see §3.1). Sent the Ansell Ringers catalogue (93276.pdf), the Oasis Star catalogue and the logo |
| 28 Jul 2026 | Client shared eyevexsafety.com as a reference |
| Aug–early Oct | Client chased progress ("Website enthaay?", meaning "what happened with the website?") |
| 7 Oct 2026 | Proposal: a B2B **Digital Product Catalogue + Request-a-Quote** site rather than an e-commerce store. Client: *"This will work."* |
| 8 Oct 2026 | Final offer: **AED 6,500 one-time** (50/50), **free SPF/DKIM email-spam fix**, **AED 500/month** IT & website care, **14 business days** to launch. Client: "Let me discuss with team" |
| 11 Oct 2026 | Client sent more products to add: Red Wing flyers, Ansell/Ringers glove sheets, the Taedylinn coverall and the Avon NH15 escape hood. Noted: *"need to remind me all those contact numbers"* |

**Packages quoted:**
- **Option 1 – Core Catalog Setup (AED 6,500):** category catalogue (Head/Hand/Foot/Body…), product pages with specs, CE/EN certificates and PDF datasheets, quote form plus a WhatsApp button on every page, Home/About/Certificates/Contact, 30 days of support.
- **Option 2 – Growth Package (AED 9,500):** everything in Option 1, plus a full Arabic version, filtering by certification and 60 days of priority management.

---

## 3. Product Range

### 3.1 Initial launch SKU plan (client message, 25 Jul 2026)

| Brand | Category | # Models |
|---|---|---|
| Ansell (incl. Ringers) | Gloves | 3 |
| ATG | Gloves | 3 |
| Red Wing | Safety shoes | 3 |
| Red Wing | Coveralls | 3 |
| ecom (Pepperl+Fuchs) | Intrinsically safe phones | 2 |
| Taedylinn | Vests | 2 |
| Taedylinn | Coverall | 1 |
| Reebok (Work) | Safety shoes | 3 |
| **Total** | | **20** |

The 11 Oct additions below expand this list, mainly with more Ansell gloves, Red Wing apparel and eyewear, and the Avon escape hood.

### 3.2 Full product inventory found in the folder

#### A. FOOT PROTECTION

**Red Wing Petroking 6" Boot – Style #3228**
- Waterproof, waxed Nubuck leather upper, direct-attach construction, nylon shank
- Non-metallic safety toe; puncture-resistant Swen-Flex® insole
- EH (electrical hazard) rated; TredMax® EH outsole, slip- and heat-resistant (HRO), non-marking
- ForceGuard™: resists abrasion, oil/gas and chemicals (oil/gas resistance rated "Best")
- Made in Italy. Sizes EU 35–48
- Standards: **AS 2210.3:2019, ASTM F2413-24, EN ISO 20345:2022+A1:2024**
- Flyer hook: *"NEW STOCKS ARRIVED – Get Yours Before Stock Runs Out!"* and "Designed for demanding environments common to the ENERGY INDUSTRY"

**Red Wing Petroking 8" Boot – Style #3229**
- Same platform as the 3228 with a taller shaft; black Nubuck. EH, PR, NT (non-metallic toe), SR, heat- and chemical-resistant
- ASTM & EN ISO. Made in Italy. EU 35–48

**Red Wing Style #6338 – Men's Athletics (safety trainer)**
- Breathable nylon upper with mesh lining, **aluminium safety toe**, EH, slip-resistant
- Rubber-EVA "Stealth" outsole: oil/gas, chemical, abrasion and heat resistance all rated "Best"
- Cement construction, non-woven insole, nylon shank, last 305, non-marking. Made in Vietnam
- Safety rating: **ASTM F2413-24, I/C, EH, SR**
- Sizes: D 7–15, E 7–15, H 8–13 (US)
- Ideal for: oil & gas, construction, shipyard, refinery, chemical factories
- Flyer hooks: "WORK HARD. MOVE FASTER." / "NEW ARRIVAL" / "Buy your pair before the stock ends!"

**Reebok safety shoes – 3 models** (named in the SKU plan; no datasheet in the folder)

#### B. HAND PROTECTION – Ansell / Ringers Gloves

Ansell profile (from its catalogue): founded 1893 in Australia; ~$1.4B in sales; 12,000 employees; 52 facilities; 10B+ gloves sold a year; protects 10M+ workers a day; ranked No. 1 or 2 in all key segments.

| Model | Type | Key specs | EN 388 | Impact | Packaging | Applications |
|---|---|---|---|---|---|---|
| **R-065** R-Flex Nitrile Half-Dip | Cut + impact, high dexterity | HPPE 13g knit, TPR bumpers, sandy nitrile palm, touchscreen tips | 4X43DP | ANSI/ISEA 138 L2; ANSI A4 cut | 72 pr/carton | Wireline, casing, coiled tubing, infrastructure |
| **R-068** R-Flex Full-Dip | Cut + impact + liquid resistant | Double-dip nitrile | 4X44FP | ISEA 138 L2 | 60 pr/carton | Wireline, casing, coiled tubing |
| **R-085** R-Flex Half-Dip Fleece | Cut + cold | Fleece lined | 4X44FP | L2 | 48 pr/carton | As above |
| **R-176** Super Hero Insulated | Waterproof, cut + cold | 70g Thinsulate™, gaiter cuff, EN 511 121 | 3X44FP | L2 | 50 pr/carton | Drilling, pressure pumping, production |
| **R-259** Synthetic Leather Palm | High cut | Kevlar™ stitched, neoprene cuff | 4X44EP | L2 | 50 pr/carton | Drilling, production, infrastructure |
| **R-259B** Barrier | Waterproof, heavy-duty cut | Waterproof barrier, reflective piping, EN 511 021; ANSI cut A5 | 4X44FP | L2 | 50 pr/carton | Drilling, production, infrastructure |
| **R-267** TefLoc® / Silicone Dot palm | "The original impact glove", oil grip | Kevlar™ liner, airprene cuff, high-vis; sizes XS–4XL (codes 267-07 to 267-14) | 4243BP | L2 | 50 pr/carton | Drilling, rigging/chains |
| **R-297** KevLoc Palm | Enhanced grip | Kevlar™ padding | 4343CP | L2 | 50 pr/carton | Drilling, pressure pumping |
| **R-665** R-Hide Impact | Goatskin leather + impact | Leather, hook-and-loop cuff | 3X42EP | – | 50 pr/carton | Pressure pumping, infrastructure |
| **R-840** | Lightest impact glove (warehousing/logistics) | 15g nylon/spandex, Level 1 TPR, FORTIX™, ERGOFORM™, Dermatest®, Ansell Earth | 4131AP | ISEA 138 L1; CE Cat III | – | Warehousing, logistics |
| **R-138** | Hi-vis automotive / mechanics | Synthetic split-leather palm, touchscreen | 2121X | – | – | Automotive, light handling |
| **R-133** | Black tactile automotive | Split-leather palm, wraparound index finger | 2121X | – | – | Automotive, light handling |

**Ansell general-purpose / consumable gloves**
- **EDGE® 48-123**: 13g polyester, black (hides dirt), seamless. For dry to slightly oily work
- **EDGE® 48-126**: 15g polyester, black, economical and long-wearing
- **EDGE® 48-920**: NBR coating, abrasion- and oil-resistant, EN 420/EN 388
- **HyFlex® 11-561**: cut-resistant, improved FORTIX™
- **HyFlex® 11-840**: lightweight mechanical protection, **1 case = 144 pairs**

**Ansell chemical protection**
- **AlphaTec® Solvex® 37-675**: flocked nitrile, 0.38 mm. Resists chemicals, snags, punctures and abrasion; no dermatitis. Industries: aerospace, automotive, food processing and service, industrial, oil & gas. Uses: chemical handling, cleaning, refuelling and diesel, plant maintenance

**ATG gloves – 3 models** (named in the SKU plan; no datasheet in the folder)

#### C. BODY PROTECTION

**Taedylinn W2849 – FR Super Lightweight Anti-Static Coverall 210 g (Orange; also Royal Blue, Red)**
- Fabric: Bizflame Plus, 99% cotton / 1% carbon fibre, 210 g twill
- Built "for the extra warm-weather demands of the offshore industry"
- Standards: **EN 1149-5** (anti-static), **EN ISO 11612** (A1+A2, B1, C1, F1: heat/flame), **EN ISO 11611 Class 1** (welding)
- Manikin test: **19% predicted burn injury** (0% third-degree)
- Features: CE, FR for the life of the garment, Class 2 welding protection (per feature list), FR industrial-wash reflective tape, two-tier knee-pad pockets, two-way zip, radio loops, 10 pockets, triple-stitched
- Sizes XS–4XL. Wash at 60 °C, max 50 washes. HS/commodity code **6211321000**
- Certified by SATRA Europe (Notified Body 2777), Cert No. 2777/12375-02/E00-00
- Carton: 43×28×58 cm, 0.0698 m³, 1.06–1.21 kg

**Taedylinn vests – 2 models** (SKU plan; no datasheet)

**Red Wing coveralls – 3 models** (SKU plan; no datasheet)

**Red Wing Jacket (black, insulated, detachable hood)**
- Durable outer fabric, insulation, breathable lining
- Good for cold weather, outdoor work and industrial use. Note: this is a low-demand item for the UAE climate apart from cold-store or winter-night shifts, or export

#### D. EYE PROTECTION

**Red Wing safety glasses**: impact-resistant, UV protection, lightweight. Lens options are yellow, clear, indoor/outdoor (mirror) and smoke

#### E. RESPIRATORY / EMERGENCY ESCAPE

**Avon Protection NH15 – Compact H₂S Filter Escape Hood**
- Can be put on in **under 30 s**. Gives **100 min protection against H₂S at 5,000 ppm** (>150 min at 500 ppm)
- **5-year shelf life**, vacuum-packed, **no annual maintenance and no fit check**. Works with beards, long hair and glasses
- NIOSH CBRN APER TC-14G-0302. CE BS8468-3.2:2009 Type 1. P3/P100 particulate filter
- 625 g; 150×100×90 mm pack, which it bills as the most compact on the market
- Sizes: XS (12–13"), Regular (13–18"), Large (18–22" neck)
- Training hood, posters and training CD are available
- Also protects against ammonia, SO₂, chlorine, HCl, HCN, HF, NO₂, phosgene, cyclohexane and formaldehyde
- **Competitor benchmark (Avon's own table):**

| | Avon NH15 | MSA Safe Escape | ILC Dover Scape | North ER2000 | QuickPro |
|---|---|---|---|---|---|
| Weight | 625 g | 1029 g | 1016 g | 803 g | 635 g |
| NIOSH | Yes | Yes | Yes | Yes | No |
| CE | Yes | No | No | No | No |
| Full clear hood | Yes | Partial | Partial | Partial | No |
| Anti-fog | Yes | No | No | Yes | Yes |
| Filter protrusion | 50 mm | 175 mm | 75 mm | 125 mm | 125 mm |
| Batteries | No | No | Yes | No | No |

- Ideal for: oil refineries, chemical plants, mining/drilling, truck transport, executive protection

#### F. HAZARDOUS-AREA COMMUNICATION (ATEX / IECEx)

**ecom (a Pepperl+Fuchs brand) Smart-Ex® 03 DZ1**: explosion-proof smartphone
- Zone 1/21 and Div 1. Android 13 (Android Enterprise Recommended). Snapdragon QCM6490
- 6" Gorilla Glass that works with gloves; 8 GB/128 GB; 5G; eSIM + nano-SIM; 4,400 mAh
- Programmable PTT and alarm buttons; **Lone Worker Protection (LWP)**; full sensor suite

**ecom Ex-Handy 10 DZ1**: **DISCONTINUED (client instruction). Remove it from the site and catalogue.**
- Its specs (Android 8.1, 2.6" screen, ATEX/IECEx Zone 1) are kept only for "replacement / upgrade" content: anyone searching for the Ex-Handy 10 should be sent to the Smart-Ex 03

---

## 4. Supplier / Brand Map

| Brand | Parent / distributor | Category | Evidence in folder | Notes |
|---|---|---|---|---|
| **Ansell** (Ringers, HyFlex, EDGE, AlphaTec) | Ansell Ltd. EMEA: Ansell Healthcare NV, Brussels. Ringers Gloves, Houston TX | Gloves (impact, cut, general, chemical) | Full Ringers catalogue + 11 product images | Strongest data set; carton quantities are known |
| **ATG** | ATG Intelligent Glove Solutions (MaxiFlex range) | Gloves | Named only | Datasheets needed |
| **Red Wing Shoes** | Red Wing Shoes Dubai showroom, Al Qusais (flyer contact +971 56 990 3609) | Boots, safety trainers, coveralls, jacket, eyewear | 4 flyers + 2 catalogue pages | The flyers carry the **showroom's** number, not Oasis Star's. Re-brand them or confirm the dealer relationship before use (see §7) |
| **Reebok Work** | – | Safety shoes | Named only | Datasheets needed |
| **Taedylinn** | Perfactive, Abu Dhabi (P.O. Box 41820, +971 2 551 1711, perfactive.net) | FR coveralls, vests | W2849 datasheet | Perfactive is the UAE source/distributor |
| **ecom / Pepperl+Fuchs** | Pepperl+Fuchs | Ex-rated phones | Catalogue pages | Ex-Handy 10 discontinued; push the Smart-Ex 03 |
| **Avon Protection** | Avon Rubber p.l.c., UK (EMEA +44 1225 896705) | H₂S escape hood | Full brochure | Niche, high-value and compliance-driven |

---

## 5. Market Context (UAE PPE, B2B)

From the chat and the documents, plus general industry knowledge. Points marked *(analysis)* are inference, not data from the folder.

- **Buyers are corporate and buy in bulk.** As the chat put it: UAE PPE buyers *"don't usually buy items online using a credit card. They order in bulk, so they need official price quotes, technical spec sheets, and safety certificates before placing an order."*
- **Main end-user sectors in this product mix:** oil & gas (onshore, offshore, drilling, wireline, coiled tubing, pressure pumping), refineries and petrochemicals, construction and infrastructure, shipyards, chemical plants, logistics and warehousing, automotive workshops.
- **Approval driven by standards:** every product is sold on its certification (EN 388, ANSI/ISEA 105/138, EN ISO 20345, ASTM F2413, EN ISO 11612/11611, EN 1149-5, ATEX/IECEx, NIOSH/CE). HSE managers and procurement teams shortlist by standard first and price second. *(analysis)*
- **Climate:** extreme heat drives demand for **lightweight, breathable** gear such as the 210 g FR coverall and the athletic 6338 shoe. Cold-weather lines (R-176, R-085, the Red Wing jacket) are niche locally. *(analysis)*
- **Bilingual buying:** Arabic is expected by government-linked and larger local entities, which is why it is in Option 2.
- **Competition:** many UAE general traders sell the same global brands, so trust, certificates, speed of quote and stock availability are what set a trader apart. *(analysis)*

---

## 6. Pain Points → Fast-Converting Sales Angles

### 6.1 Buyer pain points (HSE managers, procurement, site supervisors)

| # | Pain point | Products that solve it | Sales angle / proof point to show |
|---|---|---|---|
| 1 | **Hand injuries from impact and pinch points** on rigs, rigging and pipe handling, the top LTI cause in drilling *(analysis)* | Ringers R-267, R-297, R-259, R-065 | "ANSI/ISEA 138 Level 2 impact plus EN 388 cut," with a TPR knuckle-to-fingertip diagram. Map each model to the task (wireline, casing, pressure pumping) |
| 2 | **Oily, wet grip**: tools slipping | R-267 TefLoc/Silicone Dot, R-068 full-dip, EDGE 48-920 | "Oil-resistant grip." Show a palm close-up |
| 3 | **Fast glove wear means high replacement cost** | EDGE 48-126 / 48-123 (black hides dirt, long-wearing), HyFlex 11-840 | Cost per pair per week. **Sell by the carton** (144 pairs HyFlex; 48–72 Ringers). Offer a monthly reorder |
| 4 | **Cut hazards** (sheet metal, glass) | HyFlex 11-561, R-259B (ANSI A5), R-065 (A4) | Show the cut level clearly. Add an "ANSI A-level" filter on the site |
| 5 | **Chemical / fuel contact and dermatitis** | AlphaTec Solvex 37-675 | "Won't swell, weaken or degrade; no contact dermatitis." Pitch to refuelling, maintenance and cleaning contractors |
| 6 | **Heat stress in FR clothing**: workers refuse to wear heavy coveralls | Taedylinn W2849 210 g "super lightweight" | "Built for warm-weather offshore." Manikin result of 19% burn prediction, EN 1149-5 anti-static. **Strong summer campaign hook** |
| 7 | **Flash fire / static ignition in hazardous zones** | W2849 (EN 1149-5, EN ISO 11612) | Compliance message: "required for Zone 1/2 work permits" *(check against each client's site rules)* |
| 8 | **H₂S exposure**: emergency escape compliance on sour-gas sites | Avon NH15 | "Under 30 s to don, 100 min at 5,000 ppm, **5-year shelf life, zero maintenance, no fit test**." Lower lifetime cost than SCBA-style escape sets. **Protect more people within the same budget** |
| 9 | **Safety-boot fatigue and heat** in long shifts | Red Wing 6338 athletic (light, breathable, aluminium toe) | "Work hard, move faster." Pitch to logistics, shipyard and maintenance crews |
| 10 | **Electrical, puncture and chemical hazards underfoot** | Red Wing Petroking 3228/3229 | Show the icon list (EH, PR, SR, HRO, ForceGuard). Made in Italy. Triple standard (EN ISO / ASTM / AS) |
| 11 | **Mixed-nationality workforce, many foot sizes** | Petroking EU 35–48, 6338 D/E/H widths | "Full size run in stock," which removes the wait for odd sizes |
| 12 | **Radios and phones not allowed in Ex zones; lone-worker risk** | ecom Smart-Ex 03 | "Zone 1/21 certified, PTT and alarm buttons, Lone Worker Protection." Upgrade path for Ex-Handy 10 owners |
| 13 | **Discontinued devices** (Ex-Handy 10) with no replacement plan | Smart-Ex 03 | An "Ex-Handy 10 discontinued? Upgrade here" landing page catches searches for the old model |
| 14 | **Eye injuries and glare outdoors** | Red Wing glasses (clear/yellow/smoke/mirror) | Pick the lens by task: indoor, low light or full sun. Low-cost add-on to every boot or glove order |
| 15 | **Audit and document pressure**: auditors ask for certificates | All | Put a **downloadable datasheet and certificate on every product page**. This is a key reason buyers pick one supplier over another |
| 16 | **Slow supplier responses** | All | **WhatsApp quote button** plus a 2-hour quote promise *(analysis)* |

### 6.2 Triggers that close deals fast

1. **Scarcity / new stock**: the Red Wing flyers already use "New stocks arrived – get yours before stock runs out." Show a stock badge on product pages.
2. **New project mobilisation**: contractors kitting out 50–500 workers at once. Offer a "starter kit" bundle of boots, gloves, coverall and glasses.
3. **Audit or incident aftermath**: buyers need certified gear *now*. Certificates must be downloadable instantly.
4. **Summer**: a lightweight FR and breathable footwear campaign for May–September.
5. **Consumables**: gloves are replaced weekly or monthly. Use carton pricing and scheduled reorders.
6. **Upgrade / discontinuation**: Ex-Handy 10 to Smart-Ex 03.
7. **Lower total cost**: the NH15's 5-year shelf life with no maintenance; EDGE's long wear.
8. **One-stop "head to toe" supply**: one PO, one supplier, one delivery. This is already the company's own message.

### 6.3 Oasis Star's own (internal) pain points

| Pain point | Status / fix |
|---|---|
| No live website: the domain shows a GoDaddy "Launching Soon" page | Catalogue + RFQ site, 14 business days |
| Outlook emails from info@ land in clients' spam, which loses quotes | SPF/DKIM/DMARC fix (included free) |
| The 2025 catalogue is outdated and still lists the discontinued Ex-Handy 10 | Remove it; rebuild the catalogue from the new SKU list |
| Product flyers carry a third-party showroom phone number | Re-brand with Oasis Star contacts, or confirm the dealer arrangement |
| Contact numbers are scattered, and the phone number is changing | Confirm one sales WhatsApp number plus office numbers for the site (client asked to be reminded) |
| Datasheets are missing for ATG, Reebok, Red Wing coveralls and Taedylinn vests | Request them from the suppliers |

---

## 7. Open Items / Data Gaps

- [ ] Transcribe the voice notes (Malayalam/English) to capture any requirements discussed there
- [ ] Get model names and datasheets for **ATG (3), Reebok (3), Red Wing coveralls (3), Taedylinn vests (2)**
- [ ] Confirm which 3 Ansell models are "hero" SKUs. The chat lists 3, but about 17 Ansell models were shared
- [ ] Confirm whether Oasis Star is an authorised dealer for Red Wing, Ansell, Avon and ecom (affects logo use and claims of being "authorised")
- [ ] Get certificate PDFs (CE/EN/NIOSH) for each product page
- [ ] Confirm the final contact numbers and email for the website
- [ ] Client decision on Option 1 vs Option 2 and the monthly care plan

---

## 8. Files in the Source Folder

| File | Content |
|---|---|
| `WhatsApp Chat with Rahul Mummy Almasood.txt` | Chat log |
| `product catalogue.pdf` | Oasis Star Catalogue 2025 (About, Red Wing 3228/3229, ecom Ex-Handy 10 & Smart-Ex 03, Ringers R-267, Conclusion) |
| `93276.pdf` | Ansell / Ringers "Impact Protection Solutions" catalogue |
| `AVON_NH15_H2S_Brochure.pdf` | Avon NH15 escape hood brochure |
| `TAEDYLINN ORR FR Anti Static Coverall W2849 Orange.pdf` | Taedylinn W2849 datasheet |
| `IMG-20260725-WA0007.jpg` | Oasis Star logo |
| `IMG-20260727-WA0000.jpg` | Screenshot of the oasisstargt.com "Launching Soon" page |
| `IMG-20260724-WA0032.jpg` | GoDaddy sign-in screenshot (**contains credentials, not reproduced**) |
| `IMG-20261011-WA0004–0007.jpg` | Red Wing flyers: Petroking 3228, 6338 Athletic, Jacket, Safety Glasses |
| `IMG-20261011-WA0008–0019.jpg` | Ansell/Ringers sheets: R-065, EDGE 48-123, Solvex 37-675, R-259B, R-840, R-138, EDGE 48-920, R-133, EDGE 48-126, HyFlex 11-561, R-267, HyFlex 11-840 case |
| `My Personal Number.vcf` | Client's new contact (+971 56 182 1086) |
| `*.opus` (45+) | Voice notes, **not transcribed** |
| `STK-*.webp` | Sticker (no content) |
