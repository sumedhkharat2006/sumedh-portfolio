import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { journey } from '../data/content';
import RevealText from './RevealText';

export default function Timeline() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo('.journey-progress', { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: '.journey-list', start: 'top 70%', end: 'bottom 60%', scrub: true },
    });
    root.current!.querySelectorAll<HTMLElement>('.journey-item').forEach((el, i) => {
      gsap.from(el.querySelector('.journey-card'), {
        x: i % 2 ? 80 : -80, opacity: 0, filter: 'blur(10px)', duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
      });
      ScrollTrigger.create({
        trigger: el, start: 'top 60%', end: 'bottom 60%',
        toggleClass: { targets: el.querySelector('.journey-dot')!, className: 'is-active' },
      });
    });
  }, { scope: root });

  return (
    <section id="journey" ref={root} className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <p className="mb-6 font-mono text-[11px] tracking-[0.5em] text-neon-cyan/80">THE JOURNEY</p>
        <RevealText as="h2" split="chars" text="Chapters so far." className="font-display text-5xl sm:text-6xl font-extrabold leading-[0.9] md:text-8xl" />

        <div className="journey-list relative mt-20">
          <div className="absolute bottom-0 left-[11px] top-0 w-px bg-white/10 md:left-1/2" aria-hidden="true">
            <div className="journey-progress h-full w-full origin-top bg-gradient-to-b from-neon-blue via-neon-violet to-neon-cyan" />
          </div>
          <ol>
            {journey.map((j, i) => (
              <li key={j.title} className="journey-item relative grid py-10 md:grid-cols-2">
                <span className="journey-dot absolute left-[5px] top-12 h-3 w-3 rounded-full border border-white/40 bg-ink transition-all duration-500 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
                <div className={`journey-card pl-10 ${i % 2 === 0 ? 'md:col-start-1 md:pl-0 md:pr-16 md:text-right' : 'md:col-start-2 md:pl-16'}`}>
                  <p className="font-mono text-[11px] tracking-[0.35em] text-neon-violet">
                    {j.chapter.toUpperCase()}{j.period ? ` · ${j.period}` : ''}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-bold md:text-4xl">{j.title}</h3>
                  <p className="mt-3 text-white/70">{j.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
