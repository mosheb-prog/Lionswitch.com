# Lion Switch — Marketing Website

The Lion Switch marketing site, rebuilt on Next.js (App Router) + TypeScript +
Tailwind CSS 4. This is the public marketing site only — it does not include
the customer-facing live call dashboard app (that lives in a separate repo).

See [`LAUNCH_CHECKLIST.md`](./LAUNCH_CHECKLIST.md) for what the business owner
needs to confirm or set up before this goes live.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values — see .env.example for what each does
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # eslint
```

## Project structure

- `src/app/` — pages and API routes (Next.js App Router)
- `src/components/` — UI, grouped by the page/feature they belong to
  (`home/`, `features/`, `contact/`, `holiday-preferences/`, `voice-demo/`,
  `live-dashboard/`, `layout/`, `ui/`)
- `src/lib/` — shared logic: company facts & nav (`constants.ts`), JSON-LD
  builders (`schema.tsx`), SEO metadata helper (`metadata.ts`), OG image
  generator (`og.tsx`), email (`email.ts`), Google Sheets webhook poster
  (`sheets.ts`), rate limiting (`rate-limit.ts`), cookie consent
  (`consent.ts`), Jewish/US holiday date computation (`jewish-holidays.ts`,
  `us-holidays.ts`), voice-demo transcription/Claude helpers
  (`transcription.ts`, `claude.ts`)

## Design tokens

Colors, fonts and the "one orange highlight, one dark card" visual language
are carried over as-is from the existing Lion Switch dashboard app's
`public/style.css`, not reinvented — see the comment at the top of
`src/app/globals.css`. If the brand palette ever changes, update the
`:root` custom properties there; everything else references them by name
(`bg-ink`, `text-orange`, `bg-soft`, etc.) rather than hard-coded hex values.

## Notes for future changes

- Every heading on a dark section relies on the `.text-on-dark`/`.bg-ink`
  rules in `globals.css` to get the right color — see the comment there
  before changing how headings get their color.
- Anything reading `new Date()` (or similar non-deterministic values) in a
  component that renders on the server needs to defer that read to the
  client (see `CookieBanner`/`AnalyticsGate` for the `useSyncExternalStore`
  pattern used here, and the comment in `HolidayPreferencesForm` about why
  `getSnapshot` must return a stable reference).
- This project runs on Next.js 16 with Cache Components + Partial
  Prefetching enabled (`next.config.ts`). If something you'd expect to be
  static builds as dynamic/partial instead, check the build output's route
  table and `node_modules/next/dist/docs/01-app/guides/caching-without-cache-components*`.
