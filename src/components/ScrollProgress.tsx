import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(bar.current, { scaleX: 0 }, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    });
  });
  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-[2px]" aria-hidden="true">
      <div ref={bar} className="h-full origin-left bg-gradient-to-r from-neon-blue via-neon-violet to-neon-cyan" />
    </div>
  );
}
