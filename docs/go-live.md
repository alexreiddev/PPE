# Go-live: test on Netlify, then serve on `oasisstargt.com`

The plan, as agreed: **Netlify hosts the site; the GoDaddy domain points at it.**
The client keeps the domain at GoDaddy and only the DNS records change. Don't upload
the files to GoDaddy hosting: both enquiry forms run on Netlify Forms, and the redirects
and security headers in `netlify.toml` only work on Netlify.

---

## 1. Deploy a test build

From the repo root, logged in to the Netlify account that will own the site:

```bash
netlify deploy --prod --dir site
```

`--dir site` publishes only `site/`. `docs/` (pricing positions, client research)
must never be served. When asked, create a new project, or link the existing
`oasis-star` one if it should be updated instead.

**Turn on form detection.** New Netlify projects ship with it off (the API reports
`forms: not enabled`). Go to *Project configuration → Forms → Enable form detection*,
then **redeploy**. Forms are only registered at deploy time, so a deploy made before
switching detection on won't capture submissions.

## 2. Test checklist (on the `*.netlify.app` URL)

- [ ] Every page loads: Home, Products, Certificates, About, Enquiry, Contact, and a
      made-up URL shows the 404 page
- [ ] `/catalogue`, `/enquiry`, `/certificates`, `/about` redirect correctly
- [ ] Products: add two lines with different sizes; the tally in the header updates
- [ ] Enquiry: submit with real test details; a reference like `OS-261029-AB12` appears
      → the submission shows under *Forms → product-enquiry* in Netlify
- [ ] Contact form: submit → shows under *Forms → general-enquiry*
- [ ] Set *Forms → Form notifications* to email the client's inbox. This needs the
      SPF/DKIM fix from [`email-authentication.md`](email-authentication.md) to land
      reliably
- [ ] WhatsApp: the floating button and a "Quote on WhatsApp" link each open a chat to
      +971 56 182 1086 with the message pre-filled (test on a phone)
- [ ] Certificates: "Certification details" on a product jumps to its register row
- [ ] Phone width (360px): no sideways scroll; menu opens; WhatsApp button doesn't cover
      the "Add to enquiry" button
- [ ] Keyboard: Tab from the top shows the skip link, then focus rings on every control
- [ ] Print the enquiry page: header, footer and buttons are hidden

**Still placeholders on the build:** email `sales@oasisstar.ae` (wrong domain), trade
licence, VAT TRN, address, and the brand names awaiting authorisation (see
`project-handoff.md`). Fix them before the domain switch, not after.

## 3. Point `oasisstargt.com` at the Netlify site

**In Netlify** (the project that passed testing): *Domain management → Add a domain* →
`oasisstargt.com`. Add `www.oasisstargt.com` too and set the bare domain as primary.

**In GoDaddy → My Products → oasisstargt.com → DNS → DNS Records:**

| Action | Type | Name | Value |
| --- | --- | --- | --- |
| Edit | A | `@` | `75.2.60.5` (Netlify's load balancer, replacing the Website Builder IP) |
| Edit | CNAME | `www` | `<project-name>.netlify.app` (the project that passed testing) |

**Leave everything else alone,** above all the mail records: MX, the SPF TXT, `_dmarc`,
the DKIM `selector1` / `selector2` CNAMEs and `autodiscover`. Also leave
`_domainconnect`, SOA and NS. Don't use GoDaddy's "Forward with masking", which breaks
SSL, SEO and the forms.

GoDaddy's Website Builder "Launching Soon" page stops showing once the A record changes.
The free plan can be ignored.

**Access:** use GoDaddy delegate access or a screen-share with the client. Never take
the password over chat or email. The password in the WhatsApp screenshot should be
treated as exposed and changed.

## 4. After the switch

- [ ] Wait for DNS (minutes to a few hours). Netlify then issues the SSL certificate on
      its own. Check *Domain management → HTTPS* shows it active
- [ ] `http://oasisstargt.com`, `https://www.oasisstargt.com` and the bare domain all
      end up on `https://oasisstargt.com`
- [ ] Re-run the form test on the live domain
- [ ] Send a test email from `info@`; Gmail "Show original" shows SPF/DKIM/DMARC PASS
- [ ] The second 50% invoice is due on the domain switch (per the handoff)
