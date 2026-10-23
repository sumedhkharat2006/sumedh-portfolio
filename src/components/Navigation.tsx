import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import { nav } from '../data/content';
import Magnetic from './Magnetic';

export default function Navigation({ visible }: { visible: boolean }) {
  const [active, setActive] = useState('home');
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const curtain = useRef<HTMLDivElement>(null);
  const curtainLabel = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers = nav.map(({ id }) =>
      ScrollTrigger.create({
        trigger: `#${id}`, start: 'top center', end: 'bottom center',
        onToggle: (s) => s.isActive && setActive(id),
      })
    );
    const dir = ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (s) => setHidden(s.direction === 1 && s.scroll() > 240),
    });
    return () => { triggers.forEach((t) => t.kill()); dir.kill(); };
  }, []);

  useEffect(() => {
    if (!open || !menuRef.current) return;
    document.documentElement.classList.add('lock-scroll');
    gsap.fromTo(menuRef.current.querySelectorAll('.menu-link'),
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: 'expo.out' });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('lock-scroll');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Cinematic "cut" between sections: curtain wipes in, page jumps, curtain wipes out
  const go = (id: string) => {
    setOpen(false);
    document.documentElement.classList.remove('lock-scroll');
    const el = document.getElementById(id);
    if (!el) return;
    const target = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
    const jump = () =>
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: 'instant' as ScrollBehavior });

    if (prefersReducedMotion() || !curtain.current) { jump(); return; }
    if (curtainLabel.current) curtainLabel.current.textContent = nav.find((n) => n.id === id)?.label ?? '';
    gsap.timeline()
      .set(curtain.current, { display: 'flex', yPercent: 100 })
      .to(curtain.current, { yPercent: 0, duration: 0.6, ease: 'expo.inOut' })
      .fromTo(curtainLabel.current, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'expo.out' }, '-=0.2')
      .add(jump)
      .to(curtain.current, { yPercent: -100, duration: 0.7, ease: 'expo.inOut', delay: 0.15 })
      .set(curtain.current, { display: 'none' });
  };

  const show = visible && (!hidden || open);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'}`}>
        <nav aria-label="Primary" className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
          <Magnetic>
            <button onClick={() => go('home')} className="font-display text-2xl font-extrabold tracking-tight" aria-label="Back to home">
              S<span className="text-neon-violet">.</span>
            </button>
          </Magnetic>
          <ul className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => go(n.id)}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`group relative py-2 font-mono text-[11px] uppercase tracking-[0.3em] transition-colors ${active === n.id ? 'text-white' : 'text-white/55 hover:text-white'}`}
                >
                  {n.label}
                  <span className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gradient-to-r from-neon-blue to-neon-violet transition-transform duration-500 ${active === n.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className={`h-px w-6 bg-white transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-6 bg-white transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </nav>
      </header>

      {open && (
        <div ref={menuRef} className="fixed inset-0 z-40 flex flex-col justify-center gap-3 bg-ink/95 px-8 backdrop-blur-xl md:hidden">
          {nav.map((n, i) => (
            <span key={n.id} className="mask-line">
              <button onClick={() => go(n.id)} className="menu-link block py-1 text-left font-display text-[11vw] font-extrabold uppercase">
                <span className="mr-4 align-middle font-mono text-xs text-white/40">0{i + 1}</span>{n.label}
              </button>
            </span>
          ))}
        </div>
      )}

      <div ref={curtain} aria-hidden="true" className="fixed inset-0 z-[80] hidden items-center justify-center bg-gradient-to-br from-[#0b0b1f] via-ink to-[#160a2a]">
        <span className="mask-line">
          <span ref={curtainLabel} className="block whitespace-nowrap px-6 font-display text-[min(10vw,22vh)] font-extrabold uppercase leading-none" />
        </span>
      </div>
    </>
  );
}
