import { useRef, type ReactElement } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { interests } from '../data/content';
import RevealText from './RevealText';

const icons: Record<string, ReactElement> = {
  cricket: <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="24" cy="24" r="16" /><path d="M14 12c6 6 6 18 0 24M34 12c-6 6-6 18 0 24" strokeDasharray="2 3" /></svg>,
  film: <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="12" width="32" height="24" rx="2" /><path d="M8 18h32M8 30h32M14 12v6M22 12v6M30 12v6M14 30v6M22 30v6M30 30v6" /></svg>,
  business: <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 38h32M12 32l9-9 6 6 11-13" /><path d="M32 16h6v6" /></svg>,
  automation: <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="24" cy="24" r="6" /><path d="M24 8v6M24 34v6M8 24h6M34 24h6M12.7 12.7l4.2 4.2M31.1 31.1l4.2 4.2M12.7 35.3l4.2-4.2M31.1 16.9l4.2-4.2" /></svg>,
};

export default function Interests() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from('.interest-card', { y: 80, opacity: 0, rotateX: -15, stagger: 0.12, duration: 1.1, ease: 'expo.out',
      scrollTrigger: { trigger: '.interest-grid', start: 'top 80%' } });
    gsap.to('.interest-aurora', { xPercent: -30, rotate: 25, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
  }, { scope: root });

  // 3D tilt + spotlight following the pointer
  const tilt = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
    gsap.to(el, { rotateY: px * 10, rotateX: -py * 10, transformPerspective: 900, duration: 0.5, ease: 'power3.out' });
  };
  const reset = (e: React.MouseEvent<HTMLElement>) =>
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });

  return (
    <section aria-labelledby="interests-title" ref={root} className="relative overflow-hidden py-32">
      <div className="interest-aurora pointer-events-none absolute -right-1/4 top-0 h-[70vh] w-[70vw] rounded-full bg-gradient-to-br from-neon-violet/25 to-neon-blue/10 blur-[140px]" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
        <p id="interests-title" className="mb-6 font-mono text-[11px] tracking-[0.5em] text-neon-cyan/80">BEYOND THE CODE</p>
        <RevealText as="h2" text="What keeps the mind sharp." className="max-w-4xl font-display text-5xl font-extrabold leading-[0.95] md:text-7xl" />
        <div className="interest-grid mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {interests.map((it) => (
            <article key={it.id} onMouseMove={tilt} onMouseLeave={reset}
              className="interest-card spotlight rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm [transform-style:preserve-3d]">
              <div className="text-neon-cyan">{icons[it.id]}</div>
              <h3 className="mt-8 font-display text-2xl font-bold">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{it.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
