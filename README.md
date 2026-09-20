# Offline AF Walkdown Builder

A 100% client-side Progressive Web App that replaces clipboards and messy spreadsheets for Aveva PI System Engineers walking the plant floor to build Asset Framework (AF) hierarchies.

## Why this exists

Walking a plant floor to map pumps, valves, motors, and instruments into a PI AF hierarchy usually means a clipboard, a half-broken Excel sheet, and no signal. This app is fully offline-capable, installs to your phone's home screen like a native app, and exports directly to a CSV formatted for **PI Builder** import — no backend, no API keys, no server, ever.

## Features

- **Visual Hierarchy Builder** — tree view of Plant → Unit → Asset structure
- **Oversized touch targets** — built for gloved hands on an iPhone in the field
- **Industrial dark mode** — high-contrast graphite UI for outdoor/low-light viewing
- **Offline-first PWA** — install to home screen, works with zero signal
- **Local persistence** — data survives app close via `localStorage`
- **One-tap CSV export** — generates a PI Builder-ready CSV client-side using `Blob`

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- `lucide-react` icons
- `vite-plugin-pwa`
- Zero backend, zero environment variables, zero external API calls

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment (GitHub Pages)

This repo includes `.github/workflows/deploy.yml`, which builds the app and deploys `dist/` to GitHub Pages automatically on every push to `main`. In your repo settings, set **Pages → Source → GitHub Actions**.

The Vite config is pinned to:

```js
base: '/Offline-AF-Walkdown-Builder/'
```

If you rename the repository, update this value to match.

## CSV Export Format

The export button produces a CSV with these PI Builder-standard columns:

| Parent | Name | Template | Manufacturer | SerialNumber | PLCTagPrefix |
|---|---|---|---|---|---|

Import this file directly into PI Builder's Excel Add-in template to populate your AF hierarchy.

## Data & Privacy

All walkdown data lives in your device's `localStorage`. Nothing is transmitted anywhere. Clearing your browser data will erase the walkdown — export to CSV regularly in the field.

## Icon Assets

Before your first deploy, add these files to `public/` (referenced by the manifest and `index.html`):

- `favicon.svg`
- `apple-touch-icon.png`
- `pwa-192x192.png`
- `pwa-512x512.png`

## License

MIT
