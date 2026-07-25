# Curated catalogue expansion — DRAFT, NOT VERIFIED

> **Status: unverified draft input. Do not publish any of this to the live site yet.**
>
> This is the expanded product list as supplied, recorded verbatim for reference. It has
> **not** been checked against manufacturer datasheets, and it expands the brand list
> well beyond the five products documented in the client's own 2025 PDF catalogue.
>
> Blocking checks before any of this reaches `assets/js/data.js` — see
> [`project-handoff.md`](project-handoff.md), which already flags distributor
> authorisation as an open question:
>
> 1. **Distributor authorisation** is unresolved for Red Wing, ecom instruments, and
>    Roughneck, and is entirely unestablished for the newly added brands (Ansell, ATG,
>    Reebok, Taedylyn). Brand names must not go public before this is confirmed.
> 2. **Every model name, spec, and standard needs a manufacturer datasheet reference.**
>    Several entries below read as inferred rather than sourced — the "Red Wing
>    Coveralls" line in particular, since Red Wing is a footwear maker. Procurement buys
>    by the standard (see the marking-strip note in `CLAUDE.md`), so a wrong or invented
>    standard on a live PPE catalogue is a real liability, not a copy error.
> 3. **The ATG substitution below is a misrepresentation risk.** The source note says ATG
>    models are "represented via" Ringers products. Listing Ringers gloves under an ATG
>    heading would misdescribe the goods. Either source real ATG models or drop the ATG
>    heading.
> 4. **Part codes and size ranges** must be real. The existing Roughneck entry carries
>    genuine codes (`267-07`–`267-14`); anything added needs the same.
>
> Verified entries should move into `window.OS_PRODUCTS` using the documented entry
> shape. Categories with no verified product stay `stocked: false` and render under
> "Available on request" — which is where most of this belongs until sourced.
>
> **Resolved:** the `Ex-Handy 10 DZ1` exclusion is intentional — the line is discontinued
> for Oasis Star. It has been removed from `site/assets/js/data.js`, leaving four
> documented products.

---

## As supplied

Curated product catalogue incorporating items available from Oasis Star General Trading
(excluding the Ex-Handy 10, including newly specified models and brands).

### 1. Hand protection (gloves)

**Ansell gloves (3 models)**
- R-Flex Nitrile Half-Dip — cut protection, dexterity, breathable knit shell, sandy
  finish nitrile palm, touchscreen-compatible.
- R-Flex Nitrile Full-Dip — liquid-resistant, double-dipped, cut protection, high
  visibility.
- R-Flex Nitrile Half-Dip Fleece Lined — cut and cold protection, fleece lining for
  low-temperature environments.

**ATG gloves (3 models)**
*Supplied note: "Represented via the integrated Ringers Gloves / industrial safety
lineup featured in the source documentation." — see risk 3 above.*
- Ringers Super Hero Insulated / Synthetic Leather Palm — waterproof barrier, 70g
  Thinsulate insulation, TPR impact protection.
- Ringers R-259 Synthetic Leather Palm — high cut protection, Kevlar stitched,
  high-visibility Spandex mesh back.
- Ringers Roughneck TefLoc Palm — oil-resistant grip system, extensive TPR impact
  protection, extended Airprene wrist closure.

### 2. Footwear (safety shoes)

**Red Wing (3 models)**
- Men's Petroking 6-inch boot — waterproof Nubuck leather upper, non-metallic safety
  toe, puncture-resistant Swen-Flex insole, TredMax slip- and heat-resistant outsole.
- Men's Petroking 8-inch boot — extended height, waterproof black Nubuck leather, EH
  protection, ForceGuard chemical/abrasion resistance.
- Heavy-duty industrial safety shoe — puncture and slip resistance, stated as compliant
  with EN ISO and ASTM standards.

**Reebok (3 models)**
- Athletic-style composite toe safety jogger — lightweight, flexible cushioning,
  non-metallic protection.
- Work Duty slip-resistant low-cut shoe — oil- and slip-resistant rubber outsole,
  moisture-wicking nylon mesh lining.
- Sublite crosstraining safety shoe — electrical hazard protection, memory-tech massage
  footbed.

### 3. Protective apparel (coveralls and vests)

**Red Wing coveralls (3 models)** — *see risk 2 above; Red Wing is a footwear maker.*
- Flame-resistant standard coverall — flash fire and electrical arc protection for oil
  and gas.
- Enhanced-visibility lightweight coverall — breathable cotton blend, high-visibility
  reflective striping.
- Premium chemical-resistant coverall — barrier fabric against hazardous liquid splashes
  and industrial chemicals.

**Taedylyn coverall (1 model)**
- Heavy-duty industrial coverall — poly-cotton blend, reinforced stitching, multi-pocket
  utility design, robust zip closures.

**Taedylyn vests (2 models)**
- High-visibility reflective safety vest — fluorescent mesh, vertical and horizontal
  high-intensity reflective tape.
- Multi-pocket executive safety vest — heavy-duty twill, utility pockets, radio loops,
  heavy-duty front zip.

### 4. Communication and smart devices

**ecom phones (2 models)**
- Smart-Ex 03 DZ1 smartphone — 5G, rugged explosion-proof, Android 13, 6-inch Gorilla
  Glass multi-touch operable with gloves, dual-SIM/eSIM. *(Already live in the
  catalogue — the only remaining hazardous-area device since the Ex-Handy 10 was
  discontinued.)*
- Hazardous-area compact utility device — Zone 1/21 and Division 1, physical
  programmable buttons for push-to-talk and lone-worker protection. *(Model name not
  specified — needs identifying before listing.)*
