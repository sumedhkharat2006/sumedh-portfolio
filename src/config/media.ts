// All video/image paths live here. Files go in /public/media (generate them with `npm run media`).
// Footage: Mixkit stock video (Mixkit Stock Video Free License), see /public/media/CREDITS.md.
export type VideoSource = {
  mp4: string;
  webm?: string;
  mp4Mobile?: string; // optional smaller file for phones
  poster?: string;
};

export const media = {
  hero: {
    mp4: '/media/hero.mp4',
    mp4Mobile: '/media/hero-mobile.mp4',
    poster: '/media/hero-poster.jpg',
  },
  about: {
    mp4: '/media/about.mp4',
    poster: '/media/about-poster.jpg',
  },
  taxone: {
    mp4: '/media/projects/taxone.mp4',
    poster: '/media/projects/taxone-poster.jpg',
  },
  hrms: {
    mp4: '/media/projects/hrms.mp4',
    poster: '/media/projects/hrms-poster.jpg',
  },
  boutique: {
    mp4: '/media/projects/boutique.mp4',
    poster: '/media/projects/boutique-poster.jpg',
  },
} satisfies Record<string, VideoSource>;
