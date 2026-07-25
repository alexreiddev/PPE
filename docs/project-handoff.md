# Oasis Star Website — Project Handoff

*Paste this whole document at the start of a new chat as project context. It captures decisions already made, what's built, what's paid for, what's outstanding, and the pricing and meeting positions I've committed to with the client. Don't re-litigate settled decisions unless the client changes something specific.*

---

## Updates since this handoff was written

The body below is preserved as written. These points supersede it:

- **Site source is now in this repo** at [`site/`](../site/), no longer only
  `/mnt/user-data/outputs/oasis-star/` as a zip. `netlify.toml` moved to the repo root
  with `publish = "site"`, so `docs/` and `CLAUDE.md` are never served.
- **ecom Ex-Handy 10 DZ1 is discontinued for Oasis Star** and has been removed from
  `site/assets/js/data.js`. The catalogue is now **four** documented lines, not five.
  Copy referring to five products has been updated throughout.
- **Design skills added** at `.claude/skills/` (Leon Lin's Taste Skill, 13 skills). See
  [`../CLAUDE.md`](../CLAUDE.md) for which to use and the guardrails they must respect.
- **An expanded product list has been proposed** but is unverified — see
  [`catalogue-expansion-draft.md`](catalogue-expansion-draft.md). It adds Ansell, ATG,
  Reebok, and Taedylyn, which widens the unresolved distributor-authorisation question
  from three brands to seven.
- **A design pass has run against the CEO's four pre-meeting requests.** What changed and
  what deliberately did not:
  - *Logo/name prominence* — masthead lockup rebuilt: hierarchy inverted so the company
    name leads (it previously sat *below* "General Trading · UAE"), name 19px → 23px, mark
    22px → 34px, masthead 66px → 74px. `.brand__mark` in the markup is the single
    drop-in point for her logo file when it arrives. **AED 2,500 logo design still open.**
  - *Product images* — no imagery invented. The slot is wired instead: set `photo` /
    `photoAlt` in `data.js` and the datasheet swaps the pictogram for the photograph.
    Adding photos is now a data edit, not a code edit.
  - *Background imagery* — token-derived hatch and ambient wash only, no photographs.
    **AED 4,000–8,000 photography shoot deliberately untouched and still sellable.**
  - *Scroll animations* — full pass built but **shipped disabled**. Demo with `?motion=1`
    on any URL. **AED 1,500 add-on intact.**
  - Also fixed: stale "Zone 1 certified handhelds" copy in 9 places, missing `og:image` on
    all pages (a branded 1200×630 card is now at `site/assets/og-card.png`), and two
    leftover blue values that predated the teal palette.
- **The design-system notes below are slightly out of date**: `.card__photo` does not
  exist in the CSS — only `.sheet__photo` does, and it is now driven by the `photo` field
  rather than needing a manual template edit.

---

## Quick context

I'm building a PPE catalogue and enquiry site for a UAE safety equipment supplier. The site is **live in preview** at `oasis-star.netlify.app` but not yet pointed at the client's real domain. Working through go-live steps and a big meeting with the CEO tomorrow.

**The freelancer's identity:** I work under "Alex Reid" for client-facing purposes (Upwork/Fiverr/GitHub `alexreiddev`).

---

## The client

**Company:** Oasis Star General Trading
**Sector:** Personal protective equipment supply, UAE construction sector (positioning per their About text), though their actual products lean oil & gas / hazardous area
**Tagline:** "Your Safety, Our Priority"
**Domain owned:** `oasisstargt.com` (alternatives `oasisstar.ae` / `oasisstarsafety.com` were not available)

**Products they've documented (from their 2025 PDF catalogue):**
- Red Wing Petroking 3228 boot — 6-inch, EU 35–48
- Red Wing Petroking 3229 boot — 8-inch, EU 35–48
- Roughneck TefLoc Palm Ringers glove — XS to 4XL with real part codes 267-07 through 267-14
- ecom instruments Ex-Handy 10 DZ1 — Zone 1 handheld
- ecom instruments Smart-Ex 03 DZ1 — Zone 1/21 smartphone

**Products claimed in their profile but not detailed:** helmets, eye and face, coveralls and reflective vests. Currently in "Available on request" section.

**Known open question:** whether they are formally authorised distributors for Red Wing, ecom, and Roughneck. Needs to be answered before those brand names go public.

---

## Current state

- **Site built and live:** `oasis-star.netlify.app`
- **Domain:** `oasisstargt.com` owned via GoDaddy, DNS not yet switched to Netlify
- **Email:** live on `info@oasisstargt.com` via Microsoft 365 (assigned)
- **Second unused mailbox** sitting on the account — Microsoft 365 Email Essentials, not yet assigned to any address
- **Site source files:** in `/mnt/user-data/outputs/oasis-star/` (packaged as `oasis-star.zip`)

---

## Site architecture

- **Static multi-page HTML** — no build step, no framework, no dependencies
- **Netlify hosting** on free tier (adequate for this site's size)
- **Netlify Forms** for enquiry and contact submissions (no backend needed)
- **`localStorage`** persists the enquiry basket across sessions on the visitor's device
- **Responsive to 360px**, keyboard focus rings, skip link, `prefers-reduced-motion` respected, print stylesheet on enquiry page

**Pages:**
- `index.html` — hero, category board, about, "how enquiries work"
- `products.html` — five product datasheets, filter chips, "available on request" section
- `enquiry.html` — enquiry list with size selection, form
- `contact.html` — general enquiry form, company details
- `404.html` — Netlify serves this automatically

**Assets:**
- `assets/css/site.css` — all styling, design tokens at top
- `assets/js/data.js` — catalogue data
- `assets/js/icons.js` — pictogram SVG sprite
- `assets/js/app.js` — enquiry storage, sheet rendering, form handling
- `favicon.svg`
- `netlify.toml` — publish dir, security headers, asset caching, friendly URL redirects
- `robots.txt`

---

## Data model

Products live in `window.OS_PRODUCTS` in `data.js`. Each entry:

```js
{
  id: 'rw-3228',
  brand: 'Red Wing',
  model: '3228',
  cat: 'foot',              // matches an OS_CATEGORIES id
  name: 'Petroking 6-inch boot',
  origin: 'Made in Italy',
  lede: '…',                // one-paragraph description
  specs: [['Upper', 'Waterproof Nubuck leather'], …],
  standards: ['EN ISO 20345', 'ASTM F2413', 'EH', 'PR', 'SR'],
  sizes: {                  // or null for products without sizes
    label: 'Size',
    options: [
      { value: '42', label: 'EU 42' },
      // gloves also carry a `code` per size:
      { value: 'M', label: 'M', code: '267-09' }
    ]
  }
}
```

Categories live in `window.OS_CATEGORIES`. Each entry has an `id`, an `icon` (pictogram id), a `label`, a `note`, and `stocked: true|false`. Categories with `stocked: false` render under "Available on request" instead of the main product list.

**Enquiry storage key:** `os.enquiry.v1` in `localStorage`. In-memory fallback exists when storage is blocked.

---

## Design system

**Palette:**
- `--ink: #111A1C` — near-black slate
- `--mandate: #0C6E62` — oasis teal, used for pictograms and links
- `--signal: #E0A22B` — safety amber, primary action buttons
- `--concrete: #E9E4D9` — desert sand surface
- `--alert: #C0392B` — validation errors only

**Type:**
- Archivo 600/800 for display headings
- IBM Plex Sans for body
- IBM Plex Mono for markings, data, labels, buttons

**Signature elements — don't remove without reason:**
1. **Gate board** — the row of blue pictogram discs on the home page. Mimics mandatory-action signage a crew reads at a site entrance.
2. **Marking strip** — every product carries its EN/ANSI/ATEX standards in a hatched mono strip. Mimics the compliance stamp on real PPE. Procurement buys by the standard, so the standard is the loudest thing on the card.
3. **Datasheet layout** — five products in a filter grid would look empty. Each product gets a full sheet with a specs table.

**Image slots** exist in CSS (`.card__photo`, `.sheet__photo`) — swap `.sheet__sign` in `sheet()` in `app.js` for `<img class="sheet__photo" src="…" alt="…">` when product photography is licensed.

---

## Key architectural decisions (settled — do not re-litigate)

**Enquiry flow, not checkout.** The catalogue has no prices, and B2B PPE in the UAE runs on quotations and purchase orders on Net 30. Adding a payment gateway would cost AED 8–15k plus 2.5–3% forever per transaction, take 2–4 weeks for provider approval, and target the wrong buyer. Recommended against unless the client presents concrete customer requests to pay online.

**Sizes carry the weight prices usually would.** Each size is its own enquiry line. Adding the 3228 in EU 42 and EU 44 gives two lines, which is how the quotation will be written anyway.

**Datasheet layout, not product grid.** Only five documented products — a filter grid over five items would look like a failed launch.

**No product photography currently.** Placeholder pictograms only. Real photos are the single highest-impact visual change available and should come from manufacturer distributor portals if authorisation exists.

**GoDaddy stays as domain registrar, Netlify does the hosting.** Do not migrate to GoDaddy hosting — the enquiry forms depend on Netlify Forms. Do not use GoDaddy's "Forward with masking" — it breaks SSL, SEO, and forms.

---

## GoDaddy account state

**Owned/paid, keep:**
- Domain `oasisstargt.com` with Full Domain Protection (renews 26 Jun 2029)
- SSL active on the domain
- Microsoft 365 Email Plus with Security — assigned to `info@oasisstargt.com`
- Nameservers: default GoDaddy (`ns07/ns08.domaincontrol.com`) — not delegated

**Owned but action needed:**
- Second Microsoft 365 Email Essentials seat — unassigned. Recommendation: assign as `sales@oasisstargt.com` (needed by the site) or cancel before renewal.
- Websites + Marketing Free plan — this is the current "coming soon" placeholder page. Becomes irrelevant once DNS switches to Netlify. Free, so ignore rather than cancel.

**Do not start:**
- Managed WordPress Hosting free trial — irrelevant to this build.

**Actively decline:**
- "Upgrade to Ultimate Domain Protection" ($32.99/year) — current Full Protection covers everything real.
- Any "buy another domain" upsell.

**Turn on (free):**
- 2-Step Verification on the GoDaddy account
- DNSSEC (5 free credits available, one-click)

**GoDaddy account issues currently flagged:**
- "Activate the email you purchased" — incomplete
- Unverified Email Senders notice — 6 emails from outlook.com, unreviewed
- Billing validation prompt on Email Plus plan

---

## DNS switch (still pending)

To point `oasisstargt.com` at the Netlify site:

**In GoDaddy → DNS Management:**
1. Edit the existing `A` record for `@` — change from GoDaddy WebsiteBuilder IP to Netlify load balancer: `75.2.60.5`
2. Edit the `CNAME` record for `www` — change from self-pointing to `oasis-star.netlify.app`
3. **Leave alone:** MX records (Microsoft 365 email), DMARC TXT, `_domainconnect` CNAME, SOA, NS records

**In Netlify → Domain management:**
1. Add custom domain `oasisstargt.com`
2. Netlify auto-issues SSL once DNS propagates (20 min to a few hours)
3. Add `www.oasisstargt.com` and set the bare domain as primary

**Access approach:** Delegate access on GoDaddy account, or client screen-shares while I make the change. Do not accept their password over email.

---

## Placeholders to replace before launch

- Phone number (currently `+971 0 000 0000`)
- Physical address (currently "To be confirmed")
- Trade licence, VAT registration, distributor authorisation numbers in footer
- Email address — decide between using `info@oasisstargt.com` as-is or setting up `sales@oasisstargt.com` on the second mailbox
- Update all placeholder references (currently reference `sales@oasisstar.ae` which is the wrong domain)
- Confirm authorised distributor status for Red Wing, ecom instruments, Roughneck before those brand names go live

---

## Pricing positions I've committed to

**Build (one-off):** AED 8,500 anchor, hold firm above AED 7,500, do not go below AED 6,500
- Includes: everything delivered, one round of revisions, deployment, 30 days of post-launch bug fixes
- Payment: 50% now, 50% on domain switch. Do not accept "pay after live."

**Maintenance retainer:**

| Tier | Monthly | Annual | Included |
|---|---|---|---|
| Care | AED 500 | AED 5,000 | Security updates, monitoring, minor edits under 30 min/month |
| Care+ | AED 900 | AED 9,000 | Care + one design tweak/month + priority + up to 3 product additions/month |

Ad-hoc rate for out-of-scope: AED 250/hour.
Response times in contract: 48 hours non-urgent, same-day for site-down.

**Add-ons quoted:**

| Item | Price | Notes |
|---|---|---|
| Product management dashboard (Decap CMS) | AED 3,500 one-off | Strong recommendation — no ongoing fees |
| Off-site SEO bundle | AED 3,500 one-off + AED 500/mo optional | Google Business Profile, UAE directory listings, distributor page submissions, review generation setup |
| Arabic version of site | AED 8,000 one-off | Phase two — decide after 4 weeks of enquiries |
| Guides section + 3 articles | AED 4,500 | Phase three — skip until 6+ months in |
| Logo design (if needed) | AED 2,500 | Only if she doesn't already have one |
| Background photography shoot | AED 4,000–8,000 | On-site photographer, half-day |
| Scroll animations pass | AED 1,500 | Optional polish |

**Bundled offer to make in the meeting:** Build + Product Dashboard + Off-site SEO for **AED 14,500 all-in** (saves AED 1,000), with Care+ retainer at AED 9,000 annual.

---

## Tomorrow's meeting

**Format:** Face-to-face with company owner.

**Pre-meeting design requests already flagged by the CEO:**
- More prominent logo and company name treatment
- Real product images
- Background imagery
- Scroll animations

**In-scope for included revision round:**
- Logo integration if she supplies file
- Product image swap if manufacturer assets available
- Small copy/layout changes

**Out of scope (separate quote):**
- Logo design if none exists
- Full background photography treatment
- Scroll animations pass

**Direction-check question to ask directly:** "Between us — is the current design in the right direction and we're just polishing, or did you want a different overall feel?" If she says re-skin, stop and re-quote.

**Meeting flow:**
1. Site handover and demo (5 min)
2. What's built vs what needs her input (5 min)
3. GoDaddy housekeeping walkthrough (5 min)
4. Domain switch scheduling (2 min)
5. Money — build price and retainer (10 min)
6. Add-ons pitch, ordered by recommendation strength (15 min)
7. Bundle offer and close

**Walk out with:**
- Build price agreed and 50% invoiced
- Retainer tier chosen
- Yes/no on CMS, off-site SEO, Arabic
- Direction check answered
- Logo file promised (or logo design commissioned)
- Manufacturer imagery chase committed to by client
- Trade licence, VAT, distributor authorisation confirmed
- Email address decision (info@ or sales@)
- Real phone number and address
- Go-live date

---

## Pushback the client is likely to try, and how to hold

- **"Can we get it cheaper?"** — Hold at AED 7,500 minimum on build. Bundle on add-ons if needed, don't discount line items.
- **"Do we really need SEO?"** — Reframe: "How do your customers find you today? If it's word of mouth, this replaces the word of mouth you don't get."
- **"Can we skip the retainer?"** — Yes, but at AED 250/hour ad-hoc vs AED 500/month covered. Make the retainer the cheaper path for anything more than 2 hours a month.
- **"Can we add credit card checkout?"** — Ask her first: "Have any actual customers asked to pay online?" If no, don't build it. If yes, then AED 8–15k rebuild with 2.5–3% ongoing fee.

---

## SEO strategy summary

Domain is fixed as `oasisstargt.com`. Strategy compensates for a weak domain by leaning on:

1. **Google Business Profile** — highest single priority for UAE local B2B
2. **Manufacturer distributor page listings** (Red Wing, ecom, Roughneck) — best backlinks available
3. **UAE directories** — Etisalat, Dubizzle Business, UAE Chamber, Yello, UAE Yellow Pages
4. **Own the full company name** everywhere (business cards, LinkedIn, signatures) — helps because people will search "Oasis Star General Trading" rather than remember the URL
5. **Visual URL styling** — write it as `OasisStarGT.com` (capitalised GT) on all marketing so it reads as an abbreviation
6. **Grab misspelling redirects** if any short cheap variants are available
7. **Structured data + Search Console + sitemap** — folded into build/CMS work
8. **Arabic version** — phase two, real market gap
9. **Guides content** — phase three, long-term traffic play

**Actively skip:** paid SEO tools at this stage, "SEO packages" from Dubai agencies (typically low-quality backlink networks), chasing keyword rankings before Google Business Profile is set up.

---

## Immediate next steps

1. **Meeting tomorrow** — close on build price, retainer, and at least one add-on
2. **After meeting** — invoice 50%, chase manufacturer imagery, get real contact details
3. **Once imagery arrives** — swap `.sheet__sign` blocks for `<img class="sheet__photo">` in `app.js`
4. **Once contact details confirmed** — replace all placeholder addresses/phones/emails
5. **Once distributor auth confirmed** — go/no-go on brand names being public
6. **Domain switch** — 20 min of DNS work with client delegate access
7. **Post-launch** — Google Business Profile setup, then directory listings, then Decap CMS if commissioned

---

## Things to remember about the freelance context

- **Take 50% upfront on cross-border work** — chasing UAE payment from India is painful
- **Write revision limits into the quote** — "two rounds, one on structure and one on polish"
- **Never accept the client's raw GoDaddy/Netlify password** — always use delegate/collaborator access
- **This work took an afternoon with AI assistance, but that's irrelevant to pricing** — price on the value delivered, not the hours spent
- **The client's own placeholder trade licence details, phone numbers, and distributor confirmations are their deliverables, not mine** — contract should be explicit about this so a delayed launch isn't blamed on the developer

---

## Files needed for a new chat

If picking this up in a new conversation, ask for:
- Latest version of `oasis-star.zip` (or the exploded folder)
- Any new screenshots from GoDaddy if account state has changed
- Manufacturer imagery if received
- Client's logo file if received
- Meeting outcome notes if the tomorrow meeting has happened

---

*Last updated: end of pre-meeting prep. Post-meeting, update this document with the decisions the client made and which add-ons they commissioned.*
