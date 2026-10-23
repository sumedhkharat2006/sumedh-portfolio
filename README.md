# Sumedh — Cinematic Portfolio

[![CI/CD](https://github.com/sumedhkharat2006/sumedh-portfolio/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/sumedhkharat2006/sumedh-portfolio/actions/workflows/ci-cd.yml)
[![Live](https://img.shields.io/badge/live-portfolio--sumedh.netlify.app-8b5cf6)](https://portfolio-sumedh.netlify.app)

Pushing to `main` builds and deploys automatically (see [CI_CD_GUIDE.md](CI_CD_GUIDE.md)). Setup steps are in [SETUP_GUIDE.md](SETUP_GUIDE.md).

React + TypeScript + Vite + Tailwind CSS + GSAP (ScrollTrigger).

**Quick start:** double-click `run.bat`. It installs packages on first run, starts the site and opens http://localhost:5173.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run media     # re-encode clips from media-src/ into public/media/
```

## Structure

```
src/
  config/media.ts     all video + poster paths (edit here)
  data/content.ts     name, links, skills, projects, journey, interests
  lib/                gsap setup, spotlight helper
  hooks/              media-query / reduced-motion hooks
  components/         Hero, Manifesto, About, Skills, Projects, ProjectModal,
                      Timeline, Interests, Contact, Navigation, BackgroundVideo, ...
public/media/         compressed MP4 loops + poster frames (see CREDITS.md)
media-src/            original downloads (git-ignored)
scripts/encode-media.mjs  ffmpeg pipeline (uses ffmpeg-static, no install needed)
```

## Swapping a video

1. Drop the source clip in `media-src/` (for example `media-src/hero.mp4`).
2. Run `npm run media`. It writes a graded, muted, faststart H.264 MP4 and a poster JPG.
3. If you add a new clip, add its paths to `src/config/media.ts`.

## Before going live

- Set your public email in `src/data/content.ts` (`site.email`).
- Optionally add `site.linkedin` and a `period` for each journey chapter.
