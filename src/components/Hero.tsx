import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { media } from '../config/media';
import { site } from '../data/content';
import BackgroundVideo from './BackgroundVideo';
import Particles from './Particles';
import SplitText from './SplitText';

export default function Hero({ onIntroComplete }: { onIntroComplete: () => void }) {
  const root = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [counter, setCounter] = useState(0);
  const [introDone, setIntroDone] = useState(false);

  useGSAP(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.classList.add('lock-scroll');

    const finish = () => {
      document.documentElement.classList.remove('lock-scroll');
      setIntroDone(true);
      onIntroComplete();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    if (prefersReducedMotion()) { finish(); return; }

    const count = { v: 0 };
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: finish });
    tlRef.current = tl;

    tl
      // 0–2s: black screen, atmospheric particles, loading counter
      .to(count, { v: 100, duration: 1.8, ease: 'power2.inOut', onUpdate: () => setCounter(Math.round(count.v)) }, 0)
      .to('.intro-counter', { autoAlpha: 0, y: -20, duration: 0.4, ease: 'power2.in' }, 1.7)
      // 2–4s: the video slowly emerges with a camera push-in
      .to('.intro-layer', { autoAlpha: 0, duration: 2, ease: 'power2.inOut' }, 2)
      .fromTo('.hero-media', { scale: 1.25, filter: 'brightness(0.3) blur(6px)' },
        { scale: 1, filter: 'brightness(1) blur(0px)', duration: 4, ease: 'power2.out' }, 2)
      // letterbox bars open like a widescreen frame
      .to('.letterbox-top', { yPercent: -100, duration: 1.8, ease: 'expo.inOut' }, 3.2)
      .to('.letterbox-bottom', { yPercent: 100, duration: 1.8, ease: 'expo.inOut' }, 3.2)
      // 4–6s: the name
      .from('.hero-name .char', {
        yPercent: 120, rotateX: -90, transformPerspective: 600, transformOrigin: '50% 100%',
        opacity: 0, filter: 'blur(16px)', duration: 1.6, stagger: 0.08,
      }, 4)
      .from('.hero-name', { letterSpacing: '0.35em', duration: 2.2, ease: 'power3.out' }, 4)
      // 6–8s: role
      .from('.hero-line', { scaleX: 0, duration: 1.4, ease: 'expo.inOut' }, 6)
      .from('.hero-role .char', { yPercent: 110, opacity: 0, duration: 1, stagger: 0.03 }, 6)
      .from('.hero-sub', { opacity: 0, y: 20, filter: 'blur(6px)', duration: 1.2 }, 6.8)
      // 8–10s: tagline
      .from('.hero-tagline .word', { yPercent: 110, opacity: 0, filter: 'blur(8px)', duration: 1, stagger: 0.05 }, 8)
      .from('.hero-meta', { opacity: 0, y: 20, duration: 1, stagger: 0.1 }, 9);

    // Scroll-out: video drifts down & scales, content lifts and blurs away
    gsap.to('.hero-media-wrap', {
      yPercent: 20, scale: 1.1, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.hero-content', {
      yPercent: -30, opacity: 0, filter: 'blur(8px)', ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
    });

    return () => document.documentElement.classList.remove('lock-scroll');
  }, { scope: root });

  return (
    <section id="home" ref={root} className="relative h-[100svh] min-h-[620px] overflow-hidden">
      <div className="hero-media-wrap absolute inset-0">
        <div className="hero-media absolute inset-0">
          <BackgroundVideo source={media.hero} label="Hero" priority />
        </div>
      </div>
      <Particles count={40} className="opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-ink" />

      <div className="hero-content relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="hero-meta mb-6 font-mono text-[11px] tracking-[0.5em] text-neon-cyan/80">SCENE 01 — PORTFOLIO</p>
        <SplitText as="h1" text={site.name} className="hero-name font-display text-[11.5vw] font-extrabold leading-[0.85] tracking-tight drop-shadow-[0_0_40px_rgba(76,125,255,0.35)]" />
        <div className="hero-line mt-4 h-px w-40 bg-gradient-to-r from-transparent via-neon-violet to-transparent" />
        <SplitText as="p" text={site.role} className="hero-role mt-6 font-display text-lg tracking-[0.3em] md:text-3xl" />
        <p className="hero-sub mt-3 font-mono text-[11px] tracking-[0.35em] text-white/70 md:text-sm">{site.sub}</p>
        <SplitText as="p" split="words" text={`“${site.tagline}”`} className="hero-tagline mt-10 max-w-2xl text-base leading-relaxed text-white/85 md:text-xl" />
        <div className="hero-meta absolute bottom-10 flex flex-col items-center gap-3 font-mono text-[10px] tracking-[0.4em] text-white/60">
          SCROLL
          <span className="relative h-12 w-px overflow-hidden bg-white/15">
            <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-white" />
          </span>
        </div>
      </div>

      {!introDone && (
        <>
          <div className="letterbox letterbox-top top-0" aria-hidden="true" />
          <div className="letterbox letterbox-bottom bottom-0" aria-hidden="true" />
          <div className="intro-layer fixed inset-0 z-[60] bg-black">
            <Particles count={90} />
            <div className="intro-counter absolute bottom-[12vh] right-8 font-display text-6xl font-extrabold tabular-nums text-white/90 md:right-12 md:text-8xl">
              {String(counter).padStart(3, '0')}
            </div>
          </div>
          {/* Outside the intro layer so it stays usable for the whole title sequence */}
          <button
            onClick={() => tlRef.current?.progress(1)}
            className="fixed bottom-[3vh] left-8 z-[62] min-h-11 font-mono text-[11px] tracking-[0.35em] text-white/60 transition-colors hover:text-white md:left-12"
          >
            SKIP INTRO →
          </button>
        </>
      )}
    </section>
  );
}
