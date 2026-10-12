# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Deník sráců** (deniksracu.cz) is a community-sourced map of quality public toilets in Prague. Users submit toilet entries via a web form; each submission becomes a JSON file in `_toilets/` and is merged via a GitHub PR workflow.

## Commands

```bash
# Install dependencies
yarn install

# Run dev server (also regenerates toilets bundle first)
yarn dev

# Build for production
yarn build

# Regenerate public/toilets/toilets-unsorted.json from _toilets/*.json only
yarn jsons2json

# Lint
yarn lint
```

The `dev` and `build` scripts always run `jsons2json` first. If you add or edit a toilet JSON file, run `yarn jsons2json` to reflect changes without restarting the dev server.

## Architecture

### Data pipeline

Toilet data lives as individual JSON files in `_toilets/` (one file per toilet, named by Unix timestamp). Before the Next.js build, `jsons2json.js` merges them all into `public/toilets/toilets-unsorted.json`. The frontend fetches this static JSON at runtime — there is no database or API for reads.

### Toilet data schema

Each `_toilets/<timestamp>.json` follows the `Toilet` class defined in `lib/toilet.js`:

| Field | Type | Notes |
|---|---|---|
| `latitude` / `longtitude` | string | GPS coords (note typo in field name) |
| `placeName` | string | Required |
| `toiletType` | string | One of the values in `components/toilet-types.js` |
| `wayDescription` | string | How to reach the toilet |
| `isClean`, `hasPaper`, `canLock`, `hasWater`, `isFree` | boolean | Rating flags |
| `bonusCategory` | string[] | Free-form tags |
| `comment` | string | Free-form text |
| `nickName` | string | Submitter nickname; empty string becomes `"Ghost"` |
| `timeStamp` | ISO date string | Set client-side at submission time |

### Submission flow

1. User fills the form at `/form` (`pages/form.js` → `components/form-body.js`)
2. On submit, `lib/toilet.js:Form2JSONToilet()` builds a `Toilet` object and either:
   - **Downloads** it as a JSON file (manual PR flow), or
   - **POSTs** it to `https://api.deniksracu.cz/` which triggers the **Rulička bot** (`rulicka-bot.yml`)
3. Rulička bot is a GitHub Actions workflow (`workflow_dispatch`) that writes the JSON into `_toilets/` and opens a PR with the label `toilet`

### Map

The homepage (`pages/index.js`) renders a full-screen Leaflet map using **react-leaflet** with **Mapy.cz** tiles. The map component is loaded client-side only (`dynamic(..., { ssr: false })`) because Leaflet requires `window`.

- `components/map.js` — MapContainer setup, tile layer, API key
- `components/map-toilets.js` — fetches `toilets-unsorted.json` and adds Leaflet markers with popups
- `components/map-srac-location.js` — user's current location dot
- `components/map-picker.js` — click-to-pick coordinates (passes lat/lng to `/form` via query params)

### Pages

| Route | Purpose |
|---|---|
| `/` | Full-screen toilet map |
| `/form` | Toilet submission form |
| `/hall` | Hall of Fame — ranks submitters by count (`lib/api.js:getData2HallOfShits`) |
| `/about` | About page |
| `/desatero` | "Ten commandments" of rating |

### Styling

Tailwind CSS (JIT mode, v2) with `@tailwindcss/forms`. Global styles in `styles/index.css`. Dark mode via `media` query.

### PWA

Configured via `next-pwa` in `next.config.js`. PWA is disabled in development (`NODE_ENV === 'development'`).

## GitHub Actions

| Workflow | Trigger | Purpose |
|---|---|---|
| `rulicka-bot.yml` | `workflow_dispatch` (called by `api.deniksracu.cz`) | Creates a `_toilets/<id>.json` file and opens a PR |
| `calibreapp-webp-optimizer.yml` | PR with image files | Compresses JPG/PNG/WebP |
| `eslint.yml` | Push/PR | Runs ESLint |
| `hadrik-bot.yml` | Push to `logo.png` | Resizes logo |

## Key Conventions

- The field name `longtitude` (with a typo) is intentional legacy — it is used in every toilet JSON and throughout the codebase; do not rename it.
- Toilet JSON filenames are Unix timestamps in milliseconds (matching the `timeStamp` field).
- The map uses raw Leaflet imperative API inside a react-leaflet `useMap()` hook in `map-toilets.js` — popup HTML is built as template strings, not JSX.
