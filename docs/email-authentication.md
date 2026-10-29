# Email authentication — `oasisstargt.com` (SPF / DKIM / DMARC)

Fix for mail from `info@oasisstargt.com` (Microsoft 365, sold through GoDaddy) landing in
recipients' spam/junk folders.

## Diagnosis (public DNS, checked 29 Oct 2026)

| Record | Name | Current value | Status |
| --- | --- | --- | --- |
| MX | `@` | `0 oasisstargt-com.mail.protection.outlook.com` | OK |
| SPF (TXT) | `@` | **none — no TXT records at the apex at all** | ❌ missing |
| DKIM (CNAME) | `selector1._domainkey` | **NXDOMAIN** | ❌ missing |
| DKIM (CNAME) | `selector2._domainkey` | **NXDOMAIN** | ❌ missing |
| DMARC (TXT) | `_dmarc` | `v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;` | present, strict |
| Autodiscover (CNAME) | `autodiscover` | **NXDOMAIN** | ⚠ missing (Outlook setup only) |

**Root cause:** the DMARC record (GoDaddy adds it by default) tells receivers to
*quarantine* — i.e. send to spam — any mail that passes neither SPF nor DKIM. With no SPF
record and DKIM never enabled, **every** message from `@oasisstargt.com` fails DMARC, so
Gmail, Outlook.com and corporate gateways are doing exactly what the domain asked them to.

Nameservers are GoDaddy (`ns07/ns08.domaincontrol.com`), so all edits below are made in
**GoDaddy → My Products → Domain → DNS → DNS Records**. The pending Netlify switch only
touches the `@` A record and `www` CNAME; it does not affect anything here.

---

## Step 1 — SPF (5 minutes, fixes most of the problem on its own)

Add **one** TXT record:

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| TXT | `@` | `v=spf1 include:spf.protection.outlook.com -all` | 1 hour |

This is Microsoft's own SPF for Microsoft 365 and authorises only Microsoft's outbound
servers — the only thing that sends as `@oasisstargt.com`.

> GoDaddy's one-click "Microsoft 365" record set may instead offer
> `v=spf1 include:secureserver.net -all`. That also works (verified: it chains via
> `spf-0.secureserver.net` to `spf.protection.outlook.com`), but it additionally
> authorises ~30 GoDaddy IP ranges the client doesn't use. Prefer the Microsoft value;
> don't add both.

Rules:
- **Only one** `v=spf1` TXT record may exist on `@`. Two records = SPF `permerror` = fail.
- If another service ever sends *as* `@oasisstargt.com` (a newsletter tool, a CRM, a
  website SMTP plugin), add its `include:` to this same record. Netlify Forms
  notifications are sent from Netlify's own domain, so Netlify needs **no** entry.
- `-all` (hard fail) is correct because Microsoft 365 is the only sender. Use `~all`
  only if a second sender exists that hasn't been added yet.

Because the DMARC record allows relaxed alignment (`aspf=r`), a passing SPF on mail sent
from Outlook / Microsoft 365 is enough to pass DMARC. Mail should stop going to spam
within about an hour of this record propagating.

---

## Step 2 — DKIM (15 minutes, makes it robust)

SPF breaks when mail is forwarded; DKIM survives forwarding and is what large receivers
weight most. Microsoft 365 signs with two rotating selectors that are published as
CNAMEs.

1. Sign in to the **Microsoft Defender portal** as the M365 admin:
   <https://security.microsoft.com/authentication?viewid=DKIM>
   (Email & collaboration → Policies & rules → Threat policies → Email authentication
   settings → **DKIM** tab). GoDaddy-sold tenants: sign in with `info@oasisstargt.com`;
   if access is refused, GoDaddy's "Email & Office Dashboard" → *Advanced* → *Microsoft
   365 Admin* grants it.
2. Click `oasisstargt.com`. The flyout shows **two CNAME records**. Copy them exactly —
   the target contains the tenant's internal name (GoDaddy tenants look like
   `NETORGxxxxxxx.onmicrosoft.com`; newer tenants use a `….dkim.mail.microsoft` target),
   which is not visible from outside and must not be guessed.
3. Add both to GoDaddy DNS:

   | Type | Name | Value (copy from Defender) | TTL |
   | --- | --- | --- | --- |
   | CNAME | `selector1._domainkey` | `selector1-oasisstargt-com._domainkey.<tenant>…` | 1 hour |
   | CNAME | `selector2._domainkey` | `selector2-oasisstargt-com._domainkey.<tenant>…` | 1 hour |

   In GoDaddy, the Name field is just `selector1._domainkey` — GoDaddy appends the
   domain itself. Don't paste a trailing `.oasisstargt.com`.
4. Wait for propagation (often 10–30 min), go back to the Defender DKIM page and switch
   **"Sign messages for this domain with DKIM signatures"** to **Enabled**. If it says the
   CNAMEs can't be found, wait and retry — that's propagation, not an error.

---

## Step 3 — DMARC (leave as is)

The existing record is fine once SPF and DKIM pass:

```
v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;
```

Don't delete it — removing DMARC makes the domain *easier* to spoof and Gmail/Yahoo
require one for bulk senders. Don't relax it to `p=none` either; the fix is to pass it,
not to switch it off. Reports go to GoDaddy's collector (`onsecureserver.net`). If the
client wants to read the reports themselves, add their own address:
`rua=mailto:dmarc_rua@onsecureserver.net,mailto:info@oasisstargt.com`.

---

## Step 4 — Autodiscover (optional, for Outlook app setup)

Not a spam fix, but missing today and it's what lets Outlook desktop/mobile configure
the mailbox from just the address:

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| CNAME | `autodiscover` | `autodiscover.outlook.com` | 1 hour |

---

## Verify

1. **Record check** — after an hour, look up the records:
   - <https://mxtoolbox.com/SuperTool.aspx?action=spf%3aoasisstargt.com>
   - <https://mxtoolbox.com/SuperTool.aspx?action=dmarc%3aoasisstargt.com>
   - <https://mxtoolbox.com/SuperTool.aspx?action=dkim%3aoasisstargt.com%3aselector1>
2. **End-to-end** — from `info@oasisstargt.com`, send a normal-looking email to a personal
   Gmail address. In Gmail: ⋮ → **Show original**. All three must read `PASS`:
   `SPF: PASS`, `DKIM: PASS with domain oasisstargt.com`, `DMARC: PASS`.
   Alternatively send to the address shown at <https://www.mail-tester.com> for a score.
3. Ask one or two recipients who previously got spam to mark the new message **Not spam**
   — existing per-recipient filters can lag the DNS fix by a few days.

## If mail still lands in spam after all three pass

Authentication is then no longer the reason. Common remaining causes for a brand-new
domain: low sending reputation (the domain is new — volume builds trust over weeks),
image-only or link-heavy messages, URL shorteners, a signature linking to a domain that
isn't live yet (the site is still on the GoDaddy "coming soon" page until the Netlify DNS
switch), or the recipient's own gateway rules.

---

## Records to keep through the Netlify DNS switch

When doing the `@` A-record / `www` CNAME change in
[`project-handoff.md`](project-handoff.md#dns-switch-still-pending), leave all of these
untouched: MX, SPF TXT, `_dmarc` TXT, `selector1._domainkey` / `selector2._domainkey`
CNAMEs, `autodiscover` CNAME, `_domainconnect` CNAME, SOA, NS. If the domain is ever
delegated to Netlify DNS instead, every one of these must be recreated there **before**
the nameservers change, or mail breaks.
