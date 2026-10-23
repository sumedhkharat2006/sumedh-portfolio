import { useEffect, useRef, useState } from 'react';
import type { VideoSource } from '../config/media';
import { useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery';

type Props = {
  source: VideoSource;
  label: string;
  priority?: boolean;  // above the fold: load immediately, keep playing on mobile
  overlay?: boolean;   // cinematic grade + readability gradient
  className?: string;
};

export default function BackgroundVideo({ source, label, priority = false, overlay = true, className = '' }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [status, setStatus] = useState<'loading' | 'playing' | 'missing'>('loading');
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const saveData =
    typeof navigator !== 'undefined' &&
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

  // Static poster for reduced motion, data-saver, and below-the-fold videos on phones
  const staticMode = reduced || saveData || (!priority && isMobile);
  const src = isMobile && source.mp4Mobile ? source.mp4Mobile : source.mp4;

  // Lazy-load near the viewport and pause when off-screen, so only visible videos decode
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || staticMode) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (entry.isIntersecting) {
          setShouldLoad(true);
          if (v) { v.muted = true; v.play().catch(() => {}); }
        } else {
          v?.pause();
        }
      },
      { rootMargin: '150px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [staticMode, shouldLoad]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) { v.muted = true; v.defaultMuted = true; }
  }, [shouldLoad]);

  return (
    <div ref={wrapRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="fallback-scene absolute inset-0" aria-hidden="true" />
      {source.poster && (
        <img
          src={source.poster} alt="" aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          loading={priority ? 'eager' : 'lazy'}
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      )}
      {!staticMode && shouldLoad && (
        <video
          key={src} ref={videoRef} aria-hidden="true" data-video={label}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${status === 'playing' ? 'opacity-100' : 'opacity-0'}`}
          autoPlay muted loop playsInline disablePictureInPicture
          preload={priority ? 'auto' : 'metadata'}
          poster={source.poster}
          onPlaying={() => setStatus('playing')}
          onError={() => setStatus('missing')}
        >
          {source.webm && <source src={source.webm} type="video/webm" />}
          <source src={src} type="video/mp4" onError={() => setStatus('missing')} />
        </video>
      )}
      {overlay && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-transparent to-violet-600/50 mix-blend-soft-light" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/35 to-ink" aria-hidden="true" />
        </>
      )}

      {status === 'missing' && (
        <div className="absolute right-6 top-24 z-20 max-w-xs rounded-lg border border-dashed border-neon-violet/70 bg-ink/85 px-4 py-3 font-mono text-[11px] leading-relaxed text-violet-200 backdrop-blur">
          <p className="uppercase tracking-widest text-neon-violet">Video placeholder · {label}</p>
          <p>Add <code>public{src}</code> (run <code>npm run media</code>).</p>
        </div>
      )}
    </div>
  );
}
