import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { projects, type Project } from '../data/content';
import Magnetic from './Magnetic';
import ProjectModal from './ProjectModal';
import ProjectVisual from './ProjectVisual';
import RevealText from './RevealText';
import SplitText from './SplitText';

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
      },
      (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean };
        const section = root.current!;
        const panels = Array.from(section.querySelectorAll<HTMLElement>('.project-panel'));
        const backdrops = Array.from(section.querySelectorAll<HTMLElement>('.project-backdrop'));
        const showBackdrop = (i: number) =>
          backdrops.forEach((b, j) => gsap.to(b, { autoAlpha: j === i ? 1 : 0, scale: j === i ? 1 : 1.15, duration: 1.2, ease: 'power3.out', overwrite: true }));

        if (desktop) {
          // Pinned horizontal film-strip through the projects
          const t = track.current!;
          const dist = () => t.scrollWidth - window.innerWidth;
          const horiz = gsap.to(t, {
            x: () => -dist(), ease: 'none',
            scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
          });
          panels.forEach((p, i) => {
            gsap.fromTo(p.querySelector('.project-media'), { scale: 1.35, xPercent: -6 }, {
              scale: 1, xPercent: 6, ease: 'none',
              scrollTrigger: { trigger: p, containerAnimation: horiz, start: 'left right', end: 'right left', scrub: true },
            });
            gsap.from(p.querySelectorAll('.project-title .char'), {
              yPercent: 120, opacity: 0, filter: 'blur(10px)', stagger: 0.035, duration: 1, ease: 'expo.out',
              scrollTrigger: { trigger: p, containerAnimation: horiz, start: 'left 65%' },
            });
            gsap.from(p.querySelectorAll('.project-reveal'), {
              y: 30, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: p, containerAnimation: horiz, start: 'left 55%' },
            });
            // Section backdrop crossfades to whichever project is centre-stage
            ScrollTrigger.create({
              trigger: p, containerAnimation: horiz, start: 'left 60%', end: 'right 40%',
              onToggle: (s) => s.isActive && showBackdrop(i),
            });
          });
          gsap.fromTo(section.querySelector('.projects-progress'), { scaleX: 0 }, {
            scaleX: 1, ease: 'none',
            scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${dist()}`, scrub: true, invalidateOnRefresh: true },
          });
        } else {
          panels.forEach((p) => {
            gsap.fromTo(p.querySelector('.project-media'), { scale: 1.3 }, {
              scale: 1, ease: 'none', scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom top', scrub: true },
            });
            gsap.from(p.querySelectorAll('.project-title .char, .project-reveal'), {
              yPercent: 60, opacity: 0, stagger: 0.03, duration: 0.9, ease: 'expo.out',
              scrollTrigger: { trigger: p, start: 'top 70%' },
            });
          });
        }
      }
    );
    return () => mm.revert();
  }, { scope: root });

  return (
    <section id="projects" ref={root} className="relative overflow-hidden bg-ink py-24 lg:h-[100svh] lg:py-0">
      {/* Blurred cinematic backdrop per project (desktop) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        {projects.map((p) => (
          <div key={p.id} className="project-backdrop invisible absolute inset-0 opacity-0">
            {p.video?.poster && <img src={p.video.poster} alt="" className="h-full w-full scale-110 object-cover opacity-40 blur-2xl" />}
          </div>
        ))}
        <div className="absolute inset-0 bg-ink/50" />
      </div>
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />

      <div ref={track} className="relative flex flex-col gap-10 px-6 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-[5vw] lg:px-[8vw]">
        <div className="shrink-0 lg:w-[38vw]">
          <p className="mb-6 font-mono text-[11px] tracking-[0.5em] text-neon-cyan/80">SCENE 03 — SELECTED WORK</p>
          <RevealText as="h2" split="chars" text="Systems, shipped." className="font-display text-5xl font-extrabold leading-[0.9] sm:text-6xl lg:text-[5vw]" />
          <p className="mt-6 max-w-sm text-white/65">Three builds across compliance, people operations and commerce. Keep scrolling to move through them.</p>
        </div>

        {projects.map((p) => (
          <article
            key={p.id}
            data-cursor-label="Open"
            onClick={() => setActive(p)}
            className="project-panel group relative h-[78vh] w-full shrink-0 cursor-pointer overflow-hidden rounded-[28px] border border-white/10 lg:h-[76vh] lg:w-[62vw]"
          >
            <div className="project-media absolute inset-y-0 -inset-x-[10%]">
              <div className="h-full w-full transition-[transform,filter] duration-[1200ms] ease-out [filter:saturate(.85)_brightness(.8)] group-hover:scale-105 group-hover:[filter:saturate(1.15)_brightness(1)]">
                <ProjectVisual project={p} />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-violet-600/40 mix-blend-soft-light" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
            <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/25" />

            {/* Hover details overlay */}
            <div className="absolute right-6 top-6 hidden max-w-xs translate-y-4 rounded-2xl border border-white/15 bg-ink/70 p-5 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:block">
              <p className="font-mono text-[10px] tracking-[0.3em] text-white/55">HIGHLIGHTS</p>
              <ul className="mt-3 space-y-2 text-sm text-white/85">
                {p.details.slice(0, 3).map((d) => <li key={d}>— {d}</li>)}
              </ul>
            </div>

            <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-10">
              <span className="project-reveal font-mono text-xs tracking-[0.4em] text-white/70">{p.index} — {p.kicker.toUpperCase()}</span>
              <SplitText as="h3" text={p.title} className="project-title mt-3 font-display text-4xl sm:text-5xl font-extrabold leading-[0.9] md:text-[5.5vw]" />
              <p className="project-reveal mt-4 max-w-xl text-white/80">{p.summary}</p>
              <ul className="project-reveal mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => <li key={t} className="rounded-full border border-white/20 bg-ink/40 px-3 py-1 text-xs backdrop-blur">{t}</li>)}
              </ul>
              <div className="project-reveal mt-6">
                <Magnetic>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActive(p); }}
                    className="min-h-11 rounded-full bg-white px-6 font-medium text-ink transition-colors hover:bg-neon-violet hover:text-white"
                  >
                    Explore project →
                  </button>
                </Magnetic>
              </div>
            </div>
          </article>
        ))}
        <div className="hidden w-[6vw] shrink-0 lg:block" />
      </div>

      <div className="absolute bottom-8 left-[8vw] right-[8vw] hidden h-px bg-white/10 lg:block">
        <div className="projects-progress h-full origin-left scale-x-0 bg-gradient-to-r from-neon-blue to-neon-violet" />
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
