import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import Particles from './Particles';
import SplitText from './SplitText';

const rows = [
  { word: 'THINK.', line: 'Understand the problem before touching the keyboard.', align: 'items-start text-left', style: '' },
  { word: 'BUILD.', line: 'Ship systems that hold up under real business load.', align: 'items-center text-center', style: 'text-outline' },
  { word: 'INNOVATE.', line: 'Automate the repetitive. Rethink the rest.', align: 'items-end text-right', style: 'drop-shadow-[0_0_30px_rgba(139,92,246,0.6)]' },
];

// Pinned, scroll-scrubbed typography scene between the hero and About
export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: 'top top', end: '+=250%', pin: true, scrub: 1 },
    });
    rows.forEach((_, i) => {
      tl.from(`.m-row-${i} .char`, {
        yPercent: 120, opacity: 0, filter: 'blur(20px)', scale: 1.2,
        stagger: 0.08, duration: 1, ease: 'power3.out',
      }).from(`.m-row-${i} .m-line`, { opacity: 0, y: 20, filter: 'blur(6px)', duration: 0.6 }, '<0.5');
    });
    const d = tl.duration();
    tl.to('.m-grid', { yPercent: -25, ease: 'none', duration: d }, 0)
      .to('.m-glow', { xPercent: 60, rotate: 40, ease: 'none', duration: d }, 0);
  }, { scope: root });

  return (
    <section ref={root} aria-label="Manifesto" className="relative flex h-[100svh] flex-col justify-center gap-[3vh] overflow-hidden bg-ink px-6 md:px-12">
      <div className="m-grid bg-grid pointer-events-none absolute inset-x-0 -top-1/4 h-[150%] opacity-50" />
      <div className="m-glow pointer-events-none absolute -left-1/4 top-1/4 h-[60vh] w-[60vw] rounded-full bg-neon-violet/25 blur-[120px]" />
      <Particles count={45} className="opacity-50" />
      {rows.map((r, i) => (
        <div key={r.word} className={`m-row-${i} relative z-10 flex flex-col ${r.align}`}>
          <SplitText as="h2" text={r.word} className={`font-display text-[12.5vw] font-extrabold leading-[0.85] tracking-tight md:text-[9.5vw] ${r.style}`} />
          <p className="m-line mt-2 max-w-md font-mono text-[11px] tracking-[0.2em] text-white/60 md:text-xs">
            <span className="mr-3 text-neon-violet">0{i + 1}</span>{r.line}
          </p>
        </div>
      ))}
    </section>
  );
}
