import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { allSkills, skillGroups } from '../data/content';
import { setSpotlight } from '../lib/spotlight';
import RevealText from './RevealText';

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    // Marquee rows skew with scroll velocity, then settle
    const rows = root.current!.querySelectorAll<HTMLElement>('.marquee-row');
    const setSkew = gsap.quickSetter(rows, 'skewX', 'deg');
    const clamp = gsap.utils.clamp(-14, 14);
    const proxy = { skew: 0 };
    ScrollTrigger.create({
      trigger: root.current, start: 'top bottom', end: 'bottom top',
      onUpdate: (self) => {
        const s = clamp(self.getVelocity() / -300);
        if (Math.abs(s) > Math.abs(proxy.skew)) {
          proxy.skew = s;
          gsap.to(proxy, { skew: 0, duration: 0.8, ease: 'power3', overwrite: true, onUpdate: () => setSkew(proxy.skew) });
        }
      },
    });
    gsap.from('.skill-card', { y: 60, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.skill-grid', start: 'top 80%' } });
  }, { scope: root });

  const loop = [...allSkills, ...allSkills];

  return (
    <section id="skills" ref={root} className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-[50vh] w-[50vw] rounded-full bg-neon-blue/15 blur-[140px]" />
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <p className="mb-6 font-mono text-[11px] tracking-[0.5em] text-neon-cyan/80">THE TOOLKIT</p>
        <RevealText as="h2" split="chars" text="Stack & craft." className="font-display text-5xl sm:text-6xl font-extrabold leading-[0.9] md:text-8xl" />
      </div>

      <div className="mt-16 space-y-4" aria-hidden="true">
        {[0, 1].map((r) => (
          <div key={r} className="marquee-row overflow-hidden">
            <div className={`marquee flex w-max ${r ? 'marquee-reverse' : ''}`}>
              {loop.map((s, i) => (
                <span key={i} className={`whitespace-nowrap pr-10 font-display text-[11vw] font-extrabold leading-none md:text-[6vw] ${r ? 'text-outline' : ''}`}>
                  {s}<span className="pl-10 text-neon-violet">✦</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="skill-grid mx-auto mt-20 grid max-w-[1400px] gap-4 px-6 sm:grid-cols-2 md:px-12 lg:grid-cols-4">
        {skillGroups.map((g) => (
          <div key={g.title} onMouseMove={setSpotlight} className="skill-card spotlight rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/55">{g.title}</h3>
            <ul className="mt-5 space-y-2">
              {g.items.map((s) => <li key={s} className="font-display text-2xl font-bold">{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
