# PPE — Oasis Star catalogue site

PPE carries the design skill library for the **Oasis Star General Trading** PPE
catalogue and enquiry site (`oasisstargt.com`, preview at `oasis-star.netlify.app`).

The site source is in [`site/`](site/). Project context, settled decisions, pricing
positions, and outstanding launch items are in
[`docs/project-handoff.md`](docs/project-handoff.md). Read it before design work.
Do not re-litigate decisions marked settled there.

**`site/` is the only published directory.** `netlify.toml` at the repo root sets
`publish = "site"` so `docs/` and this file are never served — `docs/project-handoff.md`
holds pricing floors and negotiation positions. Do not widen the publish dir.

## Skill selection — pick by project requirement

Thirteen vendored frontend design skills live in `.claude/skills/`. All auto-load; the
directory name is the slash command. Choose by what the task actually requires:

| Requirement | Skill |
| --- | --- |
| Polishing / improving the **existing** Oasis Star site | `/redesign-skill` ← **the usual one here** |
| Greenfield landing page, portfolio, or marketing site | `/taste-skill` |
| Visual direction already decided — premium & calm | `/soft-skill` |
| Visual direction already decided — editorial (Notion/Linear) | `/minimalist-skill` |
| Visual direction already decided — raw industrial / Swiss | `/brutalist-skill` |
| Reference images wanted before writing code | `/image-to-code-skill` |
| Deliverable is **images, not code** — web comps | `/imagegen-frontend-web` |
| Deliverable is **images, not code** — mobile screens | `/imagegen-frontend-mobile` |
| Deliverable is **images, not code** — brand/identity boards | `/brandkit` |
| Agent keeps truncating output or leaving placeholders | `/output-skill` |
| Targeting Google Stitch | `/stitch-skill` |
| Need exact pre-v2 taste-skill behaviour | `/taste-skill-v1` |
| Want the stricter GPT/Codex-oriented ruleset | `/gpt-tasteskill` |

**Default for this repo is `/redesign-skill`, not `/taste-skill`.** The Oasis Star site
already exists and has a client-approved design system. `taste-skill` is greenfield-
oriented and its own scope note excludes dashboards, data tables, and multi-step
product UI — it also explicitly targets landing pages and portfolios, which this is
only partly. Reach for `/taste-skill` when building something new, not when polishing
what's shipped.

## Guardrails the design skills must respect

The taste skills carry strong opinions and an "anti-default discipline" that will push
toward re-skinning. On this project that is **out of scope without a re-quote**. Hold
these fixed unless the client explicitly asks otherwise:

**Design tokens are locked** (defined at the top of `site/assets/css/site.css`):

| Token | Value | Role |
| --- | --- | --- |
| `--ink` | `#111A1C` | near-black slate |
| `--mandate` | `#0C6E62` | oasis teal — pictograms, links |
| `--signal` | `#E0A22B` | safety amber — primary actions |
| `--concrete` | `#E9E4D9` | desert sand surface |
| `--alert` | `#C0392B` | validation errors only |

Type: **Archivo** 600/800 display, **IBM Plex Sans** body, **IBM Plex Mono** for
markings, data, labels, buttons.

**Signature elements — do not remove or "modernise" away:**
1. **Gate board** — pictogram disc row on the home page; mimics mandatory-action
   signage at a site entrance.
2. **Marking strip** — hatched mono strip carrying each product's EN/ANSI/ATEX
   standards. Procurement buys by the standard, so the standard stays the loudest
   thing on the card.
3. **Datasheet layout** — full sheet with a specs table per product. A filter grid
   over five products reads as a failed launch.

**Architecture is fixed:** static multi-page HTML, no build step, no framework, no
dependencies. Netlify hosting, Netlify Forms for enquiries, `localStorage` key
`os.enquiry.v1` for the enquiry basket. Do not introduce a framework or a bundler to
satisfy a design suggestion.

**Enquiry flow, not checkout.** No prices in the catalogue; UAE B2B PPE runs on
quotations and POs. Do not add a payment gateway.

**Accessibility is a shipped feature, not a nice-to-have:** responsive to 360px,
keyboard focus rings, skip link, `prefers-reduced-motion` honoured, print stylesheet on
the enquiry page. Any motion work must keep the reduced-motion path — `taste-skill`
requires this above `MOTION_INTENSITY > 3` and so does this project.

**Scroll animations are a separately quoted add-on** (AED 1,500). Don't ship a motion
pass as incidental polish. One is already built and deliberately **disabled** — gated
behind a `motion` class on `<body>`, with `?motion=1` as a runtime demo toggle. Leave it
off unless the client commissions it; do not "helpfully" enable it by default.

**Surface texture is not photography.** `--hatch-dark` / `--hatch-light` and the ambient
washes on `.dark` / `.band` are token-derived depth. Background *photography* is a
separate AED 4,000–8,000 quote — don't add image assets to satisfy a design suggestion,
and don't reach for stock or `picsum.photos` placeholders.

**Product photography is data, not markup.** Set `photo` / `photoAlt` on a product in
`data.js`; `sheet()` falls back to the category pictogram when they're absent. Never
invent product imagery or specs.

## Tuning the dials

`taste-skill` and `gpt-tasteskill` open with three 1–10 dials — upstream defaults are
`DESIGN_VARIANCE: 8`, `MOTION_INTENSITY: 6`, `VISUAL_DENSITY: 4`. For Oasis Star, high
variance and heavy motion fight the trust-first, procurement-facing brief; lower
variance and motion if you invoke those skills here. Editing the dials in place is a
local divergence from upstream — note it in `README.md` if you do, so the re-sync step
doesn't silently revert it.

## Product data

Products live in `window.OS_PRODUCTS` (`site/assets/js/data.js`); categories in
`window.OS_CATEGORIES`, where `stocked: false` renders under "Available on request".
Entry shape is documented at the top of `data.js` and in `docs/project-handoff.md`.

Currently **four** documented lines: Petroking 3228, Petroking 3229, Roughneck 267
series, Smart-Ex 03 DZ1. The ecom Ex-Handy 10 DZ1 is discontinued for Oasis Star and was
removed — do not reintroduce it. Copy that says "five products" is stale; the datasheet
layout rationale still holds at four.

**Brand names are gated.** Whether Oasis Star is a formally authorised distributor for
Red Wing, ecom instruments, and Roughneck is unresolved. Do not publish those brand
names — or any expanded brand list — until that is confirmed. Product specs and model
names must trace to a manufacturer datasheet, not be inferred.
