import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { media } from '../config/media';
import { focusAreas } from '../data/content';
import BackgroundVideo from './BackgroundVideo';
import { setSpotlight } from '../lib/spotlight';
import RevealText from './RevealText';

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    // Video "opens up" like a cinema screen as the scene arrives
    gsap.fromTo('.about-media',
      { clipPath: 'inset(14% 10% 14% 10% round 32px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top top', scrub: true } });
    gsap.fromTo('.about-media-inner', { scale: 1.3, yPercent: -8 }, {
      scale: 1, yPercent: 8, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    gsap.from('.about-copy', { y: 40, opacity: 0, filter: 'blur(8px)', duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-copy', start: 'top 85%' } });
    gsap.from('.about-card', { y: 60, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-cards', start: 'top 80%' } });
  }, { scope: root });

  return (
    <section id="about" ref={root} className="relative min-h-[100svh] overflow-hidden bg-ink">
      <div className="about-media absolute inset-0 overflow-hidden">
        <div className="about-media-inner absolute -inset-[8%]">
          <BackgroundVideo source={media.about} label="About" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1400px] items-center gap-16 px-6 py-32 md:px-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-6 font-mono text-[11px] tracking-[0.5em] text-neon-cyan/80">SCENE 02 — ABOUT</p>
          <RevealText as="h2" text="Code is the tool. Systems are the craft." className="font-display text-5xl font-extrabold leading-[0.95] md:text-7xl" />
          <p className="about-copy mt-8 max-w-xl text-lg leading-relaxed text-white/80">
            I'm Sumedh, a full stack developer working across the Microsoft stack and modern front-ends:
            C#, ASP.NET MVC and Web API on the server, Angular and JavaScript in the browser, and Oracle 19c,
            SQL Server and MySQL underneath. I like the unglamorous parts that make software dependable:
            clean data, clear APIs, and automation that saves people hours.
          </p>
        </div>
        <div className="about-cards grid gap-4 sm:grid-cols-2">
          {focusAreas.map((f, i) => (
            <div key={f.title} onMouseMove={setSpotlight} className="about-card spotlight rounded-2xl border border-white/10 bg-ink/50 p-6 backdrop-blur-md">
              <span className="font-mono text-[11px] text-neon-violet">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
