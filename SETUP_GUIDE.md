# Sumedh Portfolio: Setup & Run Guide

A step-by-step guide to install everything this project needs, run it on your computer, and publish it.

---

## 1. Tech stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| UI framework | React 18 | Component-based interface |
| Language | TypeScript 5 | Type-safe JavaScript |
| Build tool / dev server | Vite 5 | Fast local server and production build |
| Styling | Tailwind CSS 3 (with PostCSS + Autoprefixer) | Utility-first CSS |
| Animation | GSAP 3 + ScrollTrigger (`@gsap/react`) | Intro sequence, scroll scenes, pinning, horizontal projects |
| Video | HTML5 `<video>` (H.264 MP4 + poster images) | Cinematic background loops |
| Media encoding | ffmpeg (bundled via `ffmpeg-static`) | Compress and colour-grade videos (`npm run media`) |
| Fonts | Google Fonts: Syne, Inter, JetBrains Mono | Display, body and mono type |

Footage is from Mixkit (free licence). See `public/media/CREDITS.md`.

---

## 2. Software to install

| Software | Required? | Version | Download |
| --- | --- | --- | --- |
| **Node.js** (includes npm) | **Required** | 18 or newer (LTS recommended). Tested with Node 26.7 / npm 11.15 | https://nodejs.org |
| **Web browser** | **Required** | Latest Chrome, Edge or Firefox | Already on most PCs |
| Visual Studio Code | Recommended (for editing) | Latest | https://code.visualstudio.com |
| Git | Optional (for GitHub / version control) | Latest | https://git-scm.com |

You do **not** need to install ffmpeg, Python or a database. Everything else installs automatically through npm.

---

## 3. Step-by-step installation (Windows)

### Step 1: Install Node.js
1. Open https://nodejs.org and download the **LTS** Windows installer (`.msi`).
2. Run the installer and click **Next** on every screen, keeping these options ticked:
   - "Add to PATH"
   - "npm package manager"
3. Click **Finish**.

### Step 2: Check the installation
Open **Command Prompt** (press `Win`, type `cmd`, press Enter) and run:

```
node -v
npm -v
```

You should see version numbers, for example `v22.x.x` and `10.x.x`.
If you see *"not recognized"*, restart the computer and try again.

### Step 3: Get the project
The project is in:

```
D:\ALL_SUMEDH_PROJECT\sumedh-portfolio
```

To set it up on another computer, copy this whole folder (you can leave out `node_modules`, `dist` and `media-src`), or clone it with Git if you have pushed it to GitHub:

```
git clone <your-repo-url>
```

### Step 4: Install project packages (first time only)
```
cd D:\ALL_SUMEDH_PROJECT\sumedh-portfolio
npm install
```

This downloads React, GSAP, Vite, Tailwind and the other packages into `node_modules` (takes 1–2 minutes).

---

## 4. Run the website

### Option A: the easy way
Double-click **`run.bat`** in the project folder. It:
1. checks that Node.js is installed,
2. runs `npm install` if needed,
3. starts the site and opens **http://localhost:5173** in your browser.

### Option B: from a terminal
```
cd D:\ALL_SUMEDH_PROJECT\sumedh-portfolio
npm run dev
```
Then open **http://localhost:5173**.

**To stop the server:** press `Ctrl + C` in the terminal window.

### All commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server (auto-reloads when you save a file) |
| `npm run build` | Type-check and create the production build in `dist\` |
| `npm run preview` | Serve the production build at http://localhost:4173 |
| `npm run media` | Re-encode videos from `media-src\` into `public\media\` |

---

## 5. Edit your content

| What to change | File |
| --- | --- |
| Name, tagline, WhatsApp number, email, GitHub, LinkedIn | `src/data/content.ts` (the `site` object) |
| Skills, projects, journey chapters, interests | `src/data/content.ts` |
| Video and poster paths | `src/config/media.ts` |
| Colours and fonts | `tailwind.config.js` |

### Change a background video
1. Put the new clip in `media-src\` with the same name (e.g. `media-src\hero.mp4`).
2. Run `npm run media`.
3. Refresh the browser.

---

## 6. Publish the website

**Live site:** https://sumedhkharat-portfolio.netlify.app (Netlify project `sumedhkharat-portfolio`)

### Update the live site after making changes
1. One-time setup: `npm install -g netlify-cli`, then `netlify login`.
2. Run `npm run deploy` in the project folder. It builds the site and publishes it to Netlify.

### Other hosting options

1. Run `npm run build`. Your website is created in the **`dist`** folder.
2. Upload `dist` to any static host:
   - **Netlify:** go to https://app.netlify.com/drop and drag the `dist` folder in.
   - **Vercel:** import the GitHub repo. Build command `npm run build`, output folder `dist`.
   - **GitHub Pages:** push the contents of `dist` to a `gh-pages` branch.
   - **IIS:** create a new site whose physical path points to the `dist` folder.

---

## 7. Troubleshooting

| Problem | Fix |
| --- | --- |
| `'node' is not recognized` | Reinstall Node.js with "Add to PATH" ticked, then restart the PC |
| PowerShell says *"running scripts is disabled"* | Use Command Prompt instead, or run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once |
| `Port 5173 is in use` | Close the other terminal running the site, or run `npm run dev -- --port 5180` |
| Blank page / errors after copying the project | Delete `node_modules` and run `npm install` again |
| A video doesn't play | Check that the file exists in `public\media\`. Phones and "reduced motion" mode show still images on purpose |
| `npm install` fails | Check your internet connection and run it again |

---

## 8. Contact

Questions about this project, or want to work together? Start a conversation:

- **WhatsApp:** [+91 98192 12579](https://wa.me/919819212579)
- **Phone:** +91 98192 12579
- **Email:** [sumedhkharat2006@gmail.com](mailto:sumedhkharat2006@gmail.com)
- **GitHub:** https://github.com/sumedhkharat2006
