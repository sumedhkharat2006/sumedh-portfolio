import { useRef, type ElementType } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import SplitText from './SplitText';

type Props = {
  text: string; as?: ElementType; className?: string;
  split?: 'chars' | 'words'; delay?: number; start?: string;
};

// Masked, blur-to-sharp, staggered reveal when scrolled into view
export default function RevealText({ text, as = 'h2', className, split = 'words', delay = 0, start = 'top 85%' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from(ref.current!.querySelectorAll(split === 'chars' ? '.char' : '.word'), {
      yPercent: 115, opacity: 0, filter: 'blur(10px)',
      duration: 1.2, ease: 'expo.out', delay,
      stagger: split === 'chars' ? 0.03 : 0.07,
      scrollTrigger: { trigger: ref.current, start, once: true },
    });
  }, { scope: ref });
  return <div ref={ref}><SplitText text={text} as={as} className={className} split={split} /></div>;
}
