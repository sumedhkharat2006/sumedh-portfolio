import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { site } from '../data/content';
import Magnetic from './Magnetic';
import Particles from './Particles';
import RevealText from './RevealText';

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.to('.contact-ring', { rotate: 180, scale: 1.2, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } });
    gsap.from('.contact-cta', { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-ctas', start: 'top bottom' } });
  }, { scope: root });

  return (
    <section id="contact" ref={root} className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pb-10 pt-24 md:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_100%,rgba(139,92,246,.3),transparent_70%)]" />
      <div className="contact-ring pointer-events-none absolute -bottom-[40vmin] left-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 rounded-full border border-white/10" />
      <Particles count={50} className="opacity-70" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <p className="mb-6 font-mono text-[11px] tracking-[0.5em] text-neon-cyan/80">FINAL SCENE — CONTACT</p>
        <RevealText as="h2" split="chars" text="LET'S BUILD" className="font-display text-[min(15vw,11vh)] font-extrabold leading-[0.85] md:text-[min(8.5vw,12vh)]" />
        <RevealText as="p" split="chars" text="SOMETHING REAL." delay={0.2} className="text-outline font-display text-[min(8.5vw,8vh)] font-extrabold leading-[0.9] md:text-[min(6vw,9vh)]" />
        <div className="contact-ctas">
          <p className="contact-cta mt-8 max-w-xl text-lg text-white/75">Start a conversation on WhatsApp or by email.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="contact-cta">
              <Magnetic>
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.greeting)}`}
                  target="_blank" rel="noreferrer"
                  className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#25D366] px-8 text-lg font-medium text-ink transition-colors hover:bg-white"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </Magnetic>
            </span>
            <span className="contact-cta">
              <Magnetic>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(site.emailSubject)}&body=${encodeURIComponent(site.greeting)}`}
                  className="inline-flex min-h-14 items-center rounded-full bg-white px-8 text-lg font-medium text-ink transition-colors hover:bg-neon-violet hover:text-white"
                >
                  Email me →
                </a>
              </Magnetic>
            </span>
            <span className="contact-cta">
              <Magnetic>
                <a href={site.github} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center rounded-full border border-white/20 px-7 transition-colors hover:border-white">GitHub ↗</a>
              </Magnetic>
            </span>
            {site.linkedin && (
              <span className="contact-cta">
                <Magnetic>
                  <a href={site.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center rounded-full border border-white/20 px-7 transition-colors hover:border-white">LinkedIn ↗</a>
                </Magnetic>
              </span>
            )}
          </div>
          <dl className="contact-cta mt-8 grid gap-6 font-mono text-sm sm:grid-cols-2 sm:max-w-2xl">
            <div>
              <dt className="text-[11px] tracking-[0.35em] text-white/50">WHATSAPP / PHONE</dt>
              <dd className="mt-2"><a href={`tel:+${site.whatsapp}`} className="break-all text-white/85 transition-colors hover:text-neon-cyan">{site.phone}</a></dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.35em] text-white/50">EMAIL</dt>
              <dd className="mt-2"><a href={`mailto:${site.email}`} className="break-all text-white/85 transition-colors hover:text-neon-cyan">{site.email}</a></dd>
            </div>
          </dl>
        </div>
      </div>

      <footer className="relative z-10 mx-auto mt-16 flex w-full max-w-[1400px] flex-col gap-4 border-t border-white/10 pt-6 font-mono text-[11px] tracking-[0.3em] text-white/50 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} SUMEDH — BUILT WITH REACT & GSAP · FOOTAGE: MIXKIT</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })} className="min-h-11 text-left transition-colors hover:text-white">
          BACK TO TOP ↑
        </button>
      </footer>
    </section>
  );
}
