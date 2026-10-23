import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery';

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const fine = useMediaQuery('(pointer: fine)');
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!fine || reduced || !dot.current || !ring.current || !label.current) return;
    document.body.classList.add('has-cursor');
    gsap.set([dot.current, ring.current, label.current], { xPercent: -50, yPercent: -50 });
    const xd = gsap.quickTo(dot.current, 'x', { duration: 0.08 });
    const yd = gsap.quickTo(dot.current, 'y', { duration: 0.08 });
    const xr = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' });
    const yr = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' });
    const xl = gsap.quickTo(label.current, 'x', { duration: 0.45, ease: 'power3' });
    const yl = gsap.quickTo(label.current, 'y', { duration: 0.45, ease: 'power3' });

    const move = (e: PointerEvent) => {
      xd(e.clientX); yd(e.clientY); xr(e.clientX); yr(e.clientY); xl(e.clientX); yl(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target instanceof Element ? e.target.closest('a, button, [data-cursor-label]') : null;
      const text = t?.getAttribute('data-cursor-label') ?? '';
      gsap.to(ring.current, { scale: text ? 3.2 : t ? 1.8 : 1, duration: 0.35, ease: 'power3.out' });
      label.current!.textContent = text;
      gsap.to(label.current, { opacity: text ? 1 : 0, duration: 0.25 });
    };
    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    return () => {
      document.body.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;
  return (
    <>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-white/50 mix-blend-difference" />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference" />
      <div ref={label} className="pointer-events-none fixed left-0 top-0 z-[101] font-mono text-[10px] uppercase tracking-[0.25em] text-white opacity-0" />
    </>
  );
}
