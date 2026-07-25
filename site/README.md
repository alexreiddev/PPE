# Oasis Star General Trading — safety equipment site

Static catalogue and enquiry site built from the client's 2025 product catalogue. No build step, no dependencies, no framework.

## Deploy to Netlify

**Drag and drop** — go to app.netlify.com and drop this folder onto the deploy area.

**From Git** — push and connect. `netlify.toml` lives at the **repository root**, one
level above this folder, and sets `publish = "site"` with no build command. The publish
dir is scoped to `site/` deliberately: `docs/` and `CLAUDE.md` at the repo root are
internal and must not be served.

**CLI** — `npx netlify-cli deploy --prod --dir site` from the repository root.

## Forms

Both forms use Netlify Forms. No backend, no third-party service.

| Form | Name |
|---|---|
| Product enquiry (with size breakdown) | `product-enquiry` |
| General enquiry | `general-enquiry` |

Turn on **Forms → Form notifications** after the first deploy, or submissions collect silently in the dashboard.

Submissions post over `fetch`, so the visitor stays on the page and gets a reference number. If the request fails the page says so and offers a mailto and copy button rather than pretending it sent.

## What is in the catalogue

Four documented lines, taken from the client's PDF:

- Red Wing Petroking 3228, 6-inch — EU 35–48
- Red Wing Petroking 3229, 8-inch — EU 35–48
- Roughneck TefLoc Palm Ringers glove — XS to 4XL, with the 267-07 to 267-14 part codes
- ecom Smart-Ex 03 DZ1 — Zone 1/21 smartphone

The ecom Ex-Handy 10 DZ1 was the fifth line in the 2025 PDF, but it is **discontinued
for Oasis Star** and has been removed from the catalogue.

Three further categories from the client's company profile — head protection, eye and face, body protection — appear under **Available on request**, since the catalogue names them but gives no product detail. When the client supplies specs, move them into `OS_PRODUCTS` in `data.js` and flip `stocked: true` on the category.

## Design decisions

**No prices anywhere.** The catalogue has none, and quoting on request is normal for UAE trading. The basket is an enquiry list, not a cart.

**Sizes carry the weight price usually would.** A size breakdown is what a supplier actually needs to quote a PPE order, so each size is its own line. Adding the same boot in EU 42 and EU 44 gives two lines, which is how the quotation will be written anyway.

**Datasheet layout, not a product grid.** Four products in a filterable grid would look empty. Each line gets a full sheet with its spec table and certification strip.

**No product photography yet, but the slot is wired.** Lines without a photo fall back to
the category pictogram, so they still look deliberate. To add imagery, set `photo` and
`photoAlt` on the product in `data.js` — no template changes, `sheet()` picks it up:

```js
photo:    'assets/img/rw-3228.jpg',
photoAlt: 'Red Wing Petroking 3228 six-inch boot, side view'
```

Manufacturer imagery for Red Wing, ecom and Roughneck is normally available to authorised
distributors and will make a real difference here, because buyers recognise these brands.

**Scroll animations are built but disabled.** They are a separately quoted add-on, so the
default build is completely static — no reveal classes applied, no observer running. To
turn them on:

- **permanently** — add `class="motion"` to `<body>`
- **for a demo** — append `?motion=1` to any URL, no file editing needed

Styling sits at the end of `site.css`; `initReveal()` in `app.js` drives it with an
`IntersectionObserver`, animating only `transform` and `opacity`. Reduced-motion visitors
never see motion even with the flag on — the observer refuses to start and the CSS holds
everything at rest.

**Surface texture, not photography.** Dark and banded sections carry a faint hatch and a
soft ambient wash derived from the palette tokens (`--hatch-dark` / `--hatch-light`). This
is deliberately *not* the background photography treatment, which is separate work.

## Placeholders to replace before launch

1. **Address, phone and email.** Currently `+971 0 000 0000` and `sales@oasisstar.ae`, both invented. They appear in the footer of every page and on the contact page.
2. **Trade licence, VAT registration and distributor authorisations** on the contact page.
3. Confirm the client is an authorised distributor for Red Wing, ecom instruments and Roughneck before the brand names go live — those are trademarks, and distributors usually have brand-usage terms.
4. Add a `sitemap.xml` and uncomment the line in `robots.txt`.
5. **`og:image` and `canonical` point at `https://oasisstargt.com`** — correct from the
   moment DNS switches, but they will not resolve while the site is only on
   `oasis-star.netlify.app`. Social previews shared from the preview URL will show no
   image until the domain is live. Nothing to change at launch; just don't be surprised
   by it beforehand.

## One thing worth raising with the client

The company profile sells to the construction sector, but Petroking boots and the Smart-Ex 03 DZ1 are oil and gas / hazardous-area equipment — a different buyer with a different budget. The site currently leads with construction, per their own copy, and gives the hazardous-area devices their own category. If the real revenue is oil and gas, the hero and About text should be rewritten to match.

## Files

```
index.html      Hero, category board, about, how enquiries work
products.html   Four product sheets, category chips, available-on-request
enquiry.html    Enquiry list with sizes, quantities, submission form
contact.html    General enquiry form and company details
404.html        Netlify serves this automatically
assets/css/site.css   All styling. Design tokens at the top.
assets/js/data.js     Catalogue data — four products, six categories
assets/js/icons.js    Pictogram sprite
assets/js/app.js      Enquiry storage, product sheets, form handling
```

`netlify.toml` sits at the repository root, one level up — publish dir, security
headers, asset caching, friendly URLs.

Responsive to 360px, keyboard focus rings, skip link, reduced-motion respected, print stylesheet. Enquiry list persists in `localStorage` under `os.enquiry.v1` with an in-memory fallback.
