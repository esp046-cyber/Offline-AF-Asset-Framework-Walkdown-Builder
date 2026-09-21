
<div align="center">
<img src="IMG_5195.jpeg" alt="App Interface Preview" width="100%" style="border-radius: 12px;" />

  <br />
  <h1>👷‍♂️ Offline AF Walkdown Builder</h1>
  <p><strong>A 100% client-side Progressive Web App (PWA) that replaces clipboards and messy spreadsheets for Aveva PI System Engineers.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Vite_PWA-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite PWA" />
    <img src="https://img.shields.io/badge/100%25_Offline-10B981?style=for-the-badge&logo=offline&logoColor=white" alt="Offline First" />
  </p>
</div>

---

## 🏭 Why this exists

Walking a plant floor to map pumps, valves, motors, and instruments into a PI Asset Framework (AF) hierarchy usually means relying on a clipboard, a fragile Excel sheet, and dealing with dead Wi-Fi zones. 

This application eliminates that friction. It is **fully offline-capable**, installs directly to your iPhone's home screen like a native app, and exports a pre-formatted CSV ready for direct **PI Builder** injection. 

> **Zero backend. Zero API keys. Zero servers.**

<br />

## ✨ Field-Optimized Features

| 🌳 Hierarchy Construction | 📱 Industrial UX | 📴 Zero-Signal Reliability |
| :--- | :--- | :--- |
| **Visual Hierarchy Builder:** Construct dynamic Plant → Unit → Asset structures on the fly. | **Glove-Friendly:** Oversized touch targets optimized for one-handed iPhone use. | **Offline-First PWA:** Installs to the home screen and functions flawlessly in dead zones. |
| **One-Tap CSV Export:** Generates PI Builder-ready CSV files natively in the browser via `Blob`. | **Dark Mode Design:** High-contrast graphite UI prevents eye fatigue in low-light environments. | **Persistent Memory:** Walkdown data survives app closures using persistent `localStorage`. |

<br />

## 🛠️ Tech Stack

- **React 18 + Vite** — High-performance client-side rendering.
- **Tailwind CSS** — Utility-first styling for industrial UI components.
- **`lucide-react`** — Clean, scalable SVG icons.
- **`vite-plugin-pwa`** — Service worker generation and manifest injection.

<br />

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start the local dev server
npm run dev

```

### Production Build & Preview

```bash
npm run build
npm run preview

```

## 🌍 Deployment (GitHub Pages)

This repository includes a `.github/workflows/deploy.yml` workflow that automatically builds and deploys the `dist/` directory to GitHub Pages on every push to `main`.

**Setup Instructions:**

1. Navigate to **Settings → Pages** in your GitHub repository.
2. Set the **Source** dropdown to **GitHub Actions**.
3. **Critical Path Check:** Ensure your Vite configuration matches your repository name to prevent 404 errors.

```javascript
// vite.config.js
export default defineConfig({
  base: '/Offline-AF-Walkdown-Builder/', // Must match your repo name exactly
  // ...
})

```

## 📊 CSV Export Format

The export utility strictly adheres to the Aveva PI Builder add-in format. The generated CSV will automatically structure the following columns:

| Parent | Name | Template | Manufacturer | SerialNumber | PLCTagPrefix |
| --- | --- | --- | --- | --- | --- |
| Plant\Unit1 | P-101 | Pump | Grundfos | SN-88213 | PLC.P_101 |

*Simply open the generated file and import it directly into your PI Builder Excel Add-in.*

## 🔒 Data & Privacy Security

**This app is structurally incapable of leaking data.** All walkdown information is stored exclusively in your device's browser `localStorage`. No data is transmitted to external servers.

*Note: Clearing your Safari/Chrome browser data will wipe your walkdown cache. Always export your CSV at the end of a shift.*

## 🖼️ Icon Assets

Before your first production deployment, ensure the following generated UI assets are placed in the `public/` directory (referenced by the PWA manifest and `index.html`):

* `favicon.svg`
* `apple-touch-icon.png`
* `pwa-192x192.png`
* `pwa-512x512.png`

---
