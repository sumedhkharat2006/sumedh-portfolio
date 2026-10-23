import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import type { Project } from '../data/content';
import ProjectVisual from './ProjectVisual';
import SplitText from './SplitText';

// Full-screen "expanded" project presentation
export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);

  useGSAP(() => {
    if (!project || prefersReducedMotion()) return;
    gsap.timeline()
      .fromTo(ref.current, { clipPath: 'inset(50% 0% 50% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' })
      .from('.modal-media', { scale: 1.3, duration: 1.4, ease: 'expo.out' }, 0.2)
      .from('.modal-title .char', { yPercent: 120, opacity: 0, stagger: 0.03, duration: 1, ease: 'expo.out' }, 0.4)
      .from('.modal-reveal', { y: 30, opacity: 0, stagger: 0.06, duration: 0.8, ease: 'power3.out' }, 0.6);
  }, { dependencies: [project], scope: ref });

  const close = () => {
    if (closing.current) return;
    if (prefersReducedMotion() || !ref.current) return onClose();
    closing.current = true;
    gsap.to(ref.current, {
      clipPath: 'inset(50% 0% 50% 0%)', duration: 0.6, ease: 'expo.inOut',
      onComplete: () => { closing.current = false; onClose(); },
    });
  };

  useEffect(() => {
    if (!project) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.documentElement.classList.add('lock-scroll');
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('lock-scroll');
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  if (!project) return null;

  return createPortal(
    <div ref={ref} role="dialog" aria-modal="true" aria-label={project.title} className="fixed inset-0 z-[90] overflow-y-auto bg-ink">
      <div className="relative h-[62vh] overflow-hidden">
        <div className="modal-media absolute inset-0"><ProjectVisual project={project} priority /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <button ref={closeRef} onClick={close} className="absolute right-6 top-6 min-h-11 rounded-full border border-white/20 bg-ink/60 px-5 font-mono text-[11px] tracking-[0.3em] backdrop-blur transition-colors hover:bg-white hover:text-ink">
          CLOSE ✕
        </button>
        <div className="absolute bottom-8 left-6 right-6 md:left-12">
          <p className="modal-reveal font-mono text-xs tracking-[0.4em] text-white/70">{project.index} — {project.kicker.toUpperCase()}</p>
          <SplitText as="h2" text={project.title} className="modal-title mt-3 font-display text-4xl sm:text-5xl font-extrabold leading-[0.9] md:text-8xl" />
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr] md:px-12">
        <div>
          <p className="modal-reveal text-xl leading-relaxed text-white/85">{project.summary}</p>
          <ul className="mt-8 space-y-3">
            {project.details.map((d) => (
              <li key={d} className="modal-reveal flex gap-4 border-b border-white/10 pb-3 text-white/75">
                <span className="text-neon-violet">✦</span>{d}
              </li>
            ))}
          </ul>
        </div>
        <aside>
          <h3 className="modal-reveal font-mono text-[11px] tracking-[0.35em] text-white/55">STACK</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t} className="modal-reveal rounded-full border border-white/15 px-3 py-1.5 text-sm">{t}</li>
            ))}
          </ul>
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="modal-reveal mt-8 inline-flex min-h-11 items-center rounded-full bg-white px-6 font-medium text-ink transition-colors hover:bg-neon-violet hover:text-white">
              View repository ↗
            </a>
          )}
          <p className="modal-reveal mt-8 text-xs leading-relaxed text-white/45">
            Visuals are atmospheric stock footage. No client data or proprietary screens are shown.
          </p>
        </aside>
      </div>
    </div>,
    document.body
  );
}
