// Compresses the source clips in /media-src into web-ready H.264 MP4s + posters in /public/media.
// (VP9 WebM came out larger than H.264 for these clips, so only MP4 is produced.)
// Usage: npm run media   (uses the bundled ffmpeg-static binary)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import ffmpeg from 'ffmpeg-static';

const jobs = [
  // name, source, output folder, width, max seconds
  { name: 'hero', src: 'media-src/hero.mp4', out: 'public/media', w: 1280, t: 8, crf: 25, mobile: true },
  { name: 'about', src: 'media-src/about.mp4', out: 'public/media', w: 1280, t: 10, crf: 29 },
  { name: 'taxone', src: 'media-src/taxone.mp4', out: 'public/media/projects', w: 1280, t: 10, crf: 29 },
  { name: 'hrms', src: 'media-src/hrms.mp4', out: 'public/media/projects', w: 1280, t: 10, crf: 29 },
  { name: 'boutique', src: 'media-src/boutique.mp4', out: 'public/media/projects', w: 1280, t: 10, crf: 29 },
];

// Gentle blue/violet cinematic grade so every clip sits in the same palette
const grade = 'eq=contrast=1.08:saturation=1.1:brightness=-0.03,colorbalance=bs=0.08:bm=0.05:rs=-0.03';

const run = (args) => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });

for (const j of jobs) {
  if (!existsSync(j.src)) { console.warn(`skip ${j.name}: ${j.src} missing`); continue; }
  mkdirSync(j.out, { recursive: true });
  const base = `${j.out}/${j.name}`;
  const vf = (w) => `scale=${w}:-2,fps=24,${grade}`;
  console.log(`encoding ${j.name}…`);
  run(['-i', j.src, '-t', String(j.t), '-vf', vf(j.w), '-c:v', 'libx264', '-crf', String(j.crf), '-preset', 'slow',
    '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', `${base}.mp4`]);
  if (j.mobile) {
    run(['-i', j.src, '-t', String(j.t), '-vf', vf(720), '-c:v', 'libx264', '-crf', '27', '-preset', 'slow',
      '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', `${base}-mobile.mp4`]);
  }
  run(['-ss', '1', '-i', j.src, '-frames:v', '1', '-vf', `scale=${j.w}:-2,${grade}`, '-q:v', '4', `${base}-poster.jpg`]);
}
console.log('done');
