# Lion Switch Website — Launch Checklist

This is the rebuilt Lion Switch marketing site (Next.js). Everything below needs
an answer or an action from the business owner before this goes live at
`lionswitch.com`.

## 1. Environment variables to set in production

None of these are required for the site to build or for visitors to browse it —
each feature degrades gracefully (logs a warning, shows a friendly error) if its
variables are missing. But the features won't actually work until these are set.

| Variable | Used for | Required for |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, JSON-LD | Should be `https://www.lionswitch.com` in production |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM` | Sending email | Contact form notifications, holiday preferences confirmation + notification emails |
| `NEWSLETTER_SHEET_WEBHOOK_URL` | Google Apps Script webhook URL | Footer newsletter signups being stored anywhere |
| `HOLIDAY_DASHBOARD_URL`, `HOLIDAY_INTAKE_SECRET` | The dashboard intake address (`https://<dashboard host>/api/intake/holiday-preferences`) and a shared random secret (set the same secret as `HOLIDAY_INTAKE_SECRET` on the dashboard service) | Website form submissions (holiday requests, call preferences, bill reviews, contact requests) arriving in the dashboard's **Admin → Website forms** inboxes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics | Analytics (only loads after a visitor accepts cookies) |

Full reference with comments: see `.env.example` in the repo root.

**Google Sheets webhook setup** (for the newsletter and holiday preferences forms):
this needs a small Google Apps Script (bound to a Google Sheet) that accepts a
POST of JSON and appends a row, deployed as a web app. If you don't already have
one of these, ask your developer to set it up — it's a few lines of Apps Script.

## 2. Content the owner needs to confirm before publishing

Every item below is marked `TODO(owner)` directly in the code it affects, so
nothing here is silently guessed — search the repo for `TODO(owner)` to find
the exact spot.

- **Support hours wording.** The old site used both "24/6 live support" and a
  separate mention of "24/7 emergency support for active customers." We kept
  both, scoped differently (24/6 as the general stat, 24/7 emergency as a
  contact-page-specific note) — please confirm this is the wording you want.
- **Contract/terms wording.** Per your instructions we never used "no
  contract(s)" or "no long-term contracts" anywhere — we used "white-glove
  service," "flexible terms" and "transparent pricing" instead. The FAQ answer
  about contracts is a placeholder ("Lion Switch offers white-glove service
  with flexible terms and transparent pricing") until you give us the real
  terms to describe.
- **Integration count mismatch.** The old Features page said "250+ CRM
  integrations"; the old homepage/hero stat bar said "50+ platforms." We kept
  both numbers in their original locations (250+ on `/features`, 50+ in the
  hero/stat bar) since they may be measuring different things, but please
  confirm both are accurate — right now they read as two different claims.
- **HIPAA compliance.** Mentioned nowhere as a confirmed claim. Both the
  homepage FAQ and the Live Dashboard page have a placeholder that explicitly
  says this needs your sign-off before publishing. Do not let anyone remove
  the TODO without legal confirming the exact wording.
- **Live Dashboard pricing/packaging.** The FAQ "Is it included with my phone
  service?" is a placeholder until you confirm pricing/packaging.
- **Privacy Policy legal review.** The policy was rebuilt structurally from
  the old site's sections plus the sections you asked for (cookies, analytics). **It has not been reviewed by a lawyer.** Please have
  counsel review before this goes live.
- ~~**Logo image.**~~ Resolved — found the real Lion Switch logo mark
  (`lionswitch-dashboard/public/email-logo.png`, already used in your
  transactional emails) and wired it into the header, favicon, structured
  data, and OG images (`public/lion-switch-logo.png`). It's 120x120px; if
  you have a larger/sharper source file, swap it in for better quality at
  large sizes, but it's not required.
- ~~**Walkthrough video.**~~ Resolved: the 60-second Live Dashboard video is on `/live-dashboard` (`public/videos/`), loading only when someone presses play.
- **Geo-coordinates.** The LocalBusiness structured data doesn't include a
  map pin (latitude/longitude) for the Brooklyn office. Low priority, but easy
  to add if you want it.

## 3. Login & Support links

These three links were provided during the rebuild and are live in the header
and footer today. Please double-check the **labels** we chose (you only gave
us the URLs):

- **Portal Login** → `https://portal.lionswitch.com/portal/`
- **Softphone Login** → the `auth.uc-technologies.com` SSO link
- **Billing Portal** → `https://lionswitch.billcenter.net/`

If the live site has any *other* Login & Support links beyond these three,
they need to be added — we were not able to crawl the live site from this
environment, so this list is exactly what was provided, nothing more.

## 4. DNS and cutover plan

This rebuild intentionally preserves every URL and anchor from the old site
(home, services, features + all its anchors, why-lion-switch, contact,
holiday-preferences, privacy-policy), plus the three new pages (`/mcp`,
`/live-dashboard`) and the Login & Support links. Because the URL structure
didn't change, **no redirect rules should be needed** — every old link
(bookmarks, Google's indexed pages, anything linking in from elsewhere)
should land on the equivalent new page automatically.

Suggested cutover sequence:

1. Deploy this app to your hosting provider (Vercel is the simplest fit for
   Next.js; Render/other Node hosts work too) on a staging URL first.
2. Set all the environment variables from Section 1 on that host.
3. Do a final click-through on staging: submit each form for real, confirm
   emails arrive, confirm the Sheets webhooks add rows.
4. Point `lionswitch.com` / `www.lionswitch.com` DNS (A/CNAME, per your host's
   instructions) at the new deployment.
5. Keep the old site/hosting available (don't delete it) for a week or two
   after cutover in case anything needs to be cross-checked.
6. After DNS propagates, spot-check a handful of the old site's most-linked
   pages in Google Search Console to confirm they resolve on the new site
   with a 200, and submit the new `/sitemap.xml` in Search Console.

## 5. What's already been verified

- Production build (`npm run build`) and lint are clean.
- Every page returns 200, has a unique title/meta description/canonical URL,
  exactly one `<h1>`, and valid JSON-LD.
- All 8 required anchors on `/features` exist (`#cloud-pbx`, `#connectuc-app`,
  `#unified-communications`, `#messaging-fax`, `#video`, `#call-center`,
  `#ai-features`, `#integrations`), plus `/contact#demo`.
- No "no contract(s)" / "no long-term contract" phrasing anywhere, and no
  live-transcription claims (calls are always described as transcribed
  *after* they end).
- Every form field has a properly associated label; the holiday preferences
  calendar is keyboard-navigable.
- Zero console/page errors across all 15 pages in automated browser checks
  (this caught and fixed a real infinite-render bug on the holiday
  preferences page before launch — see the git history for details).
- `robots.txt` allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended and
  standard search bots, disallows `/api/`, and references the sitemap.
  `llms.txt` describes the site for AI assistants.

## 6. What hasn't been verified (needs a human, or needs real credentials)

- Lighthouse/Core Web Vitals scores on a real production deployment (this was
  built and tested in a sandboxed environment without access to a public
  URL or Lighthouse itself).
- The actual email/Sheets integrations, since no SMTP credentials or webhook
  URLs were available in this environment — verify these for real on staging.
- A real accessibility audit with a screen reader (automated checks don't
  catch everything).
